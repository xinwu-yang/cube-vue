import JTreeDict from '../jeecg/j-tree-dict'

/* istanbul ignore next */
JTreeDict.install = function(Vue) {
  Vue.component(JTreeDict.name, JTreeDict)
}

export default JTreeDict
