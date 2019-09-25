<template>
	<div class="memberContainer">
		<h1>这是member</h1>
		<p>{{ this.$store.state.count }}</p>
	</div>
</template>
<script>
export default {
	
}
</script>

<style lang="scss" scoped>
	.memberContainer {
		margin-top: 50px;
	}
</style>