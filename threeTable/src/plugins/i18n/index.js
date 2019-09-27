/*
 * @Author: Huanghao
 * @Date: 2019-09-09 14:09:11
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-09 16:59:10
 * @Description: 
 */
// i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs/index.js' // 导入语言包
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'cn',
  messages
})
export default i18n