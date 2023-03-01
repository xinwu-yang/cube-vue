import ColumnFilter from './src/main';

/* istanbul ignore next */
ColumnFilter.install = function(Vue) {
  Vue.component(ColumnFilter.name, ColumnFilter);
};

export default ColumnFilter;
