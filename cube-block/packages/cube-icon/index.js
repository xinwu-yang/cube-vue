import Icon from 'ant-design-vue/es/icon'

export default {
  name: 'CubeIcon',
  install(Vue, scriptUrl = '') {
    const CubeIcon = Icon.createFromIconfontCN({
      scriptUrl
    })
    window._CONFIG['symbolUrl'] = scriptUrl
    Vue.component('CubeIcon', CubeIcon)
  }
}
