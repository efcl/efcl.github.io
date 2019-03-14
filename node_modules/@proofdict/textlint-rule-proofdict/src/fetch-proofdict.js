// MIT © 2018 azu
"use strict";
const fetch = require("fetch-ponyfill")().fetch;

function delayPromise(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

function timeoutPromise(promise, ms) {
    const timeout = delayPromise(ms).then(function() {
        const error = new Error("Operation timed out after " + ms + " ms");
        error.name = "TimeoutError";
        throw error;
    });
    return Promise.race([promise, timeout]);
}

export function fetchProofdict({ URL }) {
    return timeoutPromise(fetch(URL), 5000).then(res => {
        if (!res.ok) {
            throw Error(`Proofdict is not found: ${URL}`);
        }
        return res.json();
    });
}
