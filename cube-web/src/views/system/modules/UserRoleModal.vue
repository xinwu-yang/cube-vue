<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    width="650"
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    style="overflow: auto;padding-bottom: 53px;"
  >
    <a-form>
      <a-form-item label="所拥有的权限">
        <a-tree
          checkable
          @check="onCheck"
          :checkedKeys="checkedKeys"
          :treeData="treeData"
          @expand="onExpand"
          @select="onTreeNodeSelect"
          :selectedKeys="selectedKeys"
          :expandedKeys="expandedKeys"
          :checkStrictly="true"
        >
          <span slot="hasDatarule" slot-scope="{ slotTitle, ruleFlag }">
            {{ slotTitle }}<a-icon v-if="ruleFlag" type="align-left" style="margin-left:5px;color: red;"></a-icon>
          </span>
        </a-tree>
      </a-form-item>
    </a-form>

    <div class="drawer-bottom-button">
      <a-dropdown style="float: left" :trigger="['click']" placement="topCenter">
        <a-menu slot="overlay" class="ant-dropdown-bordered">
          <a-menu-item key="1" @click="checkALL">全部勾选</a-menu-item>
          <a-menu-item key="2" @click="cancelCheckALL">取消全选</a-menu-item>
          <a-menu-item key="3" @click="expandAll">展开所有</a-menu-item>
          <a-menu-item key="4" @click="closeAll">合并所有</a-menu-item>
        </a-menu>
        <a-button> 树操作 <a-icon type="up" /> </a-button>
      </a-dropdown>
      <a-popconfirm title="确定放弃编辑？" @confirm="close" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit(false)" type="primary" :loading="loading" ghost style="margin-right: 0.8rem">
        仅保存
      </a-button>
      <a-button @click="handleSubmit(true)" type="primary" :loading="loading">保存并关闭</a-button>
    </div>

    <role-datarule-modal ref="datarule"></role-datarule-modal>
  </a-drawer>
</template>
<script>
import { queryTreeListForRole, queryRolePermission, saveRolePermission } from '@tievd/cube-block/lib/api/api'
import RoleDataruleModal from './RoleDataruleModal.vue'
// 使用Set类型，避免重复写入id
let hackCheckedKeys = new Set()

export default {
  name: 'UserRoleModal',

  components: {
    RoleDataruleModal
  },

  data() {
    return {
      roleId: '',
      treeData: [],
      defaultCheckedKeys: [],
      checkedKeys: [],
      expandedKeys: [],
      allTreeKeys: [],
      autoExpandParent: true,
      title: '角色权限配置',
      visible: false,
      loading: false,
      selectedKeys: []
    }
  },

  methods: {
    onTreeNodeSelect(id) {
      if (id && id.length > 0) {
        this.selectedKeys = id
      }
      this.$refs.datarule.show(this.selectedKeys[0], this.roleId)
    },
    onCheck(o, e) {
      /**
       * 1、选中子级，父级一并选中
       * 2、取消子级，父级不做操作
       * 3、选中父级，子级全部选中
       * 4、取消父级，子级全部取消
       */
      this.checkedKeys = o.checked
      if (e.checked) {
        // 如果是选中
        hackCheckedKeys = new Set(o.checked)
        this.hackCheckParentPermissionId(e.node.value, this.treeData) // 将父级勾选上
        this.hackCheckChildrenPermissionId(e.node.value, this.treeData) // 将子级勾选上
      } else {
        // 如果是取消
        hackCheckedKeys = new Set(o.checked)
        this.hackUncheckChildrenPermissionId(e.node.value, this.treeData) // 点击父级，取消所有子级
      }
      this.checkedKeys = [...hackCheckedKeys]
    },
    hackCheckParentPermissionId(checkedKey, treeData) {
      // 选中父级
      for (let item of treeData) {
        if (item.key === checkedKey) {
          if (item.parentId) {
            // 如果有父级，则加入选中数组
            hackCheckedKeys.add(item.parentId)
            this.hackCheckParentPermissionId(item.parentId, this.treeData)
          }
          break
        } else if (item.children !== null) {
          this.hackCheckParentPermissionId(checkedKey, item.children)
        } else if (item.children === null) {
          continue
        }
      }
    },
    hackCheckChildrenPermissionId(checkedKey, treeData) {
      // 选中子级
      for (let item of treeData) {
        if (item.parentId === checkedKey) {
          hackCheckedKeys.add(item.key)
          if (item.children !== null) {
            this.hackCheckChildrenPermissionId(item.key, this.treeData)
          }
        } else if (item.children !== null) {
          this.hackCheckChildrenPermissionId(checkedKey, item.children)
        } else if (item.children === null) {
          continue
        }
      }
    },
    hackUncheckChildrenPermissionId(uncheckedKey, treeData) {
      // 取消子级
      for (let item of treeData) {
        if (item.parentId === uncheckedKey) {
          hackCheckedKeys.delete(item.key)
          if (item.children !== null) {
            this.hackUncheckChildrenPermissionId(item.key, this.treeData)
          }
        } else if (item.children !== null) {
          this.hackUncheckChildrenPermissionId(uncheckedKey, item.children)
        } else if (item.children === null) {
          continue
        }
      }
    },
    show(roleId) {
      this.roleId = roleId
      this.visible = true
    },
    close() {
      this.reset()
      this.$emit('close')
      this.visible = false
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    reset() {
      this.expandedKeys = []
      this.checkedKeys = []
      this.defaultCheckedKeys = []
      this.loading = false
    },
    expandAll() {
      this.expandedKeys = this.allTreeKeys
    },
    closeAll() {
      this.expandedKeys = []
    },
    checkALL() {
      this.checkedKeys = this.allTreeKeys
    },
    cancelCheckALL() {
      this.checkedKeys = []
    },
    handleCancel() {
      this.close()
    },
    handleSubmit(exit) {
      let that = this
      let params = {
        roleId: that.roleId,
        permissionIds: that.checkedKeys.join(','),
        lastpermissionIds: that.defaultCheckedKeys.join(',')
      }
      that.loading = true
      saveRolePermission(params).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          that.loading = false
          if (exit) {
            that.close()
          }
        } else {
          that.$message.error(res.message)
          that.loading = false
          if (exit) {
            that.close()
          }
        }
        this.loadData()
      })
    },
    loadData() {
      queryTreeListForRole().then(res => {
        this.treeData = res.result.treeList
        this.allTreeKeys = res.result.ids
        queryRolePermission({ roleId: this.roleId }).then(res => {
          this.checkedKeys = [...res.result]
          this.defaultCheckedKeys = [...res.result]
          this.expandedKeys = this.allTreeKeys
        })
      })
    }
  },

  watch: {
    visible() {
      if (this.visible) {
        this.loadData()
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
