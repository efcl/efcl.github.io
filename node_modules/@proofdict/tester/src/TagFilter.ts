// MIT © 2017 azu
import { ProofdictRule, Proofdict } from "./proofdict-tester";

const NOUN_TAG = "noun";

/**
 * Does the `dict` has "noun" tag?
 * @param {ProofdictRule} dict
 * @returns {boolean}
 */
export function isNoun(dict: ProofdictRule): boolean {
    return dict.tags.indexOf(NOUN_TAG) !== -1;
}

export function filterByTags(dictionary: Proofdict, whitelistTags: string[] = [], blacklistTags: string[] = []) {
    if (whitelistTags.length > 0) {
        return dictionary.filter(item => {
            return whitelistTags.every(whitelistTags => item.tags.indexOf(whitelistTags) !== -1);
        });
    }
    if (blacklistTags.length > 0) {
        return dictionary.filter(item => {
            return !item.tags.some(tag => blacklistTags.indexOf(tag) !== -1);
        });
    }
    return dictionary;
}
