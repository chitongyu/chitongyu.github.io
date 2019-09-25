import VueRouter from 'vue-router'
// import app from './components/app.vue'
import account from './components/account.vue'
import goodlist from './components/goodlist.vue'
import login from './subcom/login.vue'
import register from './subcom/register.vue'


var router =new VueRouter ({
    routes: [
        { 
            path: '/account',
            component: account,
            children: [
                {path: 'login',component: login},
                {path: 'register',component: register}
            ]
        },
        { 
            path: '/goodlist',
            component: goodlist,
            
        }
    ]
})

export default router