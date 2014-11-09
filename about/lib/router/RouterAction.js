// LICENSE : MIT
"use strict";
var mcFly = require("../flux-index");
var constant = require("./RouterConst");
var RouterAction = mcFly.createActions({
    /**
     *
     * @param {Route} route
     */
    changeURL: function (route) {
        return {
            actionType: constant.CHANGE_URL,
            route: route
        }
    }
});
module.exports = RouterAction;