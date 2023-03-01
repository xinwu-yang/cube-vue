## 安装

```shell
npm install @tievd/cube-block -S
```

## 使用

```javascript
import Vue from 'vue'
import CubeBlock from '@tievd/cube-block'

Vue.use(CubeBlock)

// or
import {
  JMultiSelectTag,
  JSelectRole
  // ...
} from '@tievd/cube-block'

Vue.use(JMultiSelectTag)
Vue.use(JSelectRole)
```

## .npmignore 不起作用的原因

package.json 中 files 字段被视为白名单，不会被忽略
"files": [
"lib",
"src",
"packages",
"types"
],

# 接下来需要做的事

- **cube-block** 和 **cube-web** 中所有默认的url，应该都提取为变量，存在 **cube-block** 中，方便修改和版本升级
- 机构树有子级是否不让删除
- 魔方其他bug修复
- 是否升级为 **vue3**

# 开发帮助

## 目录说明

- build    开发打包相关脚本
- examples    组件测试示例
- packages    魔方所有组件，例如部门选择器等，支持按需加载，具体可以参考[魔方前端使用文档](http://125.71.201.11:9004/cube/cube-document-web)
- src    api、store等不需要暴露给前端用户的js

## 如何新写一个组件

在项目目录下执行 **npm run new:comp componentName** (componentName为新增组件名)，就会在 **packages** 目录下生成一个组件的基本框架，并新增到 **components.json** 中，再修改生成的 **/packages/componentName/src/main.vue** 文件，就可以完成组件的编写。

## 如何测试组件

- 在项目目录下执行 **npm run serve** 或 **yarn serve**
- 在 **/examples/App.vue** 中引入组件，即可测试

## 如何发布新版本

编写好组件并测试没问题后，在项目目录下执行 **npm run pub** ，就会执行发布的shell脚本，根据提示选择需要发布的版本号即可。

## 注意事项

- 每次修改后，应该在CHANGELOG.md中记录更新日志
- 每次修改后，应该同步更新[魔方前端使用文档](http://125.71.201.11:9004/cube/cube-document-web)

