<template>
  <div class="footer">
    <div class="links">
      <a href="http://www.tievd.com" target="_blank">魔方 首页</a>
      <a href="https://ant.design/">Ant Design</a>
      <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" />
      2019 <span>天翼研究院 出品</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a:not(:last-child) {
      margin-right: 40px;
    }
  }
}
</style>
