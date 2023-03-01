import Vue from 'vue'
import Storage from 'vue-ls'
require('@jeecg/antd-online-mini')
require('@jeecg/antd-online-mini/dist/OnlineForm.css')
import Antd, { version } from 'ant-design-vue'
import Viser from 'viser-vue'
import 'ant-design-vue/dist/antd.less'
import Print from 'vue-print-nb-jeecg'
// import '@babel/polyfill'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import './config' // 初始化配置
import './permission' // 路由权限控制
import '@/assets/less/global.less' // 全局样式
import App from './App.vue'
import router from './router'
import store from './store'
import defaultSetting from '@/config/default-setting' // 布局配置

import '@tievd/cube-block/lib/style/cube.less'
import '@tievd/cube-block/lib/jVxeTableInstall'
import '@tievd/cube-block/lib/jVxeCellsInstall'
import '@tievd/cube-block/lib/utils/filter' // base filter
import SSO from '@tievd/cube-block/lib/cas/sso.js'
import hasPermission from '@tievd/cube-block/lib/utils/hasPermission'
import vueBus from '@tievd/cube-block/lib/utils/vueBus'
import { VueAxios } from '@tievd/cube-block/lib/utils/request'
import { ACCESS_TOKEN, SIDEBAR_TYPE } from '@tievd/cube-block/lib/store/mutation-types'
import CubeBlock, { CubeIcon } from '@tievd/cube-block'
import { ColumnFilter } from '@tievd/cube-generate-code'

console.log('ant-design-vue version:', version)
Vue.config.productionTip = false

/**
 * cube-block中有些组件用到了store，所以新增此hack方法
 */
Vue.hackStore = store
Vue.use(CubeBlock)
Vue.use(ColumnFilter)

Vue.use(Storage, defaultSetting.storageOptions)
// 同时使用sessionStorage
// Vue.use(Object.assign({}, Storage), defaultSetting.sessionStorageOptions)
Vue.use(Antd)
Vue.use(VueAxios, router)
Vue.use(Viser)
Vue.use(hasPermission)
Vue.use(Print)
Vue.use(preview)
Vue.use(vueBus)

/**
 * 自定义图标
 * 第二个参数是iconfont.cn中生成的symbolUrl。将js下载下来部署在内网中，也可以在内网中使用
 */
Vue.use(CubeIcon, '//at.alicdn.com/t/font_2549734_1q33otr4x04.js')

SSO.init(() => {
  main()
})

function main() {
  new Vue({
    router,
    store,
    mounted() {
      store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
      store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
      store.commit('Set_FirstOpen', true)
    },
    render: h => h(App)
  }).$mount('#app')
}
