import FormItemListTemp from '../../../common/FormItemList'
import PickItemListTemp from '../../../common/PickItemList'
import ValidatorRulesTemp from '../../../common/ValidatorRules'

export default `<template>
  <a-drawer :title="title" :maskClosable="true" :width="drawerWidth" placement="right" :closable="true" @close="close" :visible="visible" style="overflow: auto;padding-bottom: 53px;">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">-%>
        ${FormItemListTemp}
      </a-form>
    </a-spin>
    <div class="drawer-bottom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: 0.8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import { postAction, putAction } from '@tievd/cube-block/lib/api/manage'

export default {
  name: '<%= entityNameUpper %>Modal',

  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      visible: false,
      confirmLoading: false,
      drawerWidth: 700,
      disableSubmit: false,
      model: {},
      validatorRules: {-%>
        ${ValidatorRulesTemp}
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
    }
  },

  methods: {
    // 根据屏幕变化,设置抽屉尺寸
    resetScreenSize() {
      let screenWidth = document.body.clientWidth
      if (screenWidth < 500) {
        this.drawerWidth = screenWidth
      } else {
        this.drawerWidth = 700
      }
    },
    add() {
      this.edit({})
    },
    edit(record) {
      this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      this.form.resetFields()
      // if (record.id !== undefined) {
      //  // 新增编辑的特殊操作写在这里
      // }
      this.visible = true
      this.model = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(this.model${PickItemListTemp})
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
      this.disableSubmit = false
      this.model = {}
    },
    handleSubmit() {
      // 触发表单验证
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            this.confirmLoading = true
            let formData = Object.assign(this.model, values)
            let res = null
            if (!this.model.id) {
              // 新增
              res = await postAction('/<%= modulePackage %>/<%= entityNameLower %>/add', formData)
            } else {
              // 编辑
              res = await putAction('/<%= modulePackage %>/<%= entityNameLower %>/edit', formData)
            }
            if (res.success) {
              this.$message.success(res.message)
              this.$emit('ok')
            }
          } catch (err) {
            console.log(err)
          } finally {
            this.confirmLoading = false
            this.close()
          }
        }
      })
    },
    handleCancel() {
      this.close()
    },
  }
}
</script>

<style scoped lang="less"></style>`
