import Vue from 'vue'
import Vuex from 'vuex'

import app from '@tievd/cube-block/lib/store/modules/app'
import user from '@tievd/cube-block/lib/store/modules/user'
import enhance from '@tievd/cube-block/lib/store/modules/enhance'
import online from '@tievd/cube-block/lib/store/modules/online'
import getters from '@tievd/cube-block/lib/store/getters'
import permission from './modules/permission'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    enhance,
    online,
    setting
  },

  state: {},

  mutations: {},

  actions: {},

  getters
})
