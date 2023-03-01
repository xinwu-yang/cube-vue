import JCronModal from '../jeecg/modal/j-cron-modal'

/* istanbul ignore next */
JCronModal.install = function(Vue) {
  Vue.component(JCronModal.name, JCronModal)
}

export default JCronModal
