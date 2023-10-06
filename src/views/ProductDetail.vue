<template>
	<div class="product-detail">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in swiperList" :key="item.id">
				<img :src="item.img_url" alt="" style="width: 100%; display: block" />
			</van-swipe-item>
		</van-swipe>
		<Tips></Tips>
		<div class="info">
			<div class="name">{{ info.name }}</div>
			<div class="goods_brief">{{ info.goods_brief }}</div>
			<div class="retail_price">{{ info.retail_price | RMBformat }}</div>
		</div>
		<van-cell title="弹出商品选择" is-link @click="isSkuShow = true" />
		<div class="attribute">
			<h3>商品参数</h3>
			<ul>
				<li
					class="attribute_item"
					v-for="(item, index) in attribute"
					:key="index"
				>
					<div class="attribute_name">{{ item.name }}</div>
					<div class="attribute_value">{{ item.value }}</div>
				</li>
			</ul>
			<div v-html="info.goods_desc" width="100%"></div>
		</div>
		<van-collapse v-model="activeNames">
			<van-collapse-item
				:title="item.question"
				:name="item.id"
				v-for="item in issue"
				:key="item.id"
				>{{ item.answer }}</van-collapse-item
			>
		</van-collapse>
		<CardTitle title="相关推荐"></CardTitle>
		<Products
			:searchProductDate="related"
			:finished="true"
			@goProdutDetail="goProdutDetail"
		></Products>
		<van-sku
			v-model="isSkuShow"
			:sku="sku"
			:goods="goods"
			:hide-stock="sku.hide_stock"
			@buy-clicked="onBuyClicked"
			@add-cart="onAddCartClicked"
			@stepper-change="onStepperChange"
		/>
		<AppGoodsAction
			:goodsCount="goodsCount"
			@addCart="addCart"
			@goToCart="goToCart"
		></AppGoodsAction>
	</div>
</template>

<script>
import {
	GetProductDetail,
	GetRelatedData,
	AddCartData,
	GetCartNumber,
} from "@/request/api"
import Tips from "@/components/tips.vue"
import CardTitle from "@/components/cardTitle.vue"
import Products from "@/components/products.vue"
import AppGoodsAction from "@/components/appGoodsAction.vue"
export default {
	name: "ProductDetail",
	data() {
		return {
			isSkuShow: false,
			sku: {
				tree: [],
				//商品价格
				price: 0,
				//是否展示库存
				hide_stock: false,
				//商品库存
				stock_num: 0,
			},
			goods: {
				picture: "",
			},
			//-------------------------------------
			//轮播图数据
			swiperList: [],
			//商品信息
			info: [],
			//商品参数
			attribute: [],
			//相关产品数据
			related: [],
			//展示问题
			activeNames: [],
			//问题数据
			issue: [],
			//productId加入购物车的产品id
			productId: "",
			//goodsId商品id
			goodsId: "",
			//number商品数量
			number: 1,
			//购物车商品总数量
			goodsCount: 0,
		}
	},
	components: {
		Tips,
		CardTitle,
		Products,
		AppGoodsAction,
	},
	methods: {
		//获取此产品的数据
		async getGoodsList() {
			const { data: res } = await GetProductDetail({ id: this.$route.query.id })
			this.swiperList = res.gallery
			res.info.goods_desc = res.info.goods_desc.replace(
				/<img/g,
				"<img style='width:100%;display:blok;' "
			)
			//产品信息数据
			this.info = res.info
			//常见问题数据
			this.issue = res.issue
			for (let index = 0; index < this.issue.length; index++) {
				this.activeNames.push(this.issue[index].id)
			}
			//商品参数数据
			this.attribute = res.attribute
			//sku数据
			this.sku.price = Number(res.info.retail_price).toFixed(2)
			this.sku.stock_num = res.info.goods_number
			this.goods.picture = res.info.list_pic_url
			//加入购物车数据
			this.goodsId = this.$route.query.id
			this.productId = res.productList[0].id

			//console.log(this.activeNames)
			//console.log(res)
			//console.log(res.productList[0].id)
			//console.log(this.$route.query.id)
		},
		//获取相关产品的数据
		async getRelatedList() {
			const { data: res } = await GetRelatedData({ id: this.$route.query.id })
			this.related = res.goodsList
			//console.log("related", res)
		},
		//跳转至相关产品的数据
		goProdutDetail(val) {
			this.$router.push("/productDetail?id=" + val)
			//让页面进行刷星
			setTimeout(() => {
				this.$router.go(0)
			}, 100)
		},
		//立即购买
		onBuyClicked() {},
		//加入购物车
		onAddCartClicked() {},
		//加入购物车按钮
		async addCart() {
			let token = localStorage.getItem("token")
			if (!this.isSkuShow) {
				this.isSkuShow = true
			} else {
				if (!token) {
					this.$toast("请先登陆")
					setTimeout(() => {
						this.$router.push("/user")
					}, 500)
				} else {
					let goodsId = this.goodsId
					let productId = this.productId
					let number = this.number
					const { data: res } = await AddCartData({
						goodsId,
						productId,
						number,
					})
					this.$toast.success("加入购物车成功")
					this.getTotalNumber()
					setTimeout(() => {
						this.$router.push("/cart")
					}, 1500)
				}
			}
		},
		//onStepperChange修改商品数量
		onStepperChange(num) {
			this.number = num
		},
		//跳转购物车
		goToCart() {
			this.$router.push("/cart")
		},
		//获取购物车购物栏总数量
		async getTotalNumber() {
			const { data: res } = await GetCartNumber()
			this.goodsCount = res.cartTotal.goodsCount
		},
	},
	created() {
		//onsole.log(document.documentElement.scrollTop)
		this.getGoodsList()
		this.getRelatedList()
		this.getTotalNumber()
	},
}
</script>

<style lang="less" scoped>
.product-detail {
	padding-bottom: 0.5rem;
}
.info {
	padding: 0.16rem 0.05rem;
	background: #fff;
	border-bottom: 0.01rem solid #ccc;
	text-align: center;
	div {
		padding: 0.1rem 0;
	}
	.name {
		font-size: 0.2rem;
	}
	.goods_brief {
		font-size: 0.14rem;
		color: #ccc;
	}
	.retail_price {
		font-size: 0.14rem;
		color: darkred;
	}
}
.attribute {
	margin: 0.12rem 0 0 0;
	background: #fff;
	padding: 0.15rem;
	h3 {
		margin-bottom: 0.2rem;
	}
	.attribute_item {
		display: flex;
		padding: 0.08rem;
		background: #f1f1f1;
		border-radius: 0.02rem;
		margin: 0.08rem 0;
		align-items: center;
		.attribute_name {
			width: 21%;
			text-align: right;
			margin-right: 0.12rem;
			color: #999;
			font-size: 0.1rem;
		}
		.attribute_value {
			flex: 1;
			font-size: 0.15rem;
		}
	}
}
.van-collapse {
	margin-bottom: 0.2rem;
}
</style>
