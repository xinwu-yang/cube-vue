export default `<template>
  <j-modal :title="title" :width="1200" :visible="visible" :maskClosable="false" switchFullscreen @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }" @cancel="handleCancel">
    <<%= entityNameLine %>-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit" />
  </j-modal>
</template>

<script>
import <%= entityNameUpper %>Form from './<%= entityNameUpper %>Form'

export default {
  name: '<%= entityNameUpper %>Modal',

  components: {
    <%= entityNameUpper %>Form
  },

  data() {
    return {
      title: '',
      visible: false,
      disableSubmit: false
    }
  },

  methods: {
    add() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.add()
      })
    },
    edit(record) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.edit(record)
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      this.$refs.realForm.handleOk()
    },
    submitCallback() {
      this.$emit('ok')
      this.visible = false
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>

<style scoped lang="less"></style>`
