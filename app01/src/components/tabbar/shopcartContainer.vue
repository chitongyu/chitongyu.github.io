<template>
  <div class="shopcartContainer">
    <div class="commodity">
      <div class="mui-card">
        <div class="mui-card-content">
          <div
            :key="item.id"
            class="mui-card-content-inner"
            v-for="(item,i) in shopCarList"
          >
            <mt-switch v-model="$store.getters.getSelected[item.id]" @change="selectedChange(item.id,$store.getters.getSelected[item.id])"></mt-switch>
            <img src="../../images/timg3.jpg" />
            <div class="info">
              <p class="title">{{ item.name }}</p>
              <p class="priceAndNum">
                <span class="price">￥{{ item.new_price }}</span>
                <numbox
                  :goodsid="item.id"
                  :num="item.count"
                  style="height: 25px"
                ></numbox>
                <a
                  @click.prevent="removeOne(item.id,i)"
                  class="mui-icon mui-icon-trash delete"
                  href="#"
                ></a>
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
	data(){
		return {
      shopCarList: [],
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
      var temp = this.shop;
      this.shopCarList.splice(index,1);
      this.$store.commit("deleteFromCar",id);
    },
    selectedChange(id,val) {
      console.log('this.$store.getters.getSelected');
      console.log(this.$store.getters.getSelected);
      this.$store.commit('updateSelected',{id:id,selected:val});
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
      .title {
        font-size: 12px;
      }
      .price {
        color: red;
        font-weight: bold;
      }
      a {
        font-size: 12px;
      }
      display: -webkit-flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .priceAndNum {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.shopcartContainer .mui-card-content-inner .info a[data-v-6aa92d06] {
  font-size: 20px;
  align-self: center;
}
.mui-icon-trash::before {
  color: gray;
}
</style>