<template>
  <a-modal
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="旧密码">
          <a-input
            type="password"
            placeholder="请输入旧密码"
            v-decorator="['oldpassword', validatorRules.oldpassword]"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="新密码">
          <a-input type="password" placeholder="请输入新密码" v-decorator="['password', validatorRules.password]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="确认新密码">
          <a-input
            type="password"
            @blur="handleConfirmBlur"
            placeholder="请确认新密码"
            v-decorator="['confirmpassword', validatorRules.confirmpassword]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import Vue from 'vue'
import { putAction } from '@tievd/cube-block/lib/api/manage'
import { USER_INFO } from '@tievd/cube-block/lib/store/mutation-types'

export default {
  name: 'UserPassword',
  data() {
    return {
      title: '修改密码',
      modalWidth: 800,
      visible: false,
      confirmLoading: false,
      validatorRules: {
        oldpassword: {
          rules: [
            {
              required: true,
              message: '请输入旧密码!'
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
              message: '密码由8位数字、大小写字母和特殊符号组成!'
            },
            {
              validator: this.validateToNextPassword
            }
          ]
        },
        confirmpassword: {
          rules: [
            {
              required: true,
              message: '请确认新密码!'
            },
            {
              validator: this.compareToFirstPassword
            }
          ]
        }
      },
      confirmDirty: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      form: this.$form.createForm(this),
      url: 'sys/user/updatePassword',
      username: ''
    }
  },
  computed: {
    isFirstTimeLogin() {
      if (this.$store.getters.isFirstTimeLogin === true) {
        // 初次登录
        this.show(this.$store.getters.userInfo.username)
      }
      return this.$store.getters.isFirstTimeLogin
    }
  },
  watch: {
    isFirstTimeLogin(nv, ov) {
      if (nv === true) {
        // 初次登录
        this.show(this.$store.getters.userInfo.username)
      } else {
        this.close()
      }
    }
  },
  methods: {
    show(uname) {
      if (!uname) {
        this.$message.warning('当前系统无登录用户!')
        return
      } else {
        this.username = uname
        this.form.resetFields()
        this.visible = true
      }
    },
    handleCancel() {
      this.close()
    },
    close() {
      if (this.isFirstTimeLogin === true) {
        this.$message.warning('初次登录，请修改密码')
      } else {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
        this.selectedRole = []
      }
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let params = Object.assign({ username: this.username }, values)
          console.log('修改密码提交数据', params)
          putAction(this.url, params)
            .then(res => {
              if (res.success) {
                console.log(res)
                that.$message.success(res.message)
                // that.close()
                let userInfo = Vue.ls.get(USER_INFO)
                userInfo.firstLogin = false
                Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
                that.$store.dispatch('GetFirstLoginFlag')
                // 密码修改后，退出重新登录
                // that.$store.dispatch('Logout').then(() => {
                //   that.$router.replace({ path: '/user/login', query: { redirect: that.$route.fullPath } })
                // })
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
            })
        }
      })
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一样！')
      } else {
        callback()
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    }
  }
}
</script>

<style scoped></style>
