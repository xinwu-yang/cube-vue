import JSlider from '../jeecg/j-slider'

/* istanbul ignore next */
JSlider.install = function(Vue) {
  Vue.component(JSlider.name, JSlider)
}

export default JSlider
