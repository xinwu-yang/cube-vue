/**
 * 皮肤和布局相关设置
 */
import store from '@/store'

export default {
  computed: {
    layoutMode: () => store.state.setting.layoutMode,
    colorWeak: () => store.state.setting.colorWeak,
    multiPage: () => {
      // 判断如果是手机模式，自动切换为单页面模式
      if (store.state.app.device === 'mobile') {
        return false
      } else {
        return store.state.setting.multiPage
      }
    },
    fixedHeader: () => store.state.setting.fixedHeader,
    fixSidebar: () => store.state.setting.fixSidebar,
    contentWidth: () => store.state.setting.contentWidth,
    autoHideHeader: () => store.state.setting.autoHideHeader
  }
}
