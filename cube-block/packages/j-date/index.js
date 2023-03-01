import JDate from '../jeecg/j-date'

/* istanbul ignore next */
JDate.install = function(Vue) {
  Vue.component(JDate.name, JDate)
}

export default JDate
