import JVxeTable from './components/j-vxe-table'
import { JVXETypes } from './cellType'

/* istanbul ignore next */
// JVxeTable.install = function(Vue) {
//   Vue.component(JVxeTable.name, JVxeTable)
// }

// 解决 index与install 循环引入造成的undefined问题
// export function getJVxeTableByLoop() {
//   return JVxeTable
// }

export { JVXETypes }

export default JVxeTable
