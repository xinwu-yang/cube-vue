import JCodeEditor from '../jeecg/j-code-editor'

/* istanbul ignore next */
JCodeEditor.install = function(Vue) {
  Vue.component(JCodeEditor.name, JCodeEditor)
}

export default JCodeEditor
