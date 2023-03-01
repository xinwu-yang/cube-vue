<template>
  <a-layout class="layout mobile">
    <a-drawer
      wrapClassName="drawer-sider"
      placement="left"
      @close="() => (this.collapsed = false)"
      :closable="false"
      :visible="collapsed"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        @menuSelect="menuSelect"
        :collapsed="false"
        :collapsible="true"
      ></side-menu>
    </a-drawer>

    <a-layout style="padding-left: 0" :class="['side-menu', `content-width-${contentWidth}`]">
      <!-- layout header -->
      <mobile-header :collapsed="collapsed" @toggle="toggle" />

      <!-- layout content -->
      <a-layout-content :style="{ height: '100%', paddingTop: fixedHeader ? '56px' : '0' }">
        <slot></slot>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer style="padding: 0px">
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import MobileHeader from './MobileHeader'
import GlobalFooter from '@/components/page/GlobalFooter'
import SideMenu from '@/components/menu/SideMenu'
import { triggerWindowResizeEvent } from '@tievd/cube-block/lib/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@tievd/cube-block/lib/utils/mixin.js'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'

export default {
  name: 'MobileLayout',

  components: {
    MobileHeader,
    GlobalFooter,
    SideMenu
  },

  mixins: [mixin, mixinDevice, skinLayoutMixin],

  data() {
    return {
      collapsed: false,
      activeMenu: {},
      menus: []
    }
  },

  computed: {
    ...mapState({
      // 主路由
      mainRouters: state => state.permission.addRouters,
      // 后台菜单
      permissionMenuList: state => state.user.permissionList
    })
  },

  watch: {
    sidebarOpened(val) {
      this.collapsed = !val
    }
  },

  created() {
    this.menus = this.permissionMenuList
  },

  methods: {
    ...mapActions(['setSidebar']),
    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    menuSelect() {
      this.collapsed = false
    }
  }
}
</script>

<style lang="less">
body {
  // 打开滚动条固定显示
  overflow-y: scroll;

  &.colorWeak {
    filter: invert(80%);
  }
}

.layout {
  min-height: 100vh !important;
  overflow-x: hidden;

  // 手机模式
  &.mobile {
    .ant-layout-content {
      .content {
        margin: 24px 0 0;
      }
    }

    /**
       * ant-table-wrapper
       * 覆盖的表格手机模式样式，如果想修改在手机上表格最低宽度，可以在这里改动
       */
    .ant-table-wrapper {
      .ant-table-content {
        overflow-y: auto;
      }
      .ant-table-body {
        min-width: 800px;
      }
    }

    .side-menu {
      .ant-header-fixed-header {
        &.ant-header-side-opened,
        &.ant-header-side-closed {
          width: 100%;
        }
      }
    }

    .header .user-wrapper .action {
      padding: 0 12px;
    }
  }

  &.ant-layout-has-sider {
    flex-direction: row;
  }

  // 内容区
  .layout-content {
    margin: 24px 24px 0px;
    height: 64px;
    padding: 0 12px 0 0;
  }
}

// drawer-sider 自定义
.ant-drawer.drawer-sider {
  .ant-drawer-content-wrapper {
    width: @layout-sider-width !important;
    overflow: hidden;
  }

  .sider {
    box-shadow: none;
  }

  .ant-drawer-content {
    background-color: @layout-sider-background;
  }

  .ant-drawer-wrapper-body::-webkit-scrollbar {
    display: none;
  }

  .ant-drawer-body {
    padding: 0;
  }
}

.side-menu {
  .ant-header-fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.2s;

    &.ant-header-side-opened {
      width: calc(100% - @layout-sider-width);
    }

    &.ant-header-side-closed {
      width: calc(100% - @layout-sider-collapsed-width);
    }
  }
}
</style>
