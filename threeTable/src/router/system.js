/*
 * @Author: Huanghao
 * @Date: 2019-09-09 15:13:09
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-24 14:05:57
 * @Description: 
 */
import project from './project.js';
import backend from './backend.js';
import task from './task.js';
export default [{
    path: '/',
    redirect: 'task',
    component: () => import('@/views/system/Home/Home.vue'),
    name: 'Home',
    meta: {
        title: '主页',
        keepAlive: false,
    },
    children: [...project, ...backend, ...task]
}, {
    path: '/login',
    component: () => import('@/views/system/Login/Login.vue'),
    name: 'Login',
    meta: {
        title: '登陆',
        keepAlive: false,
    }
}, {
    path: '/component',
    component: () => import('@/views/system/Component/Component.vue'),
    name: 'Component',
    keepAlive: false,
    meta: {
        title: '组件展示',
        keepAlive: false,
    }
}/* , {
    path: '*',
    redirect: 'task',
    component: () => import('@/views/system/Error/Error.vue'),
    name: 'Error',
    keepAlive: false,
    meta: {
        title: '404',
        keepAlive: false,
    }
} */]