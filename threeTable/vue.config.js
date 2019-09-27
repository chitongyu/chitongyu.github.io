/*
 * @Author: Huanghao
 * @Date: 2019-07-08 15:20:47
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-25 05:50:29
 * @Description:
 */
const path = require("path");
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const Timestamp = new Date().getTime();  //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
/* 添加打包分析 */
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// 引入 ParallelUglifyPlugin 插件
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');


/* 开启gzip压缩 */
const CompressionWebpackPlugin = require("compression-webpack-plugin");

/* 首屏预加载 */
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
//骨架屏实现
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  pages: {
    index: {
      // 入口js的路径
      entry: "./src/main.js",
      // 页面模板路径
      template: "./public/index.html",
      // output as dist/index.html
      filename: "index.html",
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },

  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 基本路径
  baseUrl:'./',
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // 输出文件目录
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },

  configureWebpack: config => {
    if (IS_PROD) {
      const plugin01 = // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
        new ParallelUglifyPlugin({
          // 传递给 UglifyJS的参数如下：
          cacheDir: '.cache/',
          workerCount: 4,
          uglifyJS: {

            output: {
              /*
               是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
               可以设置为false
              */
              beautify: false,
              /*
               是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
              */
              comments: false
            },
            compress: {
              /*
               是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
               不大的警告
              */


              /*
               是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
              */
              drop_console: true,

              /*
               是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
               转换，为了达到更好的压缩效果，可以设置为false
              */
              collapse_vars: true,

              /*
               是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
               var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
              */
              reduce_vars: true
            },
            warnings: false,
          }
        });
      const plugin02 = new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      });
      const plugin03 = new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, "dist"),
        // Required - Routes to render.
        routes: ["/home"]
      });
      config.plugins.push(plugin01);
      config.plugins.push(plugin02);
      config.plugins.push(plugin03);

    }
    return {
      output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
        filename: `[name].${Timestamp}.js`,
        chunkFilename: `[name].${Timestamp}.js`
      }
    }
  },
  // 如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  //  vueLoader: {},
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    //   extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/themes.scss";@import "@/assets/scss/mixin.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  devServer: {
    open: IS_PROD,
    host: "0.0.0.0",
    port: 8083,
    https: false,
    hotOnly: true,
    proxy: {
      "/admin": {
        target: "http://192.168.0.205:8877",
        //http://192.168.238.163:8877/swagger-ui.html 君哥
        //http://192.168.239.26:8877 正安
        //http://192.168.239.168:8877 正安
        //http://192.168.0.205:8877 测试
        changeOrigin: true,
        // ws: true, // 是否启用websockets
        pathRewrite: {}
      },
      "/ffmpeg": {
        target: "http://192.168.0.207:13807",
        changeOrigin: true,
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/ffmpeg": "/ffmpeg"
        }
      }
    }, // 设置代理
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};