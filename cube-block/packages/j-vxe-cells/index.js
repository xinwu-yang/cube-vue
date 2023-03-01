import JVxeCells from './src/main'
import JVxeFileCell from './src/j-vxe-file-cell'
import JVxeImageCell from './src/j-vxe-image-cell'
import JVxePopupCell from './src/j-vxe-popup-cell'
import JVxeRadioCell from './src/j-vxe-radio-cell'
import { DictSearchSpanCell as JVxeSelectSearchSpanCell, DictSearchInputCell as JVxeSelectSearchInputCell } from './src/j-vxe-select-dict-search-cell'

/* istanbul ignore next */
JVxeCells.install = function(Vue) {
  Vue.component(JVxeCells.name, JVxeCells)
  Vue.component(JVxeFileCell.name, JVxeFileCell)
  Vue.component(JVxeImageCell.name, JVxeImageCell)
  Vue.component(JVxePopupCell.name, JVxePopupCell)
  Vue.component(JVxeRadioCell.name, JVxeRadioCell)
  Vue.component(JVxeSelectSearchSpanCell.name, JVxeSelectSearchSpanCell)
  Vue.component(JVxeSelectSearchInputCell.name, JVxeSelectSearchInputCell)
}

export default JVxeCells
