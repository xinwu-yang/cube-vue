import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

/**
 * 解决Redirected from “xxx“ to “xxx“ via a navigation guard
 */
const originalPush = Router.prototype.push
Router.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

function createRouter() {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })
}

const router = createRouter()

/**
 * 退出登录时主动调用
 * 清空路由，解决再次登录时出现路由命名重复的warning
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
