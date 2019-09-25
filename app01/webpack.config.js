//配置文件
var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {//配置所有的第三方模块的加载器
        rules: [
            { test: /\.css$/,use: ['style-loader','css-loader']},
            { test: /\.(jpg|png|gif|bmp|jpeg)$/,use: 'url-loader'},
            { test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
            { test: /\.vue$/,use:'vue-loader'}
        ]

    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    },
    devServer: {
        disableHostCheck: true //  解决Invalid Host/Origin header问题
    }
}