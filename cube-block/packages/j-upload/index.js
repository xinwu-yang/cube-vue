import JUpload from '../jeecg/j-upload'

/* istanbul ignore next */
JUpload.install = function(Vue) {
  Vue.component(JUpload.name, JUpload)
}

export default JUpload
