import { installCell } from '../j-vxe-table/install'
import { JVXETypes } from '../j-vxe-table/cellType'
import JVxePopupCell from './src/j-vxe-popup-cell'
import { DictSearchInputCell, DictSearchSpanCell } from './src/j-vxe-select-dict-search-cell'
import JVxeFileCell from './src/j-vxe-file-cell'
import JVxeImageCell from './src/j-vxe-image-cell'
import JVxeRadioCell from './src/j-vxe-radio-cell'
import JVxeSelectCell from '../j-vxe-table/components/cells/j-vxe-select-cell'
import JVxeTextareaCell from '../j-vxe-table/components/cells/j-vxe-textarea-cell'

// 注册online组件
JVXETypes.input_pop = 'input_pop'
JVXETypes.list_multi = 'list_multi'
JVXETypes.sel_search = 'sel_search'
installCell(JVXETypes.input_pop, JVxeTextareaCell)
installCell(JVXETypes.list_multi, JVxeSelectCell)
installCell(JVXETypes.sel_search, JVxeSelectCell)

// 注册【popup】组件（普通封装方式）
JVXETypes.popup = 'popup'
installCell(JVXETypes.popup, JVxePopupCell)

// 注册【字典搜索下拉】组件（高级封装方式）
JVXETypes.selectDictSearch = 'select-dict-search'
installCell(JVXETypes.selectDictSearch, DictSearchInputCell, DictSearchSpanCell)

// 注册【文件上传】组件
JVXETypes.file = 'file'
installCell(JVXETypes.file, JVxeFileCell)

// 注册【图片上传】组件
JVXETypes.image = 'image'
installCell(JVXETypes.image, JVxeImageCell)

// 注册【单选框】组件
JVXETypes.radio = 'radio'
installCell(JVXETypes.radio, JVxeRadioCell)
