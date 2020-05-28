<!--
 * @Author: Lyle
 * @Date: 2020-05-13 09:47:59
 * @LastEditors: Lyle
 * @LastEditTime: 2020-05-21 21:07:17
 * @Description: 
 -->
<template>
  <div class="Test">
    <input v-model.number="msg" type="number" />
    <!-- <CustomInput v-model="searchText" @input="handleInput" message="msg"></CustomInput> -->
		<div>{{name}}</div>
		<CustomInput :name='name' v-model="name"></CustomInput>
    <div id="flip-list-demo" class="demo">
      <button v-on:click="shuffle">Shuffle</button>
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
			<button v-on:click="ShuffImg">ShuffImg</button>
      <transition-group name="list-complete" tag="p">
        <span
          v-for="item in items"
          v-bind:key="item"
          class="list-complete-item"
        >
          {{ item }}
        </span>
      </transition-group>
			<br>
			<br>

			<transition-group name="img-complete" tag="div" class="imgs">
        <img
          v-for="item in itemImages"
					:key="item.img"
          class="img-complete-item"
					:src="item.img"
        >
          <!--<img :src="item.img">-->
      </transition-group>

    </div>
		<router-link to="SignUp">SignUp</router-link>
		<router-link to="SignIn">SignIn</router-link>
		<router-view></router-view>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput/CustomInput.vue";
export default {
	name: "vue",
	components: {
    CustomInput
  },
  data() {
    return {
			name: 'Demi',
      msg: null,
      searchText: "",
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      itemImages: [
        {
          id: 0,
          img: "../../../static/1.jpg"
				},
				{
          id: 1,
          img: "../../../static/2.jpg"
				},
				{
          id: 2,
          img: "../../../static/3.jpg"
				},
				{
          id: 3,
          img: "../../../static/4.jpg"
				},
				{
          id: 4,
          img: "../../../static/5.jpg"
				}
      ],
      nextNum: 10
    };
  },
  
  methods: {
    handleInput() {
      console.log("searchText", this.searchText);
    },
    randomIndex: function() {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function() {
      this.items.splice(this.randomIndex(), 1);
    },
    shuffle: function() {
      this.items = _.shuffle(this.items);
      // this.items = [1, 7, 3, 8, 5, 6, 4, 2, 9];
		},
		ShuffImg() {
			// this.itemImages = _.shuffle(this.itemImages);
			this.itemImages = this.shuffleImg(this.itemImages);
		},
		shuffleImg(array) {	
			array.push(array.shift());
			return array;
		}
  }
};
</script>

<style scoped>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
.list-complete-leave-active {
  position: absolute;
}

/* .img-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.img-complete-enter, .img-complete-leave-to
{
  opacity: 0;
  transform: translateY(-30px);
}
.img-complete-leave-active {
  position: absolute;
} */

.imgs {
	display: flex;
	align-items: center;
	justify-content: center;
}
.img-complete-item{
	width: 100px;
 	height: 100px;
	border: 1px solid black;
	display: inline-block;
	transition: all 1s;
}
.img-complete-item:nth-child(3) {
	/* width: 150px;
	height: 150px; */
	transform: scale(1.5);
	z-index: 999;
}

.Test {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	align-content: flex-start;
	flex-direction: column;
}

</style>
