import JInput from '../jeecg/j-input'

/* istanbul ignore next */
JInput.install = function(Vue) {
  Vue.component(JInput.name, JInput)
}

export default JInput
