/*
 * @Author: Huanghao
 * @Date: 2019-09-09 08:50:25
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-20 08:58:12
 * @Description: 
 */
const state = {
  //通用颜色
  comColor: {
    white: '#ffffff',
    /* 白 */
    grey: '#717171',
    /* 灰 */
    blue: '#0C64EB',
    /* 蓝 */
    blue: '#3E91F9',
    /* 蓝 */    
    yellow: '#FF9800',
    /* 黄 */
    green: '#43A047',
    /* 绿 */
    red: '#FF5D5D',
    /* 红色 */
    black: '#3C4353',
    /* 黑色 */
  },
  //字体大小
  ftSize: {
    fs_10: "10px",
    fs_11: "11px",
    fs_12: "12px",
    fs_13: "13px",
    fs_14: "14px",
    fs_15: "15px",
    fs_16: "17px",
    fs_18: "18px",
    fs_19: "19px",
    fs_20: "20px",
    fs_21: "21px",
    fs_22: "22px",
    fs_23: "23px",
    fs_24: "24px",
    fs_25: "25px"
  },
  bgColor:{
    common:"#3E91F9", // 全局背景颜色
    updateBt:"#43A047", // 修改按钮颜色
    deleteBt:"#717171", // 删除按钮颜色
/*     addBt:"#0C64EB", // 添加按钮颜色 */
    addBt:"#3E91F9", // 添加按钮颜色
    selectBt:"#3E91F9", // 查询按钮颜色
    stopBt:"#FF5D5D", // 禁用
    startBt:"#3E91F9", // 启用
    clearBt:"#717171", // 清除
    importBt:"#3E91F9", //导入
    exportBt:"#3E91F9", //导出
    redBt:"#FF5D5D", // 红色按钮
  }
}
const getters = {
  getComColor: (state) => {
    return state.comColor
  },
  getFtSize: (state) => {
    return state.ftSize
  },
  getBgColor: (state) => {
    return state.bgColor
  }
}
const mutations = {
  setBgColor (state,obj) {
    state.bgColor = obj
  }
}
const actions = {
  setBgColor (context,obj) {
    context.commit('setBgColor',obj)
  }

}
export default {
  namespaced: true, // 用于在全局引用此文里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}