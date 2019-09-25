<template>
  <div class="appContainer">
    <!-- 顶部header -->
    <mt-header title="我的App端">
      <a
        @click="goBack()"
        slot="left"
        to="/home"
      >
        <mt-button icon="back">返回</mt-button>
      </a>
      <mt-button
        icon="more"
        slot="right"
      ></mt-button>
    </mt-header>

    <!-- 中间 路由 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部 链接 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link
        class="mui-tab-item-my"
        to="/home"
      >
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link
        class="mui-tab-item-my"
        to="/member"
      >
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link
        class="mui-tab-item-my"
        to="/shopcart"
      >
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span
            class="mui-badge"
            id="badge"
          >{{ $store.getters.allBadgeCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link
        class="mui-tab-item-my"
        to="/search"
      >
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
.appContainer {
  // padding-top: 20px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
  // position: absolute;
}

.v-leave-to {
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.mui-bar-tab .mui-tab-item-my .mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-my {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-my .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-my .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.appContainer {
  .mint-header {
    position: fixed;
    z-index: 99;
    right: 0;
    left: 0;
    height: 44px;
    padding-right: 10px;
    padding-left: 10px;
    border-bottom: 0;
    backface-visibility: hidden;
    h1 {
      height: 30px !important;
      line-height: 30px !important;
    }
  }
}
.mint-header-title {
  height: 30px !important;
  line-height: 30px !important;
}
.router-link-exact-active:visited {
  color: rgb(0, 102, 255);
}
</style>
