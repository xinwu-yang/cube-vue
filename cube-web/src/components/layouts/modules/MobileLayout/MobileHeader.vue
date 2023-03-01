<template>
  <a-layout-header
    v-if="!headerBarFixed"
    :class="[
      fixedHeader && 'ant-header-fixed-header',
      sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed'
    ]"
    :style="{ padding: '0' }"
  >
    <div class="header">
      <a-icon class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle"></a-icon>
      <span>cube</span>
      <user-menu />
    </div>
  </a-layout-header>
</template>

<script>
import { mixin } from '@tievd/cube-block/lib/utils/mixin.js'
import UserMenu from '@/components/tools/UserMenu'
import skinLayoutMixin from '@/mixins/skin-layout-mixin'

export default {
  name: 'MobileHeader',

  components: {
    UserMenu
  },

  mixins: [mixin, skinLayoutMixin],

  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      headerBarFixed: false
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
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
    }
  }
}
</script>

<style lang="less" scoped>
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
