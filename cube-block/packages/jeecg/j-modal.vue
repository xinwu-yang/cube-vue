<template>
  <a-modal ref="modal" :class="getClass(modalClass)" :style="getStyle(modalStyle)" :visible="visible" v-bind="_attrs" v-on="$listeners" @ok="handleOk" @cancel="handleCancel">
    <slot></slot>

    <template v-if="!isNoTitle" slot="title">
      <a-row class="j-modal-title-row" type="flex">
        <a-col class="left">
          <slot name="title">{{ title }}</slot>
        </a-col>
        <a-col v-if="switchFullscreen" class="right" @click="toggleFullscreen">
          <a-button class="ant-modal-close ant-modal-close-x" ghost type="link" :icon="fullscreenButtonIcon" />
        </a-col>
      </a-row>
    </template>

    <!-- 处理 scopedSlots -->
    <template v-for="slotName of scopedSlotsKeys" :slot="slotName">
      <slot :name="slotName"></slot>
    </template>

    <!-- 处理 slots -->
    <template v-for="slotName of slotsKeys" v-slot:[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </a-modal>
</template>

<script>
import { getClass, getStyle } from '@tievd/cube-block/src/utils/props-util'
import { triggerWindowResizeEvent } from '@tievd/cube-block/src/utils/util'

export default {
  name: 'JModal',

  props: {
    title: String,
    // 可使用 .sync 修饰符
    visible: Boolean,
    // 是否全屏弹窗，当全屏时无论如何都会禁止 body 滚动。可使用 .sync 修饰符
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 是否允许切换全屏（允许后右上角会出现一个按钮）
    switchFullscreen: {
      type: Boolean,
      default: false
    },
    // 点击确定按钮的时候是否关闭弹窗
    okClose: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      // 内部使用的 slots ，不再处理
      usedSlots: ['title'],
      // 实际控制是否全屏的参数
      innerFullscreen: this.fullscreen
    }
  },

  computed: {
    // 一些未处理的参数或特殊处理的参数绑定到 a-modal 上
    _attrs() {
      let attrs = { ...this.$attrs }
      // 如果全屏就将宽度设为 100%
      if (this.innerFullscreen) {
        attrs['width'] = '100%'
      }
      return attrs
    },
    modalClass() {
      return {
        'j-modal-box': true,
        fullscreen: this.innerFullscreen,
        'no-title': this.isNoTitle,
        'no-footer': this.isNoFooter
      }
    },
    modalStyle() {
      let style = {}
      // 如果全屏就将top设为 0
      if (this.innerFullscreen) {
        style['top'] = '0'
      }
      return style
    },
    isNoTitle() {
      return !this.title && !this.allSlotsKeys.includes('title')
    },
    isNoFooter() {
      return this._attrs['footer'] === null
    },
    slotsKeys() {
      return Object.keys(this.$slots).filter((key) => !this.usedSlots.includes(key))
    },
    scopedSlotsKeys() {
      return Object.keys(this.$scopedSlots).filter((key) => !this.usedSlots.includes(key))
    },
    allSlotsKeys() {
      return Object.keys(this.$slots).concat(Object.keys(this.$scopedSlots))
    },
    // 切换全屏的按钮图标
    fullscreenButtonIcon() {
      return this.innerFullscreen ? 'fullscreen-exit' : 'fullscreen'
    }
  },

  watch: {
    visible() {
      if (this.visible) {
        this.innerFullscreen = this.fullscreen
      }
    },
    innerFullscreen(val) {
      this.$emit('update:fullscreen', val)
    }
  },

  methods: {
    getClass(clazz) {
      return { ...getClass(this), ...clazz }
    },
    getStyle(style) {
      return { ...getStyle(this), ...style }
    },

    close() {
      this.$emit('update:visible', false)
    },

    handleOk() {
      if (this.okClose) {
        this.close()
      }
    },
    handleCancel() {
      this.close()
    },

    /** 切换全屏 */
    toggleFullscreen() {
      this.innerFullscreen = !this.innerFullscreen
      triggerWindowResizeEvent()
    }
  }
}
</script>
