<template>
	<div class="product">
		<van-list
			v-model="productLoading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			:immediate-check="immediateCheck"
			offset="50"
		>
			<div class="main">
				<div
					class="main-item"
					v-for="item in searchProductDate"
					:key="item.id"
					@click="goProdutDetail(item.id)"
				>
					<img :src="item.list_pic_url" alt="" />
					<div class="name van-ellipsis">{{ item.name }}</div>
					<div class="price">{{ item.retail_price | RMBformat }}</div>
				</div>
			</div>
		</van-list>

		<!--无数据展示的空组件-->
		<van-empty description="没有相关产品" v-if="searchProductDate.length == 0">
			<van-button round type="danger" class="bottom-button" @click="returnShow"
				>返回</van-button
			>
		</van-empty>
	</div>
</template>

<script>
export default {
	props: ["searchProductDate", "loading", "finished"],
	data() {
		return {
			immediateCheck: false,
			productLoading: false,
			// loading: false,
			// finished: false,
		}
	},
	components: {},
	methods: {
		//无数据返回上一个组件
		returnShow() {
			this.$emit("returnShow")
		},
		//点击单品跳转至详情页
		goProdutDetail(id) {
			this.$emit("goProdutDetail", id)
			//this.$refs.productList.check()
		},
		//上拉加载
		onLoad() {
			this.$emit("load")
			//console.log("孙子", this.productLoading)
		},
		changeProductLoading(val) {
			this.$emit("changeProductLoading", val)
			this.productLoading = false
			//console.log("孙loading", val)
		},
	},
	watch: {
		loading() {
			this.productLoading = this.loading || false
		},
		productLoading(val) {
			this.changeProductLoading(this.productLoading)
			//console.log("productload", this.productLoading)
		},
	},
}
</script>

<style lang="less">
.product {
	background: #f1f1f1;
}
.main {
	padding: 0.1rem;
	margin: auto;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.main-item {
		width: 49%;
		height: 100%;
		margin: 0.05rem 0;
		background-color: #fff;
		padding-bottom: 0.1rem;
		img {
			width: 100%;
			height: 100%;
			display: block;
		}
		.name {
			text-align: center;
			margin: 0.1rem;
			font-size: 0.18rem;
		}
		.price {
			text-align: center;
			font-size: 0.15rem;
			color: red;
		}
	}
}
.bottom-button {
	width: 160px;
	height: 40px;
}
</style>
