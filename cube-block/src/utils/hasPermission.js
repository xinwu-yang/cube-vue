import { USER_AUTH, SYS_BUTTON_AUTH } from '@tievd/cube-block/lib/store/mutation-types'

/**
 * jeecg 原版 v-has 没有实现禁用的效果，现在改造如下
 */
const hasPermission = {
  install(Vue, options) {
    Vue.directive('has', {
      inserted: (el, binding, vnode) => {
        if (!filterNodePermission(el, binding, vnode)) {
          // 流程节点权限未命中，进行全局权限处理
          filterGlobalPermission(el, binding, vnode)
        }
      }
    })
  }
}

/**
 * 流程节点权限控制
 */
export function filterNodePermission(el, binding, vnode) {
  let permissionList = []
  try {
    /**
     * 当组件的props中有formData时
     */
    let obj = vnode.context.$props.formData
    if (obj) {
      // 所有权限
      permissionList = obj.permissionList
    } else {
      return false
    }
  } catch (e) {
    // console.log("页面权限异常----", e);
  }

  if (permissionList === null || permissionList === '' || permissionList === undefined || permissionList.length <= 0) {
    // 用户没有任何权限
    return false
  }

  // 所有权限的 action 字段
  let permissions = permissionList.map((item) => item.action)

  if (!permissions.includes(binding.value)) {
    // 没有权限
    return false
  } else {
    for (let item2 of permissionList) {
      if (binding.value === item2.action) {
        return true
      }
    }
  }
  return false
}

/**
 * 全局权限控制
 */
export function filterGlobalPermission(el, binding, vnode) {
  let permissionList = JSON.parse(sessionStorage.getItem(USER_AUTH) || '[]') // 用户权限
  let allPermissionList = JSON.parse(sessionStorage.getItem(SYS_BUTTON_AUTH) || '[]') // 所有权限

  // 设置全局配置是否有命中
  let invalidFlag = false // 无效命中
  if (allPermissionList !== null && allPermissionList !== '' && allPermissionList !== undefined && allPermissionList.length > 0) {
    for (let itemG of allPermissionList) {
      if (binding.value === itemG.action) {
        if (itemG.status.toString() === '0') {
          // 该权限已被设置为无效
          invalidFlag = true
          break
        }
      }
    }
  }

  if (invalidFlag) {
    return
  }

  if (permissionList === null || permissionList === '' || permissionList === undefined || permissionList.length <= 0) {
    handleRemoveChildOrDisabled(el, binding.value, allPermissionList)
    return
  }

  let permissions = [] // 用户拥有的 action
  for (let item of permissionList) {
    // 按钮权限，授权标识的提示信息是多个用逗号分隔逻辑处理 开始
    if (item.action) {
      if (item.action.includes(',')) {
        let split = item.action.split(',')
        for (let i = 0; i < split.length; i++) {
          if (!split[i] || split[i].length == 0) {
            continue
          }
          permissions.push(split[i])
        }
      } else {
        permissions.push(item.action)
      }
    }
    // 按钮权限，授权标识的提示信息是多个用逗号分隔逻辑处理 结束
  }
  if (!permissions.includes(binding.value)) {
    handleRemoveChildOrDisabled(el, binding.value, allPermissionList)
  }
}

/**
 * 根据权限的type来判断，是删除当前元素或者禁用
 * el 当前元素
 * action 当前元素需要的权限
 * allPermissionList 所有权限
 */
function handleRemoveChildOrDisabled(el, action = '', allPermissionList = []) {
  for (let item of allPermissionList) {
    if (action === item.action) {
      switch (item.type.toString()) {
        case '1':
          // 是否显示
          el.parentNode.removeChild(el)
          break
        case '2':
          /**
           * 是否禁用
           * 备注：因为 pointer-events:none; 与 cursor:not-allowed; 冲突，
           *      所以采用给元素添加父元素的方式来实现禁用样式，
           *      再给元素本身设置为pointer-events:none来实现禁用鼠标事件。
           */
          let parent = document.createElement('span') //  新建父元素
          parent.style.cursor = 'not-allowed' // 给父元素添加禁用样式
          el.style.pointerEvents = 'none' // 元素本身鼠标事件禁用
          el.classList.add('cube-disabled')
          el.parentNode.replaceChild(parent, el) //  获取子元素原来的父元素并将新父元素代替子元素
          parent.appendChild(el) //  在新父元素下添加原来的子元素
          break
      }
      break
    }
  }
}

export default hasPermission
