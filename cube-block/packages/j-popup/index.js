import JPopup from '../jeecg/j-popup'

/* istanbul ignore next */
JPopup.install = function(Vue) {
  Vue.component(JPopup.name, JPopup)
}

export default JPopup
