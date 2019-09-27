<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-09 21:41:11
 * @Description: 
 -->
<template>
  <div class="component">

    <el-button type="primary">{{$t('error.暂无数据')}}</el-button>
    <div class="bg_red fs_20">
      {{121|formatMoney}}
    </div>
    <i class="iconfont icon-denglu2"></i>
  </div>

</template>

<script>
export default {
  name: "component",
  components: {

  }
};
</script>
