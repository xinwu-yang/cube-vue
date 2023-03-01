import Breadcrumb from '../tools/src/breadcrumb'

/* istanbul ignore next */
Breadcrumb.install = function(Vue) {
  Vue.component(Breadcrumb.name, Breadcrumb)
}

export default Breadcrumb
