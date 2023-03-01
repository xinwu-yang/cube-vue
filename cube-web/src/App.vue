<template>
  <a-config-provider :locale="locale" :autoInsertSpaceInButton="false">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enquireScreen from '@tievd/cube-block/lib/utils/device'

export default {
  data() {
    return {
      locale: zhCN
    }
  },
  created() {
    let that = this
    enquireScreen(deviceType => {
      switch (deviceType) {
        case 'MOBILE':
          // 手机 screen and (max-width: 767.99px)
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
          break
        case 'TABLET':
          // 平板 screen and (max-width: 1087.99px)
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
          break
        case 'DESKTOP':
          // 桌面
          that.$store.commit('TOGGLE_DEVICE', 'desktop')
          that.$store.dispatch('setSidebar', true)
          break
      }
    })
  }
}
</script>
<style>
#app {
  height: 100%;
}
</style>
