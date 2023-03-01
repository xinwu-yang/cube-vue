import CountDown from './src/main'

/* istanbul ignore next */
CountDown.install = function(Vue) {
  Vue.component(CountDown.name, CountDown)
}

export default CountDown
