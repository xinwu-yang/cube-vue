// 项目默认设置
import defaultSetting from '@/config/default-setting'
const setting = {
  state: {
    ...defaultSetting
  },

  mutations: {
    SET_DEFAULT_SETTING(state, setting) {
      Object.keys(setting).forEach(key => {
        state[key] = setting[key]
      })
    }
  }
}

export default setting
