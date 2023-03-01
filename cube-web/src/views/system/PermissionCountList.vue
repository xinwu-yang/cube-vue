<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item>
              <j-select-depart v-model="departId" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item>
              <j-select-multi-user placeholder="请点击选择用户" :multiple="false" v-model="userId" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item>
              <a-range-picker v-model="rangeDate" @change="onDateChange" />
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="12">
            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table :loading="loading" :columns="columns" :data-source="data" :pagination="pagination" @change="onChange">
    </a-table>
  </a-card>
</template>
<script>
import { postAction } from '@tievd/cube-block/lib/api/manage'

export default {
  data() {
    return {
      data: [],
      loading: false,
      departId: '',
      userId: '',
      rangeDate: [],
      begin: '',
      end: '',
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'], //每页中显示的数据
        showTotal: total => `共有 ${total} 条数据` //分页中显示总的数据
      },
      columns: [
        {
          title: '时间',
          dataIndex: 'createTime'
        },
        {
          title: '菜单名称',
          dataIndex: 'permissionName'
        },
        {
          title: '访问次数',
          dataIndex: 'clickCount'
        }
      ],
      url: {
        list: '/sys/permission/history/clickCount'
      }
    }
  },
  created() {
    this.list(1, 10)
  },
  methods: {
    onChange(page) {
      this.list(page.current, page.pageSize)
    },
    onDateChange(date, dateString) {
      this.rangeDate = date
      this.begin = dateString[0]
      this.end = dateString[1]
    },
    list(idx, size) {
      this.loading = true
      let params = {
        pageNo: idx,
        pageSize: size,
        userId: this.userId,
        departId: this.departId,
        begin: this.begin,
        end: this.end
      }
      postAction(this.url.list, params).then(res => {
        if (res.success) {
          this.data = res.result.records.map((item, index) => {
            item.key = index
            return item
          })
          this.pagination.total = parseInt(res.result.total)
          this.pagination.current = parseInt(res.result.current)
          this.pagination.pageSize = parseInt(res.result.size)
          this.loading = false
        } else {
          console.error(res.message)
        }
      })
    },
    searchQuery() {
      this.list(1, 10)
    },
    searchReset() {
      this.userId = ''
      this.departId = ''
      this.rangeDate = []
    }
  }
}
</script>
