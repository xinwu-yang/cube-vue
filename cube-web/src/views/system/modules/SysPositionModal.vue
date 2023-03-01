<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职务编码">
          <a-input
            placeholder="请输入职务编码"
            v-decorator.trim="['code', validatorRules.code]"
            :read-only="readOnly"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职务名称">
          <a-input placeholder="请输入职务名称" v-decorator.trim="['name', validatorRules.name]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="职级">
          <j-dict-select-tag
            placeholder="请选择职级"
            :triggerChange="true"
            dictCode="position_rank"
            v-decorator="['postRank', validatorRules.postRank]"
          />
        </a-form-item>
        <!--<a-form-item-->
        <!--  :labelCol="labelCol"-->
        <!--  :wrapperCol="wrapperCol"-->
        <!--  label="公司id">-->
        <!--  <a-input placeholder="请输入公司id" v-decorator="['companyId', {}]"/>-->
        <!--</a-form-item>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { httpAction } from '@tievd/cube-block/lib/api/manage'
import { validateDuplicateValue } from '@tievd/cube-block/lib/utils/util'
import debounce from 'lodash/debounce'

export default {
  name: 'SysPositionModal',

  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        code: {
          rules: [
            { required: true, message: '' },
            {
              validator: debounce((rule, value, callback) => {
                // 函数消抖的简单实现，防止一段时间内发送多次请求
                value = value.trim()
                if (value) {
                  validateDuplicateValue('sys_position', 'code', value, this.model.id, callback)
                } else {
                  callback('请输入职务编码')
                }
              }, 500)
            }
          ]
        },
        name: {
          rules: [
            { required: true, message: '' },
            {
              validator: debounce((rule, value, callback) => {
                value = value.trim()
                if (value) {
                  validateDuplicateValue('sys_position', 'name', value, this.model.id, callback)
                } else {
                  callback('请输入职务名称')
                }
              }, 500)
            }
          ]
        },
        postRank: { rules: [{ required: true, message: '请选择职级' }] }
      },
      url: {
        add: '/sys/position/add',
        edit: '/sys/position/edit'
      },
      readOnly: false
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      if (record.id) {
        this.readOnly = true
      } else {
        this.readOnly = false
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'code',
            'name',
            'postRank'
            // 'companyId'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpUrl = ''
          let method = ''
          if (!this.model.id) {
            httpUrl += this.url.add
            method = 'post'
          } else {
            httpUrl += this.url.edit
            method = 'put'
          }

          let formData = Object.assign(this.model, values)
          formData.code = formData.code.trim()
          formData.name = formData.name.trim()
          httpAction(httpUrl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>

<style lang="less" scoped></style>
