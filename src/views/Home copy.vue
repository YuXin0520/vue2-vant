<template>
	<div class="home">
		<!--搜索框-->
		<van-sticky>
			<Search
				:searchDisabled="searchDisabled"
				@goSearchList="goSearchList"
			></Search>
		</van-sticky>

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

		<!--搜索页-->
		<transition name="van-fade">
			<div class="hide-popue" v-show="$store.state.showPopur"></div>
		</transition>
		<transition name="van-slide-right">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import Search from "@/components/search.vue"
import SwiperList from "@/components/swiperList.vue"
import HomeChannel from "@/components/homeChannel.vue"
import HomeBrand from "@/components/homeBrand.vue"
import HomeNewGoods from "@/components/homeNewGoods.vue"
import HomeHotGoods from "@/components/homeHotGoods.vue"
import { GetHomeList, BrandDate } from "@/request/api"
export default {
	name: "Home",
	data() {
		return {
			//是否禁用搜索框
			searchDisabled: true,
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
		Search,
		SwiperList,
		HomeChannel,
		HomeBrand,
		HomeNewGoods,
		HomeHotGoods,
	},
	methods: {
		//跳转搜索页
		goSearchList() {
			this.$store.commit("changeShowPopue", true)
			//console.log(this.searchDisabled)
			this.$router.push("/home/searchPopue")
		},
		//跳转channel页
		turnPage(url) {
			// let id = url.split("id=")[1]
			// this.$router.push("categtory?id=" + id)
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
				console.log(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	},
}
</script>

<style lang="less" scoped>
.hide-popue {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 98;
}
.home {
	padding-bottom: 0.55rem;
}
// .slider-enter,
// .slider-leave-to {
// 	left: 100%;
// }
// .slider-enter-active,
// .slider-leave-active {
// 	transition: left 5s;
// }
// .slider-enter-to,
// .slider-leave {
// 	left: 0;
// }
</style>
