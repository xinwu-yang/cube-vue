<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="用户名">
              <a-input placeholder="请输入用户名" v-model.trim="queryParam.username" />
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submit-buttons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource" />
  </a-card>
</template>

<script>
import { getAction } from '@tievd/cube-block/lib/api/manage'
import * as dayjs from 'dayjs'

export default {
  name: 'UserOnlineList',
  data() {
    return {
      queryParam: {},
      dataSource: [],
      columns: [
        {
          title: '用户名',
          dataIndex: 'username'
        },
        {
          title: '登录IP',
          dataIndex: 'ip'
        },
        {
          title: '操作系统',
          dataIndex: 'os'
        },
        {
          title: '游览器',
          dataIndex: 'browse'
        },
        {
          title: '登录时间',
          dataIndex: 'loginTime'
        },
        {
          title: '在线时长(分钟)',
          dataIndex: 'onlineTime'
        }
      ]
    }
  },
  created: function() {
    this.loadData()
  },
  methods: {
    loadData: function() {
      getAction('/sys/user/online/list', this.queryParam).then(res => {
        this.dataSource = res.result.map(record => {
          let onlineUser = JSON.parse(record)
          let onlineTime = res.timestamp - onlineUser.loginTime
          onlineUser.loginTime = dayjs(onlineUser.loginTime).format('YYYY-MM-DD HH:mm:ss')
          onlineUser.onlineTime = (onlineTime / 1000 / 60).toFixed()
          return onlineUser
        })
      })
    },
    searchQuery: function() {
      this.loadData()
    }
  }
}
</script>
<style scoped></style>
