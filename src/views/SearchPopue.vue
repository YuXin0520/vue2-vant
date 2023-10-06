<template>
	<div class="seach-popue">
		<van-sticky>
			<Search
				@onSearch="onSearch"
				:placeholder="placeholder"
				@onInput="onInput"
				:searchVal="searchVal"
			></Search>
		</van-sticky>

		<historyHot
			v-if="blockShow === 1"
			:historyKeywordList="historyKeywordList"
			:hotKeywordList="hotKeywordList"
			@searchTag="searchTag"
			@clearHistoryHot="clearHistoryHot"
		></historyHot>
		<searchTipsList
			v-else-if="blockShow === 2"
			:searchTipsListData="searchTipsListData"
			@searchListClick="searchListClick"
		></searchTipsList>
		<searchProduct
			v-else
			:searchProductDate="searchProductDate"
			:filterCategory="filterCategory"
			:loading="loadingList"
			:finished="finished"
			@changePrice="changePrice"
			@changeCategory="changeCategory"
			@returnShow="returnShow"
			@goProdutDetail="goProdutDetail"
			@load="onLoad"
			@changeProductLoading="changeProductLoading"
		></searchProduct>
		<!-- <van-dialog v-model="show" title="标题" show-cancel-button> </van-dialog> -->
	</div>
</template>

<script>
import Search from "@/components/search.vue"
import historyHot from "@/components/historyHot.vue"
import searchTipsList from "@/components/searchTipsList.vue"
import searchProduct from "@/components/searchProduct.vue"
//import { Dialog } from "vant"
import {
	GetSearchPopueData,
	GetSearchInputData,
	GetSearchPtData,
	ClearHistoryHot,
} from "@/request/api"
export default {
	name: "SearchPopue",
	data() {
		return {
			//用户输入搜索框的值
			searchVal: "",
			//blockShow 展示那个模块
			//值为1,2,3 1.为搜索历史记录2.搜索展示列表3.产品展示列表
			blockShow: 1,
			//搜索框展示的默认值
			placeholder: "请输入搜索关键词",
			//历史搜索数据
			historyKeywordList: [],
			//热门搜索数据
			hotKeywordList: [],
			//实时搜索数据
			searchTipsListData: [],
			//搜索的产品数据
			searchProductDate: [],
			//分类数据
			filterCategory: [],
			//价格排序(默认高到底)
			order: "desc",
			//默认搜索分类选项
			sort: "id",
			//默认分类
			categoryId: 0,
			//dialog
			//show: false,
			//product页面的loading值
			loadingList: false,
			//product页面的finished值
			finished: false,
			//page搜索的页面
			page: 1,
			//size每页显示条数
			size: 10,
			//总条数
			count: 0,
			//总页数
			totalPages: 2,
			//定时器
			timer:null
		}
	},
	components: {
		Search,
		historyHot,
		searchTipsList,
		searchProduct,
	},
	methods: {
		//搜索产品
		async onSearch(val) {
			this.finished = false
			this.searchVal = val
			this.blockShow = 3
			//let value = val.trim() || ""
			const { data: res } = await GetSearchPtData({
				keyword: val,
				page: this.page,
				size: this.size,
				order: this.order,
				categoryId: this.categoryId,
				sort: this.sort,
			})
			//console.log("res", res)
			//把数据结构拼接成新数组
			this.searchProductDate = [...this.searchProductDate, ...res.goodsList]
			//记录总页数
			this.totalPages = res.totalPages
			//停止加载中
			this.loadingList = false
			//console.log("searchProduct", this.searchProductDate)
			//把数据替换成组件能用的数据
			let newFilterCategory = JSON.parse(
				JSON.stringify(res.filterCategory)
					.replace(/name/g, "text")
					.replace(/id/g, "value")
			)
			this.filterCategory = newFilterCategory
			let total = this.searchProductDate.length
			if (this.page >= this.totalPages || total < this.size) {
				this.finished = true
			}
		},
		//实时搜索
		 onInput(val) {
			this.searchProductDate = []
			this.page = 1
			this.searchVal = val
			this.blockShow = 2
			//console.log(value)
			if(this.timer) clearTimeout(this.timer)
			this.timer = setTimeout(async () => {
				const { data: res } = await GetSearchInputData({ keyword: val })
				this.searchTipsListData = res
				this.timer = null
			}, 1000);
			//实时搜索页数据
		},
		//价格排序数据
		changePrice(order) {
			this.searchProductDate = []
			this.page = 1
			this.order = order
			this.sort = "price"
			this.onSearch(this.searchVal)
		},
		//分类排序
		changeCategory(id) {
			this.searchProductDate = []
			this.page = 1
			this.categoryId = id
			this.onSearch(this.searchVal)
		},
		//点击历史搜索请求数据
		searchTag(value) {
			this.searchProductDate = []
			this.searchVal = value
			this.onSearch(this.searchVal)
			//console.log(this.searchVal)
		},
		//产品单个组件返回按钮
		returnShow() {
			this.blockShow = 1
		},
		//点击实时列列表查询产品
		searchListClick(val) {
			this.searchProductDate = []
			this.page = 1
			this.onSearch(val)
		},
		//点击清除历史记录
		clearHistoryHot() {
			// Dialog.confirm({
			// 	title: "标题",
			// 	message: "弹窗内容",
			// })
			//Dialog({ message: 提示 })
			//Dialog.showConfirmDialog()
			this.$dialog
				.confirm({
					title: "提示",
					message: "是否清除历史记录",
				})
				.then(async (val) => {
					// on confirm
					if (val == "confirm") {
						const res = await ClearHistoryHot()
						if (res.errno != 0) {
							this.$toast.error("清除失败")
						}
						this.$toast.success("清除成功")
						this.historyKeywordList = []
					}
				})
				.catch((val) => {
					// on cancel
					if (val == "cancel") {
						this.$toast("取消了删除")
					}
				})
		},
		//点击跳转至详情页
		goProdutDetail(id) {
			this.$router.push("/productDetail?id=" + id)
		},
		//接受孙子传来的loding
		changeProductLoading(val) {
			this.loadingList = val
			//console.log("传过来的loading", val)
		},
		//上拉加载
		async onLoad() {
			this.page++
			this.onSearch(this.searchVal)
			//console.log("load", this.loadingList)
			//console.log("page", this.page)
			//console.log("loadingList", this.loadingList)
		},
	},
	created() {
		//历史搜索热门搜索页数据
		GetSearchPopueData()
			.then((res) => {
				this.placeholder = res.data.defaultKeyword.keyword
				this.historyKeywordList = res.data.historyKeywordList
				this.hotKeywordList = res.data.hotKeywordList
				//console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	},
	watch: {
		page() {
			this.changeProductLoading()
		},
	},
}
</script>

<style lang="less" scoped>
.seach-popue {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: #f1f1f1;
	z-index: 99;
}
</style>
