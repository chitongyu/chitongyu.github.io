<template>
<div>
    <h3 class="title">标题</h3>
    <p class="sub_title">
        <span>
            发布时间:2019-08-30
        </span>
        <span>
            点击次数：0次
        </span>
    </p>
    <div class="cotent"></div>
    <comment-box></comment-box>
</div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id: this.$route.params.id
        }
        
    },
    components: {
        'comment-box': comment
    }
}
</script>
<style lang="scss" scoped>
    .title {
        font-size: 16px;
        text-align: center;
    }
    .sub_title {
        font-size: 14px;
        color: rgb(67, 74, 168);
        display: flex;
        justify-content: space-between;
    }
</style>
