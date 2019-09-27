/*
 * @Author: Huanghao
 * @Date: 2019-09-10 15:03:43
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-19 13:29:29
 * @Description: 
 */
export default [{
    path: '/backend',
    component: () => import('@/views/backend/Home/Home.vue'),
    name: 'backend',
    
    meta: {
        title: '后台主页',
        keepAlive: false,
    },
    children: [{
        path: '/',
        component: () => import('@/views/backend/UserManage/UserManage.vue'),
        name: 'userManage',
        
        meta: {
            title: '用户管理',
            keepAlive: false,
        }
    }, {
        path: '/backend/permissionManage',
        component: () => import('@/views/backend/PermissionManage/PermissionManage.vue'),
        name: 'permissionManage',
       
        meta: {
            title: '权限管理',
            keepAlive: false,
        }
    }, {
        path: '/backend/roleManage',
        component: () => import('@/views/backend/RoleManage/RoleManage.vue'),
        name: 'roleManage',
        
        meta: {
            title: '角色权限管理',
            keepAlive: false,
        }
    }, {
        path: '/backend/userManage',
        component: () => import('@/views/backend/UserManage/UserManage.vue'),
        name: 'userManage',
        
        meta: {
            title: '用户管理',
            keepAlive: false,
        }
    }, {
        path: '/backend/orgManage',
        component: () => import('@/views/backend/OrgManage/OrgManage.vue'),
        name: 'orgManage',
        
        meta: {
            title: '组织管理',
            keepAlive: false,
        }
    }, {
        path: '/backend/moduleManage',
        component: () => import('@/views/backend/ModuleManage/ModuleManage.vue'),
        name: 'moduleManage',
        
        meta: {
            title: '模块管理',
            keepAlive: false,
        }
    }, {
        path: '/backend/taskReport',
        component: () => import('@/views/backend/TaskReport/TaskReport.vue'),
        name: 'taskReport',
        
        meta: {
            title: '工作状态报表',
            keepAlive: false,
        }
    }, {
        path: '/backend/taskLogReport',
        component: () => import('@/views/backend/TaskLogReport/TaskLogReport.vue'),
        name: 'TaskLogReport',
       
        meta: {
            title: '任务修改记录报表',
            keepAlive: false,
        }
    }, {
        path: '/backend/taskWorkReport',
        component: () => import('@/views/backend/TaskWorkReport/TaskWorkReport.vue'),
        name: 'TaskWorkReport',
       
        meta: {
            title: '任务报工记录报表',
            keepAlive: false,
        }
    }]
}]