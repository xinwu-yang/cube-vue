import JsCodeEditorDyn from '../jeecg/dynamic/js-code-editor-dyn';

/* istanbul ignore next */
JsCodeEditorDyn.install = function (Vue) {
  Vue.component(JsCodeEditorDyn.name, JsCodeEditorDyn);
}

export default JsCodeEditorDyn;
