<template>
  <a-layout class="layout desktop">
    <a-layout :class="['top-menu', `content-width-${contentWidth}`]" :style="{ paddingLeft: fixSidebar && `80px` }">
      <!-- layout header -->
      <top-menu-header :menus="menus" />

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
import TopMenuHeader from './TopMenuHeader'
import GlobalFooter from '@/components/page/GlobalFooter'
import SideMenu from '@/components/menu/SideMenu'
import { mapState } from 'vuex'
import { mixin, mixinDevice } from '@tievd/cube-block/lib/utils/mixin.js'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'

export default {
  name: 'TopMenuLayout',

  components: {
    TopMenuHeader,
    GlobalFooter,
    SideMenu
  },

  mixins: [mixin, mixinDevice, skinLayoutMixin],

  data() {
    return {
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

  created() {
    this.menus = this.permissionMenuList
  }
}
</script>

<style scoped lang="less">
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
</style>
