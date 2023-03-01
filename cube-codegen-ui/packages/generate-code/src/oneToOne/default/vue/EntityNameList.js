import TableQueryFieldListTemp from '../../../common/TableQueryFieldList'
import ColumnListTemp from '../../../common/ColumnList'

export default `<template>
  <a-card :bordered="false">-%>
    <% if (tableQueryFieldList.length) { %>
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">-%>
          ${TableQueryFieldListTemp}
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
    <% } %>
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('<%= entityNameUpper %>')">导出</a-button>
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
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <<%= entityNameLine %>-modal ref="modalForm" @ok="modalFormOk"></<%= entityNameLine %>-modal>
  </a-card>
</template>

<script>
import <%= entityNameUpper %>Modal from './modules/<%= entityNameUpper %>Modal'
import { JeecgListMixin } from '@tievd/cube-block/lib/mixins/JeecgListMixin'

export default {
  name: '<%= entityNameUpper %>List',

  mixins: [JeecgListMixin],

  components: {
    <%= entityNameUpper %>Modal
  },

  data() {
    return {
      description: '<%= entityNameUpper %>列表',
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
        },-%>
        ${ColumnListTemp}
        {
          title: '操作',
          dataIndex: 'action',
          width: 150,
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/<%= modulePackage %>/<%= entityNameLower %>/list',
        delete: '/<%= modulePackage %>/<%= entityNameLower %>/delete',
        deleteBatch: '/<%= modulePackage %>/<%= entityNameLower %>/deleteBatch',
        exportXlsUrl: '/<%= modulePackage %>/<%= entityNameLower %>/exportXls'
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
`
