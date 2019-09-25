<template>
<div class="swiperContainer">
    <mt-swipe :auto="1000">
        <mt-swipe-item v-for="item in swiperList" :key="item.src">
            <img :src="item.src" alt="程予希">
        </mt-swipe-item>
    </mt-swipe>
</div>
</template>

<script>
export default {
	props:["swiperList"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
    height: 200px;
}

.mint-swipe-item {
    img {
        width: 100%;
    }
}
</style>
