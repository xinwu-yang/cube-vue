import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import Storage from 'vue-ls'
import CubeBlock, { CubeIcon } from 'main/index'
import App from './App.vue'
// import 'cube-block/packages/j-vxe-table/install'
import 'packages/style/cube.less'

Vue.use(CubeBlock)
Vue.use(CubeIcon, '//localhost:8085/examples/iconfont.js')
Vue.use(Storage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
})
Vue.use(Antd)

new Vue({
  // eslint-disable-line
  render: (h) => h(App)
}).$mount('#app')
