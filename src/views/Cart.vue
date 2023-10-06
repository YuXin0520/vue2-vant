<template>
	<div class="cart">
		<Tips></Tips>
		<van-checkbox-group v-model="result">
			<van-swipe-cell v-for="item in goodsList" :key="item.id">
				<div class="goods-item">
					<van-checkbox
						:name="item.id"
						:disabled="edit ? false : true"
						@click="changeBox(item)"
					>
					</van-checkbox>
					<van-card
						:num="item.number"
						:price="item.retail_price"
						:title="item.goods_name"
						class="goods-card"
						:thumb="item.list_pic_url"
					/>
					<van-stepper
						v-model="item.number"
						v-if="edit == false"
						@change="changeItemNumber(item)"
					/>
				</div>
				<template #right>
					<van-button
						square
						text="移除"
						type="danger"
						class="delete-button"
						@click="deleteItem(item)"
					/>
				</template>
			</van-swipe-cell>
		</van-checkbox-group>

		<van-submit-bar
			:price="cartTotal.checkedGoodsAmount * 100"
			button-text="提交订单"
			@submit="onSubmit"
			v-if="showSubTar"
		>
			<van-checkbox
				v-model="goodsAllChecked"
				:disabled="(edit ? false : true) || (this.goodsList.length != 0 ? false : true)"
				@click="onAllChecked"
				>全选</van-checkbox
			>
			<template #tip v-if="goodsList.length != 0">
				<div class="content">
					<span>累计共{{ cartTotal.goodsCount }}商品，点击</span>
					<van-button
						:type="edit ? 'primary' : 'danger'"
						@click="onClickEdit"
						size="small"
						class="editbutton"
					>
						{{ edit ? "编辑" : "完成编辑" }}
					</van-button>
					<span>按钮进行商品数量修改</span>
				</div>
			</template>
		</van-submit-bar>

		<van-empty description="购物车空空如也" v-if="goodsList.length == 0" />
	</div>
</template>

<script>
import Tips from "@/components/tips.vue"
import {
	GetCartGoods,
	ChanegCheckedBox,
	DeleteGoods,
	changeNumber,
} from "@/request/api.js"
export default {
	name: "Cart",
	data() {
		return {
			//单选选中数组
			result: [],
			//编辑按钮
			edit: true,
			//全选按钮
			goodsAllChecked: false,
			//购物车数据
			goodsList: [],
			//cartTotal购物车总
			cartTotal: {},
			//产品id
			product_id: [],
			//是否展示提交订单按钮
		}
	},
	components: {
		Tips,
	},
	methods: {
		//点击提交
		onSubmit() {
			this.$toast("功能未开放")
		},
		//点击编辑
		onClickEdit() {
			this.edit = !this.edit
			// if (this.edit) {
			// 	this.getCartGoods()
			// }
		},
		//全选按钮点击
		onAllChecked() {
			if (!this.edit) return
			if (this.goodsList.length == 0) return
			this.result = []
			let isChecked = 0
			let productIds = this.product_id.join()
			if (this.goodsAllChecked) {
				this.goodsList.forEach((item) => {
					this.result.push(item.id)
					isChecked = 1
				})
			}
			this.changeBoxRequest(isChecked, productIds)
		},
		//点击单选框
		changeBox(item) {
			if (!this.edit) return
			let isChecked = item.checked == 1 ? 0 : 1
			let productIds = item.product_id
			this.changeBoxRequest(isChecked, productIds)
		},
		//修改复选框请求
		async changeBoxRequest(isChecked, productIds) {
			const { data: res } = await ChanegCheckedBox({
				isChecked,
				productIds,
			})
			this.goodsList = res.cartList
			this.cartTotal = res.cartTotal
		},
		//删除商品请求
		async deleteGoodsRequest(productIds) {
			const { data: res } = await DeleteGoods({
				productIds,
			})
			this.goodsList = res.cartList
			this.cartTotal = res.cartTotal
			//console.log(res)
		},
		//点击删除商品
		deleteItem(item) {
			let productIds = String(item.product_id)
			this.$dialog
				.confirm({
					title: "提示",
					message: "确认移除此商品",
				})
				.then((confirm) => {
					if (confirm == "confirm") {
						this.deleteGoodsRequest(productIds)
						this.$toast.success("移除成功")
					}
				})
				.catch(() => {
					this.$toast("取消了移除")
				})
		},
		//修改数量
		async changeItemNumber(item) {
			let goodsId = item.goods_id
			let id = item.id
			let number = item.number
			let productId = item.product_id
			const { data: res } = await changeNumber({
				goodsId,
				id,
				number,
				productId,
			})
			//this.goodsList = res.cartList
			this.cartTotal = res.cartTotal
		},
		//获取购物车商品数据
		async getCartGoods() {
			const { data: res } = await GetCartGoods()
			this.goodsList = res.cartList
			this.cartTotal = res.cartTotal
			res.cartList.map((item) => {
				item.checked == 1 ? this.result.push(item.id) : ""
				this.product_id.push(item.product_id)
			})
			//console.log("getCartGoods", res)
			//console.log("cartList", this.goodsList)
		},
	},
	created() {
		this.getCartGoods()
		//console.log(this.$route)
	},
	//解决created只执行一次的问题 第一种方法
	activated() {
		this.getCartGoods()
	},
	computed: {
		showSubTar() {
			return this.goodsList.length > 0 ? true : false
		},
		// goodsAllChecked(){
		// 	return this.goodsList.
		// }
	},
	watch: {
		result: {
			handler(){
				let boo = this.result.length === this.goodsList.length 
					if (boo && this.result.length !=  0) {
						console.log(this.result.length)
						console.log(this.goodsList)
						this.goodsAllChecked = true
					} else{
						this.goodsAllChecked = false
					}
			},
			immediate:true
			// console.log(this.result.length)
			// console.log(this.goodsList.length)
			// console.log(boo)
		},
		//解决created只执行一次的问题 第二种
		// $route: {
		// 	handler() {
		// 		this.getCartGoods()
		// 	},
		// 	immediate: true,
		// },
	},
}
</script>

<style lang="less" scoped>
.van-button {
	height: 100%;
}
.van-swipe-cell {
	border-bottom: 1px solid #ccc;
	margin-bottom: 0.1rem;
}
.goods-item {
	background: #fff;
	width: 100%;
	padding: 0 0.1rem;
	display: flex;
	box-sizing: border-box;
	.van-card {
		flex: 1;
		background: #fff;
		padding-right: 0.1rem;
	}
}
//结算栏
.editbutton {
	padding: 0.06rem;
	bottom: 0.04rem;
	margin: 0 0.04rem;
}
.van-submit-bar {
	bottom: 0.5rem;
}
.content {
	vertical-align: middle;
	height: 0.3rem;
	line-height: 0.3rem;
	font-size: 0.14rem;
}
.van-stepper {
	position: absolute;
	right: 0.2rem;
	bottom: 0.13rem;
}
.cart {
	padding-bottom: 1.4rem;
}
</style>
