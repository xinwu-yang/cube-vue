# 魔方快速开发平台-前端框架

版本：2.5.x

### 前端技术栈

- Node.js 14+
- vue 2.6.14
- ant-design-vue 1.7.8
- @vue/cli 3.3.0+
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 头像裁剪组件
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - Alipay AntV 数据可视化图表
- [viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation) - antv/g2 封装实现

### 开发文档

- [魔方快速开发平台前端](http://125.71.201.11:10086/project-2)
- [Vue](https://cn.vuejs.org/v2/guide)
- [Ant Design Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn)
- [报表 viser-vue](https://viserjs.github.io/demo.html#/viser/bar/basic-bar)

### 快速开始

- 拉取项目代码

```bash
git clone http://125.71.201.11:9004/cube/cube-web.git -b 2.5.x
```

- 安装依赖

```bash
yarn install
```

- 开发模式运行

```bash
yarn serve // 默认亮色主题，其他主题，例如暗黑主题使用 yarn server --theme dark
```

- 编译项目

```bash
yarn build
```

- Lints and fixes files

```bash
yarn lint
```

### 开发技巧

#### 密码传输加密

默认开启，如需关闭可在 `src/config/default-setting.js` 中设置

#### 皮肤更改或自定义皮肤

1. 使用

使用魔方提供的皮肤，目前可供选择的皮肤有以下几种：

- 亮色皮肤：light.less
- 暗黑皮肤：dark.less
- 纯黑皮肤：black.less

```javascript
// vue.config.js 中修改
...
less: {
  modifyVars: {
    hack: `true; @import (reference) "~@tievd/cube-skin/lib/light.less";` // 或者其他你想使用的皮肤
  },
  javascriptEnabled: true
}
...
```

2. 自定义皮肤

```less
// 第一步：创建自己的皮肤文件，例如 /src/assets/skin/my-skin.less
@import "~@tievd/cube-skin/lib/light.less"; // light.less、dark.less 或者其他你想使用的皮肤

@primary-color: red;
...
// 第二步：vue.config.js 中修改
...
less: {
  modifyVars: {
    hack: `true; @import (reference) "${path.resolve(`src/assets/skin/my-skin.less`)}";`
  },
  javascriptEnabled: true
}
...
```

#### 布局

1. 默认布局

默认侧菜单布局，如需调整可在 `src/config/default-setting.js` 中设置，目前魔方提供以下布局：

- 侧边菜单: side-menu
- 顶部菜单: top-menu
- 手机模式: mobile

2. 自定义布局

在 `src/components/layouts/TabLayout.vue`中引入你的自定义布局文件，布局的书写可以参考`src/components/layouts/modules`下的几种默认布局文件

#### 关闭 Eslint

移除 `package.json` 中 `eslintConfig` 整个节点代码