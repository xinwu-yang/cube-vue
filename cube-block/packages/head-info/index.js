import HeadInfo from '../tools/src/head-info'

/* istanbul ignore next */
HeadInfo.install = function(Vue) {
  Vue.component(HeadInfo.name, HeadInfo)
}

export default HeadInfo
