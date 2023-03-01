<template>
  <a-select :value="selectValue" :allowClear="true" :mode="multi ? 'multiple' : ''" :disabled="disabled" :placeholder="placeholder" @change="handleChange">
    <a-select-option v-for="(item, index) in options" :key="index" :value="item.value ? item.value : item">{{ item.label ? item.label : item }}</a-select-option>
  </a-select>
</template>

<script>
import { getAction } from '@tievd/cube-block/src/api/manage'
export default {
  name: 'CubeSelectEnum',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    // 枚举名称
    enum: {
      type: String,
      default: '',
      required: true
    },
    // 是否多选
    multi: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array],
      default: undefined
    }
  },

  data() {
    return {
      options: []
    }
  },

  computed: {
    selectValue() {
      return this.value
    }
  },

  async created() {
    try {
      let res = await getAction(`/sys/common/enumValueList`, { enumClassPath: this.enum })
      if (res.success) {
        this.options = res.result
      }
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
