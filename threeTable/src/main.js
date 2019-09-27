/*
 * @Author: Huanghao
 * @Date: 2019-09-06 11:03:21
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-19 16:48:31
 * @Description:
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store";
import filters from './filters/index.js';
import mixinObj from "@/mixins/global.js";
import api from "@/api/index.js";
import axios from "@/utils/common/axios.js";
import utils from "@/utils/index.js";
import lodash from 'lodash'
import moment from "moment"; // 日期格式化
import VueLazyload from "vue-lazyload"; // 引入图片懒加载插件
import i18n from "@/plugins/i18n/index.js";
import VueI18n from "vue-i18n"; // 国际化插件
import ElementUI from 'element-ui' // element
import '@/components/index.js' // components
import "@/assets/scss/element-ui/theme/index.css"; // element样式文件
import "@/assets/scss/index.scss";
// moment插件配置
import "moment/locale/zh-cn";
moment.locale("zh-cn");
Vue.config.productionTip = false;
const isEmpty=utils.dataDeal.isEmpty
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;
Vue.prototype.$isEmpty = utils.dataDeal.isEmpty;
Vue.prototype.$getObjAttrsValue = utils.dataDeal.getObjAttrsValue;
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
Vue.prototype.$lodash = lodash;
Vue.prototype.$bus = new Vue({});
Vue.prototype.$comColor = store.getters["style/getComColor"];
Vue.prototype.$ftSize = store.getters["style/getFtSize"];
Vue.prototype.$pushTo = function (val, obj) {
  router.push({
    path: val,
    query: obj || {}
  });
};
Vue.prototype.$replaceTo = function (val, obj) {
  router.replace({
    path: val,
    query: obj || {}
  });
};
Vue.prototype.$backTo = function (num=-1) {
  if(window.history.length<=3){
    router.replace({
      path: '/task?taskStatus=1',
      query: {}
    });
  }else{
    router.back(num)
  }
 
};
// 浅拷贝对象
Vue.prototype.$copyObj = function (obj) {
  var newobj = {}
  for (var attr in obj) {
    newobj[attr] = obj[attr]
  }
  return newobj
}
// 浅拷贝数组
Vue.prototype.$copyArr = function (arr) {
  var newArr = []
  for (var index in arr) {
    newArr.push(arr[index])
  }
  return newArr
}

Vue.prototype.$onkeydown = function (todo) {
  document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
      todo();
      //要做的事情
    }
  };
}
Vue.prototype.$isInteger = function (obj) { 
  return typeof obj === 'number' && obj%1 === 0
}
Vue.prototype.$ifZero = function (obj) {  
  if(obj==0||Number(obj)==0){
    return true
  }else{
    return false
  }
}
Vue.prototype.$toInt = function (obj,keep=1) { 
  if(isEmpty(obj)) return obj
  if(typeof obj === 'number' && obj%1 === 0) return obj
  else {
    return obj.toFixed(keep)
  }
}
Vue.prototype.$ifRepeatOrNull = function (arr) {
  if ((new Set(arr)).size != arr.length) {
    return false
  } else {
    return true
  }
}

Vue.prototype.$filterMap = {
  'createAdminCode': true,
  'createTime': true,
  'ifDelete': true,
  'updateAdminCode': true,
  'token': true,
  'updateTime': true,
  'id': true
}
Vue.prototype.$filterUpdate=function(obj){
  let filterMap={
    'createAdminCode': true,
    'createTime': true,
    'ifDelete': true,
    'updateAdminCode': true,
    'token': true,
    'updateTime': true,
    'children': true
  }
  for(let key in filterMap){
    Reflect.deleteProperty(obj,key)
  }
  return obj
}
//定义全局的时间过滤器，
Vue.prototype.$dateFormat=function(dataStr,pattern = "YYYY-MM-DD"){
  return moment(dataStr).format(pattern)
}
console.log(filters)
Vue.mixin(mixinObj);
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
console.log(i18n)
Vue.use(VueLazyload, {
  preLoad: 50,
  attempt: 1
});
new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");