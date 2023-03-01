<template>
  <j-input-pop :value="innerValue" :width="300" :height="210" v-bind="cellProps" style="width: 100%;" @change="handleChangeCommon" />
</template>

<script>
  import JInputPop from '../../../jeecg/minipop/j-input-pop'
  import JVxeCellMixins, { dispatchEvent } from '../../mixins/JVxeCellMixins'

  export default {
    name: 'JVxeTextareaCell',
    mixins: [JVxeCellMixins],
    components: { JInputPop },
    // 【组件增强】注释详见：JVxeCellMixins.js
    enhanced: {
      installOptions: {
        autofocus: '.ant-input'
      },
      aopEvents: {
        editActived: (event) => dispatchEvent(event, 'anticon-fullscreen')
      }
    }
  }
</script>

<style scoped></style>
