// LICENSE : MIT
"use strict";
var mcFly = require("../../flux-index");
var constant = require("./SiteConst");

var _sites = [];
/**
 *
 * @typedef {{siteID: string, title: string, description: string, screenShotURL: string, url: string}} Site
 * @private
 */
var _siteState = {
    siteID: "",
    title: "",
    description: "",
    screenShotURL: "",// URL
    url: ""
};
/**
 * Change URL
 * @param {Site} site
 * @private
 */
function _focusSite(site) {
    _siteState = site;
}

function _initializedSites(sites) {
    _sites = sites;
}
function handlePayload(payload) {
    switch (payload.actionType) {
        case constant.FOCUS_SITE:
            return _focusSite(payload.site);
        case constant.INITIALIZE_NAV:
            return _initializedSites(payload.sites)
    }
}
var SiteStore = mcFly.createStore({
    getAllSites: function () {
        return _sites;
    },
    getFocusSite: function () {
        return _siteState;
    }

}, function (payload) {
    handlePayload(payload);
    SiteStore.emitChange();
    return true;

});
module.exports = SiteStore;