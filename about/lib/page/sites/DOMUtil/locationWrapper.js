// LICENSE : MIT
"use strict";

// http://tkyk.github.com/jquery-history-plugin/
var locationWrapper = {
    put: function(hash, win) {
        (win || window).location.hash = this.encoder(hash);
    },
    get: function(win) {
        var hash = ((win || window).location.hash).replace(/^#/, '');
        try {
            return $.browser.mozilla ? hash : decodeURIComponent(hash);
        }
        catch (error) {
            return hash;
        }
    },
    encoder: encodeURIComponent
};
module.exports = locationWrapper;