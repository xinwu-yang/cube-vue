const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = require('./config')

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    // publicPath: '/dist/',
    publicPath: '/',
    filename: 'cube-block.common.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'CUBE',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: true
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
      // {
      //   test: /\.css$/,
      //   loaders: ['style-loader', 'css-loader']
      // },
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
  plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()]
}
