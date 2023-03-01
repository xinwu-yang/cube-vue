import VerifyCode from './src/main'

/* istanbul ignore next */
VerifyCode.install = function(Vue) {
  Vue.component(VerifyCode.name, VerifyCode)
}

export default VerifyCode
