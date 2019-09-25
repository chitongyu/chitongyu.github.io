import VueRouter from 'vue-router'

import homeContainer from './components/tabbar/homeContainer.vue'
import memberContainer from './components/tabbar/memberContainer.vue'
import shopcartContainer from './components/tabbar/shopcartContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoList from './components/photos/photoList.vue'
import photoInfo from './components/photos/photoInfo.vue'
import shopList from './components/shop/shopList.vue'
import shopInfo from './components/shop/shopInfo.vue'

var router =new VueRouter({
    routes: [
        {path: '/',redirect: '/home'},
        {path: '/home',component: homeContainer},
        {path: '/member',component: memberContainer},
        {path: '/shopcart',component: shopcartContainer},
        {path: '/search',component: searchContainer},
        {path: '/home/newsList',component: newsList},
        {path: '/home/newsInfo/:id',component: newsInfo},
        {path: '/home/photoList/',component:photoList},
        {path: '/home/photoInfo/:id',component:photoInfo},
        {path: '/home/shopList',component:shopList},
        {path: '/home/shopInfo/:id',component:shopInfo}

    ],
    linkActiveClass: 'mui-active'//替换router默认的router-link-active
})
export default router