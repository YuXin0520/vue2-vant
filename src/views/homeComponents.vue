<template>
	<div>
		<SwiperList :banner="banner"></SwiperList>
		<!--类别组件-->
		<HomeChannel :channel="channel" @turnPage="turnPage"></HomeChannel>

		<!--品牌制造商-->
		<HomeBrand :brandList="brandList" @goBrand="goBrand"></HomeBrand>

		<!--新品推荐-->
		<HomeNewGoods
			:newGoodsList="newGoodsList"
			@goNewDetail="goNewDetail"
		></HomeNewGoods>

		<!--热门推荐-->
		<HomeHotGoods
			:hotGoodsList="hotGoodsList"
			@goDetail="goHotDetail"
		></HomeHotGoods>
	</div>
</template>

<script>
import SwiperList from "@/components/swiperList.vue"
import HomeChannel from "@/components/homeChannel.vue"
import HomeBrand from "@/components/homeBrand.vue"
import HomeNewGoods from "@/components/homeNewGoods.vue"
import HomeHotGoods from "@/components/homeHotGoods.vue"
import { GetHomeList, BrandDate } from "@/request/api"
export default {
	name: "HomeComponents",
	data() {
		return {
			//轮播图数据
			banner: [],
			//icon区数据
			channel: [],
			//品牌制造商数据
			brandList: [],
			//新品首发
			newGoodsList: [],
			//热门推荐
			hotGoodsList: [],
		}
	},
	components: {
		SwiperList,
		HomeChannel,
		HomeBrand,
		HomeNewGoods,
		HomeHotGoods,
	},
	methods: {
		//跳转channel页
		turnPage(url) {
			let id = url.split("id=")[1]
			this.$router.push("/categtory?id=" + id)
		},
		//跳转至品牌页
		goBrand(item) {
			this.$router.push("/home/brand?id=" + item.id)
			// const { data: res } = await BrandDate({
			// 	id: item.id,
			// })
			// console.log(res)
		},
		//goHotDetail跳转至热门的详情页
		goHotDetail(id) {
			this.$router.push("/productDetail?id=" + id)
		},
		//goNewDetail跳转至新品详情页
		goNewDetail(id) {
			this.$router.push("/productDetail?id=" + id)
		},
	},
	created() {
		// request.get("/index/index").then((res) => {
		// 	console.log(res)
		// })
		GetHomeList()
			.then((res) => {
				if (res.errno == 0) {
					this.banner = res.data.banner
					this.channel = res.data.channel
					this.brandList = res.data.brandList
					this.newGoodsList = res.data.newGoodsList
					this.hotGoodsList = res.data.hotGoodsList
				}
				//console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	},
}
</script>

<style lang="less" scoped></style>
