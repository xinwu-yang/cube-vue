<template>
  <div class="head-info" :class="center && 'center'">
    <span>{{ title }}</span>
    <p>{{ content }}</p>
    <em v-if="bordered" />
  </div>
</template>

<script>
export default {
  name: 'HeadInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped></style>
