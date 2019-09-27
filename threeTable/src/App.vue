<!--
 * @Author: Huanghao
 * @Date: 2019-09-10 14:08:28
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-25 01:24:32
 * @Description: 
 -->
<template>
  <div
    id="app"
    ref="app"
  >
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive&&isRouterAlive"
        :key="$route.fullPath"
      ></router-view>
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive&&isRouterAlive"
      :key="$route.fullPath"
    ></router-view>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name:'app',
  provide () {
    return {
      reload: this.reload
    }
  },  
    data(){
    return {
        isRouterAlive: true
    }
  },
  methods: {
        reload () {
      console.log("启动")
      this.isRouterAlive = false //test
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  mounted(){
    Vue.prototype.$globalClick = function (callback) {
      document.getElementById('app').onclick = function () {
        callback()
      }
    }
  }
}
</script>
<style lang="scss">
</style>
