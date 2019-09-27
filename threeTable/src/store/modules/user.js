/*
 * @Author: Huanghao
 * @Date: 2019-09-09 20:36:58
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-12 15:29:19
 * @Description: 
 */
/* const user_token=localStorage.getItem('user_token')
const user_userInfo=localStorage.getItem('user_userInfo')
const user_permissions=localStorage.getItem('user_permissions') */
const state = {
    user_token: localStorage.getItem('user_token'),
    user_info: localStorage.getItem('user_userInfo'),
    user_permissions: localStorage.getItem('user_permissions'), //菜单权限
    user_btPermissions: localStorage.getItem('user_btPermissions') //按钮权限

}
const getters = {
    getToken: (state) => {
        return state.user_token
    },
    getInfo: (state) => {
        console.log(state.user_info)
        if(state.user_info){
            return JSON.parse(state.user_info)
        }
        return {}
    },
    getPermissions: (state) => {
        if(state.user_permissions){
            return JSON.parse(state.user_permissions)
        }
        return {}
    },
    getBtPermissions: (state) => {
        if(state.user_btPermissions){
            return JSON.parse(state.user_btPermissions)
        }
        return {}
        
    }
}
const mutations = {
    setToken(state, tokenStr) {
        state.user_token = tokenStr;
        localStorage.setItem('user_token', tokenStr)
    },
    setInfo(state, tokenStr) {
        state.user_info = tokenStr;
        localStorage.setItem('user_userInfo', tokenStr)
    },
    setPermissions(state, tokenStr) {
        state.user_permissions = tokenStr;
        localStorage.setItem('user_permissions', tokenStr)
    },
    setBtPermissions(state, tokenStr) {
        state.user_btPermissions = tokenStr;
        localStorage.setItem('user_btPermissions', tokenStr)
    },
    clear(state) {
        state = {};
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_userInfo');
        localStorage.removeItem('user_permissions');
        localStorage.removeItem('user_btPermissions');
    }
}
const actions = {
    setToken(context, tokenStr) {
        context.commit('setToken', tokenStr)
    },
    setInfo(context, tokenStr) {
        context.commit('setInfo', tokenStr)
    },
    setPermissions(context, tokenStr) {
        context.commit('setPermissions', tokenStr)
    },
    setBtPermissions(context, tokenStr) {
        context.commit('setBtPermissions', tokenStr)
    },
    clear(context) {
        context.commit('clear')
    }
}
export default {
    namespaced: true, // 用于在全局引用此文里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}