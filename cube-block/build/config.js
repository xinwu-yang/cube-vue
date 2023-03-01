var path = require('path')
var fs = require('fs')
var nodeExternals = require('webpack-node-externals')
var Components = require('../components.json')

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'))
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'))
var apiList = fs.readdirSync(path.resolve(__dirname, '../src/api'))
var storeList = fs.readdirSync(path.resolve(__dirname, '../src/store'))
var externals = {}

Object.keys(Components).forEach(function(key) {
  externals[`cube-block/packages/${key}`] = `@tievd/cube-block/lib/${key}`
})

utilsList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`@tievd/cube-block/src/utils/${file}`] = `@tievd/cube-block/lib/utils/${file}`
})
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`@tievd/cube-block/src/mixins/${file}`] = `@tievd/cube-block/lib/mixins/${file}`
})
apiList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`@tievd/cube-block/src/api/${file}`] = `@tievd/cube-block/lib/api/${file}`
})
storeList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`@tievd/cube-block/src/store/${file}`] = `@tievd/cube-block/lib/store/${file}`
})

externals = [
  Object.assign(
    {
      vue: 'vue',
      antd: 'ant-design-vue'
    },
    externals
  ),
  nodeExternals()
]

exports.externals = externals

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  '@tievd/cube-block': path.resolve(__dirname, '../'),
  '@tievd/cube-block/lib': path.resolve(__dirname, '../src')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

// exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/
exports.jsexclude = /node_modules|utils|api|store|router|config|cas|directives/
