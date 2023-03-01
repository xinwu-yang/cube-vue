<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="父级节点" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-tree-select
            ref="treeSelect"
            placeholder="请选择父级节点"
            v-decorator="['pid', validatorRules.pid]"
            dict="sys_category,name,id"
            pidField="pid"
            pidValue="0"
          >
          </j-tree-select>
        </a-form-item>

        <a-form-item label="分类名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator.trim="['name', validatorRules.name]" placeholder="请输入分类名称"></a-input>
        </a-form-item>

        <!--<a-form-item label="类型编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'code', validatorRules.code]" placeholder="请输入类型编码"></a-input>
        </a-form-item>-->

        <!--<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span style="font-size: 12px;color:red" slot="label">编码规则(注)</span>
          <span style="font-size: 12px;color:red">
            编码值前缀需和父节点保持一致,比如父级节点编码是A01则当前编码必须以A01开头
          </span>
        </a-form-item>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction, getAction } from '@tievd/cube-block/lib/api/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@tievd/cube-block/lib/utils/util'
import debounce from 'lodash/debounce'

export default {
  name: 'SysCategoryModal',

  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
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
      validatorRules: {
        code: {
          rules: [
            {
              required: true
            },
            {
              validator: this.validateMyCode
            }
          ]
        },
        pid: {},
        name: {
          rules: [
            { required: true, message: '' },
            {
              validator: debounce((rule, value, callback) => {
                value = value.trim()
                if (value) {
                  validateDuplicateValue('sys_category', 'name', value, this.model.id, callback, '该分类名称已存在')
                } else {
                  callback('请输入分类名称')
                }
              }, 500)
            }
          ]
        }
      },
      url: {
        add: '/sys/category/add',
        edit: '/sys/category/edit',
        checkCode: '/sys/category/checkCode'
      },
      expandedRowKeys: [],
      pidField: 'pid',
      subExpandedKeys: []
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
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'pid', 'name', 'code'))
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
          formData.name = formData.name.trim()

          httpAction(httpUrl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.submitSuccess(formData)
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
    },
    popupCallback(row) {
      this.form.setFieldsValue(pick(row, 'pid', 'name', 'code'))
    },
    submitSuccess(formData) {
      if (!formData.id) {
        let treeData = this.$refs.treeSelect.getCurrTreeData()
        this.expandedRowKeys = []
        this.getExpandKeysByPid(formData[this.pidField], treeData, treeData)
        if (formData.pid && this.expandedRowKeys.length == 0) {
          this.expandedRowKeys = this.subExpandedKeys
        }
        this.$emit('ok', formData, this.expandedRowKeys.reverse())
      } else {
        this.$emit('ok', formData)
      }
    },
    getExpandKeysByPid(pid, arr, all) {
      if (pid && arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].key == pid) {
            this.expandedRowKeys.push(arr[i].key)
            this.getExpandKeysByPid(arr[i]['parentId'], all, all)
          } else {
            this.getExpandKeysByPid(pid, arr[i].children, all)
          }
        }
      }
    },
    validateMyCode(rule, value, callback) {
      value = value.trim()
      if (value) {
        let params = {
          pid: this.form.getFieldValue('pid'),
          code: value
        }
        getAction(this.url.checkCode, params).then(res => {
          if (res.success) {
            callback()
          } else {
            callback(res.message)
          }
        })
      } else {
        callback('请输入类型编码')
      }
    }
  }
}
</script>
