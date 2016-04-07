module.exports = {
    entry: "./src/app.js",
    output: {
        path: 'dist',
        filename: "build.js"
    },
    module: {
        loaders: [
            { test : /\.vue$/, loader : "vue"},
            { test: /\.css$/, loader: "style!css" },//需要用双引号才不会报错哟~
            { test: /\.png$/, loader: "url-loader?mimetype=image/png"},
        ]
    }
};