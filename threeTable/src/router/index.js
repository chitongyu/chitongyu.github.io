/*
 * @Author: Huanghao
 * @Date: 2019-09-09 14:10:48
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-24 13:42:58
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";
import system from './system.js';

let router= new Router({
  mode: 'history',
  routes: [...system]
});
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
let statusMap={
  '/task':true,
  '/task/myPrincipalTask':true,
  '/task/myCreateTask':true,
};
router.beforeEach((to,from,next)=>{
  // if (to.matched.length === 0) { //匹配前往的路由不存在
  //   from.name ? next({
  //     name: from.name
  //   }) : next('/task'); //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
  // } else {
  //   next(); //如果匹配到正确跳转
  // }
  if(statusMap[to.path]&&to.query.taskStatus==null){
    next(to.fullPath+'?taskStatus=');
  }else{
    next();
  }
})
const originalPush = Router.prototype.push
console.log(originalPush,)
Router.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function(location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(Router);
export default router