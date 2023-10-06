<template>
	<div>
		<van-goods-action>
			<van-goods-action-icon
				:icon="isCellShow ? 'star' : 'star-o'"
				:text="isCellShow ? '已收藏' : '未收藏'"
				:color="isCellShow ? '#ff5000' : '#333'"
				@click="isCellShow = !isCellShow"
			/>
			<van-goods-action-icon
				icon="cart-o"
				text="购物车"
				:badge="goodsCount ? goodsCount : ''"
				color="#333"
				@click="goToCart"
			/>
			<van-goods-action-button type="danger" text="立即购买" @click="goPay" />
			<van-goods-action-button
				type="warning"
				text="加入购物车"
				@click="addCart"
			/>
		</van-goods-action>
	</div>
</template>

<script>
export default {
	//goodsCount商品总数量
	props: ["goodsCount"],
	data() {
		return {
			isCellShow: false,
		}
	},
	components: {},
	methods: {
		//加入购物车
		addCart() {
			this.$emit("addCart")
		},
		//立即购买
		goPay() {
			this.$toast("功能未开放")
		},
		//修改数量
		// onStepperChange(val) {
		// 	console.log("Pnumber")
		// 	console.log("Pnumber", val)
		// 	this.$emit("onStepperChange", val)
		// },
		//跳转至购物车
		goToCart() {
			this.$emit("goToCart")
		},
	},
}
</script>

<style lang="less" scoped>
.van-goods-action {
	z-index: 9999;
}
</style>
