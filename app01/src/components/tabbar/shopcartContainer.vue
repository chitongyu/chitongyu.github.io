<template>
  <div class="shopcartContainer">
    <div class="commodity">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" v-for="(item,i) in shopCarList" :key=item.id>
            <mt-switch></mt-switch>
            <img src="../../images/timg3.jpg" />
            <div class="info">
              <h2>{{ item.name }}</h2>
              <p>
                <span class="price">￥{{ item.new_price }}</span>
                <numbox :num="item.count" :goodsid="item.id" style="height: 25px"></numbox>
                <a href="#" @click.prevent="removeOne(item.id,i)">刪除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from '../subcomponents/shopInfo_numbox.vue'
export default {
	date(){
		return {
      shopCarList: [],
      shop: "1",
		}
	},
	components: {
		numbox
	},
	created(){
		this.getGoods();
	},
	methods: {
		getGoods() {
			this.shopCarList = JSON.parse(localStorage.getItem('shopCar') || '[]');
    },
    removeOne(id,index) {
      // this.shop = '2';
      console.log('this.shop');
      console.log(this.shop);
      console.log(this.shopCarList);
      var temp = this.shop;
      console.log(temp);
      this.shopCarList.splice(index,1);
      this.$store.commit("deleteFromCar",id);
    }
	}
}
</script>

<style lang="scss" scoped>
.shopcartContainer {
  margin-top: 50px;
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
    .info {
      margin: 0;
      h2 {
        font-size: 12px;
      }
      .price {
        color: red;
        font-weight: bold;
      }
      a {
        font-size: 12px;
      }
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>