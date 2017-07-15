var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV
var compress = process.env.COMPRESS

var plugins = []

plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

if (env === 'production' && compress) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    )
}
plugins.push(new HtmlWebpackPlugin({
    filename: './index.html', //生成的html存放路径，相对于 path
    template: './index.html', //html模板路径
    inject: true, //允许插件修改哪些内容，包括head与body`
}))

module.exports = {
    entry: ["./index.js"],

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[name].[hash:8].chunk.js'
    },

    resolve: {
        extensions: [".js"],
    },

    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },

    plugins: plugins
}

if (env === 'development') {
    module.exports.devtool = 'source-map'
}
