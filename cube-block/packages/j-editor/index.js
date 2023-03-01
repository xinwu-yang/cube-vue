import JEditor from '../jeecg/j-editor'

/* istanbul ignore next */
JEditor.install = function(Vue) {
  Vue.component(JEditor.name, JEditor)
}

export default JEditor
