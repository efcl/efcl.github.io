"use strict";
var webpack = require("webpack");
module.exports = {
    entry: {
        index: './lib/index.js'
    },
    output: {
        filename: '[name].built.js',
        path: './built'
    },
    resolve: {
        modulesDirectories: [
            'node_modules',
            'bower_components'
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    loaders: [
        {test: /jquery\.glanceyear\.js$/, loader: 'script-loader'},
        {test: /(\.js|\.es6)$/, loader: 'es6-loader'}
    ]
};