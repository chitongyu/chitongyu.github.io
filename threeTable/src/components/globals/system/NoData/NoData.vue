<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-24 13:51:07
 * @Description: 
 -->
<template functional>
  <div class="noPermission w100 h100 flex_column_center">
    <div class="flex_row_center">
      <i class="iconfont icon-wushuju fs_20">
      </i>
      <span>
        {{props.tip}}
      </span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "noData",
  props:{
      tip:{
        type:String,
        default:'当前页无数据',
        required: false
      }
  }

};
</script>
<style lang="scss" scoped>
.noPermission {
}
</style>
