/*
 * @Author: Huanghao
 * @Date: 2019-09-09 13:31:43
 * @LastEditors: Huanghao
 * @LastEditTime: 2019-09-11 14:26:55
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
axios.interceptors.response.use(
    response => {
        response = response.data
        console.log("ss")
        if (response && response.result.code === 503) {
            router.replace('/login')
        }
        if (response.body && response.result.code === 200) {
            console.log("ss")
            console.log(isEmpty)
            if (isEmpty(response.body.rows)) {
                console.log("ss")
                return {
                    status: true,
                    isEmpty: true,
                    data: response.body
                } // 响应空数据
            } else {
                console.log("ss")
                return {
                    status: true,
                    isEmpty: false,
                    data: response.body
                } // 响应非空数据
            }
        } else {
            return {
                status: false,
                data: response.result.code + response.result.msg
            } // 响应错误
        }
    },
    error => {
        return Promise.reject(error)
    }
)
export default {
    // get方式
    get(url, data, succ, err, serverErr) {
        data.time = new Date().getTime() // 防止缓存
        const params = {
            params: data
        }
        return new Promise(function (resolve, reject) {
            axios
                .get(url, params)
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // post表单
    post(url, data) {
        return new Promise(function (resolve, reject) {
            axios
                .post(url, data)
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    // put方式
    put(url, data, succ, err, serverErr) {
        return new Promise(function (resolve, reject) {
            axios
                .put(url, data)
                .then(function (response) {
                    response = response.data
                    if (response.body && response.result.code === 200) {
                        succ && succ(response)
                        resolve()
                    } else {
                        err && err(response)
                        resolve()
                    }
                })
                .catch(function (error) {
                    serverErr && serverErr(error)
                    resolve()
                })
        })
    },
    // delete方式
    delete(url, data, succ, err, serverErr) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(url, data)
                .then(function (response) {
                    response = response.data
                    if (response.body && response.result.code === 200) {
                        succ && succ(response)
                        resolve()
                    } else {
                        err && err(response)
                        resolve()
                    }
                })
                .catch(function (error) {
                    serverErr && serverErr(error)
                    resolve()
                })
        })
    },
    // 多个并发请求
    all(questList) {
        return new Promise(function (resolve, reject) {
            axios
                .all(questList)
                .then(
                    axios.spread(function (acct, perms) {
                        // 两个请求现在都执行完成
                        // do something
                        resolve()
                    })
                )
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}