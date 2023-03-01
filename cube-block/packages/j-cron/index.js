import JCron from '../jeecg/j-cron'

/* istanbul ignore next */
JCron.install = function(Vue) {
  Vue.component(JCron.name, JCron)
}

export default JCron
