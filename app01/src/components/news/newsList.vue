<template>
<div>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in localList" :key="item.id">
            <router-link :to="'/home/newsinfo/' + item.id">
                <img class="mui-media-object mui-pull-left" :src="item.srcurl">
                <div class="mui-media-body">
                    <p>{{ item.str }}</p>
                    <p class='mui-ellipsis'>
                        <span>
                            评论时间：{{ item.time | dateFormat("YYYY-MM-DD") }}
                        </span>
                        <span>
                            点击：{{ item.times }}次
                        </span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</div>
</template>

<script>
import {
    Toast
} from 'mint-ui';
export default {
    data() {
        return {
            newsList: [],
            localList: [{
                    id: 1,
                    str: "这是第1段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 2,
                    str: "这是第2段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 3,
                    str: "这是第3段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 4,
                    str: "这是第4段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 5,
                    str: "这是第5段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 6,
                    str: "这是第6段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 7,
                    str: "这是第7段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 8,
                    str: "这是第8段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 9,
                    str: "这是第9段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
                {
                    id: 10,
                    str: "这是第10段话",
                    srcurl: require("../../images/timg.jpg"),
                    time: new Date(),
                    times: 1
                },
            ]
        }
    },
    created() {
        // this.getNewsList()
    },
    methods: {
        getNewsList() {
            this.$http.get('api/getNewslist').then(result => {
                if (result.body.status === 0) {
                    this.newsList = result.body.message;
                } else {
                    Toast('获取新闻出错！');
                    console.log('flase')
                }
            })
        }
    },
    watch: {
        '$toute'(to, from) {
            //对路由变化做出响应
            console.log('有变化了') //测试点击路由的反应
            //页面需要重新加载的地方
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-media-body {
    font-size: 14px;
}

.mui-ellipsis {
    font-size: 12px;
    color: rgb(52, 64, 131);
    display: flex;
    justify-content: space-between;
}
.mui-table-view {
    margin-top: 50px;
}
</style>
