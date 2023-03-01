import GenerateCode from './src/main.vue'

/* istanbul ignore next */
GenerateCode.install = function(Vue) {
  Vue.component(GenerateCode.name, GenerateCode)
}

export default GenerateCode
