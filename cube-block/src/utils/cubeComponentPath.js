import { GenerateCode } from '@tievd/cube-generate-code'

/**
 * 获取引入的魔方组件路径，避免引入组件后再新增页面
 */
export default function getCubeComponentPath(component, componentPath) {
  switch (component) {
    case 'modules/generateCode':
      componentPath = GenerateCode
      break
  }
  return componentPath
}
