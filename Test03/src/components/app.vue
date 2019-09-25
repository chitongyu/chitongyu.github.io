
<template>
	<div>
		<h1>这是使用Vue定义的login{{msg}}</h1>

		<mt-button type="default" @click="show">BUTTON</mt-button>

		<router-link to="/account">account</router-link>
		<router-link to="/goodlist">goodlist</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import 'bootstrap/dist/css/bootstrap.css'
export default {
	data(){//组件中的data必须是function
		return {
			msg:'123'
		}
	},
	methods: {
		show(){
			Toast({
				message: '操作成功',
				position: 'top',
				iconClass: 'glyphicon glyphicon-ok'
			});
		}
	}
}
</script>

<style>
	
</style>