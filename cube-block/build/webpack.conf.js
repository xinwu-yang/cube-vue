const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('./config')

module.exports = {
  mode: 'production',
  entry: {
    index: ['./src/index.js'],
    jVxeTableInstall: './packages/j-vxe-table/install.js',
    jVxeCellsInstall: './packages/j-vxe-cells/install.js'
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    // publicPath: '/dist/',
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'CUBE',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  externals: {
    vue: config.vue
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(scss|css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              // globalVars: {
              //   'primary-color': '#1890ff',
              //   'popover-background': 'transparent'
              // }
              modifyVars: {
                hack: `true; @import (reference) "${path.resolve('node_modules/ant-design-vue/lib/style/themes/default.less')}";`
              }
            }
          }
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [new CopyWebpackPlugin([{ from: 'packages/style', to: 'style' }]), new ProgressBarPlugin(), new VueLoaderPlugin()]
}
