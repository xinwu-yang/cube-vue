import Vue from 'vue'
import { SIDEBAR_TYPE } from '../mutation-types'

const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
    firstOpen: true
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar.opened = type
      Vue.ls.set(SIDEBAR_TYPE, type)
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Vue.ls.set(SIDEBAR_TYPE, true)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    Set_FirstOpen(state, firstOpen) {
      state.firstOpen = firstOpen
    }
  },
  actions: {
    setSidebar: ({ commit }, type) => {
      commit('SET_SIDEBAR_TYPE', type)
    }
  }
}

export default app
