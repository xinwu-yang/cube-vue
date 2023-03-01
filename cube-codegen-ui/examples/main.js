import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import App from './App.vue'
import { GenerateCode, ColumnFilter } from 'main/index'

Vue.use(Antd)
Vue.use(GenerateCode)
Vue.use(ColumnFilter)

new Vue({
  // eslint-disable-line
  render: (h) => h(App)
}).$mount('#app')
