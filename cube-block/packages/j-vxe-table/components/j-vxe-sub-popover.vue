<template>
  <a-popover :visible="visible" placement="bottom" overlayClassName="j-vxe-popover-overlay" :overlayStyle="overlayStyle">
    <div class="j-vxe-popover-title" slot="title">
      <div>子表</div>
      <div class="j-vxe-popover-title-close" @click="close">
        <a-icon type="close" />
      </div>
    </div>
    <template slot="content">
      <transition name="fade">
        <slot v-if="visible" name="subForm" :row="row" :column="column" />
      </transition>
    </template>

    <div ref="div" class="j-vxe-popover-div"></div>
  </a-popover>
</template>
<script>
import domAlign from 'dom-align'
import { getParentNodeByTagName } from '../utils/vxeUtils'
import { cloneObject, triggerWindowResizeEvent } from '@tievd/cube-block/src/utils/util'

export default {
  name: 'JVxeSubPopover',
  data() {
    return {
      visible: false,
      // 当前行
      row: null,
      column: null,

      overlayStyle: {
        width: null,
        zIndex: 100
      }
    }
  },
  created() {},
  methods: {
    toggle(event) {
      if (this.row == null) {
        this.open(event)
      } else {
        this.row.id === event.row.id ? this.close() : this.reopen(event)
      }
    },

    open(event, level = 0) {
      if (level > 3) {
        this.$message.error('打开子表失败')
        console.warn('【JVxeSubPopover】打开子表失败')
        return
      }

      let {
        row,
        column,
        $table,
        $event: { target }
      } = event
      this.row = cloneObject(row)
      this.column = column

      let className = target.className || ''
      className = typeof className === 'string' ? className : className.toString()

      // 点击的是expand，不做处理
      if (className.includes('vxe-table--expand-btn')) {
        return
      }
      // 点击的是checkbox，不做处理
      if (className.includes('vxe-checkbox--icon') || className.includes('vxe-cell--checkbox')) {
        return
      }
      // 点击的是radio，不做处理
      if (className.includes('vxe-radio--icon') || className.includes('vxe-cell--radio')) {
        return
      }
      let table = $table.$el
      let tr = getParentNodeByTagName(target, 'tr')
      if (table && tr) {
        let clientWidth = table.clientWidth
        let clientHeight = tr.clientHeight
        this.$refs.div.style.width = clientWidth + 'px'
        this.$refs.div.style.height = clientHeight + 'px'
        this.overlayStyle.width = Number.parseInt(clientWidth - clientWidth * 0.04) + 'px'
        this.overlayStyle.maxWidth = this.overlayStyle.width
        domAlign(this.$refs.div, tr, {
          points: ['tl', 'tl'],
          offset: [0, 0],
          overflow: {
            alwaysByViewport: true
          }
        })
        this.$nextTick(() => {
          this.visible = true
          this.$nextTick(() => {
            triggerWindowResizeEvent()
          })
        })
      } else {
        let num = ++level
        console.warn('【JVxeSubPopover】table or tr 获取失败，正在进行第 ' + num + '次重试', { event, table, tr })
        window.setTimeout(() => this.open(event, num), 100)
      }
    },
    close() {
      if (this.visible) {
        this.row = null
        this.visible = false
      }
    },
    reopen(event) {
      this.close()
      this.open(event)
    }
  }
}
</script>
<style scoped lang="less"></style>
