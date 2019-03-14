// MIT © 2017 azu
var fetch = require("fetch-ponyfill")().fetch;
var DICT_API_URL = "https://proofdict.github.io/proofdict/dict.json";

/**
 * @typedef {Object} Proofdict
 * @property {string} id
 * @property {string} description
 * @property {string} expected
 * @property {string[]} patterns
 * @property {{actual:string,expected:string}[]} specs
 * @property {string[]} tags
 */

/**
 * Get local dictionary.
 * Sync API.
 * @return {Proofdict[]}
 */
function getProofdict() {
    return require("./public/dict.json");
}

/**
 * Fetch latest dictionary by requesting API.
 * Async API
 * @returns {Promise<Proofdict[]>}
 */
function fetchProofdict() {
    return fetch(DICT_API_URL).then(function(response) {
        return response.json();
    });
}

module.exports.getProofdict = getProofdict;
module.exports.fetchProofdict = fetchProofdict;
module.exports.DICT_API_URL = DICT_API_URL;