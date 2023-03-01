const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const GenerateFilePlugin = require('generate-file-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue-cli3
module.exports = {
  productionSourceMap: false, // 如果不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  // 多入口配置
  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //   }
  // },
  // 打包app时放开该配置
  // publicPath:'./',
  configureWebpack: config => {
    // 生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('@mobile', resolve('src/modules/mobile'))

    // 生产环境，开启js\css压缩
    if (process.env.NODE_ENV !== 'development') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        })
      )
    }

    if (process.env.NODE_ENV !== 'development') {
      // 生成config-online.js
      config.plugin('generateFilePlugin').use(
        new GenerateFilePlugin({
          file: 'config-online.js',
          content: `window._CONFIG = window._CONFIG ? window._CONFIG : {}
window._CONFIG['onlinePreviewDomainURL'] = '${process.env.PREVIEW_BASE_URL}'
window._CONFIG['staticDomainURL'] = '${process.env.STATIC_BASE_URL}'
window._CONFIG['domianURL'] = '${process.env.API_BASE_URL}'
`
        })
      )

      config.plugin('html').tap(args => {
        // 生产环境引入config-online.js
        args[0].configOnline = '/config-online.js'
        return args
      })
    }

    // 配置 webpack 识别 markdown 为普通的文件
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use()
      .loader('file-loader')
      .end()

    // 编译vxe-table包里的es6代码，解决IE11兼容问题
    config.module
      .rule('vxe')
      .test(/\.js$/)
      .include.add(resolve('node_modules/vxe-table'))
      .add(resolve('node_modules/vxe-table-plugin-antd'))
      .end()
      .use()
      .loader('babel-loader')
      .end()
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less 变量覆盖，用于自定义皮肤
          hack: `true; @import (reference) "~@tievd/cube-skin/lib/${
            process.argv[3] === '--theme' ? process.argv[4] : 'light'
          }.less";`
          // hack: `true; @import (reference) "${path.resolve(`src/assets/skin/my-skin.less`)}";`
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 3000,
    open: true
    // proxy: {
    //   '/cube': {
    //     target: 'http://localhost:8080', // 请求本地 cube后台项目
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/cube': '' // 默认所有请求都加了cube前缀，需要去掉
    //     }
    //   }
    // }
  },

  lintOnSave: undefined
}
