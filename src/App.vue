<template>
	<div id="app">
		<keep-alive>
			<router-view :key="$route.fullPath"></router-view>
		</keep-alive>
		<appTabar v-show="$route.meta.isShow"></appTabar>
		<div class="loading" v-show="this.$store.state.loadingShow">
			<van-loading type="spinner" color="#1989fa" size="50px" />
		</div>
	</div>
</template>
<script>
import "@/vantui"
import appTabar from "@/components/appTabar.vue"
export default {
	components: {
		appTabar,
	},
}
</script>
<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	background-color: #f1f1f1;
	min-height: 100%;
	font-size: 0.14rem;
}
body,
html {
	height: 100%;
}
html {
	font-size: 100px !important;
}
nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
.loading {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 97;
	.van-loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
