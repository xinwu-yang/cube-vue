<template>
  <a-card :bordered="false">    
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">                  
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="用户名">
              <a-input placeholder="请输入用户名" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>              
          <template v-if="toggleSearchStatus">
            <!-- 需要展开收起的搜索项可以挪到这里 -->
          </template>
          <span style="float: left;overflow: hidden;" class="table-page-search-submit-buttons">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <!-- <a-button type="primary" icon="download" @click="handleExportXls('SysRoleKey')">导出</a-button> -->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>
        项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        <span style="float:right;">
          <a @click="loadData()"><a-icon type="sync" />刷新</a>
          <a-divider type="vertical" />
          <column-filter v-model="columns" :defaultColumns="defaultColumns"></column-filter>
        </span>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :scroll="{x: true}"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <sys-role-key-modal ref="modalForm" @ok="modalFormOk"></sys-role-key-modal>
  </a-card>
</template>

<script>
import SysRoleKeyModal from './modules/SysRoleKeyModal'
import { JeecgListMixin } from '@tievd/cube-block/lib/mixins/JeecgListMixin'

export default {
  name: 'SysRoleKeyList',

  mixins: [JeecgListMixin],

  components: {
    SysRoleKeyModal
  },

  data() {
    return {
      description: 'SysRoleKey列表',
      // 表头
      columns: [],
      // 列定义
      defaultColumns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },        
          {
            title: '用户名',
            align: 'center',
            dataIndex: 'username',            
          },          
          {
            title: 'AK',
            align: 'center',
            dataIndex: 'accessKey',            
          },          
          {
            title: '是否启用',
            align: 'center',
            dataIndex: 'enabled_dictText',            
          },          
          {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createTime',            
            customRender: function (text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }            
          },          
          {
            title: '创建人',
            align: 'center',
            dataIndex: 'createBy',            
          },          
          {
            title: '更新时间',
            align: 'center',
            dataIndex: 'updateTime',            
            customRender: function (text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }            
          },          
          {
            title: '更新人',
            align: 'center',
            dataIndex: 'updateBy',            
          },          
        {
          title: '操作',
          dataIndex: 'action',
          width: 150,
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/sys/ram/list',
        delete: '/sys/ram/delete',
        deleteBatch: '/sys/ram/deleteBatch',
        exportXlsUrl: '/sys/ram/exportXls'
      }
    }
  },

  methods: {},

  created() {}
}
</script>
<style scoped lang="less">
  @import '~@assets/less/common.less';
</style>
