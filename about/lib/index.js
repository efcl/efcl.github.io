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
    switch (route.name) {
        case "sites":
            return require("./page/sites/IndexOfSite")();
        case "presentations":
            return require("./page/presentations/presentations")();
    }
});
RouterAction.changeURL(route);