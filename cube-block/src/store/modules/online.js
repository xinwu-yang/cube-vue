import Vue from 'vue'

const online = {
  state: {
    //存储对象属性 value,text
    authFields: []
  },
  mutations: {
    SET_AUTHFIELDS: (state, fields) => {
      console.log('fields', fields)
      Vue.set(state, 'authFields', fields)
    }
  }
}

export default online
