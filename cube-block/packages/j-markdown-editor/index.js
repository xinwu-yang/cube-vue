import JMarkdownEditor from '../jeecg/j-markdown-editor'

/* istanbul ignore next */
JMarkdownEditor.install = function(Vue) {
  Vue.component(JMarkdownEditor.name, JMarkdownEditor)
}

export default JMarkdownEditor
