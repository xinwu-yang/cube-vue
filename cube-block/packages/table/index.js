import STable from './src/index'
import StandardTable from './src/standard-table'

/* istanbul ignore next */
STable.install = function(Vue) {
  Vue.component(Table.name, Table)
  Vue.component(StandardTable.name, StandardTable)
}

export { StandardTable }

export default STable
