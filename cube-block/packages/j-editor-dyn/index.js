import JEditorDyn from '../jeecg/dynamic/j-editor-dyn'

/* istanbul ignore next */
JEditorDyn.install = function(Vue) {
  Vue.component(JEditorDyn.name, JEditorDyn)
}

export default JEditorDyn
