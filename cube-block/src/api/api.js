import { getAction, deleteAction, putAction, postAction, httpAction } from './manage'
import Vue from 'vue'
import { UI_CACHE_DB_DICT_DATA } from '../store/mutation-types'

//角色管理
const addRole = (params) => postAction('/sys/role/add', params)
const editRole = (params) => putAction('/sys/role/edit', params)
const checkRoleCode = (params) => getAction('/sys/role/checkRoleCode', params)
const queryall = (params) => getAction('/sys/role/queryAll', params)

//用户管理
const addUser = (params) => postAction('/sys/user/add', params)
const editUser = (params) => putAction('/sys/user/edit', params)
const queryUserRole = (params) => getAction('/sys/user/queryUserRole', params)
const getUserList = (params) => getAction('/sys/user/list', params)
const frozenBatch = (params) => putAction('/sys/user/frozenBatch', params)
//验证用户是否存在
const checkOnlyUser = (params) => getAction('/sys/user/checkOnlyUser', params)
//改变密码
const changePassword = (params) => putAction('/sys/user/changePassword', params)
//权限管理
const addPermission = (params) => postAction('/sys/permission/add', params)
const editPermission = (params) => putAction('/sys/permission/edit', params)
const getPermissionList = (params) => getAction('/sys/permission/list', params)
const getSystemMenuList = (params) => getAction('/sys/permission/getSystemMenuList', params)
const getSystemSubmenu = (params) => getAction('/sys/permission/getSystemSubmenu', params)
const getSystemSubmenuBatch = (params) => getAction('/sys/permission/getSystemSubmenuBatch', params)

const queryTreeList = (params) => getAction('/sys/permission/queryTreeList', params)
const queryTreeListForRole = (params) => getAction('/sys/role/queryTreeList', params)
const queryListAsync = (params) => getAction('/sys/permission/queryListAsync', params)
const queryRolePermission = (params) => getAction('/sys/permission/queryRolePermission', params)
const saveRolePermission = (params) => postAction('/sys/permission/saveRolePermission', params)
const queryPermissionsByUser = () => getAction('/sys/permission/getUserPermissionByToken')
const loadAllRoleIds = (params) => getAction('/sys/permission/loadAllRoleIds', params)
const getPermissionRuleList = (params) => getAction('/sys/permission/getPermRuleListByPermId', params)
const queryPermissionRule = (params) => getAction('/sys/permission/queryPermissionRule', params)

// 部门管理
const queryDepartTreeList = (params) => getAction('/sys/depart/queryTreeList', params)
const queryIdTree = (params) => getAction('/sys/depart/queryIdTree', params)
const queryParentName = (params) => getAction('/sys/depart/queryParentName', params)
const searchByKeywords = (params) => getAction('/sys/depart/searchBy', params)
const deleteByDepartId = (params) => deleteAction('/sys/depart/delete', params)

//二级部门管理
const queryDepartPermission = (params) => getAction('/sys/permission/queryDepartPermission', params)
const saveDepartPermission = (params) => postAction('/sys/permission/saveDepartPermission', params)
const queryTreeListForDeptRole = (params) => getAction('/sys/depart/permission/queryTreeListForDeptRole', params)
const queryDeptRolePermission = (params) => getAction('/sys/depart/permission/queryDeptRolePermission', params)
const saveDeptRolePermission = (params) => postAction('/sys/depart/permission/saveDeptRolePermission', params)
const queryMyDepartTreeList = (params) => getAction('/sys/depart/queryMyDeptTreeList', params)

//日志管理
const deleteLog = (params) => deleteAction('/sys/log/delete', params)
const deleteLogList = (params) => deleteAction('/sys/log/deleteBatch', params)

//数据字典
const addDict = (params) => postAction('/sys/dict/add', params)
const editDict = (params) => putAction('/sys/dict/edit', params)
const treeList = (params) => getAction('/sys/dict/treeList', params)
const addDictItem = (params) => postAction('/sys/dict/item/add', params)
const editDictItem = (params) => putAction('/sys/dict/item/edit', params)

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params) => getAction(`/sys/dict/getDictItems/${code}`, params)
//从缓存中获取字典配置
function getDictItemsFromCache(dictCode) {
  if (Vue.ls.get(UI_CACHE_DB_DICT_DATA) && Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode]) {
    let dictItems = Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode]
    console.log('-----------getDictItemsFromCache----------dictCode=' + dictCode + '---- dictItems=', dictItems)
    return dictItems
  }
}

//系统通告
const doReleaseData = (params) => getAction('/sys/announcement/doReleaseData', params)
const doRevokeData = (params) => getAction('/sys/announcement/doRevokeData', params)
//获取系统访问量
const getLoginfo = (params) => getAction('/sys/logInfo', params)
const getVisitInfo = (params) => getAction('/sys/visitInfo', params)
// 根据部门主键查询用户信息
const queryUserByDepId = (params) => getAction('/sys/user/queryUserByDepId', params)
// 重复校验
const duplicateCheck = (params) => getAction('/sys/duplicate/check', params)
// 加载分类字典
const loadCategoryData = (params) => getAction('/sys/category/loadAllData', params)
const checkRuleByCode = (params) => getAction('/sys/rule/checkByCode', params)
//加载我的通告信息
const getUserNoticeInfo = (params) => getAction('/sys/announcement/send/getMyAnnouncementSend', params)
const getTransitURL = (url) => `/sys/common/transitRESTful?url=${encodeURIComponent(url)}`
// 中转HTTP请求
export const transitRESTful = {
  get: (url, parameter) => getAction(getTransitURL(url), parameter),
  post: (url, parameter) => postAction(getTransitURL(url), parameter),
  put: (url, parameter) => putAction(getTransitURL(url), parameter),
  http: (url, parameter) => httpAction(getTransitURL(url), parameter)
}

export {
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  queryall,
  frozenBatch,
  checkOnlyUser,
  changePassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doRevokeData,
  getLoginfo,
  getVisitInfo,
  queryUserByDepId,
  duplicateCheck,
  queryTreeListForRole,
  getSystemMenuList,
  getSystemSubmenu,
  getSystemSubmenuBatch,
  loadCategoryData,
  checkRuleByCode,
  queryDepartPermission,
  saveDepartPermission,
  queryTreeListForDeptRole,
  queryDeptRolePermission,
  saveDeptRolePermission,
  queryMyDepartTreeList,
  getUserNoticeInfo,
  getDictItemsFromCache
}
