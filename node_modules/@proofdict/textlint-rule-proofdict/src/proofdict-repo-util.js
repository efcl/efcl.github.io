// MIT © 2018 azu
"use strict";
const urlJoin = require("url-join");

/**
 * @param options
 * @returns {string}
 */
export function getDictJSONURL(options) {
    if (typeof options.dictURL === "object" && typeof options.dictURL.jsonAPI === "string") {
        return options.dictURL.jsonAPI;
    }
    return urlJoin(options.dictURL, "dictionary.json");
}

/**
 * @param options
 * @param rule
 * @returns {string|undefined}
 */
export function getRuleURL(options, rule) {
    if (!rule) {
        return;
    }
    // http://custom.example.com/base#id
    if (typeof options.dictURL === "object" && typeof options.dictURL.ruleBase === "string") {
        return `${options.dictURL.ruleBase}#${encodeURIComponent(rule.id)}`;
    }
    // http://example.com#id
    if (options.dictURL) {
        return `${options.dictURL}#${encodeURIComponent(rule.id)}`;
    }
}
