/*
 * @Author: Huanghao
 * @Date: 2019-09-09 08:50:24
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-12 09:22:23
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";
import style from "./modules/style.js";
import user from "./modules/user.js";
import common from "./modules/common.js";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    style,
    user,
    common
  }
});