<template>
<div class="homeContainer">
    <swiper :swiperList="swiperList"></swiper>
    <div class="square-6">
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoList">
                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/shopList">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue';
export default {
    // data() {
    //     return {
    //         swipeList: []
    //     }
    // },
    // created() {
    //     this.getSwipe()
    // },
    // methods: {
    //     getSwipe() { //通过vue-resource取数据
    //         this.$http.get("http://vue.studyit.io/api/getlunbo").then(result => {
    //             console.log(result.body)
    //             if (result.body.status === 0) {
    //                 this.swipeList = result.body.message;
    //             } else {
    //                 console.log("轮播图提取错误!");
    //             }
    //         })
    //     }
    // }
    data() {
        return {
            swiperList: [{
                src: require('../../images/timg.jpg')
            }, {
                src: require('../../images/timg2.jpg')
            }, {
                src: require('../../images/timg3.jpg')
            }]
        }
    },
    components: {
        swiper
    },
    mounted() {
        console.log(this.swiperList)
    }
}
</script>

<style lang="scss" scoped>
// .square-6 {
//     background-color: rgb(255, 255, 255);
// }
.homeContainer {
    margin-top: 44px;
}

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
}
</style>
