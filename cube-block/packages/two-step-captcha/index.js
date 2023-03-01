import TwoStepCaptcha from '../tools/src/two-step-captcha'

/* istanbul ignore next */
TwoStepCaptcha.install = function(Vue) {
  Vue.component(TwoStepCaptcha.name, TwoStepCaptcha)
}

export default TwoStepCaptcha
