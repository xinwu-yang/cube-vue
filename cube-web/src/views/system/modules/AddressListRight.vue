<template>
  <a-card class="j-address-list-right-card-box" :loading="cardLoading" :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="10">
          <a-col :md="6" :sm="12">
            <a-form-item label="姓名" style="margin-left:8px">
              <a-input placeholder="请输入姓名查询" v-model.trim="queryParam.realname"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-form-item label="工号" style="margin-left:8px">
              <a-input placeholder="请输入工号查询" v-model.trim="queryParam.workNo"></a-input>
            </a-form-item>
          </a-col>

          <span style="float: left;overflow: hidden;" class="table-page-search-submit-buttons">
            <a-col :md="6" :sm="24">
              <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 18px">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>

    <a-table
      ref="table"
      size="middle"
      bordered
      rowKey="userId"
      :pagination="ipagination"
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
      @change="handleTableChange"
    >
    </a-table>
  </a-card>
</template>

<script>
import { getAction } from '@tievd/cube-block/lib/api/manage'
import { JeecgListMixin } from '@tievd/cube-block/lib/mixins/JeecgListMixin'

export default {
  name: 'AddressListRight',

  mixins: [JeecgListMixin],

  props: ['value'],

  data() {
    this.positionInfo = {}
    return {
      description: '用户信息',
      cardLoading: false,
      columns: [
        {
          title: '#',
          key: 'rowIndex',
          dataIndex: '',
          width: 60,
          align: 'center',
          customRender: (t, r, i) => parseInt(i) + 1
        },
        {
          title: '姓名',
          width: '15%',
          align: 'center',
          dataIndex: 'realname'
        },
        {
          title: '工号',
          width: '15%',
          align: 'center',
          dataIndex: 'workNo'
        },
        {
          title: '部门',
          width: '20%',
          align: 'center',
          dataIndex: 'departName'
        },
        {
          title: '职务',
          width: '15%',
          align: 'center',
          dataIndex: 'post',
          customRender: text =>
            (text || '')
              .split(',')
              .map(t => (this.positionInfo[t] ? this.positionInfo[t] : t))
              .join(',')
        },
        {
          title: '手机',
          width: '15%',
          align: 'center',
          dataIndex: 'telephone'
        },
        // {
        //   title: '手机号',
        //   width: '12%',
        //   align: 'center',
        //   dataIndex: 'phone'
        // },
        {
          title: '公司邮箱',
          width: '15%',
          align: 'center',
          dataIndex: 'email'
        }
      ],
      url: {
        list: '/sys/user/queryByOrgCodeForAddressList',
        listByPosition: '/sys/position/list'
      }
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(orgCode) {
        this.dataSource = []
        this.queryParam = {
          orgCode
        }
        this.loadData(1)
      }
    }
  },

  created() {
    this.queryPositionInfo()
  },

  methods: {
    searchReset() {
      this.queryParam = {}
      if (this.value) {
        this.queryParam.orgCode = this.value
      }
      this.loadData(1)
    },
    // 查询职务信息
    queryPositionInfo() {
      getAction(this.url.listByPosition, { pageSize: 99999 }).then(res => {
        if (res.success) {
          let positionInfo = {}
          res.result.records.forEach(record => {
            positionInfo[record['code']] = record['name']
          })
          this.positionInfo = positionInfo
        }
      })
    }
  }
}
</script>
<style>
.j-address-list-right-card-box .ant-table-placeholder {
  min-height: 46px;
}
</style>
<style scoped>
.j-address-list-right-card-box {
  height: 100%;
  min-height: 300px;
}
</style>
