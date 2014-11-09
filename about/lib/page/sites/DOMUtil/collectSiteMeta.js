// LICENSE : MIT
"use strict";
var $ = require("jquery");
function getSiteMeta(selector) {
    var articles = $(selector);
    if (articles.size() === 0) {
        return [];
    }
    return articles.map(function (idx, elem) {
        if (!elem.id) {
            return console.error(elem, "idがない");
        }
        var siteID = elem.id;
        var screenShot = $('.screenshots', elem);
        return {
            siteID: siteID,
            title: $('h1 > a', elem).text(),
            description: $('.site-description', elem).text(),
            screenShotURL: $('img[src]', screenShot)[0].src,// 絶対パス
            URL: $('a[href]', screenShot)[0].href
        };
    });
}
module.exports = getSiteMeta;