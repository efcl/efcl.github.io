// MIT © 2017 azu
"use strict";
import { MODE } from "./mode";
import { storage } from "./dictionary-storage";

const { ProofdictTester } = require("@proofdict/tester");
let currentTester = null;
let checkedLastTime = -1;
/**
 * @param {number} lastUpdated
 * @param {*} dictionary
 * @param {string[]} whitelistTags
 * @param {string[]}  blacklistTags
 * @param {boolean}  disableTesterCache
 * @returns {ProofdictTester}
 */
export const createTester = ({ lastUpdated, dictionary, whitelistTags, blacklistTags, disableTesterCache }) => {
    if (disableTesterCache || (currentTester === null && checkedLastTime < lastUpdated)) {
        checkedLastTime = lastUpdated;
        currentTester = new ProofdictTester({
            dictionary,
            whitelistTags,
            blacklistTags
        });
        return currentTester;
    }
    return currentTester;
};

/**
 * @param options
 * @param {string} mode
 * @returns {*}
 */
export const getDictionary = (options, mode) => {
    // prefer `dictionary` option
    if (options.proofdict !== undefined) {
        return options.proofdict;
    }
    let proofDictData;
    // NETWORK
    if (mode === MODE.NETWORK) {
        try {
            const cachedProofdict = storage.getItem("proofdict");
            proofDictData = JSON.parse(cachedProofdict);
        } catch (error) {
            storage.removeItem("proofdict");
        }
    }
    // LOCAL
    if (mode === MODE.LOCAL) {
        // TODO: not implemented
    }
    return proofDictData;
};
