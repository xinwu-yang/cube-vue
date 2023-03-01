<template>
  <a-layout class="layout desktop">
    <side-menu
      mode="inline"
      :menus="menus"
      @menuSelect="myMenuSelect"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout
      :class="['side-menu', `content-width-${contentWidth}`]"
      :style="{ paddingLeft: fixSidebar && isDesktop() ? `${sidebarOpened ? 208 : 80}px` : '0' }"
    >
      <!-- layout header -->
      <side-menu-header :menus="menus" :collapsed="collapsed" @toggle="toggle" />

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
import SideMenuHeader from './SideMenuHeader'
import GlobalFooter from '@/components/page/GlobalFooter'
import SideMenu from '@/components/menu/SideMenu'
import { triggerWindowResizeEvent } from '@tievd/cube-block/lib/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@tievd/cube-block/lib/utils/mixin.js'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'

export default {
  name: 'SideMenuLayout',

  components: {
    SideMenuHeader,
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
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    myMenuSelect(value) {
      // 此处触发动态路由被点击事件
      this.findMenuByKey(this.menus, value.key)
      this.$emit('dynamicRouterShow', value.key, this.activeMenu.meta.title)
      let storeKey = 'route:title:' + this.activeMenu.path
      this.$ls.set(storeKey, this.activeMenu.meta.title)
    },
    findMenuByKey(menus, key) {
      for (let i of menus) {
        if (i.path == key) {
          this.activeMenu = { ...i }
        } else if (i.children && i.children.length > 0) {
          this.findMenuByKey(i.children, key)
        }
      }
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

.layout .top-nav-header-index .user-wrapper .action .anticon {
  color: inherit !important;
}

// 侧边菜单
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

// 菜单样式
.sider {
  // box-shadow: 2px 116px 6px 0 rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;

  &.ant-fixed-side-menu {
    position: fixed;
    height: 100%;
  }
}
</style>
