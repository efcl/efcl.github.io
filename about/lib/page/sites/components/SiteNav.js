// LICENSE : MIT
"use strict";
var $ = require("jquery");
var SiteAction = require("../SiteActions");
module.exports = createNav;
function createNav(siteArray) {
    if ($.isEmptyObject(siteArray)) {
        return console.log("dataがないよ");
    }
    var nav = $('<nav />');
    var ul = $('<ul />', {
        className: "nav-roll"
    });
    $.each(siteArray, function (index, site) {// ドメイン
        var li = $('<li class="nav-site" />')
            .append($('<a />', {
                href: "#" + site.siteID,
                text: site.title
            }))
            .append($('<img />', {
                src: site.screenShotURL,
                alt: site.title
            })
        ).appendTo(ul);
        // クリックでarticleまで移動
        li.click(function (e) {
            e.preventDefault();
            SiteAction.focusSite(site);
        });
    });
    nav.append($('<span />', {
        className: "description",
        text: "クリックするとスクロールします"
    })).append(ul);
    return nav;
}
