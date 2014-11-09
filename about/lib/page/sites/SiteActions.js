// LICENSE : MIT
"use strict";
var mcFly = require("../../flux-index");
var constant = require("./SiteConst");
var SitesAction = mcFly.createActions({
    initializeSites: function (sites) {
        return {
            actionType: constant.INITIALIZE_NAV,
            sites: sites
        }
    },
    /**
     * scroll to site <article>
     * @param {Site} site object
     */
    focusSite: function (site) {
        return {
            actionType: constant.FOCUS_SITE,
            site: site
        }
    }
});
module.exports = SitesAction;