<template>
  <a-popover title="自定义列" trigger="click" placement="leftBottom">
    <template slot="content">
      <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
        <a-row style="width: 400px">
          <template v-for="(item, index) in defaultColumns">
            <template v-if="item.key != 'rowIndex' && item.dataIndex != 'action'">
              <a-col :key="index" :span="12">
                <a-checkbox :value="item.dataIndex">
                  <j-ellipsis :value="item.title" :length="10"></j-ellipsis>
                </a-checkbox>
              </a-col>
            </template>
          </template>
        </a-row>
      </a-checkbox-group>
    </template>
    <a><a-icon type="setting" />设置</a>
  </a-popover>
</template>

<script>
export default {
  name: 'ColumnFilter',

  model: {
    prop: 'columns',
    event: 'change'
  },

  props: {
    defaultColumns: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      settingColumns: []
    }
  },

  methods: {
    // 列设置更改事件
    onColSettingsChange(checkedValues) {
      //const key = this.$route.name + ':colsettings'
      const key = `${this.$route.name}:${this.$options.name}:colsettings`
      this.$ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
      this.settingColumns = checkedValues
      const columns = this.defaultColumns.filter((item) => {
        if (item.key == 'rowIndex' || item.dataIndex == 'action') {
          return true
        }
        if (this.settingColumns.includes(item.dataIndex)) {
          return true
        }
        return false
      })
      this.$emit('change', columns)
    },
    initColumns() {
      // 权限过滤（列权限控制时打开，修改第二个参数为授权码前缀）
      // this.defaultColumns = colAuthFilter(this.defaultColumns,'testdemo:');
     // const key = this.$route.name + ':colsettings'
      const key = `${this.$route.name}:${this.$options.name}:colsettings`
      let colSettings = this.$ls.get(key)
      if (colSettings == null || colSettings == undefined) {
        let allSettingColumns = []
        if (this.columns.length > 0) {
          this.columns.forEach(function(item, i, array) {
            allSettingColumns.push(item.dataIndex)
          })
          this.$emit('change', this.columns)
        } else {
          this.defaultColumns.forEach(function(item, i, array) {
            allSettingColumns.push(item.dataIndex)
          })
          this.$emit('change', this.defaultColumns)
        }
        this.settingColumns = allSettingColumns
      } else {
        this.settingColumns = colSettings
        const columns = this.defaultColumns.filter((item) => {
          if (item.key == 'rowIndex' || item.dataIndex == 'action') {
            return true
          }
          if (colSettings.includes(item.dataIndex)) {
            return true
          }
          return false
        })
        this.$emit('change', columns)
      }
    }
  },

  created() {
    this.initColumns()
  }
}
</script>

<style scoped></style>
