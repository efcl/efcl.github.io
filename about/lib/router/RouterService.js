// LICENSE : MIT
"use strict";
var Router = require('routr');
var router = new Router({
    "home": {
        path: "/",
        method: 'get'
    },
    "sites": {
        path: "/about/sites.html",
        method: 'get'
    },
    "products": {
        path: "product.html",
        method: 'get'
    }
});
module.exports = router;