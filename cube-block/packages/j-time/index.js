import JTime from '../jeecg/j-time'

/* istanbul ignore next */
JTime.install = function(Vue) {
  Vue.component(JTime.name, JTime)
}

export default JTime
