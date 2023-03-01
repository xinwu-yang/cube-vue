// import Vue from 'vue'
import { mapState } from 'vuex'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      sidebarOpened: (state) => state.app.sidebar.opened,
      firstOpen: (state) => state.app.firstOpen
    })
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: (state) => state.app.device
    })
  },
  methods: {
    isMobile() {
      return this.device === 'mobile'
    },
    isDesktop() {
      return this.device === 'desktop'
    }
  }
}

export { mixin, mixinDevice }
