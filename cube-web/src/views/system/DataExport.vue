<template>
  <a-card :bordered="false">
    <a-form>
      <a-form-item label="角色" style="width: 300px">
        <j-multi-select-tag v-model="roleList" placeholder="请选择角色" dictCode="sys_role,role_name,id" />
      </a-form-item>
      <a-form-item label="用户" style="width: 300px">
        <j-select-multi-user v-model="userList" :valueKey="'id'" />
      </a-form-item>
      <a-form-item label="字典" style="width: 300px">
        <j-multi-select-tag v-model="dictList" placeholder="请选择字典" dictCode="sys_dict,dict_name,id,del_flag=0" />
      </a-form-item>
      <a-form-item label="菜单" style="width: 300px">
        <j-tree-select
          v-model="orderList"
          placeholder="请选择菜单"
          dict="sys_permission,name,id,del_flag=0"
          pidField="parent_id"
          pidValue=""
          multiple
        />
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="exportData"> 导出 </a-button>
  </a-card>
</template>

<script>
import { getAction, postAction } from '@tievd/cube-block/lib/api/manage'
import * as dayjs from 'dayjs'

export default {
  name: 'DataExport',

  data() {
    return {
      exportUrl: 'sys/export/sql/insert',
      roleList: '',
      userList: '',
      dictList: '',
      orderList: ''
    }
  },
  methods: {
    exportData: function() {
      console.log(this.roleList)
      console.log(this.userList)
      console.log(this.dictList)
      console.log(this.orderList)

      let params = {
        permissionIds: this.orderList.split(','),
        userIds: this.userList.split(','),
        roleIds: this.roleList.split(','),
        dictIds: this.dictList.split(',')
      }
      postAction(this.exportUrl, params).then(res => {
        let sqlData = new Blob([res])
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(sqlData)
        link.download = 'SQLData.' + dayjs(new Date()).format('YYYY-MM-DD') + '.sql'
        link.click()
        //释放内存
        window.URL.revokeObjectURL(link.href)
      })
    }
  }
}
</script>
