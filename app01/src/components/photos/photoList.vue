<template>
<div calss="slider-container">
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item',item.id == 0 ? 'mui-active': '']" v-for="item in photoList" :key="item.id">
                    {{ item.message }}
                </a>
            </div>
        </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photoList">
        <router-link :to="'/home/photoInfo/'+item.id" v-for="item in list" :key="item.id" tag="li">
            <img v-lazy="item.photo_url">
            <div class="info">
                <h1 class="info-title">{{ item.title }}</h1>
                <div class="info-content">{{ item.content }}</div>
            </div>
        </router-link>
    </ul>
    <!-- <img v-lazy="list[0].photo_url"> -->
</div>
</template>

<script>
//初始化滑动控件，有问题暂无解
import mui from '../../lib/mui/js/mui.min.js'
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
});
import '../../lib/mui/js/mui.min.js'
import '../../lib/mui/css/mui.min.css'
import '../../lib/mui/js/webviewGroup.js'
// import pict1 from '../../images/1.jpg'
export default {
    data() {
        return {
            photoList: [{
                    id: 0,
                    message: "全部"
                },
                {
                    id: 1,
                    message: "家具生活"
                },
                {
                    id: 2,
                    message: "摄影设计"
                },
                {
                    id: 3,
                    message: "明星美女"
                },
                {
                    id: 4,
                    message: "电影图片"
                },
                {
                    id: 5,
                    message: "美男"
                },
                {
                    id: 6,
                    message: "歌星美女"
                },

            ],
            list: [{
                    id: 0,
                    title: "家具生活",
                    content: "淘宝促销上要求图片的尺寸为400px乘400px 我在美图上",
                    photo_url: require('../../images/timg4.jpg')
                },
                {
                    id: 1,
                    title: "明星美女",
                    content: "长*宽尺寸必须为(400px*300px)是什么意思 - 爱问知识人",
                    photo_url: require('../../images/timg.jpg')
                },
                {
                    id: 2,
                    title: "电影图片",
                    content: "2019年8月18日 - 六图网为您提供670张400px设计作品免费下载服务,您还可以找到400px图片、400px素材、400px模板等设计素材,我们为您提供400px图片下载,400px模板下载",
                    photo_url: require('../../images/timg2.jpg')
                },
                {
                    id: 3,
                    title: "美男",
                    content: "2013年11月16日 - 长*宽尺寸必须为(400px * 300px)是什么意思颖2儿 13-11-16 举报类似问题换一批 照片宽度300px什么意思 怎样把图片修改为300px*300x... 宝贝促销图片...",
                    photo_url: require('../../images/timg3.jpg')
                }
            ]
        }
    },
    mounted() {
        mui('.mui-scroll-wrapper').scroll({//初始化scroll控件
            deceleration:0.00001, //阻尼系数,系数越小滑动越灵敏
        });
    }
}
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}

img[lazy="loading"] {
    width: 400px;
    height: 300px;
    margin: auto;
}

.photoList {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0px;

    li {
        margin-bottom: 10px;
        background-color: #ccc;
        text-align: center;
        line-height: 50px;
        box-shadow: 0 0 6px #999;
        position: relative;

        img {
            width: 100%;
            vertical-align: middle;
        }
    }
}

.info {
    color: white;
    text-align: left;
    line-height: 30px;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    max-height: 84px;

    .info-title {
        font-size: 14px;
    }

    .info-content {
        font-size: 13px;
    }
}

.mui-slider {
    margin-top: 50px;

    .mui-control-item {
        padding: 0 10px 0 5px;
    }
}
</style>
