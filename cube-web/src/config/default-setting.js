/**
 * 项目默认配置项
 * layoutMode - 整体布局方式: 侧边菜单 side-menu | 顶部菜单 top-menu | 手机模式 mobile
 * fixedHeader - 固定 Header: boolean
 * fixSideBar - 固定左侧菜单栏: boolean
 * autoHideHeader - 向下滚动时，隐藏 Header : boolean
 * contentWidth - 内容区布局: 流式 fluid |  固定 fixed
 * colorWeak - 色盲模式: boolean
 * multiPage - 多页签模式: boolean
 * enableEncrypt - 密码加密传输: boolean
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */
const defaultSetting = {
  layoutMode: 'side-menu',
  contentWidth: 'fixed',
  fixedHeader: false,
  fixSidebar: false,
  autoHideHeader: false,
  colorWeak: false,
  multiPage: true,
  enableEncrypt: true,
  storageOptions: {
    namespace: 'pro__',
    name: 'ls',
    storage: 'local'
  }
}
export default defaultSetting
