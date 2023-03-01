/**
 * @description 将字符串改为通过 separate 字符串连接的字符
 * @param {string} str 字符串
 * @param {string} separate 分隔符
 * @returns {string} 新字符串
 */
export function toLineMode(str, separate = '-') {
  let temp = str.replace(/[A-Z]/g, function(match) {
    return separate + match.toLowerCase()
  })
  if (temp.slice(0, 1) === separate) {
    // 如果首字母是大写，执行replace时会多一个separate，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

/**
 * @description 拆分 dictCode
 * @param {string} dictCode
 * @returns {object} 拆分结果
 */
export function splitDictCode(dictCode = '') {
  let arr = dictCode.split(',')
  let dictTable = ''
  let dictText = ''
  let dictField = ''
  if (arr.length === 2) {
    // 没有dictTable
    dictText = arr[0]
    dictField = arr[1]
  } else {
    dictTable = arr[0]
    dictText = arr[1]
    dictField = arr[2]
  }
  return { dictTable, dictText, dictField }
}

/**
 * @description 将 fieldList 分组
 * @param {array} fieldList
 * @param {array} tableGroupList
 * @returns {object} 分组结果
 */
export function getGroupedFormList(fieldList, tableGroupList = []) {
  let formList = fieldList.filter((item) => item.showInForm)
  let groupedFormList = {}
  // 表单按照group属性进行分组
  formList.forEach((item) => {
    if (item.component.params && item.component.params.dictCode) {
      const { dictTable, dictText, dictField } = splitDictCode(item.component.params.dictCode)
      item.dictTable = dictTable
      item.dictText = dictText
      item.dictField = dictField
    }
    if (groupedFormList[item.groupId]) {
      groupedFormList[item.groupId].push(item)
    } else {
      groupedFormList[item.groupId] = [item]
    }
  })
  // 根据sort属性对表单项进行排序
  for (let key in groupedFormList) {
    const item = groupedFormList[key]
    item.sort((a, b) => {
      return a.sort - b.sort
    })
  }

  let newFormList = []
  if (tableGroupList.length > 0) {
    for (let item of tableGroupList) {
      newFormList.push({
        group: item.name,
        items: groupedFormList[item.id]
      })
    }
  } else {
    newFormList.push({
      group: '默认分组',
      items: groupedFormList[0]
    })
  }
  return { newFormList, formList }
}
