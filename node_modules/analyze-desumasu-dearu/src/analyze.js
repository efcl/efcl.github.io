// LICENSE : MIT
"use strict";
const ObjectAssign = require("object.assign");
const find = require('array-find');
const getTokenizer = require("kuromojin").getTokenizer;
/**
 * token object
 * @typedef {{word_id: number, word_type: string, word_position: number, surface_form: string, pos: string, pos_detail_1: string, pos_detail_2: string, pos_detail_3: string, conjugated_type: string, conjugated_form: string, basic_form: string, reading: string, pronunciation: string}} AnalyzedToken
 * @see https://github.com/takuyaa/kuromoji.js#api
 */

/**
 * Analyzed result Object
 * @typedef {{type:string, value:string, surface: string, token:AnalyzedToken, index: number}} AnalyzedResultObject
 */

// Cache tokens
const _tokensCacheMap = {};
/**
 * デフォルトのオプション値
 * @type {{ignoreConjunction: boolean}}
 */
const defaultOptions = {
    // 接続的な "である" を無視する
    // e.g.) 今日はいい天気であるが明日はどうなるかは分からない。
    ignoreConjunction: false
};
/**
 * Type enum
 * @type {{desu: string, dearu: string}}
 * @example
 *  analyze(text).filter(results => results.type === Types.desu);
 */
export const Types = {
    desu: "特殊・デス",
    dearu: "特殊・ダ"
};
/**
 * @param {AnalyzedResultObject} resultObject
 * @returns {boolean}
 */
export function isDesumasu(resultObject) {
    return resultObject.type === Types.desu;
}
/**
 * @param {AnalyzedResultObject} resultObject
 * @returns {boolean}
 */
export function isDearu(resultObject) {
    return resultObject.type === Types.dearu;
}

/**
 * tokenが文末のtokenなのかどうか
 * 文末とは"。"やこれ以上後ろにtokenがないケースを示す
 * @param {AnalyzedToken} targetToken
 * @param allTokens
 * @returns {boolean}
 */
const isLastToken = (targetToken, allTokens) => {
    const nextPunctureToken = findNextPunctureToken(targetToken, allTokens);
    if (nextPunctureToken === undefined) {
        return true;
    }
    const nextPunctureTokenSurface = nextPunctureToken.surface_form;
    if (/[\!\?！？。]/.test(nextPunctureTokenSurface)) {
        return true;
    }
};
/**
 * targetTokenより後ろにあるtokenから切り口となるtokenを探す
 * @param targetToken
 * @param allTokens
 * @returns {AnalyzedToken|undefined}
 */
const findNextPunctureToken = (targetToken, allTokens) => {
    const PUNCTUATION = /、|。/;
    const CONJUGATED_TYPE = /特殊/;
    const indexOfTargetToken = allTokens.indexOf(targetToken);
    // value is collection of these tokens: [ {target}, token, token, nextTarget|PunctuationToken ]
    const postTokens = allTokens.slice(indexOfTargetToken + 1);
    return find(postTokens, token => {
        // 接続、末尾なので切る
        if (PUNCTUATION.test(token["surface_form"])) {
            return true;
        }
        // 次の特殊・がきたら
        if (CONJUGATED_TYPE.test(token["conjugated_type"])) {
            return true;
        }
        // 明示的なtokenがない場合は、名詞がきたらそこで切ってしまう
        if (token["pos"] === "名詞") {
            return true;
        }
        return false;
    });
};
/**
 * tokensからAnalyzedTokenにmapを作る
 * @param {AnalyzedToken[]}tokens
 * @returns {function(token: AnalyzedToken)}
 */
const mapToAnalyzedResult = tokens => {
    /**
     * @param {AnalyzedToken} token
     * @return {AnalyzedResultObject}
     */
    return function mapTokenToAnalyzedResult(token) {
        const indexOfTargetToken = tokens.indexOf(token);
        const nextPunctureToken = findNextPunctureToken(token, tokens);
        // if has not next token, use between token <--> last.
        const nextTokenIndex = nextPunctureToken ? tokens.indexOf(nextPunctureToken) : tokens.length;
        const valueTokens = tokens.slice(indexOfTargetToken, nextTokenIndex + 1);
        const value = valueTokens.map(token => token["surface_form"]).join("");
        return {
            type: token["conjugated_type"],
            value: value,
            surface: token["surface_form"],
            // index start with 0
            index: token["word_position"] - 1,
            /**
             * @type {AnalyzedToken}
             */
            token: ObjectAssign({}, token)
        };
    };
};
/**
 * `text`から敬体(ですます調)と常体(である調)を取り出した結果を返します。
 * @param {string} text
 * @param {Object} options
 * @returns {Promise.<AnalyzedResultObject[]>}
 */
export function analyze(text, options = defaultOptions) {
    const ignoreConjunction = options.ignoreConjunction !== undefined
        ? options.ignoreConjunction
        : defaultOptions.ignoreConjunction;
    return getTokenizer().then(tokenizer => {
        const tokens = _tokensCacheMap[text] ? _tokensCacheMap[text] : tokenizer.tokenizeForSentence(text);
        _tokensCacheMap[text] = tokens;
        const filterByType = tokens.filter((token, index) => {
            const nextToken = tokens[index + 1];
            // token[特殊・ダ] + nextToken[アル] なら 常体(である調) として認識する
            const conjugatedType = token["conjugated_type"];
            if (conjugatedType === Types.dearu) {
                // "である" を取り出す。この時点では接続なのか末尾なのかは区別できない
                if (token["pos"] === "助動詞" && token["conjugated_form"] === "連用形") {
                    if (nextToken && nextToken["conjugated_type"] === "五段・ラ行アル") {
                        // 文末の"である"のみを許容する場合は文末であるかどうかを調べる
                        if (ignoreConjunction) {
                            return isLastToken(token, tokens);
                        } else {
                            return true;
                        }
                    }
                }
            } else if (conjugatedType === Types.desu) {
                // TODO: can omit?
                if (token["conjugated_form"] === "基本形") {
                    // 文末の"です"のみを許容する場合は、文末であるかどうかを調べる
                    if (ignoreConjunction) {
                        return isLastToken(token, tokens);
                    } else {
                        return true;
                    }
                }
            }
        });
        return filterByType.map(mapToAnalyzedResult(tokens));
    });
}
/**
 * `text` の敬体(ですます調)について解析し、敬体(ですます調)のトークン情報を返します。
 * @param {string} text
 * @param {Object} options
 * @return {Promise.<AnalyzedResultObject[]>}
 */
export function analyzeDesumasu(text, options = defaultOptions) {
    return analyze(text, options).then(results => results.filter(isDesumasu));
}
/**
 * `text` の常体(である調)について解析し、常体(である調)のトークン情報を返します。
 * @param {string} text
 * @param {Object} options
 * @return {Promise.<AnalyzedResultObject[]>}
 */
export function analyzeDearu(text, options = defaultOptions) {
    return analyze(text, options).then(results => results.filter(isDearu))
}