// LICENSE : MIT
"use strict";
import {RuleHelper, IgnoreNodeManager} from "textlint-rule-helper";
import BodyMixedChecker from "./BodyMixedChecker";
import HeaderMixedChecker from "./HeaderMixedChecker";
import ListMixedChecker from "./ListMixedChecker";
export const PreferTypes = {
    DESUMASU: "ですます",
    DEARU: "である"
};
// デフォルトでその項目で多く出現している方を優先します。
// 明示的にpreferの設定した場合は、そちらを優先した内容をエラーとして表示します。
const defaultOptions = {
    "preferInHeader": "", // "である" or "ですます"
    "preferInBody": "",   // "である" or "ですます"
    "preferInList": "",   // "である" or "ですます"
    // 文末以外でも、敬体(ですます調)と常体(である調)を厳しくチェックするかどうか
    "strict": false
};

module.exports = function noMixedDearuDesumasu(context, options = defaultOptions) {
    const {Syntax, getSource} = context;
    const helper = new RuleHelper(context);
    const ignoreManager = new IgnoreNodeManager();
    const isStrict = options.strict !== undefined ? options.strict : defaultOptions.strict;
    const bodyChecker = new BodyMixedChecker(context, {
        preferDesumasu: options.preferInBody === PreferTypes.DESUMASU,
        preferDearu: options.preferInBody === PreferTypes.DEARU,
        isStrict
    });
    const headerChecker = new HeaderMixedChecker(context, {
        preferDesumasu: options.preferInHeader === PreferTypes.DESUMASU,
        preferDearu: options.preferInHeader === PreferTypes.DEARU,
        isStrict
    });
    const listChecker = new ListMixedChecker(context, {
        preferDesumasu: options.preferInList === PreferTypes.DESUMASU,
        preferDearu: options.preferInList === PreferTypes.DEARU,
        isStrict
    });
    return {
        // 見出し
        [Syntax.Header](node){
            const text = getSource(node);
            headerChecker.check(node, text);
        },
        // 箇条書き
        [Syntax.ListItem](node){
            const text = getSource(node);
            listChecker.check(node, text);
        },
        // 本文
        [Syntax.Paragraph](node){
            const ignoredNodeTypes = [Syntax.Link, Syntax.Code, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis];
            // 無視リストのTypeが親にある場合は無視する
            if (helper.isChildNode(node, ignoredNodeTypes)) {
                return;
            }
            // 見出しと箇条書きは別途チェックするので Header > Str などは無視する
            if (helper.isChildNode(node, [Syntax.Header, Syntax.ListItem])) {
                return;
            }
            // childrenに無視するtypeがいた場合は無視リストに加える
            ignoreManager.ignoreChildrenByTypes(node, ignoredNodeTypes);
            // check
            const text = getSource(node);
            bodyChecker.check(node, text);
        },
        [Syntax.Document + ":exit"](){
            return Promise.all([
                bodyChecker.checkout(ignoreManager),
                headerChecker.checkout(ignoreManager),
                listChecker.checkout(ignoreManager)
            ]);
        }
    }
};