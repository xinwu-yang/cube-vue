import ejs from 'ejs'
import { saveAs } from 'file-saver'
import camelCase from 'camelcase'
import moment from 'dayjs'
import { getGroupedFormList } from '../../../utils'
import EntityNameListTemp from './vue/EntityNameList'
import EntityNameModalTemp from './vue/EntityNameModal'
import EntityNameControllerTemp from './java/controller/EntityNameController'
import EntityNameMapperTemp from './java/mapper/EntityNameMapper'
import EntityNameMapperXmlTemp from './java/mapper/EntityNameMapperXml'
import EntityNameServiceTemp from './java/service/EntityNameService'
import EntityNameServiceImplTemp from './java/service/EntityNameServiceImpl'

function toLineMode(str, separate = '-') {
  let temp = str.replace(/[A-Z]/g, function(match) {
    return separate + match.toLowerCase()
  })
  if (temp.slice(0, 1) === separate) {
    // 如果首字母是大写，执行replace时会多一个separate，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

export default class GenerateCodeOneToOneDefault {
  constructor(data, zip, isMultiple) {
    this.zip = zip
    this.isMultiple = isMultiple
    this.data = data
  }

  saveCode() {
    const { businessPackage, modulePackage, entityPackage, entityName, description } = this.data.javaCodeParams

    const entityNameUpper = camelCase(entityName, { pascalCase: true }) // 大驼峰组件名，用于引入
    const entityNameLine = toLineMode(entityNameUpper) // 小写短横线连接的组件名，用于组件使用
    const entityNameLower = entityNameUpper.replace(entityNameUpper[0], entityNameUpper[0].toLowerCase())

    let fieldList = this.data.fieldList

    // 筛选栏
    let tableQueryFieldList = this.data.tableQueryFieldList
    tableQueryFieldList.forEach((item) => {
      try {
        if (item.useFieldComponent) {
          // 从fieldList中拿component
          const comp = fieldList.find((itm) => itm.dataIndex === item.name)
          item.component = comp.component
        }
      } catch (err) {
        console.log('error', err)
      }
    })
    // table展示项
    let tableList = fieldList.filter((item) => item.showInList)
    // 表单
    let { newFormList } = getGroupedFormList(fieldList, this.data.tableGroupList)
    this.zipCodeFront(entityNameUpper, entityNameLine, entityNameLower, tableQueryFieldList, tableList, newFormList, modulePackage)

    this.zipCodeBack(businessPackage, modulePackage, entityPackage, entityName, entityNameLower, description)

    if (this.isMultiple) {
      return this.zip
    }
    // 下载文件
    this.zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs.saveAs(content, `代码生成_${description}_${moment(new Date()).format('YYYY年MM月DD日HH时mm分ss秒')}.zip`)
    })
  }

  zipCodeFront(entityNameUpper, entityNameLine, entityNameLower, tableQueryFieldList, tableList, formList, modulePackage) {
    // 生成zip文件
    const compZip = this.zip.folder('vue').folder(modulePackage)
    // 创建List.vue文件，文件内容为tableStr
    const tableStr = ejs.render(EntityNameListTemp, { entityNameUpper, entityNameLine, tableQueryFieldList, tableList, modulePackage, entityNameLower })
    compZip.file(`${entityNameUpper}List.vue`, tableStr)
    // 创建一个modules文件夹，文件夹里创建一个Modal.vue文件，文件内容为content
    const modelStr = ejs.render(EntityNameModalTemp, { entityNameUpper, formList, modulePackage, entityNameLower, grouped: this.data.grouped })
    compZip.folder('modules').file(`${entityNameUpper}Modal.vue`, modelStr)
  }

  zipCodeBack(businessPackage, modulePackage, entityPackage, entityName, entityNameLower, description) {
    const today = moment(new Date()).format('YYYY-MM-DD')
    // 生成zip文件
    const businessPackageArr = businessPackage.split('.')
    let modulePackageZip = this.zip.folder('java')
    businessPackageArr.forEach((item) => {
      modulePackageZip = modulePackageZip.folder(item)
    })
    modulePackageZip = modulePackageZip.folder(modulePackage)
    // Controller.java
    const controllerStr = ejs.render(EntityNameControllerTemp, { businessPackage, modulePackage, entityPackage, entityName, entityNameLower, today, description })
    // Mapper.java
    const mapperStr = ejs.render(EntityNameMapperTemp, { businessPackage, modulePackage, entityPackage, entityName, today, description })
    // Mapper.xml
    const xmlStr = ejs.render(EntityNameMapperXmlTemp, { businessPackage, modulePackage, entityName })
    // Service.java
    const serviceStr = ejs.render(EntityNameServiceTemp, { businessPackage, modulePackage, entityPackage, entityName, today, description })
    // ServiceImpl.java
    const serviceImplStr = ejs.render(EntityNameServiceImplTemp, { businessPackage, modulePackage, entityPackage, entityName, today, description })

    modulePackageZip.folder('controller').file(`${entityName}Controller.java`, controllerStr)
    const mapperZip = modulePackageZip.folder('mapper')
    mapperZip.file(`${entityName}Mapper.java`, mapperStr)
    mapperZip.folder('xml').file(`${entityName}Mapper.xml`, xmlStr)
    const serviceZip = modulePackageZip.folder('service')
    serviceZip.file(`I${entityName}Service.java`, serviceStr)
    serviceZip.folder('impl').file(`${this.data.javaCodeParams.entityName}ServiceImpl.java`, serviceImplStr)
  }
}
