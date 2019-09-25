<template>
	<div>
		<h1>这是account的Vue</h1>
		<router-link to="/account/login">登录</router-link>
		<router-link to="/account/register">注册</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
	div {
		font-style: italic;
	}

	.router-link-active {
			font-size: 12em;
		}
</style>
