/*
 * @Author: Lyle
 * @Date: 2020-05-12 22:45:24
 * @LastEditors: Lyle
 * @LastEditTime: 2020-05-21 21:02:50
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

let router = new Router({
  routes: [
    {
			path: "/",
			component: () => import("@/components/HelloWorld/HelloWorld.vue"),
			name: 'HelloWorld',
			meta: {
					title: '首页',
					keepAlive: false,
			}
    },
    {
      path: "/test",
      component: () => import("@/components/Test/Test.vue"),
			name: 'Test',
			meta: {
					title: 'test',
					keepAlive: false,
			},
			children: [
				{
					path: 'login',
					component:()=>import("@/components/Test/SignUp/SignUp.vue")
				},
				{
					path: 'login',
					component:()=>import("@/components/Test/SignUp/SignUp.vue")
				}
			]
    }
  ]
});

Vue.use(Router);

export default router;
