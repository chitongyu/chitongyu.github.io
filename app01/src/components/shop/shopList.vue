<template>
<div class="shopList-container">
    <div class="imgItem" >
        <img src="../../images/timg.jpg" @click="goDetail(0)">
        <h3 class="title">风景风景风景风景风景风景风景风景</h3>
        <div class="info">
            <p class="price">
                <span class="new">￥299</span>
                <span class="old">￥199</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩余：4件</span>
            </p>
        </div>
    </div>
    <!--  -->
    <div class="imgItem">
        <img src="../../images/timg2.jpg" @click="goDetail(1)">
        <h3 class="title">风景风景风景风景风景</h3>
        <div class="info">
            <p class="price">
                <span class="new">￥299</span>
                <span class="old">￥199</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩余：4件</span>
            </p>
        </div>
    </div>
    <div class="imgItem">
        <img src="../../images/timg3.jpg" @click="goDetail(2)">
        <h3 class="title">风景</h3>
        <div class="info">
            <p class="price">
                <span class="new">￥299</span>
                <span class="old">￥199</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩余：4件</span>
            </p>
        </div>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            list: [{
                    id: 0,
                    imgurl: require('../../images/timg.jpg')
                },
                {
                    id: 1,
                    imgurl: require('../../images/timg2.jpg')
                },
                {
                    id: 2,
                    imgurl: require('../../images/timg3.jpg')
                }
            ]
        }
    },
    methods: {
        goDetail(id){
            this.$router.push("/home/shopInfo/" + id);
            console.log(this);
        }
    }
}
</script>

<style lang="scss" scoped>
.shopList-container {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;

    .imgItem {
        width: 49%;
        border: 1px #ccc;
        box-shadow: 0 0 4px #ccc;
        margin-bottom: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-between; 
		min-height: 226px;
        img {
            width: 100%;
        }
    }

    .title {
        font-size: 15px;
    }

    .info {
		padding:2px;
		background-color: #eee;
		p {
			margin: 0;
			padding: 5px;
		}
        .old {
            color: rgb(139, 138, 138);
			font-size: 13px;
			margin-left: 3px;
            text-decoration: line-through;
        }

        .new {
            color: red;
            font-weight: bold;
        }

        .sell {
            color: rgb(139, 138, 138);
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
