var path = require('path')
var fs = require('fs')
var nodeExternals = require('webpack-node-externals')
var Components = require('../components.json')

// var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'))
// var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'))
var externals = {}

Object.keys(Components).forEach(function(key) {
  externals[`cube-generate-code/packages/${key}`] = `cube-generate-code/lib/${key}`
})

// utilsList.forEach(function(file) {
//   file = path.basename(file, '.js')
//   externals[`cube-generate-code/src/utils/${file}`] = `cube-generate-code/lib/utils/${file}`
// })
// mixinsList.forEach(function(file) {
//   file = path.basename(file, '.js')
//   externals[`cube-generate-code/src/mixins/${file}`] = `cube-generate-code/lib/mixins/${file}`
// })

externals = [
  Object.assign(
    {
      vue: 'vue'
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
  'cube-generate-code': path.resolve(__dirname, '../')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

// exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/
exports.jsexclude = /node_modules|utils|api|store|router|config|cas|directives/
