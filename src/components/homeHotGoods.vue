<template>
	<div class="home-hot-goods">
		<div class="main-title">人气热门推荐</div>
		<div class="main-content" v-for="item in hotGoodsList" :key="item.id" @click ='goDetail(item.id)'>
			<div class="main-img">
				<img :src="item.list_pic_url" alt="" />
			</div>
			<div class="content">
				<div class="content-title">{{ item.name }}</div>
				<div class="content-name">{{ item.goods_brief }}</div>
				<div class="content-price">{{ item.retail_price | RMBformat }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["hotGoodsList"],
	data() {
		return {}
	},
	components: {},
	methods: {
		//跳转至详情页
		goDetail(id) {
			this.$emit('goDetail',id)
		}
	},
}
</script>

<style lang="less" scoped>
.home-hot-goods {
	margin-top: 0.1rem;
	background: #fff;
	padding: 0.1rem;
	.main-title {
		font-size: 0.2rem;
		text-align: center;
		padding: 0.15rem 0;
	}
	.main-content {
		padding: 0 0.15rem;
		background: #f1f1f1;
		display: flex;
		margin: 0.1rem 0;
		font-size: 0.18rem;
		.main-img {
			width: 28%;
			img {
				width: 100%;
			}
		}
		.content {
			margin-left: 0.15rem;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.content-name {
			font-size: 0.14rem;
			color: #ccc;
		}
		.content-price {
			color: darkred;
		}
	}
}
</style>
