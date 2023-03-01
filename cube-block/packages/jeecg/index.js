import Jeecg from './src/main'
import JAreaLinkage from './j-area-linkage.vue'
import JCategorySelect from './j-category-select.vue'
import JCheckbox from './j-checkbox.vue'
import JCodeEditor from './j-code-editor.vue'
import JCodeEditor2 from './j-code-editor2.vue'
import JCron from './j-cron.vue'
import JDate from './j-date.vue'
import JEditableTable from './j-editable-table.vue'
import JEditor from './j-editor.vue'
import JEllipsis from './j-ellipsis.vue'
import JFormContainer from './j-form-container.vue'
import JImageUpload from './j-image-upload.vue'
import JImportModal from './j-import-modal.vue'
import JInput from './j-input.vue'
import JMarkdownEditor from './j-markdown-editor'
import JModal from './j-modal'
import JPopup from './j-popup.vue'
import JSelectMultiple from './j-select-multiple.vue'
import JSlider from './j-slider.vue'
import JSuperQuery from './j-super-query.vue'
import JSwitch from './j-switch.vue'
import JTime from './j-time.vue'
import JTreeDict from './j-tree-dict.vue'
import JTreeSelect from './j-tree-select.vue'
import JTreeTable from './j-tree-table.vue'
import JUpload from './j-upload.vue'
import JPopupOnlReport from './modal/j-popup-onl-report.vue'
import JFilePop from './minipop/j-file-pop.vue'
import JInputPop from './minipop/j-input-pop.vue'

/* istanbul ignore next */
Jeecg.install = function(Vue) {
  Vue.component(Jeecg.name, Jeecg)
  Vue.component(JAreaLinkage.name, JAreaLinkage)
  Vue.component(JCategorySelect.name, JCategorySelect)
  Vue.component(JCheckbox.name, JCheckbox)
  Vue.component(JCodeEditor.name, JCodeEditor)
  Vue.component(JCodeEditor2.name, JCodeEditor2)
  Vue.component(JCron.name, JCron)
  Vue.component(JDate.name, JDate)
  Vue.component(JEditableTable.name, JEditableTable)
  Vue.component(JEditor.name, JEditor)
  Vue.component(JEllipsis.name, JEllipsis)
  Vue.component(JFormContainer.name, JFormContainer)
  Vue.component(JImageUpload.name, JImageUpload)
  Vue.component(JImportModal.name, JImportModal)
  Vue.component(JInput.name, JInput)
  Vue.component(JMarkdownEditor.name, JMarkdownEditor)
  Vue.component(JModal.name, JModal)
  Vue.component(JPopup.name, JPopup)
  Vue.component(JSelectMultiple.name, JSelectMultiple)
  Vue.component(JSlider.name, JSlider)
  Vue.component(JSuperQuery.name, JSuperQuery)
  Vue.component(JSwitch.name, JSwitch)
  Vue.component(JTime.name, JTime)
  Vue.component(JTreeDict.name, JTreeDict)
  Vue.component(JTreeSelect.name, JTreeSelect)
  Vue.component(JTreeTable.name, JTreeTable)
  Vue.component(JUpload.name, JUpload)
  Vue.component(JPopupOnlReport.name, JPopupOnlReport)
  Vue.component(JFilePop.name, JFilePop)
  Vue.component(JInputPop.name, JInputPop)
}

export {
  JAreaLinkage,
  JCategorySelect,
  JCheckbox,
  JCodeEditor,
  JCodeEditor2,
  JCron,
  JDate,
  JEditableTable,
  JEditor,
  JEllipsis,
  JFormContainer,
  JImageUpload,
  JImportModal,
  JInput,
  JMarkdownEditor,
  JModal,
  JPopup,
  JSelectMultiple,
  JSlider,
  JSuperQuery,
  JSwitch,
  JTime,
  JTreeDict,
  JTreeSelect,
  JTreeTable,
  JUpload,
  JPopupOnlReport,
  JFilePop,
  JInputPop
}

export default Jeecg
