<template>
  <div class="page-header-index-wide">
    <a-card :loading="loading" :bordered="false" title="最近一周访问量统计">
      <a-row>
        <a-col :span="6">
          <head-info title="今日IP" :content="loginfo.todayIp"></head-info>
        </a-col>
        <a-col :span="2">
          <a-spin class="circle-cust">
            <a-icon slot="indicator" type="environment" style="font-size: 24px" />
          </a-spin>
        </a-col>
        <a-col :span="6">
          <head-info title="今日访问" :content="loginfo.todayVisitCount"></head-info>
        </a-col>
        <a-col :span="2">
          <a-spin class="circle-cust">
            <a-icon slot="indicator" type="team" style="font-size: 24px" />
          </a-spin>
        </a-col>
        <a-col :span="6">
          <head-info title="总访问量" :content="loginfo.totalVisitCount"></head-info>
        </a-col>
        <a-col :span="2">
          <a-spin class="circle-cust">
            <a-icon slot="indicator" type="rise" style="font-size: 24px" />
          </a-spin>
        </a-col>
      </a-row>
      <line-chart-multi :fields="visitFields" :dataSource="visitInfo"></line-chart-multi>
    </a-card>
  </div>
</template>

<script>
import { getLoginfo, getVisitInfo } from '@tievd/cube-block/lib/api/api'
import LineChartMulti from './modules/LineChartMulti'

export default {
  name: 'Analysis',

  components: {
    LineChartMulti
  },

  data() {
    return {
      loading: true,
      center: null,
      loginfo: {},
      visitFields: ['ip', 'visit'],
      visitInfo: [],
      indicator: <a-icon type="loading" style="font-size: 24px" spin />
    }
  },

  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
    this.initLogInfo()
  },

  methods: {
    initLogInfo() {
      getLoginfo(null).then(res => {
        if (res.success) {
          Object.keys(res.result).forEach(key => {
            res.result[key] = res.result[key] + ''
          })
          this.loginfo = res.result
        }
      })
      getVisitInfo().then(res => {
        if (res.success) {
          this.visitInfo = res.result
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.circle-cust {
  position: relative;
  top: 28px;
  left: -100%;
}
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

/* 首页访问量统计 */
.head-info {
  position: relative;
  text-align: left;
  padding: 0 32px 0 0;
  min-width: 125px;

  &.center {
    text-align: center;
    padding: 0 32px;
  }

  span {
    display: inline-block;
    font-size: 0.95rem;
    line-height: 42px;
    margin-bottom: 4px;
  }
  p {
    line-height: 42px;
    margin: 0;
    a {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>
