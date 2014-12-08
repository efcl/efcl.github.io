// LICENSE : MIT
"use strict";
var $ = require("jquery");
require("../../../vendor/glanceyear/jquery.glanceyear");

// 01-02 => 1-2
function trimZeroPrefix(string) {
    return string.replace(/(-)0(\d)/g, "$1$2");
}
module.exports = function () {
    var placeholder = {};
    // massive from html
    var massive = JSON.parse(document.getElementById('js-presentation-data').innerHTML);
    massive.forEach(function (object) {
        if (!placeholder[object.date]) {
            placeholder[object.date] = 1;
        }
        placeholder[object.date] += 1;
    });
    var dataset = Object.keys(placeholder).map(function (dateKey) {
        return {
            date: trimZeroPrefix(dateKey),
            value: String(placeholder[dateKey])
        };
    });
    console.log(dataset);
    $('div#js-glanceyear').glanceyear(dataset,
        {
            eventClick: function (e) {
                //$('#debug').html('Date: ' + e.date + ', Count: ' + e.count);
            },
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weeks: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            showToday: false,
            today: new Date()
        });
};