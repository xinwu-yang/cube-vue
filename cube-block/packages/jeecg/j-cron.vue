<template>
  <div class="components-input-demo-presuffix">
    <a-input @click="openModal" placeholder="cron表达式" v-model="cron" @change="(e) => handleOK(e.target.value)">
      <a-icon slot="prefix" type="schedule" title="cron控件" />
      <a-icon v-if="cron" slot="suffix" type="close-circle" @click="handleEmpty" title="清空" />
    </a-input>
    <j-cron-modal ref="innerVueCron" :data="cron" @ok="handleOK"></j-cron-modal>
  </div>
</template>
<script>
import JCronModal from './modal/j-cron-modal'
export default {
  name: 'JCron',
  components: {
    JCronModal
  },
  props: {
    value: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      cron: this.value
    }
  },
  watch: {
    value(val) {
      this.cron = val
    }
  },
  methods: {
    openModal() {
      this.$refs.innerVueCron.show()
    },
    handleOK(val) {
      this.cron = val
      this.$emit('change', this.cron)
      //this.$emit("change", Object.assign({},  this.cron));
    },
    handleEmpty() {
      this.handleOK('')
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>
