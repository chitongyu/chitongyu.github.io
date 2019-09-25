<template>
<div class="commentContainer">
    <h1 class="title">发表评论</h1>
    <hr>
    <textarea class="comment-text" placeholder="请输入评论（最多120字)" maxlength="120" v-model="msg"></textarea>
	<mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
	<div class="comment" v-for="(item,index) in commentList" :key="item.floor">
		<p class="comment-title">
			第{{ index + 1 }}楼&nbsp;&nbsp; 用户:{{ item.name }}&nbsp;&nbsp;发布时间：{{ item.time | dateFormat }}
		</p>
		<p class="comment-body">
			{{ item.message }}
		</p>
	</div>
	<mt-button type="danger" size="large" plain>获取更多</mt-button>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
	data(){
		return {
			id: this.$route.params.id,
			msg: "",
			commentList: [
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()},
				{name:"匿名用户",message: "生活真心不易啊！",time: Date.now()}
			]
		}
	},
	methods: {
		postComments(){
			if(this.msg.trim().length === 0){
				return Toast({
					message: "请输入评论",
					className: "toast-class"
				})
			}
			var cmt = {
				name: "匿名用户",
				message: this.msg,
				time: Date.now()+3
			}
			this.commentList.unshift(cmt)
			// console.log(cmt)
		}
	}
}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 18px;
	}
	.comment-text {
		height: 100px;
		font-size: 12px;
		margin: 0px;
	}
	.comment p{
		margin: 0px;
		line-height: 30px;
	}
	.comment-title {
		color:rgb(0, 0, 0);
		font-size: 14px;
		background-color: rgb(161, 159, 159);
	}
	.coment-body {
		color:rgb(0, 0, 0);
		text-indent: 2em;
	}
	.toast-class {
		background-color: #86467b;
		font-size: 20px;
		color: red;
	}
</style>
