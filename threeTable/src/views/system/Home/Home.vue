<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-25 01:21:11
 * @Description: 
 -->
<template>
  <div class="home w100  h100 flex_column_start">
    <div class="home__header w100 no_shrink">
      <TheHeader />
    </div>
    <div class="home__main w100  bg_grey ova flex_column_start">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          :key="$route.fullPath"
        ></router-view>
      </keep-alive>
      <router-view
        v-if="!$route.meta.keepAlive"
        :key="$route.fullPath"
      ></router-view>
    </div>
  </div>

</template>

<script>
export default {
  name: "home",
  components: {
    TheHeader:()=>import("@/components/layout/TheHeader/TheHeader.vue")
  },

  data(){
    return {
       
    }
  },
  methods: {

  },
  mounted(){
    
  }
};
</script>
<style lang="scss" scoped>
.home {
  &__header {
    height: 50px;
  }
  &__main {
    height: calc(100% - 50px);
  }
}
</style>
