import TableQueryFieldListTemp from '../../../common/TableQueryFieldList'
import ColumnListTemp from '../../../common/ColumnList'

export default `<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">-%>
          ${TableQueryFieldListTemp}
          <template v-if="toggleSearchStatus">
            <!-- 需要展开收起的搜索项可以挪到这里 -->
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submit-buttons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('<%= description %>')">导出</a-button>
      <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload> -->
      <!-- 高级查询区域 -->
      <!-- <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query> -->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
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
        class="j-table-force-nowrap"
        :scroll="{x:true}"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="downloadFile(text)">下载</a-button>
        </template>
        <% if (listNeedPca) { %>
        <template slot="pcaSlot" slot-scope="text">
          <div>{{ getPcaText(text) }}</div>
        </template>-%>
        <% } %>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
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

    <<%= entityNameLine %>-modal ref="modalForm" @ok="modalFormOk" />
  </a-card>
</template>

<script>
import { JeecgListMixin } from '@tievd/cube-block/lib/mixins/JeecgListMixin'
import <%= entityNameUpper %>Modal from './modules/<%= entityNameUpper %>Modal'-%>
<% if (listNeedCategory) { %>
import { loadCategoryData } from '@tievd/cube-block/lib/api/api'-%>
<% } %>-%>
<% if (listNeedDict) { %>
import { filterMultiDictText } from '@tievd/cube-block/lib/utils/packages/JDictSelectUtil'-%>
<% } %>

export default {
  name: '<%= entityNameUpper %>List',

  mixins: [JeecgListMixin],

  components: {
    <%= entityNameUpper %>Modal
  },

  data() {
    return {
      description: '<%= entityNameUpper %>管理页面', // 表头
      columns: [],
      // 列定义
      defaultColumns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
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
        exportXlsUrl: '/<%= modulePackage %>/<%= entityNameLower %>/exportXls',
        importExcelUrl: '<%= modulePackage %>/<%= entityNameLower %>/importExcel'
      },
      dictOptions: {},
      superFieldList: []
    }
  },

  created() {-%>
    <% if (listNeedPca) { %>
    this.pcaData = new Area()-%>
    <% } %>
    this.getSuperFieldList()
  },

  computed: {
    importExcelUrl: function () {
      return \`\${window._CONFIG['domianURL']}/\${this.url.importExcelUrl}\`
    }
  },

  methods: {-%>
    <% if (listNeedPca) { %>
    getPcaText(code){
      return this.pcaData.getText(code)
    },-%>
    <% } %>
    initDictConfig() {-%>
      <% if (listNeedCategory) { %>
        <% for (let item of categoryColumns) { %>-%>
          loadCategoryData({code: '<%= item.component.params && item.component.params.dictField %>'}).then((res) => {
            if (res.success) {
              this.$set(this.dictOptions, '<%= item.dataIndex %>', res.result)
            }
          })-%>
        <% } %>-%>
      <% } %>
    },
    getSuperFieldList() {
      let fieldList = [{ type: 'string', value: 'name', text: '姓名', dictCode: '' }]
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped lang="less">
  @import '~@assets/less/common.less';
</style>`
