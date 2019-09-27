/*
 * @Author: Huanghao
 * @Date: 2019-09-09 13:31:43
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-11 16:45:04
 * @Description:
 */
import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router' // 这里引入的是router目录
import qs from 'qs'
import utils from "@/utils/index.js";
axios.defaults.timeout = 1000000000
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.get['Content-Type'] =
    'application/application/json;charset=UTF-8'
axios.defaults.transformRequest = [
    function (data) {
        return qs.stringify(data)
    }
]
const isEmpty = utils.dataDeal.isEmpty
// http请求拦截器
axios.interceptors.request.use(config => {
        const token = store.getters['user/getToken'];
        if (config.method == 'get') {
            config.params.token = token;
        } else {
            if (config.url.indexOf('login') === -1) {
                config.data.token = token;
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// http响应拦截器
axios.interceptors.response.use(response => { // 响应成功关闭loading
    if (response.data && response.data.result.code === 503) {
      router.replace('/login')
    }
    return response
  }, error => {
    return Promise.reject(error)
  })
  export default {
    // get方式
    get(url, data, succ, err,serverErr) {
      data.time = new Date().getTime() // 防止缓存
      let params = {
        params: data
      }
      axios.get(url, params)
        .then(function (response) {
          response = response.data
          if (response.body && response.result.code === 200) {
            succ && succ(response)
          } else {
            err && err(response)
          }
        })
        .catch(function (error) {
            serverErr&&serverErr(error)
  
        })
    },
    // post表单
    post(url, data, succ, err,serverErr) {
      axios.post(url, data)
        .then(function (response) {
          response = response.data
          if (response.body && response.result.code === 200) {
            succ && succ(response)
          } else {
            err && err(response)
          }
        })
        .catch(function (error) {
            serverErr&&serverErr(error)
  
        })
    },
    // put方式
    put(url, data, succ, err,serverErr) {
      axios.put(url, data)
        .then(function (response) {
          response = response.data
          if (response.body && response.result.code === 200) {
            succ && succ(response)
          }else {
            err && err(response)
          }
        })
        .catch(function (error) {
          serverErr(error)
  
        })
    },
    // delete方式
    delete(url, data, succ, err,serverErr) {
      axios.delete(url, data)
        .then(function (response) {
          response = response.data
          if (response.body && response.result.code === 200) {
            succ && succ(response)
          } else {
            err && err(response)
          }
        })
        .catch(function (error) {
          serverErr(error)
  
        })
    },
    // 多个并发请求
    all(questList) {
      axios.all(questList)
        .then(axios.spread(function (acct, perms) { // 两个请求现在都执行完成
          // do something
        }.catch(function (error) {
  
        })))
    }
  }
  