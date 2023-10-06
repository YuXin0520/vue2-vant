<template>
	<div class="home">
		<!--搜索框-->
		<van-sticky>
			<Search
				:searchDisabled="searchDisabled"
				@goSearchList="goSearchList"
			></Search>
		</van-sticky>

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
export default {
	name: "Home",
	data() {
		return {
			//是否禁用搜索框
			searchDisabled: true,
		}
	},
	components: {
		Search,
	},
	methods: {
		//跳转搜索页
		goSearchList() {
			this.$store.commit("changeShowPopue", true)
			//console.log(this.searchDisabled)
			this.$router.push("/home/searchPopue")
		},
	},
	created() {
		// request.get("/index/index").then((res) => {
		// 	console.log(res)
		// })
		// GetHomeList()
		// 	.then((res) => {
		// 		if (res.errno == 0) {
		// 			this.banner = res.data.banner
		// 			this.channel = res.data.channel
		// 			this.brandList = res.data.brandList
		// 			this.newGoodsList = res.data.newGoodsList
		// 			this.hotGoodsList = res.data.hotGoodsList
		// 		}
		// 		console.log(res.data)
		// 	})
		// 	.catch((err) => {
		// 		console.log(err)
		// 	})
	},
	watch: {
		$route: {
			handler() {
				this.$store.commit("changeShowPopue", false)
			},
			immediate: true, //第一次就执行
		},
	},
}
</script>

<style lang="less" scoped>
.hide-popue {
	width: 100%;
	height: 100%;
	position: fixed;
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
