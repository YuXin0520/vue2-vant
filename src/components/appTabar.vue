<template>
	<div class="app-tabar">
		<van-tabbar v-model="active">
			<van-tabbar-item to="/home/homeComponents" icon="home-o"
				>首页</van-tabbar-item
			>
			<van-tabbar-item to="/topic" icon="shop-o">主题</van-tabbar-item>
			<van-tabbar-item to="/categtory" icon="apps-o">分类</van-tabbar-item>
			<van-tabbar-item to="/cart" icon="shopping-cart-o"
				>购物车</van-tabbar-item
			>
			<van-tabbar-item to="/user" icon="user-circle-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	components: {},
	methods: {},
	watch: {},
	computed: {
		active: {
			get() {
				return this.$route.meta.activeNum
			},
			set() {},
		},
	},
}
</script>

<style lang="less">
.app-tabar {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 96;
}
</style>
