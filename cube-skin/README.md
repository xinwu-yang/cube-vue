## 安装

```shell
npm install @tievd/cube-skin -D
# or
yarn add @tievd/cube-skin -D
```

## 使用

### 魔方提供的皮肤

目前可供选择的皮肤有以下几种：

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

### 自定义皮肤

```less
// 第一步：创建自己的皮肤文件，例如 /src/assets/skin/my-skin.less
@import "~@tievd/cube-skin/lib/light.less"; // 或其他

@primary-color: red;
...
// 第二步：vue.config.js 中修改
...
less: {
  modifyVars: {
    hack: `true; @import (reference) "${path.resolve(`src/assets/skin/my-skin.less`)}";` // light.less、dark.less 或者其他你想使用的皮肤
  },
  javascriptEnabled: true
}
...
```

# 开发帮助 

## 如何开发新皮肤

仿照 **/lib/dark.less** 等，修改或新增less变量，完成新皮肤

## 如何发布新版本

在项目目录下执行 **npm run pub** ，就会执行发布的shell脚本，根据提示选择发布的版本号即可。
