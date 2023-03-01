<template>
  <a-layout-header
    v-if="!headerBarFixed"
    :class="[
      fixedHeader && 'ant-header-fixed-header',
      sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed'
    ]"
    :style="{ padding: '0' }"
  >
    <div v-if="mode === 'side-menu'" class="header">
      <a-icon
        v-if="device === 'mobile'"
        class="trigger"
        :type="collapsed ? 'menu-fold' : 'menu-unfold'"
        @click="toggle"
      ></a-icon>
      <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />

      <span v-if="device === 'desktop'"> 欢迎进入天翼快速开发平台 —— "魔方" </span>
      <span v-else>cube</span>

      <user-menu />
    </div>
    <!-- 顶部导航栏模式 -->
    <div v-else-if="mode === 'top-menu'" class="top-nav-header-index">
      <div class="header-index-wide">
        <div class="header-index-left" :style="topMenuStyle.headerIndexLeft">
          <logo class="top-nav-header" :show-title="showTitle" :style="topMenuStyle.topNavHeader" />
          <div v-if="device !== 'mobile'" :style="topMenuStyle.topSMenuStyle">
            <s-menu mode="horizontal" :menu="menus"></s-menu>
          </div>
          <a-icon v-else class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle"></a-icon>
        </div>
        <user-menu class="header-index-right" :style="topMenuStyle.headerIndexRight" />
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { mixin } from '@tievd/cube-block/lib/utils/mixin.js'
import UserMenu from '@/components/tools/UserMenu'
import SMenu from '@/components/menu/index'
import Logo from '@/components/tools/Logo'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'

export default {
  name: 'GlobalHeader',

  components: {
    UserMenu,
    SMenu,
    Logo
  },

  mixins: [mixin, skinLayoutMixin],

  props: {
    mode: {
      type: String,
      default: 'side-menu'
    },
    menus: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },

  data() {
    return {
      platform_alias: process.env.VUE_APP_PLATFORM_ALIAS,
      headerBarFixed: false,
      //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
      topMenuStyle: {
        headerIndexLeft: {},
        topNavHeader: {},
        headerIndexRight: {},
        topSMenuStyle: {}
      },
      chatStatus: ''
    }
  },

  computed: {
    showTitle() {
      return this.device !== 'mobile'
    }
  },

  watch: {
    /** 监听设备变化 */
    device() {
      if (this.mode === 'top-menu') {
        this.buildTopMenuStyle()
      }
    },
    /** 监听导航栏模式变化 */
    mode(newVal) {
      if (newVal === 'top-menu') {
        this.buildTopMenuStyle()
      }
    }
  },

  //update-end--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
    if (this.mode === 'top-menu') {
      this.buildTopMenuStyle()
    }
    //update-end--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
  },

  methods: {
    handleScroll() {
      if (this.autoHideHeader) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 100) {
          this.headerBarFixed = true
        } else {
          this.headerBarFixed = false
        }
      } else {
        this.headerBarFixed = false
      }
    },
    toggle() {
      this.$emit('toggle')
    },
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
    buildTopMenuStyle() {
      if (this.mode === 'top-menu') {
        if (this.device === 'mobile') {
          // 手机端需要清空样式，否则显示会错乱
          this.topMenuStyle.topNavHeader = {}
          this.topMenuStyle.topSMenuStyle = {}
          this.topMenuStyle.headerIndexRight = {}
          this.topMenuStyle.headerIndexLeft = {}
        } else {
          const rightWidth = '380px' // 右侧用户操作栏宽度
          const topNavHeaderWidth = '180px' // 左侧logo和title宽度
          this.topMenuStyle.topNavHeader = { 'min-width': topNavHeaderWidth }
          this.topMenuStyle.topSMenuStyle = { width: `calc(100% - ${topNavHeaderWidth})` }
          this.topMenuStyle.headerIndexRight = { 'min-width': rightWidth }
          this.topMenuStyle.headerIndexLeft = { width: `calc(100% - ${rightWidth})` }
        }
      }
    }
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
  }
}
</script>

<style lang="less" scoped>
// 顶部菜单
.top-nav-header-index {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  transition: background 0.3s, width 0.2s;
  color: @layout-header-color;

  .header-index-wide {
    width: 100%;
    margin: auto;
    padding: 0 20px 0 0;
    display: flex;
    height: @layout-header-height;
    margin-left: 10px;

    .ant-menu.ant-menu-horizontal {
      height: @layout-header-height;
      line-height: @layout-header-height;
    }

    .ant-menu.ant-menu-horizontal {
      border: none;
      height: @layout-header-height;
      line-height: @layout-header-height;
    }

    .header-index-left {
      flex: 1 1;
      display: flex;

      .logo.top-nav-header {
        width: 165px;
        height: @layout-header-height;
        position: relative;
        line-height: @layout-header-height;
        transition: all 0.3s;
        overflow: hidden;

        img {
          display: inline-block;
          vertical-align: middle;
          height: 32px;
        }

        h1 {
          // color: #fff;
          display: inline-block;
          vertical-align: top;
          font-size: 16px;
          margin: 0 0 0 12px;
          font-weight: 400;
        }
      }
    }

    .header-index-right {
      float: right;
      height: @layout-header-height;
      overflow: hidden;
      .action:hover {
        background-color: @item-hover-bg;
      }
    }
  }
}

// 侧边菜单
.header {
  position: relative;
  z-index: 2;
  color: @layout-header-color;
  height: @layout-header-height;
  background: @layout-header-background;
  transition: background 300ms;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .trigger {
    height: 42px;
    line-height: 42px;
    font-size: 22px;
    padding: 0 16px;
    cursor: pointer;
    transition: color 300ms, background 300ms;

    &:hover {
      background: @item-hover-bg;
    }
  }
}
</style>
