"use strict";
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
    loaders: [
        {test: /(\.js|\.es6)$/, loader: 'es6-loader'}
    ]
};