<template>
  <a-layout :class="['layout', device]">
    <template v-if="layoutMode === 'side-menu'">
      <a-drawer
        v-if="device === 'mobile'"
        wrapClassName="drawer-sider"
        placement="left"
        @close="() => (this.collapsed = false)"
        :closable="false"
        :visible="collapsed"
        width="200px"
      >
        <side-menu
          v-if="device === 'mobile'"
          mode="inline"
          :menus="menus"
          @menuSelect="menuSelect"
          :collapsed="false"
          :collapsible="true"
        ></side-menu>
      </a-drawer>

      <side-menu
        v-else-if="device === 'desktop'"
        mode="inline"
        :menus="menus"
        @menuSelect="myMenuSelect"
        :collapsed="collapsed"
        :collapsible="true"
      ></side-menu>
    </template>
    <!-- 下次优化这些代码 -->
    <template v-else>
      <a-drawer
        v-if="device === 'mobile'"
        wrapClassName="drawer-sider"
        placement="left"
        @close="() => (this.collapsed = false)"
        :closable="false"
        :visible="collapsed"
        width="200px"
      >
        <side-menu
          mode="inline"
          :menus="menus"
          @menuSelect="menuSelect"
          :collapsed="false"
          :collapsible="true"
        ></side-menu>
      </a-drawer>
    </template>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: fixSidebar && isDesktop() ? `${sidebarOpened ? 208 : 80}px` : '0' }"
    >
      <!-- layout header -->
      <global-header :mode="layoutMode" :menus="menus" :collapsed="collapsed" :device="device" @toggle="toggle" />

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
import GlobalHeader from '@/components/page/GlobalHeader'
import GlobalFooter from '@/components/page/GlobalFooter'
import SideMenu from '@/components/menu/SideMenu'
import { triggerWindowResizeEvent } from '@tievd/cube-block/lib/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@tievd/cube-block/lib/utils/mixin.js'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'

export default {
  name: 'GlobalLayout',
  components: {
    GlobalHeader,
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
    //--update-begin----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
    //this.menus = this.mainRouters.find((item) => item.path === '/').children;
    this.menus = this.permissionMenuList
    // 根据后台配置菜单，重新排序加载路由信息
    //console.log('----加载菜单逻辑----')
    //console.log(this.mainRouters)
    //console.log(this.permissionMenuList)
    //--update-end----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
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
    //update-begin-author:taoyan date:20190430 for:动态路由title显示配置的菜单title而不是其对应路由的title
    myMenuSelect(value) {
      //此处触发动态路由被点击事件
      this.findMenuBykey(this.menus, value.key)
      this.$emit('dynamicRouterShow', value.key, this.activeMenu.meta.title)
      // update-begin-author:sunjianlei date:20191223 for: 修复刷新后菜单Tab名字显示异常
      let storeKey = 'route:title:' + this.activeMenu.path
      this.$ls.set(storeKey, this.activeMenu.meta.title)
      // update-end-author:sunjianlei date:20191223 for: 修复刷新后菜单Tab名字显示异常
    },
    findMenuBykey(menus, key) {
      for (let i of menus) {
        if (i.path == key) {
          this.activeMenu = { ...i }
        } else if (i.children && i.children.length > 0) {
          this.findMenuBykey(i.children, key)
        }
      }
    }
    //update-end-author:taoyan date:20190430 for:动态路由title显示配置的菜单title而不是其对应路由的title
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

    .top-menu {
      /* 必须为 top-menu  才能启用流式布局 */
      &.content-width-fluid {
        .header-index-wide {
          margin-left: 0;
        }
      }
    }
    .header,
    .top-nav-header-index {
      .user-wrapper .action {
        padding: 0 12px;
      }
    }

    .top-nav-header-index {
      .header-index-wide {
        .header-index-left {
          .trigger {
            color: @text-color;
            padding: 0 12px;
          }

          .logo.top-nav-header {
            text-align: center;
            width: 56px;
            line-height: 58px;
          }
        }
      }

      .user-wrapper .action .avatar {
        margin: 20px 0;
      }
    }
  }

  &.ant-layout-has-sider {
    flex-direction: row;
  }

  // 平板模式
  &.tablet {
    // overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
    .top-nav-header-index {
      .header-index-wide {
        .header-index-left {
          .logo > a {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  // 内容区
  .layout-content {
    margin: 24px 24px 0px;
    height: 64px;
    padding: 0 12px 0 0;
  }
}

// 顶部菜单模式
.top-menu {
  .page-header-index-wide {
    margin: 0 auto;
    width: 100%;
  }

  .ant-header-fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.2s;

    &.ant-header-side-opened {
      width: 100%;
    }

    &.ant-header-side-closed {
      width: 100%;
    }
  }
  /* 必须为 top-menu  才能启用流式布局 */
  &.content-width-fluid {
    .header-index-wide {
      max-width: unset;
      margin-left: 24px;
    }

    .page-header-index-wide {
      max-width: unset;
    }
  }
}

.layout .top-nav-header-index .user-wrapper .action .anticon {
  color: inherit !important;
}

// drawer-sider 自定义
.ant-drawer.drawer-sider {
  .sider {
    box-shadow: none;
  }

  .ant-drawer-content {
    background-color: @component-background;
  }

  .ant-drawer-body {
    padding: 0;
  }
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
      width: calc(100% - 200px);
    }

    &.ant-header-side-closed {
      width: calc(100% - 80px);
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
