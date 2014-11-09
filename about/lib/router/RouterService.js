// LICENSE : MIT
"use strict";
var Router = require('routr');
var router = new Router({
    "home": {
        path: "/",
        method: 'get'
    },
    "timeline": {
        path: "/about/timeline.html",
        method: 'get'
    },
    "sites": {
        path: "/about/sites.html",
        method: 'get'
    },
    "products": {
        path: "/about/product.html",
        method: 'get'
    }
});
module.exports = router;