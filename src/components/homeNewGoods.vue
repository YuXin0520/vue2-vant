<template>
	<div class="homt-hot-goods">
		<div class="main-title">周一周四·新品首发</div>
		<div class="main">
			<div
				class="main-content"
				v-for="item in newGoodsList"
				:key="item.id"
				@click="goNewDetail(item.id)"
			>
				<img :src="item.list_pic_url" alt="" />
				<div class="main-name">{{ item.name }}</div>
				<div class="main-price">{{ item.retail_price | RMBformat }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["newGoodsList"],
	data() {
		return {}
	},
	components: {},
	methods: {
		//跳转详情
		goNewDetail(id) {
			this.$emit("goNewDetail", id)
		},
	},
}
</script>

<style lang="less" scoped>
.homt-hot-goods {
	width: 100%;
	background: #fff;
	margin-top: 0.1rem;
	padding: 0.1rem;
	box-sizing: border-box;
	.main-title {
		font-size: 0.2rem;
		text-align: center;
		padding: 0.15rem 0;
	}
	.main {
		display: flex;
		flex-wrap: wrap;
		.main-content {
			width: 50%;
			text-align: center;
			img {
				width: 100%;
				display: block;
			}
			.main-name {
				font-size: 0.18rem;
				line-height: 0.25rem;
				padding: 0 0.1rem;
			}
			.main-price {
				color: red;
				font-size: 0.16rem;
				margin-top: 0.1rem;
			}
		}
	}
}
</style>
