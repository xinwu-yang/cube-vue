<template>
  <div :class="disabled ? 'jeecg-form-container-disabled' : ''">
    <fieldset :disabled="disabled">
      <slot name="detail"></slot>
    </fieldset>
    <slot name="edit"></slot>
    <fieldset disabled>
      <slot></slot>
    </fieldset>
  </div>
</template>

<script>
/**
 * 使用方法
 * 在form下直接写这个组件就行了，
 *<a-form layout="inline" :form="form" >
 *     <j-form-container :disabled="true">
 *         <!-- 表单内容省略..... -->
 *     </j-form-container>
 *</a-form>
 */
export default {
  name: 'JFormContainer',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  mounted() {
    console.log('我是表单禁用专用组件,但是我并不支持表单中iframe的内容禁用')
  }
}
</script>
