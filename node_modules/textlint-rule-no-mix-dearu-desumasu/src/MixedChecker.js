// LICENSE : MIT
"use strict";
import {analyze, isDearu, isDesumasu} from "analyze-desumasu-dearu";
export default class MixedChecker {
    /**
     * @param context
     * @param {{preferDearu:boolean, preferDesumasu: boolean}} options
     */
    constructor(context, options) {
        this.context = context;
        /**
         * 明示的な優先するタイプの指定
         * @type {{preferDearu: boolean, preferDesumasu: boolean, isStrict: boolean}}
         */
        this.options = options;
        this.dearuCount = 0;
        this.desumasuCount = 0;
        this.dearuHitList = [];
        this.desumasuHitList = [];
        this._queue = Promise.resolve();
    }

    check(node, text) {
        this._queue = this._queue.then(() => {
            const analyzeOptions = {
                ignoreConjunction: !this.options.isStrict
            };
            return analyze(text, analyzeOptions).then(results => {
                const retDearu = results.filter(isDearu);
                const retDesumasu = results.filter(isDesumasu);
                const dearuCount = this.dearuCount + retDearu.length;
                const desumasuCount = this.desumasuCount + retDesumasu.length;
                if (this.dearuCount !== dearuCount) {
                    this.dearuCount = dearuCount;
                    this.dearuHitList.push({
                        node,
                        matches: retDearu
                    });
                }
                if (this.desumasuCount !== desumasuCount) {
                    this.desumasuCount = desumasuCount;
                    this.desumasuHitList.push({
                        node,
                        matches: retDesumasu
                    });
                }
            });
        });
    }

    /**
     * @param {IgnoreManger}ignoreManger
     * @returns {Promise.<TResult>}
     */
    checkout(ignoreManger) {
        return this._queue.then(() => {
            if (!this.isOver()) {
                return;
            }
            const RuleError = this.context.RuleError;
            const report = this.context.report;
            const overType = this.getOverType();
            const overHitList = this.overHitList(overType);
            // List
            overHitList.forEach(({
                node,
                matches
            }) => {
                // Node
                const lastHitNode = node;
                // Tokens
                matches.forEach(token => {
                    const hitIndex = node.range[0] + token.index;
                    if (ignoreManger.isIgnoredIndex(hitIndex)) {
                        return;
                    }

                    const ruleError = new RuleError(this.outputMessage(token), {
                        index: token.index
                    });
                    report(lastHitNode, ruleError)
                });
            });
        });
    }

    isOver() {
        return this.dearuCount !== 0 && this.desumasuCount !== 0;
    }

    /**
     * 優先するtypeを返します。
     * @returns {*}
     */
    getOverType() {
        if (this.options.preferDearu) {
            return "である"
        } else if (this.options.preferDesumasu) {
            return "ですます";
        }
        if (this.dearuCount > this.desumasuCount) {
            return "である";
        } else {
            return "ですます";
        }
    }

    /**
     * hist node list
     * @param overType
     * @returns {Array}
     */
    overHitList(overType) {
        if (overType === "である") {
            return this.desumasuHitList;
        } else if (overType === "ですます") {
            return this.dearuHitList;
        }
    }

    /**
     * create message string
     * @param token
     * @returns {string}
     */
    outputMessage(token) {
        const overType = this.getOverType();
        if (overType === "である") {
            // である優先 => 最後の"ですます"を表示
            return `"である"調 と "ですます"調 が混在
=> "${token.value}" がですます調
Total:
である  : ${this.dearuCount}
ですます: ${this.desumasuCount}
`;
        } else if (overType === "ですます") {
            // ですます優先 => 最後の"である"を表示
            return `"である"調 と "ですます"調 が混在
=> "${token.value}" がである調
Total:
である  : ${this.dearuCount}
ですます: ${this.desumasuCount}
`;
        }
    }
}
