import JDictSelectTag from './src/main';

/* istanbul ignore next */
JDictSelectTag.install = function(Vue) {
  Vue.component(JDictSelectTag.name, JDictSelectTag);
};

export default JDictSelectTag;
