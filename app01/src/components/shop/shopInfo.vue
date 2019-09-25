<template>
    <div class="shopInfoContainer">
        <!-- 这是商品页面轮播图 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :swiperList="shopList[id].message"></swiper>
                </div>
            </div>
        </div>
        <!-- 介绍 -->
        <!-- 小球动画 -->
        <transition @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
            <div class="ball"
                 v-if="isShow"
                 ref="ball"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-header"><img src="../../images/timg.jpg"
                     alt=""></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="title">{{ productList[id].name }}</p>
                    <hr>
                    <span class="old_price">市场价：<del>￥{{ productList[id].old_price }}</del></span> &nbsp;&nbsp;
                    <span class="new_price">销售价：<span>￥{{ productList[id].new_price }}</span></span>
                    <div class="shopnum">购买数量：
                        <div class="mui-numbox"
                             data-numbox-min='1'
                             data-numbox-max='9'>
                            <button class="mui-btn mui-btn-numbox-minus"
                                    type="button">-</button>
                            <input id="test"
                                   class="mui-input-numbox"
                                   type="number"
                                   value="1" />
                            <button class="mui-btn mui-btn-numbox-plus"
                                    type="button">+</button>
                        </div>
                    </div>

                    <mt-button type="primary"
                               size="large"
                               plain>立即购买</mt-button>
                    <mt-button type="danger"
                               size="large"
                               plain
                               @click="addToShop">加入购物车</mt-button>
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>
        <!-- 商品参数 -->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data() {
        return {
            id: this.$route.params.id,
            isShow: false,
            shopList: [{
                    message: [{
                        src: require('../../images/timg.jpg')
                    }, {
                        src: require('../../images/timg2.jpg')
                    }, {
                        src: require('../../images/timg3.jpg')
                    }]
                },
                {
                    message: [{
                        src: require('../../images/timg4.jpg')
                    }, {
                        src: require('../../images/timg2.jpg')
                    }, {
                        src: require('../../images/timg3.jpg')
                    }]
                },
                {
                    message: [{
                        src: require('../../images/timg4.jpg')
                    }, {
                        src: require('../../images/timg2.jpg')
                    }, {
                        src: require('../../images/timg3.jpg')
                    }]
                },
            ],
            productList: [{
                    id: 0,
                    name: "小米（mi）小米note 16G双卡网通版",
                    old_price: 2099,
                    new_price: 2199
                },
                {
                    id: 1,
                    name: "小米（mi）小米note 16G双卡网通版",
                    old_price: 2199,
                    new_price: 2199
                },
                {
                    id: 2,
                    name: "小米（mi）小米note 16G双卡网通版",
                    old_price: 2299,
                    new_price: 2199
                },
                {
                    id: 3,
                    name: "小米（mi）小米note 16G双卡网通版",
                    old_price: 2399,
                    new_price: 2199
                },
                {
                    id: 4,
                    name: "小米（mi）小米note 16G双卡网通版",
                    old_price: 2499,
                    new_price: 2199
                },
                {
                    id: 5,
                    name: "小米（mi）小米note 16G双卡网通版",
                    old_price: 2599,
                    new_price: 2199
                },
            ]
        }
    },
    components: {
        swiper
    },
    mounted() {
        mui('.mui-numbox').numbox();
    },
    methods: {
        addToShop() {
            this.isShow = !this.isShow;

            //数量改变了
            var numboxValue = mui('.mui-numbox').numbox().getValue();
            var shopInfoValue = {
                id: this.id,
                name: this.productList[this.id].name,
                count: numboxValue,
                new_price: this.productList[this.id].new_price,
                selected: true
            };
            this.$store.commit("addInfo", shopInfoValue);
        },
        beforeEnter(el) {
            el.style.transform = "translate(0,0)";
        },
        enter(el, done) {
            el.offsetWidth;
            const ballFosition = this.$refs.ball.getBoundingClientRect();
            const badgeFosition = document.getElementById("badge").getBoundingClientRect();
            const xDist = badgeFosition.left - ballFosition.left;
            const yDist = badgeFosition.top - ballFosition.top;
            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 1s cubic-bezier(.15,.84,.72,.9)"
            done();
        },
        afterEnter(el) {
            this.isShow = !this.isShow;
        }
    }
}
</script>

<style lang="scss" scoped>
.shopInfoContainer {
    margin-top: 50px;
    background-color: #fff;
    position: relative;

    .ball {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top: 600px;
        left: 151px;
        // transform: translate(77px, 363px);
    }
}

.mui-card-header {
    img {
        width: 100%;
        height: 240px;
    }
}

.shopnum {
    margin: 15px 0;
}

.mui-card {
    .title {
        color: rgb(0, 119, 255);
        font-size: 16px;
        text-align: center;
    }

    .old_price {
        font-size: 13px;
    }

    .new_price {
        color: red;
        font-size: 13px;
    }

    .mint-button {
        margin: 10px 0;
        width: 40%;
        display: inline-block;
    }
}
</style>
