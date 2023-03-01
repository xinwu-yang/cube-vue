import JModal from '../jeecg/j-modal'

/* istanbul ignore next */
JModal.install = function(Vue) {
  Vue.component(JModal.name, JModal)
}

export default JModal
