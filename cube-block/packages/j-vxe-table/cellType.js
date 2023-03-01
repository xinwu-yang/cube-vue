import JVxeSlotCell from './components/cells/j-vxe-slot-cell'
import JVxeNormalCell from './components/cells/j-vxe-normal-cell'
import JVxeInputCell from './components/cells/j-vxe-input-cell'
import JVxeDateCell from './components/cells/j-vxe-date-cell'
import JVxeSelectCell from './components/cells/j-vxe-select-cell'
import JVxeCheckboxCell from './components/cells/j-vxe-checkbox-cell'
import JVxeUploadCell from './components/cells/j-vxe-upload-cell'
import { JVxeTagsInputCell, JVxeTagsSpanCell } from './components/cells/j-vxe-tags-cell'
import JVxeProgressCell from './components/cells/j-vxe-progress-cell'
import JVxeTextareaCell from './components/cells/j-vxe-textarea-cell'
import JVxeDragSortCell from './components/cells/j-vxe-drag-sort-cell'

// 组件类型
export const JVXETypes = {
  // 为了防止和 vxe 内置的类型冲突，所以加上一个前缀
  // 前缀是自动加的，代码中直接用就行（JVXETypes.input）
  _prefix: 'j-',

  // 行号列
  rowNumber: 'row-number',
  // 选择列
  rowCheckbox: 'row-checkbox',
  // 单选列
  rowRadio: 'row-radio',
  // 展开列
  rowExpand: 'row-expand',
  // 上下排序
  rowDragSort: 'row-drag-sort',

  input: 'input',
  inputNumber: 'inputNumber',
  textarea: 'textarea',
  select: 'select',
  date: 'date',
  datetime: 'datetime',
  checkbox: 'checkbox',
  upload: 'upload',
  // 下拉搜索
  selectSearch: 'select-search',
  // 下拉多选
  selectMultiple: 'select-multiple',
  // 进度条
  progress: 'progress',

  // 拖轮Tags（暂无用）
  tags: 'tags',

  slot: 'slot',
  normal: 'normal',
  hidden: 'hidden'
}

// 注册自定义组件
export const AllCells = {
  ...mapCell(JVXETypes.normal, JVxeNormalCell),
  ...mapCell(JVXETypes.input, JVxeInputCell),
  ...mapCell(JVXETypes.inputNumber, JVxeInputCell),
  ...mapCell(JVXETypes.checkbox, JVxeCheckboxCell),
  ...mapCell(JVXETypes.select, JVxeSelectCell),
  ...mapCell(JVXETypes.selectSearch, JVxeSelectCell), // 下拉搜索
  ...mapCell(JVXETypes.selectMultiple, JVxeSelectCell), // 下拉多选
  ...mapCell(JVXETypes.date, JVxeDateCell),
  ...mapCell(JVXETypes.datetime, JVxeDateCell),
  ...mapCell(JVXETypes.upload, JVxeUploadCell),
  ...mapCell(JVXETypes.textarea, JVxeTextareaCell),
  ...mapCell(JVXETypes.tags, JVxeTagsInputCell, JVxeTagsSpanCell),
  ...mapCell(JVXETypes.progress, JVxeProgressCell),
  ...mapCell(JVXETypes.rowDragSort, JVxeDragSortCell),
  ...mapCell(JVXETypes.slot, JVxeSlotCell)
  /* hidden 是特殊的组件，不在这里注册 */
}

/**
 * 注册map
 * @param type 类型
 * @param cell 输入组件
 * @param span 显示组件，可空，默认为 JVxeNormalCell 组件
 */
function mapCell(type, cell, span) {
  let cells = { [type]: cell }
  if (span) {
    cells[type + ':span'] = span
  }
  return cells
}
