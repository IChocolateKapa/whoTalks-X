//var path = require('path');
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
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },//需要用双引号才不会报错哟~
            //{ test: /\.png$/, loader: "url-loader?mimetype=image/png"},
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};