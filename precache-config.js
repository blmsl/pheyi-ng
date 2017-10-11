var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    navigateFallback : '/index.html',
    navigateFallbackWhiteList: [/^(?!\/__)/], //necessary for firebase OAuth
    stripPrefix : 'dist',
    root : 'dist/',

    plugins : [
        new SWPrecacheWebpackPlugin({
            cacheId : 'Pheyi',
            filename : 'service-worker.js',
            staticFileGlobs: [
                'dist/index.html',
                'dist/**.js',
                'dist/**.css'
            ],
            stripPrefix : 'dist/assets/',
            mergeStaticsConfig : true
        })
    ]
}