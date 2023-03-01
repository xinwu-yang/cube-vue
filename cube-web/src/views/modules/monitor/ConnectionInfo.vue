<template>
  <a-skeleton active :loading="loading" :paragraph="{ rows: 17 }">
    <a-card :bordered="false">
      <a-alert type="info" :showIcon="true">
        <div slot="message">
          上次更新时间：{{ this.time }}
          <a-divider type="vertical" />
          <a @click="handleClickUpdate">立即更新</a>
        </div>
      </a-alert>

      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :loading="tableLoading"
        style="margin-top: 20px;"
      >
        <template slot="param" slot-scope="text">
          <a-tag color="green">{{ text }}</a-tag>
        </template>

        <template slot="value" slot-scope="text, record">
          <div v-if="text.length === 1">{{ text[0].value }}{{ record.unit }}</div>
          <template v-else>
            <div v-for="(item, index) in text" :key="index">
              {{ item.statistic }}: {{ item.value }} {{ item.statistic === 'TOTAL_TIME' ? record.unit : '' }}
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
  </a-skeleton>
</template>
<script>
import moment from 'moment'
import { getAction } from '@tievd/cube-block/lib/api/manage'

moment.locale('zh-cn')

export default {
  name: 'ConnectionInfo',

  data() {
    return {
      time: '',
      loading: true,
      tableLoading: true,
      columns: [
        {
          title: '参数',
          width: '30%',
          dataIndex: 'param',
          scopedSlots: { customRender: 'param' }
        },
        {
          title: '描述',
          width: '40%',
          dataIndex: 'description'
          // scopedSlots: { customRender: 'text' }
        },
        {
          title: '当前值',
          width: '30%',
          dataIndex: 'value',
          scopedSlots: { customRender: 'value' }
        }
      ],
      dataSource: []
    }
  },

  mounted() {
    this.loadConnectionInfo()
  },

  methods: {
    handleClickUpdate() {
      this.loadConnectionInfo()
    },
    loadConnectionInfo() {
      this.tableLoading = true
      this.time = moment().format('YYYY年MM月DD日 HH时mm分ss秒')
      Promise.all([
        getAction('/actuator/metrics/hikaricp.connections'),
        getAction('/actuator/metrics/hikaricp.connections.acquire'),
        getAction('/actuator/metrics/hikaricp.connections.active'),
        getAction('/actuator/metrics/hikaricp.connections.creation'),
        getAction('/actuator/metrics/hikaricp.connections.idle'),
        getAction('/actuator/metrics/hikaricp.connections.max'),
        getAction('/actuator/metrics/hikaricp.connections.min'),
        getAction('/actuator/metrics/hikaricp.connections.pending'),
        getAction('/actuator/metrics/hikaricp.connections.timeout'),
        getAction('/actuator/metrics/hikaricp.connections.usage')
      ])
        .then(res => {
          let connectionInfo = []
          res.forEach((value, index) => {
            connectionInfo.push({
              id: value.name + index,
              param: value.name,
              description: value.description,
              value: value.measurements,
              unit: this.parseUnit(value.baseUnit)
            })
          })
          this.dataSource = connectionInfo
        })
        .catch(e => {
          console.error(e)
          this.$message.error('获取连接池信息失败')
        })
        .finally(() => {
          this.loading = false
          this.tableLoading = false
        })
    },
    parseUnit(unit) {
      switch (unit) {
        case 'seconds':
          unit = '秒'
          break
        default:
          unit = ''
          break
      }
      return unit
    }
  }
}
</script>
<style></style>
