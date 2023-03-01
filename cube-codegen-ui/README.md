## 安装

```shell
npm install @tievd/cube-generate-code -S
// or
yarn add @tievd/cube-generate-code
```

## 使用

```javascript
import Vue from 'vue'
import CubeGenerateCode from '@tievd/cube-generate-code'

Vue.use(CubeGenerateCode)

// or
import {
  GenerateCode,
  ColumnFilter
  // ...
} from 'cube-generate-code'

Vue.use(GenerateCode)
Vue.component(ColumnFilter)
```

# 接下来需要做的事

- 新增一对多等情境下的模板
- 通过form表单配置，Schema入库，不再通过实体类生成
- 重写为命令行工具，将代码直接生成到项目目录中，不再通过浏览器下载

# 开发帮助

## 目录说明

- build    开发打包相关脚本
- examples    组件测试示例
- packages
  - column-filter    表格列显示筛选组件
  - generate-code    代码生成
    - src
      - common    生成公共部分的代码
      - oneToMany    一对多
        - default    默认模板
          - java    java部分代码，结构根据后端要求来
          - vue    vue部分代码，结构根据魔方要求来
          - GenerateCode.js    生成默认一对多代码
        - erp    erp类型模板，未写
      - oneToOne    一对一
        - default    默认模板
          - java     java部分代码，结构根据后端要求来
          - vue    vue部分代码，结构根据魔方要求来
          - GenerateCode.js    生成默认一对一代码
        - erp    erp类型模板，未写
      - data.json    mock一对一测试数据
      - main.vue    代码生成器入口文件
      - oneToManyData.backup.json    mock一对多测试数据
      - oneToManyData.json    mock一对多测试数据
    - index.js
    - utils.js    工具函数
- src    api、store等不需要暴露给前端用户的js

## 如何新写一个模板

根据 **ejs** 规则，在 **/packages/generate-code/src/** 中新建模板编写

使用 **jszip** 生成压缩包目录，**ejs** 编写代码模板

## 如何测试组件

- 在项目目录下执行 **npm run serve** 或 **yarn serve**
- 在浏览器中打开页面即可测试

## 如何发布新版本

测试没问题后，在项目目录下执行 **npm run pub** ，就会执行发布的shell脚本，根据提示选择发布的版本号即可。

## 注意事项

- 每次修改后，应该在CHANGELOG.md中记录更新日志
- 每次修改后，应该同步更新[魔方前端使用文档](http://125.71.201.11:9004/cube/cube-document-web)代码生成器部分内容
