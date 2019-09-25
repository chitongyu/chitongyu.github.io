<template>
<div class="photoInfo-container">
    <!-- <h3 v-for="item in infoList" :key="item.id" >{{ item[webid].title }}</h3> -->
    <h3 class="title">{{ list.title }}</h3>
    <p class="subtitle">
        <span class="comment-time">发表时间：{{ list.time | dateFormat }}</span>
        <span class="comment-times">点击：{{ list.id }}次</span>
    </p>
    <hr>
    <!-- 缩略图区域 -->
    <vue-preview :slides="slide1"></vue-preview>
    <!-- 介绍 -->
    <P>{{ list.content }}</P>
    <!-- 评论区 -->
    <cmt-box :id="webid"></cmt-box>

</div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            webid: this.$route.params.id,
            infoList: [{
                    id: 0,
                    title: "家具生活",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上淘宝促销上要求图片的尺寸为400px乘400px 我在美图上淘宝促销上要求图片的尺寸为400px乘400px 我在美图上淘宝促销上要求图片的尺寸为400px乘400px 我在美图上淘宝促销上要求图片的尺寸为400px乘400px 我在美图上淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },
                {
                    id: 1,
                    title: "家具生活1",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },
                {
                    id: 2,
                    title: "家具生活2",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },
                {
                    id: 3,
                    title: "家具生活3",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },
                {
                    id: 4,
                    title: "家具生活4",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },
                {
                    id: 5,
                    title: "家具生活5",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },
                {
                    id: 6,
                    title: "家具生活6",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },
                {
                    id: 7,
                    title: "家具生活7",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },
                {
                    id: 8,
                    title: "家具生活8",
                    time: Date.now(),
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上"
                },

            ],
            list: {},
            slide1: [{
                    src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                    msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                    alt: 'picture1',
                    title: 'Image Caption 1',
                    w: 600,
                    h: 400
                },
                {
                    src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                    msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                    alt: 'picture2',
                    title: 'Image Caption 2',
                    w: 1200,
                    h: 900
                }
            ]
        }
    },
    created() {
        // console.log(id)
        this.getList();
    },
    methods: {
        getList() {
            this.list = this.infoList[this.webid];
        }
    },
    components: {
        'cmt-box': comment
    }
}
</script>

<style lang="scss" scoped>
.photoInfo-container {
    margin-top: 50px;

    .title {
        font-size: 15px;
        color: #26A2FF;
        text-align: center;
    }

    .subtitle {
        display: flex;
        justify-content: space-between;
        color: #26A2FF;
    }
}
</style>
