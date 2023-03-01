import Jeecgbiz from './src/main'
import JSelectBizComponent from './j-select-biz-component'
import JSelectDepart from './j-select-depart'
import JSelectMultiUser from './j-select-multi-user'
import JSelectPosition from './j-select-position'
import JSelectRole from './j-select-role'
import JSelectUserByDep from './j-select-user-by-dep'

/* istanbul ignore next */
Jeecgbiz.install = function(Vue) {
  Vue.component(Jeecgbiz.name, Jeecgbiz)
  Vue.component(JSelectBizComponent.name, JSelectBizComponent)
  Vue.component(JSelectDepart.name, JSelectDepart)
  Vue.component(JSelectMultiUser.name, JSelectMultiUser)
  Vue.component(JSelectPosition.name, JSelectPosition)
  Vue.component(JSelectRole.name, JSelectRole)
  Vue.component(JSelectUserByDep.name, JSelectUserByDep)
}

export { JSelectBizComponent, JSelectDepart, JSelectMultiUser, JSelectPosition, JSelectRole, JSelectUserByDep }

export default Jeecgbiz
