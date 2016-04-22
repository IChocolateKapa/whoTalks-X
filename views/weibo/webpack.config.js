var path = require('path');
//var webpack = require('webpack');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    /*resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },*/
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            { test: /\.less/, loader: 'style!css!autoprefixer!less'},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader'},
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    devtool: 'source-map',
    watch: true
};