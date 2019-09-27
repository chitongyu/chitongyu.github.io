
import Vue from 'vue';
//路由
import VueRouter from 'vue-router';
//挂载路由
Vue.use(VueRouter)
//导入路由模块
import router from './router.js';
import moment from 'moment';
//定义全局的过滤器，
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
});

//使用vue-resource保存数据
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://vue.studyit.io';


import app from './components/main/app.vue';
//mintUI
import 'mint-ui/lib/style.css';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
//图片预览插件https://github.com/LS1231/vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// import { Header,Button,Swipe, SwipeItem, Lazyload} from 'mint-ui';

// Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload);
import mintUI from 'mint-ui';
Vue.use(mintUI);

import Vuex from 'vuex'
Vue.use(Vuex);

var car = JSON.parse(localStorage.getItem('shopCar') || '[]');
var store = new Vuex.Store({
	state: {
		shopList: car
	},
	mutations: {//中间仓库管理员
		addInfo(state,infoList){
			var flage = false
			state.shopList.find(item => {//shopList已存在该商品
				console.log('item')
				console.log(item)
				if(item.id == infoList.id){
					item.count += parseInt(infoList.count)
					flage = true
					return true
				}
			})
			if(!flage){
				state.shopList.push(infoList)
			}
			//放在本地localStorage
			localStorage.setItem("shopCar",JSON.stringify(state.shopList));
		},
		updateChange(state,shopInfoChange){
			state.shopList.find(item=>{
				if(item.id == shopInfoChange.goodsId){
					item.count = parseInt(shopInfoChange.count);
					return true;
				}
			})
			localStorage.setItem("shopCar",JSON.stringify(state.shopList));
		},
		deleteFromCar(state,id){
			state.shopList.find((item,i)=>{
				if(item.id == id){
					state.shopList.splice(i,1);
					return true;
				}
			})
			console.log('2121212');
			localStorage.setItem("shopCar",JSON.stringify(state.shopList));
			
		},
		updateSelected(state,selectedInfo) {
			state.shopList.forEach(item=>{
				if(item.id == selectedInfo.id){
					item.selected = selectedInfo.selected;
					return true;
				}
			})
			localStorage.setItem("shopCar",JSON.stringify(state.shopList));
		}
		
	},
	getters: {
		allBadgeCount(state) {
			let sumCount = 0
			state.shopList.forEach(item=>{
				sumCount += item.count
			})
			return sumCount
		},
		getSelected(state){
			let selectedList = {}
			state.shopList.forEach(item=>{
				selectedList[item.id] = item.selected
			})
			return selectedList
		}
	}
})


var vm = new Vue({
	el: '#app',
	data: {},
	methods: {},
	render: h => h(app),
	router,//挂载路由对象
	//挂载Vuex，就是放在VM实例上，任何组件都可以直接使用{{ $store.state.count }}，直接访问数据
	//传数据到VM上一定要使用mutations方法传输，store.commit('increment');
	store
})