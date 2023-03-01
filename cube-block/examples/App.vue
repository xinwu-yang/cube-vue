<template>
  <div style="margin: 20px;">
    <a-divider orientation="left">皮肤适配调试</a-divider>
    <j-area-linkage></j-area-linkage>
    <j-slider></j-slider>
    <a-divider orientation="left">部门选择器</a-divider>
    <j-select-depart customReturnField="orgCode"></j-select-depart>
    <a-divider orientation="left">扩展图标</a-divider>
    <cube-icon type="icon-logo"></cube-icon>
    <a-divider orientation="left">枚举选择器</a-divider>
    <cube-select-enum style="width: 200px" v-model="enumValue" enum="com.tievd.cube.commons.base.DelFlag"></cube-select-enum>
    <br />
    <br />
    <cube-select-enum style="width: 200px" v-model="enumValue2" :multi="true" enum="org.jeecg.common.constant.enums.CgformEnum"></cube-select-enum>
    <a-divider orientation="left">倒计时</a-divider>
    <count-down :target="target" />
    <a-divider orientation="left">字典标签</a-divider>
    <j-dict-select-tag style="width: 100px" v-model="sex" dictCode="sex" />
    <a-divider orientation="left">多选组件</a-divider>
    <j-multi-select-tag style="width: 300px" v-model="multiSelectTag" placeholder="请做出你的选择" :options="multiSelectTagOptions" />
    <a-divider orientation="left">字典表搜索组件</a-divider>
    <j-search-select-tag style="width: 200px" placeholder="请输入关键字" v-model="asyncSelectValue" dict="sys_depart,depart_name,id" :async="true" />
    <a-divider orientation="left">字符串超长截取省略号显示</a-divider>
    <ellipsis>{{ ellipsisText }}</ellipsis>
  </div>
</template>

<script>
export default {
  name: 'Demo',

  data() {
    return {
      target: new Date('2030-12-31'),
      sex: 1,
      multiSelectTag: '1,2',
      enumValue: undefined,
      enumValue2: [],
      multiSelectTagOptions: [
        {
          label: '选项一',
          value: '1'
        },
        {
          label: '选项二',
          value: '2'
        },
        {
          label: '选项三',
          value: '3'
        }
      ],
      asyncSelectValue: undefined,
      ellipsisText: '是否可累计埃里克森大姐夫可垃圾第三方库就阿里斯顿就放了卡机第三方来看结案率'
    }
  }
}
</script>
