// LICENSE : MIT
"use strict";
var mcFly = require("../flux-index");
var constant = require("./RouterConst");

/**
 *
 * @typedef {{name: string, path: string}} Route
 */
var routeState = {
    name: "",
    path: ""
};
/**
 * Change URL
 * @param {Route} route
 * @private
 */
function _changeURL(route) {
    routeState = route;
}
var RouterStore = mcFly.createStore({
    getCurrentRoute: function () {
        return routeState;
    }

}, function (payload) {
    switch (payload.actionType) {
        case constant.CHANGE_URL:
            _changeURL(payload.route);
            break;
        default:
            return true;
    }

    RouterStore.emitChange();

    return true;

});
module.exports = RouterStore;