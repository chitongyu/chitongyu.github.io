// import Vue from 'vue'//vue不完整，只提供了runtime-only
import Vue from '../node_modules/vue/dist/vue.js' 
import app from './components/app.vue' 

// 默认webpack无法打包.vue文件，需使用vue-loader和vue-template-compiler
// import Vue from 'vue'
// var login = {
//     template: '<h1>这是一个组件</h1>'
// }
import router from './router.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//手动将组件挂在到Vue中并成为全局组件
Vue.use(MintUI)


var vm = new Vue({
    el: '#app',
    data: {msg1: '546'},
    methods: {},
    // components: {
    //     login
    // },
    // render: function(createElements) {
    //     return createElements(login)
    // },
    render(h) {
        return h(app)
    },
    router,
})