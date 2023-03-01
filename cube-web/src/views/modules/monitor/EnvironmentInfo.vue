<template>
  <a-skeleton active :loading="loading" :paragraph="{ rows: 17 }">
    <a-card :bordered="false">
      <a-alert type="info" :showIcon="true">
        <div slot="message">运行环境: {{ environment }}</div>
      </a-alert>

      <a-tabs>
        <a-tab-pane v-for="(item, index) in environmentInfo" :key="index" :tab="item.name">
          <a-table
            rowKey="id"
            size="middle"
            :columns="columns"
            :dataSource="item.dataSource"
            :pagination="false"
            :loading="tableLoading"
            style="margin-top: 20px"
          >
            <template slot="property" slot-scope="text">
              <a-tag>{{ text }}</a-tag>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </a-skeleton>
</template>
<script>
import { getAction } from '@tievd/cube-block/lib/api/manage'

const colors = ['#67C23A', '#7D3FF8', '#3FD9F8', '#3F8CF8', '#F53FF8', '#349206', '#3FF8D9']

export default {
  name: 'EnvironmentInfo',

  data() {
    return {
      environment: '',
      loading: true,
      tableLoading: true,
      columns: [
        {
          title: '属性',
          key: 'property',
          dataIndex: 'property',
          scopedSlots: { customRender: 'property' },
        },
        {
          title: '当前值',
          key: 'value',
          dataIndex: 'value',
        },
      ],
      environmentInfo: [],
    }
  },
  mounted() {
    this.loadActiveInfo()
  },
  methods: {
    loadActiveInfo() {
      this.tableLoading = true
      getAction('/actuator/env')
        .then((res) => {
          let environmentInfo = []
          this.environment = res.activeProfiles.join(',')
          for (let item of res.propertySources) {
            if (['server.ports', 'servletContextInitParams'].includes(item.name)) {
              continue
            }
            let arr = Object.keys(item.properties).map((key, index) => {
              return { key: index, property: key, value: `${item.properties[key].value}` }
            })
            environmentInfo.push({
              name: item.name,
              dataSource: arr,
              color: colors.shift(),
            })
          }
          this.environmentInfo = environmentInfo
        })
        .catch((e) => {
          console.error(e)
          this.$message.error('获取Active信息失败')
        })
        .finally(() => {
          this.loading = false
          this.tableLoading = false
        })
    },
  },
}
</script>
<style></style>
