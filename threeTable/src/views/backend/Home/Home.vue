<!--
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-12 16:02:58
 * @Description: 
 -->
<template>
  <div class="w100  h100 flex column backend">
    <div class="padding2 padding-left4 bg_white w100 no_shrink">
      <el-breadcrumb separator-class="iconfont icon-you ">
        <el-breadcrumb-item>明珞</el-breadcrumb-item>
          <el-breadcrumb-item>{{departName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{groupName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{choosedItemName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex row margin-top1 w100 h100">
      <div class="nav bg_white  no_shrink card-border h100  ova">
        <div class="nav__item padding3">
          <div
            class="nav-title padding1 poi"
            :class="choosedItem=='/userManage'?'choosedItem':''"
            @click="replaceTo('/backend/userManage')"
            v-show="btPermissions['/backend/userManage']"
          >用户管理</div>
           <div
            class="nav-title padding1 poi"
            :class="choosedItem=='/permissionManage'?'choosedItem':''"
            @click="replaceTo('/backend/permissionManage')"
            v-show="btPermissions['/backend/permissionManage']"
          >权限管理</div>
           <div
            class="nav-title padding1 poi"
            :class="choosedItem=='/roleManage'?'choosedItem':''"
            @click="replaceTo('/backend/roleManage')"
            v-show="btPermissions['/backend/roleManage']"
          >角色权限管理</div>
          <div
            class="nav-title padding1 poi"
            :class="choosedItem=='/orgManage'?'choosedItem':''"
            @click="replaceTo('/backend/orgManage')"
            v-show="btPermissions['/backend/orgManage']"
          >组织架构</div>
          <div
            class="nav-title padding1 poi"
            :class="choosedItem=='/moduleManage'?'choosedItem':''"
            @click="replaceTo('/backend/moduleManage')"
            v-show="btPermissions['/backend/moduleManage']"
          >模块管理</div>
          <div
            class="nav-title padding1 poi"
            :class="choosedItem=='/taskReport'?'choosedItem':''"
            @click="replaceTo('/backend/taskReport')"
            v-show="btPermissions['/backend/taskReport']"
          >工作状态报表</div>
          <div
            class="nav-title padding1 poi"
            :class="choosedItem=='/taskLogReport'?'choosedItem':''"
            @click="replaceTo('/backend/taskLogReport')"
            v-show="btPermissions['/backend/taskLogReport']"
          >任务修改记录</div>
          <div 
            class="nav-title padding1 poi"
            :class="choosedItem=='/taskWorkReport'?'choosedItem':''"
            @click="replaceTo('/backend/taskWorkReport')"
            v-show="btPermissions['/backend/taskWorkReport']"
          >任务报工记录</div>
        </div>
        
      </div>
      <div class="main w100 h100 bg_white card-border ova">
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
  </div>

</template>

<script>
export default {
  name: "backend",
  components: {
    
  },
  filters:{

  },
  props:{

  },
  data(){
    return{
       departName:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].deptName,
      groupName:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].groupName,
      choosedItem:'',
      choosedItemName:''
    }
  },
  computed:{

  },
  watch:{
    '$route': {
      handler: function(to, from){
        console.log(to,'后台条目');
        const str = to.path.match(/\/(\w*)/g)[1];
        console.log(str,'后台条目');
        this.choosedItem=str,
        this.choosedItemName=to.meta.title
      },  
      // 深度观察监听
      deep: true,
      immediate: true
    }
  }, 
  created(){

  },
  methods:{
    replaceTo(route){
      this.$replaceTo(route)
    }
  },

};
</script>
<style lang="scss" scoped>
.backend {
  .nav {
    width: 150px;
    min-height: 600px;
    &__item {
      .nav-title {
        border-radius: 3px;
      }
      .nav-title:hover {
        background-color: $blue;
        color: $white;
      }
    }
  }
  .main {

  }
}
.choosedItem {
  @include choosedItem;
  
}
</style>
