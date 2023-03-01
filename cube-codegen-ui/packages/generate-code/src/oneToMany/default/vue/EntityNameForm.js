import FormItemListTemp from '../../../common/FormItemList'
import PickItemListTemp from '../../../common/PickItemList'
import ValidatorRulesTemp from '../../../common/ValidatorRules'

export default `<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="disabled">
      <!-- 主表单区域 -->
      <a-form :form="form" slot="detail">-%>
        ${FormItemListTemp}
      </a-form>
    </j-form-container>
    <!-- 子表单区域 -->
    <a-tabs v-model="activeKey" @change="handleChangeTabs">-%>
    <% for (let index = 0; index < subTableList.length; index++) { %>-%>
      <% if (subTableList[index].relationType === 'ONE_TO_ONE') { %>
      <a-tab-pane tab="<%= subTableList[index].entityNameLower %>" :key="refKeys[<%= index %>]" :forceRender="true">
        <<%= subTableList[index].entityNameLine %>-form ref="<%= subTableList[index].entityNameLower %>Form" @validateError="validateError" :disabled="disabled"></<%= subTableList[index].entityNameLine %>-form>
      </a-tab-pane>-%>
      <% } else if (subTableList[index].relationType === 'ONE_TO_MANY') { %>
      <a-tab-pane tab="<%= subTableList[index].description %>" :key="refKeys[<%= index %>]" :forceRender="true">
        <j-editable-table
          :ref="refKeys[<%= index %>]"
          :loading="<%= subTableList[index].entityNameLower %>Table.loading"
          :columns="<%= subTableList[index].entityNameLower %>Table.columns"
          :dataSource="<%= subTableList[index].entityNameLower %>Table.dataSource"
          :maxHeight="300"
          :disabled="disabled"
          :rowNumber="true"
          :rowSelection="true"
          :actionButton="true"
        />
      </a-tab-pane>-%>
      <% } %>-%>
    <% } %>
    </a-tabs>
  </a-spin>
</template>

<script>
import pick from 'lodash.pick'
import { getAction } from '@tievd/cube-block/lib/api/manage'
import { FormTypes, getRefPromise, VALIDATE_NO_PASSED } from '@tievd/cube-block/lib/utils/JEditableTableUtil'
import { JEditableTableMixin } from '@tievd/cube-block/lib/mixins/JEditableTableMixin'
import { validateDuplicateValue } from '@tievd/cube-block/lib/utils/util'-%>
<% for (let item of subTableList) { %>-%>
  <% if (item.relationType === 'ONE_TO_ONE') { %>
import <%= item.entityNameUpper %>Form from './<%= item.entityNameUpper %>Form.vue'-%>
  <% } %>-%>
<% } %>

export default {
  name: '<%= entityNameUpper %>Form',

  mixins: [JEditableTableMixin],

  components: {-%>
    <% for (let item of subTableList) { %>-%>
      <% if (item.relationType === 'ONE_TO_ONE') { %>
    <%= item.entityNameUpper %>Form,-%>
      <% } %>-%>
    <% } %>
  },

  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      validatorRules: {-%>
        ${ValidatorRulesTemp}
      },
      // 新增时子表默认添加几行空数据
      addDefaultRowNum: 1,
      refKeys: [<% for (let i = 0; i < subTableList.length; i++) { %>'<%= subTableList[i].entityNameLower %>'<% if (i < subTableList.length - 1) { %>, <% } %><% } %>],
      tableKeys: [<% let hasComma = false; for (let i = 0; i < subTableList.length; i++) { %><% if (subTableList[i].relationType === 'ONE_TO_MANY') { %><% if (hasComma) { %>, <% } %>'<%= subTableList[i].entityNameLower %>'<% hasComma = true } %><% } %>],
      activeKey: '<%= subTableList[0].entityNameLower %>',-%>
      <% for (let item of subTableList) { %>
      // <%= item.description %>
      <%= item.entityNameLower %>Table: {
        loading: false,
        dataSource: [],
        columns: [-%>
          <% for (let itm of item.fieldList) { %>-%>
            <% if (itm.showInForm && itm.dataIndex !== 'id') { %>
          {
            title: '<%= itm.title %>',
            key: '<%= itm.dataIndex %>',
            type: <% if (itm.dataIndex !== item.foreignKey) { %><% if (itm.component.name === 'DATE') { %>FormTypes.datetime<% } else if (itm.component.name === 'NUMBER') { %>FormTypes.inputNumber-%><% } else if (itm.component.name === 'STRING') { %>-%>FormTypes.input-%><% } else if (itm.component.name.includes('SELECT') && itm.component.name !== 'MULTI_SELECT_TAG' && itm.component.name !== 'SEARCH_SELECT_TAG') { %>FormTypes.select-%><% } else if (itm.component.name === 'MULTI_SELECT_TAG') { %>FormTypes.list_multi-%><% } else if (itm.component.name === 'SEARCH_SELECT_TAG') { %>FormTypes.sel_search-%><% } else { %>FormTypes.input<% } %><% } else { %>FormTypes.hidden<% } %>,
            width: '<%= itm.component.name === 'MULTI_SELECT_TAG' ? '250px' : '200px' %>',-%>
            <% if (itm.component.params) { %>
              dictCode: '<%= itm.component.params.dictCode %>',-%>
            <% } %>
            placeholder: '请输入\${title}',
            defaultValue: '',
            validateRules: [{ required: true, message: '\${title}不能为空' }]
          },-%>
            <% } %>-%>
          <% } %>
        ]
      },-%>
      <% } %>
      url: {
        add: '/<%= modulePackage %>/<%= entityNameLower %>/add',
        edit: '/<%= modulePackage %>/<%= entityNameLower %>/edit',
        queryById: '/<%= modulePackage %>/<%= entityNameLower %>/queryById',-%>
        <% for (let item of subTableList) { %>
        <%= item.entityNameLower %>: {
          list: '/<%= modulePackage %>/<%= entityNameLower %>/query<%= item.entityNameUpper %>ByMainId'
        },-%>
        <% } %>
      }
    }
  },

  props: {
    // 表单禁用
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  created() {},

  methods: {
    addBefore() {
      this.form.resetFields()-%>
      <% for (let item of subTableList) { %>-%>
        <% if (item.relationType === 'ONE_TO_ONE') { %>
      this.$refs.<%= item.entityNameLower %>Form.clearFormData()-%>
        <% } else if (item.relationType === 'ONE_TO_MANY') { %>
      this.<%= item.entityNameLower %>Table.dataSource = []-%>
        <% } %>-%>
      <% } %>
    },
    getAllTable() {-%>
      <% if (hasOne2Many) { %>
      let values = this.tableKeys.map(key => getRefPromise(this, key))
      return Promise.all(values)-%>
      <% } else { %>
      return new Promise(resolve => {
        resolve([])
      })-%>
      <% } %>
    },
    /** 调用完edit()方法之后会自动调用此方法 */
    editAfter() {
      let fieldVal = pick(this.model${PickItemListTemp})
      this.$nextTick(() => {
        this.form.setFieldsValue(fieldVal)-%>
        <% for (let item of subTableList) { %>-%>
          <% if (item.relationType === 'ONE_TO_ONE') { %>
        this.$refs.<%= item.entityNameLower %>Form.initFormData(this.url.<%= item.entityNameLower %>.list, this.model.id)-%>
          <% } %>-%>
        <% } %>
      })
      // 加载子表数据
      if (this.model.id) {
        let params = { id: this.model.id }-%>
        <% for (let item of subTableList) { %>-%>
          <% if (item.relationType === 'ONE_TO_MANY') { %>
        for (let item of this.<%= item.entityNameLower %>Table.columns) {
          if (item.key === '<%= item.foreignKey %>') {
            item.defaultValue = this.model.id
            break
          }
        }
        this.requestSubTableData(this.url.<%= item.entityNameLower %>.list, params, this.<%= item.entityNameLower %>Table)-%>
          <% } %>-%>
        <% } %>
      }
    },
    /** 整理成formData */
    classifyIntoFormData(allValues) {
      let validatePassed = true-%>
      <% for (let item of subTableList) { %>-%>
        <% if (item.relationType === 'ONE_TO_ONE') { %>
      if (validatePassed) {
        validatePassed = this.$refs.<%= item.entityNameLower %>Form.getFormData()
      }-%>
        <% } %>-%>
      <% } %>
      if (validatePassed) {
        let main = Object.assign(this.model, allValues.formValue)
        return {
          ...main, // 展开-%>
          <% let subManyIndex = 0; for (let item of subTableList) { %>-%>
            <% if (item.relationType === 'ONE_TO_ONE') { %>
          <%= item.entityNameLower %>List: this.$refs.<%= item.entityNameLower %>Form.getFormData(),-%>
            <% } else if (item.relationType === 'ONE_TO_MANY') { %>
          <%= item.entityNameLower %>List: allValues.tablesValue[<%= subManyIndex %>].values,-%>
            <% subManyIndex++ } %>-%>
          <% } %>
        }
      } else {
        return VALIDATE_NO_PASSED
      }
    },
    validateError(msg) {
      this.$message.error(msg)
    }
  }
}
</script>

<style scoped lang="less"></style>
`
