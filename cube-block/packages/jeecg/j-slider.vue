<template>
  <div class="cube-slider" ref="dragDiv">
    <div class="cube-slider-bg"></div>
    <div class="cube-slider-text">{{ confirmWords }}</div>
    <div ref="moveDiv" @mousedown="mousedownFn($event)" :class="{ handler_ok_bg: confirmSuccess }" class="cube-slider-handler cube-slider-handler-bg"></div>
  </div>
</template>

<script>
export default {
  name: 'JSlider',
  data() {
    return {
      beginClientX: 0 /*距离屏幕左端距离*/,
      mouseMoveStata: false /*触发拖动状态  判断*/,
      maxwidth: '' /*拖动最大宽度，依据滑块宽度算出来的*/,
      confirmWords: '拖动滑块验证' /*滑块文字*/,
      confirmSuccess: false /*验证成功判断*/
    }
  },
  methods: {
    isSuccess() {
      return this.confirmSuccess
    },
    mousedownFn: function(e) {
      if (!this.confirmSuccess) {
        e.preventDefault && e.preventDefault() //阻止文字选中等 浏览器默认事件
        this.mouseMoveStata = true
        this.beginClientX = e.clientX
      }
    }, //mousedoen 事件
    successFunction() {
      this.confirmSuccess = true
      this.confirmWords = '验证通过'
      if (window.addEventListener) {
        document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn)
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn)
      } else {
        document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => {})
      }
      document.getElementsByClassName('cube-slider-text')[0].style.color = '#fff'
      document.getElementsByClassName('cube-slider-handler')[0].style.left = this.maxwidth + 'px'
      document.getElementsByClassName('cube-slider-bg')[0].style.width = this.maxwidth + 'px'

      this.$emit('onSuccess', true)
    }, //验证成功函数
    mouseMoveFn(e) {
      if (this.mouseMoveStata) {
        let width = e.clientX - this.beginClientX
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName('cube-slider-handler')[0].style.left = width + 'px'
          document.getElementsByClassName('cube-slider-bg')[0].style.width = width + 'px'
        } else if (width > this.maxwidth) {
          this.successFunction()
        }
      }
    }, //mousemove事件
    moseUpFn(e) {
      this.mouseMoveStata = false
      var width = e.clientX - this.beginClientX
      if (width < this.maxwidth) {
        // ---- update-begin- author:sunjianlei --- date:20191009 --- for: 修复获取不到 handler 的时候报错 ----
        let handler = document.getElementsByClassName('handler')[0]
        if (handler) {
          handler.style.left = 0 + 'px'
          document.getElementsByClassName('cube-slider-bg')[0].style.width = 0 + 'px'
        }
        // ---- update-end- author:sunjianlei --- date:20191009 --- for: 修复获取不到 handler 的时候报错 ----
      }
    } //mouseup事件
  },
  mounted() {
    this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth
    document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn)
    document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn)
  }
}
</script>
