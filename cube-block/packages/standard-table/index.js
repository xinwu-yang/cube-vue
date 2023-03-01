import StandardTable from '../table/src/standard-table'

/* istanbul ignore next */
StandardTable.install = function(Vue) {
  Vue.component(StandardTable.name, StandardTable)
}

export default StandardTable
