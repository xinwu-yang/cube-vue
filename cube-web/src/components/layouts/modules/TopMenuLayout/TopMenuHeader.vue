<template>
  <a-layout-header v-if="!headerBarFixed" style="padding:0" :class="fixedHeader && 'ant-header-fixed-header'">
    <div class="top-nav-header-index">
      <div class="header-index-wide">
        <div class="header-index-left" :style="topMenuStyle.headerIndexLeft">
          <logo class="top-nav-header" :show-title="true" :style="topMenuStyle.topNavHeader" />
          <div :style="topMenuStyle.topSMenuStyle">
            <s-menu mode="horizontal" :menu="menus"></s-menu>
          </div>
        </div>
        <user-menu class="header-index-right" :style="topMenuStyle.headerIndexRight" />
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { mixin } from '@tievd/cube-block/lib/utils/mixin.js'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'
import UserMenu from '@/components/tools/UserMenu'
import SMenu from '@/components/menu/index'
import Logo from '@/components/tools/Logo'

export default {
  name: 'TopMenuHeader',

  components: {
    UserMenu,
    SMenu,
    Logo
  },

  mixins: [mixin, skinLayoutMixin],

  props: {
    menus: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      headerBarFixed: false,
      topMenuStyle: {
        headerIndexLeft: {},
        topNavHeader: {},
        headerIndexRight: {},
        topSMenuStyle: {}
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.buildTopMenuStyle()
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
    buildTopMenuStyle() {
      const rightWidth = '380px' // 右侧用户操作栏宽度
      const topNavHeaderWidth = '180px' // 左侧logo和title宽度
      this.topMenuStyle.topNavHeader = { 'min-width': topNavHeaderWidth }
      this.topMenuStyle.topSMenuStyle = { width: `calc(100% - ${topNavHeaderWidth})` }
      this.topMenuStyle.headerIndexRight = { 'min-width': rightWidth }
      this.topMenuStyle.headerIndexLeft = { width: `calc(100% - ${rightWidth})` }
    }
  }
}
</script>

<style lang="less" scoped>
// 顶部菜单
.top-nav-header-index {
  box-shadow: 0 1px 4px @box-shadow-base;
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
</style>
