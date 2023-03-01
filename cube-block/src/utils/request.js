import Vue from 'vue'
import axios from 'axios'
import { VueAxios } from './axios.js'
import { Modal, notification } from 'ant-design-vue'
import { ACCESS_TOKEN, TENANT_ID } from '../store/mutation-types'

// 指定 axios 的 baseURL
const apiBaseUrl = window._CONFIG['domianURL'] || '/cube'

// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // api base_url
  timeout: 60000 // 请求超时时间
})

// http status 异常捕获
const errorHandler = (error) => {
  if (error.response) {
    errorCodeHandler(error.response.status, error.response)
  }
  return Promise.reject(error)
}

const ERROR_MESSAGES = {
  400: '参数有误',
  401: '无此权限',
  404: '路径不存在，请检查路径是否正确',
  405: '方法不支持',
  500: '操作失败',
  501: '凭证失效、过期、不存在、被顶下线、被踢下线、未提供凭证'
}

const handleReLogin = () => {
  // Token失效采用弹框模式，不直接跳转
  isShowErrorModal = true
  Modal.error({
    title: '登录已过期',
    content: '很抱歉，登录已过期，请重新登录',
    okText: '重新登录',
    mask: false,
    onOk: () => {
      Vue.hackStore.dispatch('Logout').then(() => {
        Vue.ls.remove(ACCESS_TOKEN)
        try {
          const path = window.document.location.pathname
          if (path !== '/' && path.indexOf('/user/login') === -1) {
            window.location.reload()
          }
        } catch (e) {
          window.location.reload()
        }
      })
    }
  })
}

let isShowErrorModal = false
const errorCodeHandler = (code, response) => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  console.log('------ 异常响应 token ------', token)
  console.log('------ 异常响应 code ------', code)
  switch (parseInt(code)) {
    case 400:
      notification.error({ message: '系统提示', description: ERROR_MESSAGES[400], duration: 4 })
      break
    case 401:
      notification.error({ message: '系统提示', description: ERROR_MESSAGES[401], duration: 4 })
      if (token) {
        Vue.hackStore.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    case 403:
      notification.error({ message: '系统提示', description: '拒绝访问', duration: 4 })
      break
    case 404:
      notification.error({ message: '系统提示', description: ERROR_MESSAGES[404], duration: 4 })
      break
    case 500:
      console.log('------ 异常响应 response ------', response)
      // 处理Blob情况 start
      if (response.request.responseType === 'blob') {
        blobToJson(response.data)
        break
      }
      // 处理Blob情况 end
      if (token && response.data.message.includes('Token失效') && !isShowErrorModal) {
        handleReLogin()
      }
      break
    case 501:
      notification.error({ message: '系统提示', description: ERROR_MESSAGES[501] })
      break
    case 504:
      notification.error({ message: '系统提示', description: '网络超时' })
      break
    default:
      notification.error({
        message: '系统提示',
        description: response.data.message,
        duration: 4
      })
      break
  }
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token
    }
    // 多租户 start
    let tenantId = Vue.ls.get(TENANT_ID)
    if (!tenantId) {
      tenantId = 0
    }
    config.headers['tenant_id'] = tenantId
    // 多租户 end
    if (config.method === 'get') {
      if (config.url.indexOf('sys/dict/getDictItems') < 0) {
        config.params = {
          _t: Date.parse(new Date()) / 1000,
          ...config.params
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use((response) => {
  if (response.status === 200 && response.data.success === false) {
    // 处理 http status 200，但是请求出错的情况
    errorCodeHandler(response.data.code, response)
  }
  if (response.request.responseURL.includes('exportXls')) {
    response.data.responseHeaders = response.headers
  }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

/**
 * Blob解析
 * @param data
 */
function blobToJson(data) {
  const fileReader = new FileReader()
  const token = Vue.ls.get(ACCESS_TOKEN)
  fileReader.onload = function() {
    try {
      let jsonData = JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
      if (jsonData.status === 500) {
        if (token && jsonData.message.includes('Token失效') && !isShowErrorModal) {
          handleReLogin()
        }
      }
    } catch (err) {
      // 解析成对象失败，说明是正常的文件流
      console.log('blob解析fileReader返回err', err)
    }
  }
  fileReader.readAsText(data)
}

export { installer as VueAxios, service as axios }
