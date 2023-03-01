'use strict'

console.log('start')
process.on('exit', () => {
  console.log('exit')
})

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name')
  process.exit(1)
}

// const axios = require('axios')
// let data = []
// axios.get('http://localhost:2018/api/common/clubs').then((res) => {
//   console.log(res.data)
// })
// return

const path = require('path')
const fs = require('fs')
const fileSave = require('file-save')
const camelCase = require('camelcase')
const componentName = process.argv[2]
const chineseName = process.argv[3] || componentName
const ComponentName = camelCase(componentName, { pascalCase: true })
const PackagePath = path.resolve(__dirname, '../../packages', componentName)
const Files = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './src/main';

/* istanbul ignore next */
${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
  },
  {
    filename: 'src/main.vue',
    content: `<template>
    <div class="cube-${componentName}"></div>
  </template>

  <script>
  export default {
    name: '${ComponentName}'
  };
  </script>`
  },
  // {
  //   filename: path.join('../../examples/docs/zh-CN', `${componentName}.md`),
  //   content: `## ${ComponentName} ${chineseName}`
  // },
  // {
  //   filename: path.join('../../examples/docs/en-US', `${componentName}.md`),
  //   content: `## ${ComponentName}`
  // },
  // {
  //   filename: path.join('../../examples/docs/es', `${componentName}.md`),
  //   content: `## ${ComponentName}`
  // },
  // {
  //   filename: path.join('../../examples/docs/fr-FR', `${componentName}.md`),
  //   content: `## ${ComponentName}`
  // },
  {
    filename: path.join('../../test/unit/specs', `${componentName}.spec.js`),
    content: `import { createTest, destroyVM } from '../util';
import ${ComponentName} from 'packages/${componentName}';

describe('${ComponentName}', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(${ComponentName}, true);
    expect(vm.$el).to.exist;
  });
});
`
  }
  //   {
  //     filename: path.join('../../packages/theme-chalk/src', `${componentName}.scss`),
  //     content: `@import "mixins/mixins";
  // @import "common/var";

  // @include b(${componentName}) {
  // }`
  //   },
  //   {
  //     filename: path.join('../../types', `${componentName}.d.ts`),
  //     content: `import { CubeUIComponent } from './component'

  // /** ${ComponentName} Component */
  // export declare class El${ComponentName} extends CubeUIComponent {
  // }`
  //   }
]

// 添加到 components.json
const componentsFile = require('../../components.json')
if (componentsFile[componentName]) {
  console.error(`${componentName} 已存在.`)
  process.exit(1)
}
componentsFile[componentName] = `./packages/${componentName}/index.js`
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n')

// 添加到 index.scss
// const sassPath = path.join(__dirname, '../../packages/theme-chalk/src/index.scss');
// const sassImportText = `${fs.readFileSync(sassPath)}@import "./${componentName}.scss";`;
// fileSave(sassPath)
//   .write(sassImportText, 'utf8')
//   .end('\n');

// 添加到 cube-generate-code.d.ts
// const elementTsPath = path.join(__dirname, '../../types/cube-generate-code.d.ts')

// let elementTsText = `${fs.readFileSync(elementTsPath)}
// /** ${ComponentName} Component */
// export class ${ComponentName} extends El${ComponentName} {}`

// const index = elementTsText.indexOf('export') - 1
// const importString = `import { El${ComponentName} } from './${componentName}'`

// elementTsText = elementTsText.slice(0, index) + importString + '\n' + elementTsText.slice(index)

// fileSave(elementTsPath)
//   .write(elementTsText, 'utf8')
//   .end('\n')

// 创建 package
Files.forEach((file) => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n')
})

// 添加到 nav.config.json
// const navConfigFile = require('../../examples/nav.config.json')

// Object.keys(navConfigFile).forEach((lang) => {
//   let groups = navConfigFile[lang][4].groups
//   groups[groups.length - 1].list.push({
//     path: `/${componentName}`,
//     title: lang === 'zh-CN' && componentName !== chineseName ? `${ComponentName} ${chineseName}` : ComponentName
//   })
// })

// fileSave(path.join(__dirname, '../../examples/nav.config.json'))
//   .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
//   .end('\n')

console.log('DONE!')
