<template>
	<div class="search-product">
		<van-dropdown-menu>
			<van-dropdown-item title="综合" disabled />
			<van-dropdown-item
				title="价格"
				v-model="price"
				:options="option2"
				@change="changePrice"
			/>
			<van-dropdown-item
				title="分类"
				v-model="categoryVal"
				:options="filterCategory"
				@change="changeCategory"
			/>
		</van-dropdown-menu>
		<products
			:searchProductDate="searchProductDate"
			:loading="loading"
			:finished="finished"
			@returnShow="returnShow"
			@goProdutDetail="goProdutDetail"
			@load="onLoad"
			@changeProductLoading="changeProductLoading"
		></products>
	</div>
</template>

<script>
import products from "@/components/products.vue"
export default {
	props: ["searchProductDate", "filterCategory", "loading", "finished"],
	data() {
		return {
			price: "",
			categoryVal: 0,
			option2: [
				{ text: "价格由高到低", value: "desc" },
				{ text: "价格由低到高", value: "asc" },
			],
		}
	},
	components: {
		products,
	},
	methods: {
		//选择价格排序
		changePrice(val) {
			//console.log(val
			this.$emit("changePrice", val)
		},
		//选择分类
		changeCategory(val) {
			this.categoryVal = val
			this.$emit("changeCategory", val)
			//console.log(this.categoryVal)
			//console.log(this.filterCategory)
		},
		//产品单个组件返回上个第一组件的事件
		returnShow() {
			this.$emit("returnShow")
		},
		//跳转至详情页
		goProdutDetail(id) {
			this.$emit("goProdutDetail", id)
		},
		//上拉加载
		onLoad() {
			this.$emit("load")
		},
		//传递loading
		changeProductLoading(val) {
			this.$emit("changeProductLoading", val)
		},
	},
	created() {
		//console.log(this.filterCategory)
		// for (let i = 0; i < this.filterCategory.length; i++) {
		// 	this.filterCategory[i].text = this.filterCategory[i].name
		// 	this.filterCategory[i].value = this.filterCategory[i].id
		// }
		// console.log(this.filterCategory)
	},
	//界面更新，用户按回车的时候执行，
	beforeUpdate() {
		//数据挂载完毕执行
		//console.log(this.filterCategory)
		this.filterCategory.map((item) => {
			if (item.checked) {
				this.categoryVal = item.value
				return
			}
		})
	},
}
</script>

<style lang="less"></style>
