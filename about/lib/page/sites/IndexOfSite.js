// LICENSE : MIT
"use strict";
var $ = require("jquery");
var $scrollTo = require("jquery.scrollto");
var getSiteMeta = require("./DOMUtil/collectSiteMeta");
var createNav = require("./components/SiteNav");
var SiteStore = require("./SiteStore");
var locationWrapper = require("./DOMUtil/locationWrapper");
SiteStore.addChangeListener(function () {
    var site = SiteStore.getFocusSite();
    $scrollTo("#" + site.siteID, 500, {axis: 'y'});
    locationWrapper.put(site.siteID, window);
});
module.exports = function () {
    var siteInfo = getSiteMeta("#contents > article");
    var navElem = createNav(siteInfo);
    $('#js-nav-site').html(navElem);
};
