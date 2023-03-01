<template>
  <router-link :to="{ name: 'dashboard' }">
    <div class="flex logo-container flex-start">
      <img class="logo-img" src="@/assets/img/logo.png" alt="logo" />
      <h1 class="logo-title" v-if="showTitle">{{ title }}</h1>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Logo',

  props: {
    title: {
      type: String,
      default: '魔方平台',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>
<style lang="less" scoped>
.logo {
  &-container {
    position: relative;
    height: @layout-header-height;
    line-height: @layout-header-height;
    background-color: @layout-logo-background;
    box-shadow: none;
    transition: background 300ms;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    overflow: hidden;

    &:hover .logo-title {
      color: @layout-logo-color-hover;
    }
  }

  &-img,
  &-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-img {
    height: 32px;
    padding: 0 16px;
  }

  &-title {
    margin: 0;
    color: @layout-logo-color;
    font-weight: 600;
    font-size: @font-size-lg;
    font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
  }
}
</style>
