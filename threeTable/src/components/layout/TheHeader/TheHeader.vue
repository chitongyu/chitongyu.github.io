<!--
 * @Author: Huanghao
 * @Date: 2019-09-10 15:03:42
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-20 16:02:12
 * @Description: 
 -->
<template>
  <div class="header w100 h100  bg_blue cl_white rel">
    <hgroup class="header__company">
      <h1
        class="companyName"
        title="广州明珞汽车装备有限公司"
      >
        <router-link to="">广州明珞汽车装备有限公司</router-link>
      </h1>
    </hgroup>
    <nav class="header__navbar w100 h100 flex_row_center">
      <ul class="nav nav-default h100">
        <li
          class="project"
          :class="choosedModule=='/project'?'choosedModule':''"
           v-show="btPermissions['/project']"
        >
          <router-link to="/project">项目</router-link>
        </li>
        <li
          class="task"
          :class="choosedModule=='/task'?'choosedModule':''"
           v-show="true||btPermissions['/task']"
        >
          <router-link to="/task?taskStatus=">任务</router-link>
        </li>
        <li
          class="backend"
          :class="choosedModule=='/backend'?'choosedModule':''"
           v-show="btPermissions['/backend']"
        >
          <router-link to="/backend">后台</router-link>
        </li>
      </ul>
    </nav>
    <div
      class="header__user poi"
      @click.stop="openDropdown()"
    >
      <i class="iconfont icon-denglu2 fs_18"></i>
      <span class="user-name fs_15">{{userName}}</span>
      <span class="icon-arrow-down"></span>
      <ul
        class="dropdown-menu pull-right cl_black"
        v-if="showDropdown"
      >
        <li class="user-profile-item">
          <div class="item user-profile-name">{{userName}}</div>
        </li>
        <li>
          <div class="item" @click="logout()">退出</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "theHeader",
  components: {
    
  },
  watch:{
    '$route': {
      handler: function(to, from){
        console.log('头部',to)
        const str = to.path.match(/\/(\w*)/)[0];
        console.log(str,'ss');
        this.choosedModule=str
      },
      // 深度观察监听
      deep: true,
      immediate: true
    }
  },
  data(){
    return{
      userName:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].name,
      userCode:this.$store.getters['user/getInfo']&&this.$store.getters['user/getInfo'].name,
      choosedModule:'',
      showDropdown:false
    }
  },
  methods:{
    closeDropdown(){
      this.showDropdown=false;
    },
    openDropdown(){
      this.showDropdown=true;
    },
    logout () {
      let self = this
      self.$confirm('您确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        self.$http.post(
          '/admin/admin/logout.d', {},
          function (suc) {
            self.$store.dispatch('user/clear')
            self.$message({
              type: 'success',
              message: '退出成功!'
            })
            self.$replaceTo('/login')
          },
          function (err) {
            self.$message({
              showClose: true,
              message: err.result.msg,
              type: 'warning'
            })
          }
        )
      })
    } // 退出  
  },
  created(){
    console.log(this.btPermissions,'bt')
    this.$globalClick(this.closeDropdown)
  }
};
</script>
<style lang="scss" scoped>
.header {
  border-top-color: $blue;
  border-bottom-color: $blue;
  &__company {
    position: absolute;
    top: 10px;
    left: 20px;
    .companyName {
      float: left;
      max-width: 250px;
      margin: 0;
      overflow: hidden;
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a {
      color: inherit;
      text-decoration: inherit;
    }
  }
  &__navbar {
    font-size: 15px;
    .nav-default {
      li {
        float: left;
        position: relative;
        display: block;
        line-height: 50px;
      }
      li:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      a {
        text-decoration: none;
        opacity: 0.9;
        padding: 10px;
      }
      a:hover {
        opacity: 1;
      }
    }
  }
  &__user {
    position: absolute;
    top: 10px;
    right: 20px;
    padding-left: 5px;
    padding-right: 5px;
    .user-name {
      padding: 10px;
      line-height: 30px;
    }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      float: left;
      min-width: 100px;
      padding: 5px 0;
      margin: 2px 0 0;
      font-size: 13px;
      list-style: none;
      background-color: #fff;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border: 1px solid #b6bdcc;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
      > li {
        padding: 0 10px;
        .item {
          padding: 2px 10px;
          margin: 5px 0;
          border-radius: 3px;
          display: block;
          clear: both;
          font-weight: 400;
          line-height: 1.42857143;
          white-space: nowrap;
        }
        .item:hover {
          background-color: $blue;
          color: $white;
        }
      }
    }
  }
  &__user:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
.choosedModule {
  font-weight: 700;
  background: rgba(0, 0, 0, 0.1);
}
</style>
