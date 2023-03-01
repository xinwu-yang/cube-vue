<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">添加地区</a-button>
    </div>

    <j-tree-table
      :url="url"
      topValue="0"
      queryKey="parentId"
      :columns="columns"
      :tableProps="tableProps"
      ref="treeTable"
      :queryParams="queryParams"
    >
      <template v-slot:action="props">
        <!-- 可使用的参数： -->
        <!-- props.text -->
        <!-- props.record -->
        <!-- props.index -->
        <a @click="() => handleEdit(props.record)">编辑</a>/ <a @click="() => handleAddSub(props.record)">添加下级</a>/
        <a-popconfirm title="确定删除吗?" ok-text="是" cancel-text="否" @confirm="handleDelete(props.record)">
          <a style="color:red" href="#">删除</a>
        </a-popconfirm>
      </template>
    </j-tree-table>

    <a-modal :title="title" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item label="地区名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :required="true">
          <a-input v-decorator="['name', validatorRules.name]" placeholder="请输入地区名称"></a-input>
        </a-form-item>
        <a-form-item hidden label="上级菜单ID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-decorator="['parentId', {}]"></a-input>
        </a-form-item>
        <a-form-item label="上级菜单" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input disabled :value="parentName" placeholder="请选择上级菜单"></a-input>
        </a-form-item>
        <a-form-item label="国际编号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-decorator="['gbCode', {}]" placeholder="请输入国标编号"></a-input>
        </a-form-item>
        <a-form-item label="邮编" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-decorator="['postCode', {}]" placeholder="请输入邮编"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { postAction, putAction, deleteAction } from '@tievd/cube-block/lib/api/manage'

export default {
  name: 'SysAreaList',

  data() {
    return {
      queryParams: { pageSize: 9999999 },
      form: this.$form.createForm(this),
      validatorRules: {
        name: { rules: [{ required: true, message: '请输入地区名称' }] }
      },
      parentName: '',
      url: 'sys/area/list',
      columns: [
        {
          title: '地区名称',
          dataIndex: 'name'
        },
        {
          title: '地区等级',
          dataIndex: 'level_dictText'
        },
        {
          title: '国标编号',
          dataIndex: 'gbCode'
        },
        {
          title: '邮编',
          dataIndex: 'postCode'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      selectedRowKeys: [],
      visible: false,
      confirmLoading: false,
      title: '',
      currentArea: null,
      api: {
        add: 'sys/area/add',
        edit: 'sys/area/edit',
        delete: 'sys/area/delete'
      }
    }
  },
  computed: {
    tableProps() {
      // let _this = this
      return {
        // 列表项是否可选择
        // https://vue.ant.design/components/table-cn/#rowSelection
        // rowSelection: {
        //   selectedRowKeys: _this.selectedRowKeys,
        //   onChange: selectedRowKeys => (_this.selectedRowKeys = selectedRowKeys)
        // }
        pagination: false
      }
    }
  },
  methods: {
    handleAdd() {
      this.title = '新增'
      this.visible = true
      this.currentArea = null
      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: '',
          gbCode: '',
          postCode: '',
          parentId: 0
        })
        this.parentName = '无'
      })
    },
    handleEdit(record) {
      this.title = '编辑'
      this.visible = true
      this.currentArea = record
      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: record.name,
          gbCode: record.gbCode,
          postCode: record.postCode,
          parentId: record.parentId
        })
        this.parentName = record.parentName || '无'
      })
    },
    handleAddSub(record) {
      this.title = '添加下级'
      this.visible = true
      this.currentArea = null
      this.$nextTick(() => {
        this.form.setFieldsValue({
          name: '',
          gbCode: '',
          postCode: '',
          parentId: record.id
        })
        this.parentName = record.name
      })
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          let response
          if (this.currentArea === null) {
            response = postAction(this.api.add, values)
          } else {
            response = putAction(this.api.edit, { id: this.currentArea.id, ...values })
          }
          response
            .then(res => {
              if (res.success) {
                this.$message.success(res.message)
                this.visible = false
                this.$refs.treeTable.loadData()
              } else {
                this.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.confirmLoading = false
            })
        }
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    handleDelete(record) {
      let params = {
        id: record.id,
        parentId: record.parentId
      }
      deleteAction(this.api.delete, params).then(res => {
        if (res.success) {
          this.$message.success(res.message)
          this.$refs.treeTable.loadData()
        } else {
          this.$message.warning(res.message)
        }
      })
    }
    // addArea() {
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       this.confirmLoading = true
    //       postAction(this.api.add, values)
    //         .then(res => {
    //           if (res.success) {
    //             this.$message.success(res.message)
    //             this.visible = false
    //             this.$refs.treeTable.loadData()
    //           } else {
    //             this.$message.warning(res.message)
    //           }
    //         })
    //         .finally(() => {
    //           this.confirmLoading = false
    //         })
    //     }
    //   })
    // },
    // editArea() {
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       this.confirmLoading = true
    //       putAction(this.api.edit, { id: this.currentArea.id, ...values })
    //         .then(res => {
    //           if (res.success) {
    //             this.$message.success(res.message)
    //             this.visible = false
    //             this.$refs.treeTable.loadData()
    //           } else {
    //             this.$message.warning(res.message)
    //           }
    //         })
    //         .finally(() => {
    //           this.confirmLoading = false
    //         })
    //     }
    //   })
    // }
  }
}
</script>
<style scoped></style>
