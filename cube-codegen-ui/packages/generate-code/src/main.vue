<template>
  <a-card :bordered="false">
    <a-spin :spinning="confirmLoading" tip="正在生成代码...">
      <a-form :form="form">
        <!-- @keyup.enter.native="handleSubmit" -->
        <!-- <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item>
              <a-input placeholder="请输入包名" v-decorator="['className', validatorRules.className]"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-button type="primary" @click="handleSubmit">确定</a-button>
            </a-form-item>
          </a-col>
        </a-row> -->

        <a-row :gutter="24">
          <a-col :md="24">
            <template v-for="(tag, index) in tags">
              <a-tag :key="index" :closable="true" @close="() => handleClose(tag)">
                {{ tag }}
              </a-tag>
            </template>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item>
              <!-- @blur="handleInputConfirm" -->
              <a-input ref="input" type="text" placeholder="请输入包名" :value="inputValue" @change="handleInputChange" @keyup.enter="handleInputConfirm"></a-input>
              <div style="color: #999">
                <a-icon type="info-circle" />
                <span> 使用回车可以输入多个包名</span>
              </div>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-button type="primary" @click="handleBatchSubmit">确定</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
import GenerateCodeOneToOneDefault from './oneToOne/default/GenerateCode'
import GenerateCodeOneToManyDefault from './oneToMany/default/GenerateCode'
import axios from 'axios'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import moment from 'dayjs'

export default {
  name: 'GenerateCode',

  data() {
    return {
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        className: {
          rules: [{ required: true, message: '请输入包名' }]
        }
      },
      tags: [],
      inputValue: ''
    }
  },

  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag)
      this.tags = tags
    },
    handleInputChange(e) {
      this.inputValue = e.target.value
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        inputValue: ''
      })
    },
    async handleBatchSubmit() {
      let tags = [...this.tags]
      if (this.inputValue) {
        tags.push(this.inputValue)
      }
      if (tags.length) {
        let zip = new JSZip()
        let isMultiple = tags.length > 1 // 是否为批量生成
        try {
          for (let value of tags) {
            this.confirmLoading = true
            const url = window._CONFIG['domianURL'] + '/codegen/generate'
            let res = await axios.get(
              url,
              {
                params: { className: value }
              },
              { timeout: 9000 }
            )
            // 请求后台获取table、表单、后端代码数据结构
            if (res.data && res.data.success) {
              let genCode = null
              // let zipItem = zip.folder(`${res.data.result.javaCodeParams.description}_${new Date().getTime()}`)
              if (res.data.result.subTableList.length) {
                // 一对多
                genCode = new GenerateCodeOneToManyDefault(res.data.result, zip, isMultiple)
              } else {
                // 一对一
                genCode = new GenerateCodeOneToOneDefault(res.data.result, zip, isMultiple)
              }
              genCode.saveCode()
            } else if (!res.data.success) {
              throw new Error(res.data.message)
            }
          }
          this.$notification.success({
            message: '系统提示',
            description: '解压文件，保存到合适目录'
          })
          if (isMultiple) {
            zip.generateAsync({ type: 'blob' }).then((content) => {
              saveAs.saveAs(content, `批量代码生成_${moment(new Date()).format('YYYY年MM月DD日HH时mm分ss秒')}.zip`)
            })
          }
        } catch (err) {
          this.$notification.warning({ message: '代码生成失败', description: err.message })
          console.log(err)
        } finally {
          this.confirmLoading = false
        }
      } else {
        this.$message.warning('请至少输入一个包名')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
