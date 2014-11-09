// LICENSE : MIT
"use strict";
var RouterAction = require("./router/RouterAction");
var router = require("./router/RouterService");
var RouterStore = require("./router/RouterStore");
var pathname = location.pathname;
var route = router.getRoute(pathname);
if (route == null) {
    route = {
        name: "404",
        path: "404.html"
    };
}
RouterStore.addChangeListener(function () {
    var route = RouterStore.getCurrentRoute();
    console.log(route);
    if (route.name === "sites") {
        require("./page/sites/IndexOfSite")();
    }
});
RouterAction.changeURL(route);