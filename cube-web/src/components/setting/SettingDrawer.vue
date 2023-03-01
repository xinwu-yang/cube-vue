<template>
  <a-drawer width="300" placement="right" :closable="false" @close="onClose" :visible="visible">
    <div class="setting-container">
      <h3>布局设置</h3>
      <div class="flex setting-item flex-between">
        <div>布局模式</div>
        <a-select size="small" :value="layoutMode" @change="handleLayoutMode">
          <a-select-option key="side-menu">侧边栏导航</a-select-option>
          <a-select-option key="top-menu">顶部栏导航</a-select-option>
          <a-select-option key="mobile">手机模式</a-select-option>
        </a-select>
      </div>
      <div class="tip">该设定仅 [顶部栏导航] 时有效</div>
      <div class="flex setting-item flex-between">
        <div>内容区域</div>
        <a-select size="small" :value="contentWidth" @change="handleContentWidthChange">
          <a-select-option key="fixed">固定</a-select-option>
          <a-select-option key="fluid">流式</a-select-option>
        </a-select>
      </div>
      <div class="flex setting-item flex-between">
        <div>固定 Header</div>
        <a-switch size="small" :checked="fixedHeader" @change="handleFixedHeader" />
      </div>
      <div class="flex setting-item flex-between">
        <div>下滑时隐藏 Header</div>
        <a-switch size="small" :disabled="!fixedHeader" :checked="autoHideHeader" @change="handleAutoHideHeader" />
      </div>
      <div class="flex setting-item flex-between">
        <div>固定侧边菜单</div>
        <a-switch size="small" :disabled="layoutMode === 'top-menu'" :checked="fixSidebar" @change="handleFixSidebar" />
      </div>
      <a-divider />
      <h3>其他设置</h3>
      <!-- <div class="flex setting-item flex-between">
        <div>色弱模式</div>
        <a-switch size="small" :checked="colorWeak" @change="onColorWeak" />
      </div> -->
      <div class="flex setting-item flex-between">
        <div>多页签模式</div>
        <a-switch size="small" :checked="multiPage" @change="handleMultiPage" />
      </div>
    </div>
    <a-divider />
    <div>
      <a-alert type="warning">
        <span slot="message">
          配置栏只在开发环境用于预览，生产环境不应该展现，请手动修改配置文件
          <a>
            src/config/default-setting.js
          </a>
        </span>
      </a-alert>
    </div>
  </a-drawer>
</template>

<script>
import { mixin, mixinDevice } from '@tievd/cube-block/lib/utils/mixin.js'
import { triggerWindowResizeEvent } from '@tievd/cube-block/lib/utils/util'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'

export default {
  name: 'SettingDrawer',

  mixins: [mixin, mixinDevice, skinLayoutMixin],

  data() {
    return {
      visible: false
    }
  },

  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    onColorWeak(checked) {
      this.$store.commit('SET_DEFAULT_SETTING', checked)
      // updateColorWeak(checked)
    },
    handleMultiPage(multiPage) {
      this.$store.commit('SET_DEFAULT_SETTING', { multiPage })
    },
    handleLayoutMode(layoutMode) {
      this.$store.commit('SET_DEFAULT_SETTING', { layoutMode })
      // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
      this.handleFixSidebar(false)
      // 触发窗口resize事件
      triggerWindowResizeEvent()
    },
    handleContentWidthChange(contentWidth) {
      this.$store.commit('SET_DEFAULT_SETTING', { contentWidth })
    },
    handleFixedHeader(fixedHeader) {
      this.$store.commit('SET_DEFAULT_SETTING', { fixedHeader })
    },
    handleAutoHideHeader(autoHideHeader) {
      this.$store.commit('SET_DEFAULT_SETTING', { autoHideHeader })
    },
    handleFixSidebar(fixSidebar) {
      if (this.layoutMode === 'top-menu') {
        fixSidebar = false
      }
      this.$store.commit('SET_DEFAULT_SETTING', { fixSidebar })
    }
  }
}
</script>

<style lang="less" scoped>
h3,
.setting-item {
  margin-bottom: @form-item-margin-bottom;
}

.tip {
  color: @text-color-secondary;
  font-size: 12px;
}
</style>
