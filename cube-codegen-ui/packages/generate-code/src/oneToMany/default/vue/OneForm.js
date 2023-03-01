import FormItemListTemp from '../../../common/FormItemList'
import PickItemListTemp from '../../../common/PickItemList'
import ValidatorRulesTemp from '../../../common/ValidatorRules'

export default `<template>
  <j-form-container :disabled="disabled">
    <a-form :form="form" slot="detail">
      <a-row>-%>
        ${FormItemListTemp}
      </a-row>
    </a-form>
  </j-form-container>
</template>
<script>
import pick from 'lodash.pick'
import { getAction } from '@tievd/cube-block/lib/api/manage'
import { validateDuplicateValue } from '@tievd/cube-block/lib/utils/util'

export default {
  name: '<%= entityNameUpper %>Form',
  
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  data() {
    return {
      form: this.$form.createForm(this),
      model: {},
      validatorRules: {-%>
        ${ValidatorRulesTemp}
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      confirmLoading: false
    }
  },

  methods: {
    initFormData(url, id) {
      this.clearFormData()
      if (!id) {
        this.edit({})
      } else {
        getAction(url, { id }).then(res => {
          if (res.success) {
            let records = res.result
            if (records && records.length > 0) {
              this.edit(records[0])
            }
          }
        })
      }
    },
    edit(record) {
      this.model = Object.assign({}, record)
      console.log('<%= entityNameUpper %>Form-edit', this.model)
      let fieldVal = pick(this.model${PickItemListTemp})
      this.$nextTick(() => {
        this.form.setFieldsValue(fieldVal)
      })
    },
    getFormData() {
      let formData_arr = []
      let validatePassed = false
      this.form.validateFields((err, values) => {
        if (!err) {
          let formData = Object.assign(this.model, values)
          let isNullObj = true
          Object.keys(formData).forEach(key => {
            if (formData[key]) {
              isNullObj = false
            }
          })
          if (!isNullObj) {
            validatePassed = true
            formData_arr.push(formData)
          }
        } else {
          this.$emit('validateError', '<%= description %>表单校验未通过')
          validatePassed = false
        }
      })
      console.log('<%= description %>表单数据集', formData_arr)
      return validatePassed ? formData_arr : validatePassed
    },
    clearFormData() {
      this.form.resetFields()
      this.model = {}
    }
  }
}
</script>
`
