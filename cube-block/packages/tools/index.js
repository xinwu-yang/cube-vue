import Tools from './src/main'
import Breadcrumb from './src/breadcrumb'
import FooterToolBar from './src/footer-tool-bar'
import HeadInfo from './src/head-info'
import TwoStepCaptcha from './src/two-step-captcha'

/* istanbul ignore next */
Tools.install = function(Vue) {
  Vue.component(Tools.name, Tools)
  Vue.component(Breadcrumb.name, Breadcrumb)
  Vue.component(FooterToolBar.name, FooterToolBar)
  Vue.component(HeadInfo.name, HeadInfo)
  Vue.component(TwoStepCaptcha.name, TwoStepCaptcha)
}

export { Breadcrumb, FooterToolBar, HeadInfo, TwoStepCaptcha }

export default Tools
