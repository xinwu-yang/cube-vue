<template>
  <div v-bind="fullScreenParentProps">
    <a-icon v-if="fullScreen" class="full-screen-icon" :type="iconType" @click="() => (fullCoder = !fullCoder)" />

    <div class="code-editor-cust full-screen-child">
      <a-textarea auto-size v-model="textareaValue" :placeholder="placeholderShow" @change="handleChange" :style="{ 'max-height': maxHeight + 'px', 'min-height': minHeight + 'px' }"></a-textarea>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'JCodeEditor2',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    // 是否显示全屏按钮
    fullScreen: {
      type: Boolean,
      default: false
    },
    // 全屏以后的z-index
    zIndex: {
      type: [Number, String],
      default: 999
    },
    // 是否自适应高度，可以传String或Boolean
    // 传 String 类型只能写"!ie" ，
    // 填写这个字符串，代表其他浏览器自适应高度
    // 唯独IE下不自适应高度，因为IE下不支持min、max-height样式
    // 如果填写的不是"!ie"就视为true
    autoHeight: {
      type: [String, Boolean],
      default: true
    },
    // 不自适应高度的情况下生效的固定高度
    height: {
      type: [String, Number],
      default: '240px'
    },
    language: {
      type: String,
      default: ''
    },
    minHeight:{
      type:Number,
      default: 100,
      required:false
    },
    maxHeight:{
      type:Number,
      default: 320,
      required:false
    }
  },
  data () {
    return {
      textareaValue: '',
      // 内部真实的内容
      code: '',
      iconType: 'fullscreen',
      hasCode:false,
      // 默认的语法类型
      mode: 'javascript',
      // 编辑器实例
      coder: null,
      // 默认配置
      options: {
        // 缩进格式
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        theme: 'panda-syntax',
        line: true,
        // extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
        hintOptions: {
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        },
      },

      // code 编辑器 是否全屏
      fullCoder: false
    }
  },
  watch: {
    fullCoder:{
      handler(value) {
        if(value){
          this.iconType="fullscreen-exit"
        }else{
          this.iconType="fullscreen"
        }
      }
    }
  },
  computed: {
    placeholderShow() {
      if (this.placeholder == null) {
        return `请在此输入代码`
      } else {
        return this.placeholder
      }
    },
    isAutoHeight() {
      let {autoHeight} = this
      if (typeof autoHeight === 'string' && autoHeight.toLowerCase().trim() === '!ie') {
        autoHeight = !(isIE() || isIE11())
      } else {
        autoHeight = true
      }
      return autoHeight
    },
    fullScreenParentProps() {
      let props = {
        class: {
          'full-screen-parent': true,
          'full-screen': this.fullCoder,
          'auto-height': this.isAutoHeight
        },
        style: {}
      }
      if (this.fullCoder) {
        props.style['z-index'] = this.zIndex
      }
      if (!this.isAutoHeight) {
        props.style['height'] = (typeof this.height === 'number' ? this.height + 'px' : this.height)
      }
      return props
    }
  },
  mounted () {
    // 初始化
    this._initialize()
  },
  methods: {
    // 初始化
    _initialize () {
      this.setCodeContent(this.value)
    },
    handleChange(e){
      this.$emit('input', e.target.value)
    },
    getCodeContent(){
      return this.value
    },
    setCodeContent(val){
      setTimeout(()=>{
        if(!val){
          this.textareaValue = ''
        }else{
          this.textareaValue = val
        }
      },300)
    },
    nullTipClick(){
      this.coder.focus()
    }
  }
}
</script>
