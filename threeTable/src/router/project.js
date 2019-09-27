/*
 * @Author: Huanghao
 * @Date: 2019-09-17 11:26:36
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-19 13:33:31
 * @Description: 
 */
export default [{
    path: '/project',
    component: () => import('@/views/project/CreateProject/CreateProject.vue'),
    name: 'project',
    meta: {
        title: '项目主页',
        keepAlive: false,
    }
},{
    path: '/project/CreateProject',
    component: () => import('@/views/project/CreateProject/CreateProject.vue'),
    name: 'CreateProject',
    keepAlive: false,
    meta: {
        title: '项目列表',
        keepAlive: false,
    }
}]