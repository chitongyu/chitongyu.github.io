/*
 * @Author: Huanghao
 * @Date: 2019-09-10 14:08:28
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-20 11:37:20
 * @Description: 
 */
/* 系统接口 */
import axios from "@/utils/common/axios.js";
function getOrg(query={}) {
  return new Promise((resolve, reject) => {
    axios.post(
      "/admin/tfOrganization/list.d",
      query,
      function (suc) {
        resolve(suc.body.rows); // 列表数据赋值
      },
      function (err) {
        reject([])
      },
      function (serverErr) {
        reject([])
      })
  }) 
}
function getRole(query={}) {
  return new Promise((resolve, reject) => {
    axios.post(
      "/admin/role/list.d",
      query,
      function (suc) {
        resolve(suc.body.rows); // 列表数据赋值
      },
      function (err) {
        reject([])
      },
      function (serverErr) {
        reject([])
      })
  }) 
}
//获取项目类型
function getDictionary(query={}) {
  return new Promise((resolve, reject) => {
    axios.post(
      "/admin/dictionaryData/list.d",
      query,
      function (suc) {
        resolve(suc.body.rows); // 列表数据赋值
      },
      function (err) {
        reject([])
      },
      function (serverErr) {
        reject([])
      })
  }) 
}
//获取部门组织结构
function getOrganization(query={}) {
  return new Promise((resolve, reject) => {
    axios.post(
      "/admin/tfOrganization/list.d",
      query,
      function (suc) {
        resolve(suc.body.rows); // 列表数据赋值
      },
      function (err) {
        reject([])
      },
      function (serverErr) {
        reject([])
      })
  }) 
}
//获取user
function getUser(query={}) {
  return new Promise((resolve, reject) => {
    axios.post(
      "/admin/user/listByPage.d",
      {...query,page:1,pageSize:20},
      function (suc) {
        resolve(suc.body.rows); // 列表数据赋值
      },
      function (err) {
        reject([])
      },
      function (serverErr) {
        reject([])
      })
  }) 
}
//获取本地user
function getNativeUser(query={}) {
  return new Promise((resolve, reject) => {
    axios.post(
      "/admin/admin/listByPage.d",
      {...query,page:1,pageSize:50},
      function (suc) {
        resolve(suc.body.rows); // 列表数据赋值
      },
      function (err) {
        reject([])
      },
      function (serverErr) {
        reject([])
      })
  }) 
}
//获取用户所属模块List
function getModule(query={}) {
  return new Promise((resolve, reject) => {
    axios.post(
      "/admin/tfModule/listModuleByUser.d",
      {...query,page:1,pageSize:50},
      function (suc) {
        resolve(suc.body.rows); // 列表数据赋值
      },
      function (err) {
        reject([])
      },
      function (serverErr) {
        reject([])
      })
  }) 
}
//获取项目List
function getProject(query={}) {
  return new Promise((resolve, reject) => {
    axios.post(
      "/admin/tfProject/listByAuth.d",
      {...query,page:1,pageSize:50},
      function (suc) {
        resolve(suc.body.rows); // 列表数据赋值
      },
      function (err) {
        reject([])
      },
      function (serverErr) {
        reject([])
      })
  }) 
}
export default{
  getOrg,
  getRole,
  getDictionary,
  getOrganization,
  getUser,
  getNativeUser,
  getModule,
  getProject
}