/**
 * init domain config
 * 生产环境文件，在public中单独配置，方便打包后的修改
 */
window._CONFIG = window._CONFIG ? window._CONFIG : {}
window._CONFIG['isUseCubeBlock'] = true // 是否使用了cube-block，代码生成组件需要根据此设置来生成不同的代码

if (process.env.NODE_ENV === 'development') {
  // 预览
  window._CONFIG['onlinePreviewDomainURL'] = 'http://fileview.jeecg.com/onlinePreview'
  // 静态资源地址
  window._CONFIG['staticDomainURL'] = 'http://25.30.15.85:8080/cube'
  /**
   * 开发环境下可能需要频繁的更换后端服务地址，如果配置在.env.development中，
   * 每次修改后都需要重新执行yarn serve，降低开发效率，
   * 因此，将开发环境服务地址的配置改在此处。
   */
  window._CONFIG['domianURL'] = 'http://127.0.0.1:8080/cube'
  // window._CONFIG['domianURL'] = 'http://25.30.15.85:8090/cube'
}
