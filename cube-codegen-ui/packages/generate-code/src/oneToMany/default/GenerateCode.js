import ejs from 'ejs'
import { saveAs } from 'file-saver'
import camelCase from 'camelcase'
import moment from 'dayjs'
import { toLineMode, getGroupedFormList, splitDictCode } from '../../../utils'
import EntityNameListTemp from './vue/EntityNameList'
import EntityNameFormTemp from './vue/EntityNameForm'
import EntityNameModalTemp from './vue/EntityNameModal'
import OneFormTemp from './vue/OneForm'
import EntityNameControllerTemp from './java/controller/EntityNameController'
import EntityNameMapperTemp from './java/mapper/EntityNameMapper'
import EntityNameMapperXmlTemp from './java/mapper/EntityNameMapperXml'
import OneMapperTemp from './java/mapper/OneMapper'
import OneMapperXmlTemp from './java/mapper/OneMapperXml'
import EntityNameServiceTemp from './java/service/EntityNameService'
import EntityNameServiceImplTemp from './java/service/EntityNameServiceImpl'
import OneServiceTemp from './java/service/OneService'
import OneServiceImplTemp from './java/service/OneServiceImpl'
import EntityNamePageTemp from './java/vo/EntityNamePage'

export default class GenerateCode {
  constructor(data, zip, isMultiple) {
    this.zip = zip
    this.isMultiple = isMultiple
    this.data = data
  }

  saveCode() {
    const { businessPackage, modulePackage, entityPackage, entityName, description } = this.data.javaCodeParams

    let hasOne2Many = false // 是否存在一对多的关系
    const subTableList = this.data.subTableList.map((item) => {
      item.entityNameLower = camelCase(item.entityName) // 小驼峰
      item.entityNameUpper = camelCase(item.entityName, { pascalCase: true }) // 大驼峰
      item.entityNameLine = toLineMode(item.entityName) // 小写短横线连接
      item.foreignKeyUpper = camelCase(item.foreignKey, { pascalCase: true }) // 外键大驼峰
      item.foreignKeyLine = toLineMode(item.foreignKey, '_') // 外键下划线
      item.databaseTableName = toLineMode(item.entityName, '_') // 表名下划线
      if (item.relationType === 'ONE_TO_MANY') {
        hasOne2Many = true
      }
      return item
    })

    const entityNameUpper = camelCase(entityName, { pascalCase: true }) // 大驼峰组件名，用于引入
    const entityNameLine = toLineMode(entityNameUpper) // 小写短横线连接的组件名，用于组件使用
    const entityNameLower = entityNameUpper.replace(entityNameUpper[0], entityNameUpper[0].toLowerCase())

    let fieldList = this.data.fieldList
    // 筛选栏
    let tableQueryFieldList = this.data.tableQueryFieldList
    let listNeedPca = false // 表格页是否需要pca操作
    let listNeedDict = false // 是否需要字典操作
    let listNeedCategory = false // 是否需要类型操作
    tableQueryFieldList.forEach((item) => {
      try {
        if (item.useFieldComponent) {
          // 从fieldList中拿component
          const comp = fieldList.find((itm) => itm.dataIndex === item.name)
          item.component = comp.component
        }
        switch (item.component.name) {
          case 'MULTI_SELECT_TAG':
          case 'SEARCH_SELECT_TAG':
          case 'DICT_SELECT_TAG':
          case 'CATEGORY_SELECT':
            listNeedDict = true
            break
          case 'AREA_LINKAGE':
            listNeedPca = true
            break
        }
        if (item.component.name === 'CATEGORY_SELECT' && !item.component.params) {
          listNeedCategory = true
        }
      } catch (err) {
        console.log('error', err)
      }
    })
    // table展示列
    let tableList = fieldList.filter((item) => item.showInList)
    // 表单
    let { newFormList } = getGroupedFormList(fieldList, this.data.tableGroupList)
    // vo内容
    let voList = fieldList.filter((item) => item.showInForm || item.dataIndex === 'id')
    voList.forEach((item) => {
      if (item.component.params && item.component.params.dictCode) {
        const { dictTable, dictText, dictField } = splitDictCode(item.component.params.dictCode)
        item.dictTable = dictTable
        item.dictText = dictText
        item.dictField = dictField
      }
    })
    this.zipCodeFront(entityNameUpper, entityNameLine, entityNameLower, tableQueryFieldList, tableList, newFormList, modulePackage, description, subTableList, hasOne2Many, listNeedPca, listNeedDict, listNeedCategory)

    this.zipCodeBack(businessPackage, modulePackage, entityPackage, entityName, entityNameLower, description, voList, subTableList)

    if (this.isMultiple) {
      return this.zip
    }
    // 下载文件
    this.zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs.saveAs(content, `代码生成_${description}_${moment(new Date()).format('YYYY年MM月DD日HH时mm分ss秒')}.zip`)
    })
  }

  zipCodeFront(entityNameUpper, entityNameLine, entityNameLower, tableQueryFieldList, tableList, formList, modulePackage, description, subTableList, hasOne2Many, listNeedPca, listNeedDict, listNeedCategory) {
    const categoryColumns = []
    // 生成zip文件
    const compZip = this.zip.folder('vue').folder(modulePackage)
    // 创建List.vue文件
    const entityNameListStr = ejs.render(EntityNameListTemp, { entityNameUpper, entityNameLower, entityNameLine, tableQueryFieldList, tableList, modulePackage, description, listNeedPca, listNeedCategory, listNeedDict, categoryColumns })
    compZip.file(`${entityNameUpper}List.vue`, entityNameListStr)
    // 创建一个modules文件夹
    const modules = compZip.folder('modules')
    // 主表Form.vue
    const entityNameFormStr = ejs.render(EntityNameFormTemp, { entityNameUpper, entityNameLower, modulePackage, formList, subTableList, hasOne2Many, grouped: this.data.grouped })
    modules.file(`${entityNameUpper}Form.vue`, entityNameFormStr)
    // 弹窗Modal.vue
    const entityNameModalStr = ejs.render(EntityNameModalTemp, { entityNameUpper, entityNameLine })
    modules.file(`${entityNameUpper}Modal.vue`, entityNameModalStr)
    // 批量 一对一子表 表单
    subTableList.forEach((item) => {
      if (item.relationType === 'ONE_TO_ONE') {
        let { newFormList } = getGroupedFormList(item.fieldList)
        // 剔除外键，不展示在form表单中
        newFormList = newFormList.map((itm) => {
          itm.items = itm.items.filter((groupedItem) => groupedItem.dataIndex !== item.foreignKey)
          return itm
        })
        const oneFormStr = ejs.render(OneFormTemp, { entityNameUpper: item.entityNameUpper, entityNameLower: item.entityNameLower, formList: newFormList, description: item.description })
        modules.file(`${item.entityNameUpper}Form.vue`, oneFormStr)
      }
    })
  }

  zipCodeBack(businessPackage, modulePackage, entityPackage, entityName, entityNameLower, description, voList, subTableList) {
    const today = moment(new Date()).format('YYYY-MM-DD')
    // 生成zip文件
    const businessPackageArr = businessPackage.split('.')
    let modulePackageZip = this.zip.folder('java')
    businessPackageArr.forEach((item) => {
      modulePackageZip = modulePackageZip.folder(item)
    })
    modulePackageZip = modulePackageZip.folder(modulePackage)
    // Controller.java
    const entityNameControllerStr = ejs.render(EntityNameControllerTemp, { businessPackage, modulePackage, entityPackage, entityName, entityNameLower, subTableList, today, description })
    // Mapper.java
    const entityNameMapperStr = ejs.render(EntityNameMapperTemp, { businessPackage, modulePackage, entityPackage, entityName, today, description })
    // MapperXml.xml
    const entityNameMapperXmlStr = ejs.render(EntityNameMapperXmlTemp, { businessPackage, modulePackage, entityName })
    // Service.java
    const entityNameServiceStr = ejs.render(EntityNameServiceTemp, { businessPackage, modulePackage, entityPackage, entityName, entityNameLower, subTableList, today, description })
    // ServiceImpl.java
    const entityNameServiceImplStr = ejs.render(EntityNameServiceImplTemp, { businessPackage, modulePackage, entityPackage, entityName, entityNameLower, subTableList, today, description })
    // Page.java
    const excelIgnoreArr = ['createBy', 'createTime', 'updateBy', 'updateTime', 'sysOrgCode']
    const voStr = ejs.render(EntityNamePageTemp, { businessPackage, modulePackage, entityPackage, entityName, entityNameLower, subTableList, tableColumnList: voList, excelIgnoreArr, today, description })

    modulePackageZip.folder('controller').file(`${entityName}Controller.java`, entityNameControllerStr)
    const mapperZip = modulePackageZip.folder('mapper')
    mapperZip.file(`${entityName}Mapper.java`, entityNameMapperStr)

    const mapperXmlZip = mapperZip.folder('xml')
    mapperXmlZip.file(`${entityName}Mapper.xml`, entityNameMapperXmlStr)

    const serviceZip = modulePackageZip.folder('service')
    serviceZip.file(`I${entityName}Service.java`, entityNameServiceStr)
    const serviceImplZip = serviceZip.folder('impl')
    serviceImplZip.file(`${entityName}ServiceImpl.java`, entityNameServiceImplStr)

    // 批量 子表
    subTableList.forEach((item) => {
      //  Mapper.java
      const oneMapperStr = ejs.render(OneMapperTemp, { businessPackage, modulePackage, entityPackage: item.entityPackage, entityName: item.entityName, description: item.description, today })
      mapperZip.file(`${item.entityName}Mapper.java`, oneMapperStr)
      // Mapper.xml
      const oneMapperXmlStr = ejs.render(OneMapperXmlTemp, { businessPackage, modulePackage, entityPackage: item.entityPackage, entityName: item.entityName, foreignKeyLine: item.foreignKeyLine, databaseTableName: item.databaseTableName })
      mapperXmlZip.file(`${item.entityName}Mapper.xml`, oneMapperXmlStr)
      // Service.java
      const oneServiceStr = ejs.render(OneServiceTemp, { businessPackage, modulePackage, entityPackage, entityName: item.entityName, description: item.description, today })
      serviceZip.file(`I${item.entityName}Service.java`, oneServiceStr)
      // ServiceImpl.java
      const oneServiceImplStr = ejs.render(OneServiceImplTemp, { businessPackage, modulePackage, entityPackage, entityName: item.entityName, entityNameLower: item.entityNameLower, description: item.description, today })
      serviceImplZip.file(`${item.entityName}ServiceImpl.java`, oneServiceImplStr)
    })

    modulePackageZip.folder('vo').file(`${entityName}Page.java`, voStr)
  }
}
