/*
 * @Author: Huanghao
 * @Date: 2019-09-10 15:03:43
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-19 13:30:11
 * @Description: 
 */
export default [{
    path: '/task',
    component: () => import('@/views/task/MyPrincipalTask/MyPrincipalTask.vue'),
    name: 'myPrincipalTask',
    meta: {
        title: '指派给我的任务',
        keepAlive: false,
    }
}, {
    path: '/task/mytask',
    component: () => import('@/views/task/MyTask/MyTask.vue'),
    name: 'task',
    meta: {
        title: '我的任务',
        keepAlive: false,
    }
}, {
    path: '/task/myPrincipalTask',
    component: () => import('@/views/task/MyPrincipalTask/MyPrincipalTask.vue'),
    name: 'myPrincipalTask',
    meta: {
        title: '指派给我的任务',
        keepAlive: false,
    }
}, {
    path: '/task/myCreateTask',
    component: () => import('@/views/task/MyCreateTask/MyCreateTask.vue'),
    name: 'myCreateTask',
    keepAlive: false,
    meta: {
        title: '我创建的任务',
        keepAlive: false,
    }
}, {
    path: '/task/createTask',
    component: () => import('@/views/task/CreateTask/CreateTask.vue'),
    name: 'createTask',
    keepAlive: false,
    meta: {
        title: '批量创建任务',
        keepAlive: false,
    }
}, {
    path: '/task/createChildTask',
    component: () => import('@/views/task/CreateChildTask/CreateChildTask.vue'),
    name: 'createChildTask',
    keepAlive: false,
    meta: {
        title: '创建子任务',
        keepAlive: false,
    }
}, {
    path: '/task/updateTask',
    component: () => import('@/views/task/UpdateTask/UpdateTask.vue'),
    name: 'updateTask',
    keepAlive: false,
    meta: {
        title: '修改任务',
        keepAlive: false,
    }
}]