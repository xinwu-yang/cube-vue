# 更新日志

## 2.4.7

`2022-04-07`

- logout 请求方式改为 get
- 导入 excel 错误信息回显调整
- 导出文件不再改写文件名称
- 修改很多单词错误的 url
- j-select-depart 支持返回自己及下属部门

## 2.4.6

`2022-01-14`

- v-has 指令原版仅支持是否显示，新增判断是否禁用
- validateDuplicateValue() 支持自定义消息提示
- cube-select-enum 选择项改为 label->value
- j-image-upload 组件回显问题
- j-editable-table 可选择 checkbox 样式问题
- JEditableTableMixin.js 添加调用 addBefore() 方法

## 2.4.0

`2021-12-08`

- 删除了多个布局类组件和没有用到的图表组件，例如 logo、use-menu 等，以适用于 cube-web 的自定义皮肤和布局
- request 请求异常捕获，新增 http status 200 时，则按照返回的 code 做判断
- 修改组件样式、将样式提取为单独的 less 文件，以适配皮肤设置
- 支持配置是否开启密码加密传输

## 2.3.9

`2021-11-17`

- 注释在线编译主题的函数，因为没有用上
- 修改某些样式的值，使其可以适配自定义主题
- j-select-depart-modal、j-search-select-tag 搜索值使用 trim 去空格
- j-select-depart 新增可以搜索出父级也高亮的需求

## 2.3.6

`2021-11-08`

- 修复 j-search-select-tag 清空报错的 bug

## 2.3.5

`2021-11-04`

- 初次登录必须修改密码

## 2.3.4

`2021-10-08`

- token 过期时间为毫秒的 bug 修复
- utils/util 新增 hasPermissionAction 方法，判断是否拥有某个按钮/操作权限
- 数据字典刷新缓存请求，单词错误 refleshCache 改为 refreshCache
- sys/role/queryall 改为 sys/role/queryAll

## 2.3.2

`2021-09-29`

- token 升级
- 其他优化性更改

## 2.2.0

`2021-09-16`

- 分页 total 为字符串的处理
- 错误单词 titile 改为 title

## 2.1.2

`2021-08-04`

- 菜单新增自定义图标组件
- 修复 j-vxe-table 不能编辑和 VxeGrid 方法没有全量引入 JVxeTable 组件的问题，打包加入 JVxeTableInstall.js 和 JVxeCellsInstall.js

## 2.1.1

`2021-07-29`

- 新增枚举选择组件

## 2.1.0

`2021-07-27`

- 新增代码生成组件

- 验证码组件

- bug fixed

## 0.0.6

`2021-07-15`

- 第一个版本，包含多个结合魔方后端的常用组件和封装好的工具函数
