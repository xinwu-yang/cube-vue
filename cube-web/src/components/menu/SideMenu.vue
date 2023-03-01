<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', fixSidebar ? 'ant-fixed-side-menu' : null]"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <logo :show-title="!collapsed" />
    <s-menu :collapsed="collapsed" :menu="menus" @select="onSelect" :mode="mode" :style="smenuStyle"></s-menu>
  </a-layout-sider>
</template>

<script>
import ALayoutSider from 'ant-design-vue/es/layout/Sider'
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@tievd/cube-block/lib/utils/mixin.js'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'

export default {
  name: 'SideMenu',

  components: {
    ALayoutSider,
    Logo,
    SMenu
  },

  mixins: [mixin, mixinDevice, skinLayoutMixin],

  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },

  computed: {
    smenuStyle() {
      let style = { padding: '0' }
      if (this.fixSidebar) {
        style['height'] = 'calc(100% - 59px)'
        style['overflow'] = 'auto'
        style['overflow-x'] = 'hidden'
      }
      return style
    }
  },

  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style lang="less" scoped>
// 选中首页的时候不显示背景颜色
// /deep/.ant-menu.ant-menu-root {
//   & > .ant-menu-item:first-child {
//     background-color: transparent;
//   }
// }
.sider {
  max-width: @layout-sider-width !important;
  min-width: @layout-sider-width !important;
  width: @layout-sider-width !important;
  overflow: hidden;

  &.ant-layout-sider-collapsed {
    max-width: @layout-sider-collapsed-width !important;
    min-width: @layout-sider-collapsed-width !important;
    width: @layout-sider-collapsed-width !important;
  }

  .ant-menu {
    border-right: none;

    /deep/ .ant-menu-item {
      margin-top: 0;
    }
  }
}
</style>
