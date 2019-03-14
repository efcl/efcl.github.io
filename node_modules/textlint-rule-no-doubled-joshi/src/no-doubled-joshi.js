// LICENSE : MIT
"use strict";
import {RuleHelper} from "textlint-rule-helper";
import {getTokenizer} from "kuromojin";
import {split as splitSentences, Syntax as SentenceSyntax} from "sentence-splitter";
import StringSource from "textlint-util-to-string";
import {
    is助詞Token, is読点Token,
    concatJoishiTokens,
    createKeyFromKey,
    restoreToSurfaceFromKey
} from "./token-utils";
/**
 * Create token map object
 * {
 *  "は:助詞.係助詞": [token, token]
 * }
 * @param tokens
 * @returns {*}
 */
function createSurfaceKeyMap(tokens) {
    // 助詞のみを対象とする
    return tokens.filter(is助詞Token).reduce((keyMap, token) => {
        // "は:助詞.係助詞" : [token]
        const tokenKey = createKeyFromKey(token);
        if (!keyMap[tokenKey]) {
            keyMap[tokenKey] = [];
        }
        keyMap[tokenKey].push(token);
        return keyMap;
    }, {});
}
function matchExceptionRule(tokens) {
    let token = tokens[0];
    // "の" の重なりは例外
    if (token.pos_detail_1 === "連体化") {
        return true;
    }
    // "を" の重なりは例外
    if (token.pos_detail_1 === "格助詞" && token.surface_form === "を") {
        return true;
    }
    // 接続助詞 "て" の重なりは例外
    if (token.pos_detail_1 === "接続助詞" && token.surface_form === "て") {
        return true;
    }
    return false;
}
/*
 default options
 */
const defaultOptions = {
    min_interval: 1,
    strict: false,
    allow: [],
    separatorChars: ["。", "?", "!", "？", "！"]
};

/*
 1. Paragraph Node -> text
 2. text -> sentences
 3. tokenize sentence
 4. report error if found word that match the rule.

 TODO: need abstraction
 */
export default function(context, options = {}) {
    const helper = new RuleHelper(context);
    // 最低間隔値
    const minInterval = options.min_interval || defaultOptions.min_interval;
    const isStrict = options.strict || defaultOptions.strict;
    const allow = options.allow || defaultOptions.allow;
    const separatorChars = options.separatorChars || defaultOptions.separatorChars;
    const {Syntax, report, RuleError} = context;
    return {
        [Syntax.Paragraph](node){
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            const source = new StringSource(node);
            const text = source.toString();
            const isSentenceNode = node => {
                return node.type === SentenceSyntax.Sentence;
            };
            const sentences = splitSentences(text, {
                separatorChars: separatorChars
            }).filter(isSentenceNode);
            return getTokenizer().then(tokenizer => {
                const checkSentence = (sentence) => {
                    const tokens = tokenizer.tokenizeForSentence(sentence.raw);
                    // 助詞 + 助詞は 一つの助詞として扱う
                    // https://github.com/textlint-ja/textlint-rule-no-doubled-joshi/issues/15
                    // 連語(助詞)の対応
                    // http://www.weblio.jp/parts-of-speech/%E9%80%A3%E8%AA%9E(%E5%8A%A9%E8%A9%9E)_1
                    const concatTokens = concatJoishiTokens(tokens);
                    const countableTokens = concatTokens.filter(token => {
                        if (isStrict) {
                            return is助詞Token(token);
                        }
                        // デフォルトでは、"、"を間隔値の距離としてカウントする
                        // "、" があると助詞同士の距離が開くようにすることで、並列的な"、"の使い方を許容する目的
                        // https://github.com/azu/textlint-rule-no-doubled-joshi/issues/2
                        return is助詞Token(token) || is読点Token(token);
                    });
                    const joshiTokenSurfaceKeyMap = createSurfaceKeyMap(countableTokens);
                    /*
                     # Data Structure

                     joshiTokens = [tokenA, tokenB, tokenC, tokenD, tokenE, tokenF]
                     joshiTokenSurfaceKeyMap = {
                         "は:助詞.係助詞": [tokenA, tokenC, tokenE],
                         "で:助詞.係助詞": [tokenB, tokenD, tokenF]
                     }
                     */
                    Object.keys(joshiTokenSurfaceKeyMap).forEach(key => {
                        const tokens = joshiTokenSurfaceKeyMap[key];
                        const joshiName = restoreToSurfaceFromKey(key);
                        // check allow
                        if (allow.indexOf(joshiName) >= 0) {
                            return;
                        }
                        // strict mode ではない時例外を除去する
                        if (!isStrict) {
                            if (matchExceptionRule(tokens)) {
                                return;
                            }
                        }
                        if (tokens.length <= 1) {
                            return;// no duplicated token
                        }
                        // if found differenceIndex less than
                        // tokes are sorted ascending order
                        tokens.reduce((prev, current) => {
                            const startPosition = countableTokens.indexOf(prev);
                            const otherPosition = countableTokens.indexOf(current);
                            // 助詞token同士の距離が設定値以下ならエラーを報告する
                            const differenceIndex = otherPosition - startPosition;
                            if (differenceIndex <= minInterval) {
                                const originalIndex = source.originalIndexFromPosition({
                                    line: sentence.loc.start.line,
                                    column: sentence.loc.start.column + (current.word_position - 1)
                                });
                                // padding positionを計算する
                                const padding = {
                                    index: originalIndex
                                };
                                report(node, new RuleError(`一文に二回以上利用されている助詞 "${joshiName}" がみつかりました。`, padding));
                            }
                            return current;
                        });
                    });
                };
                sentences.forEach(checkSentence);
            });
        }
    }
};
