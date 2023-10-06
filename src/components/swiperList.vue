<!--
swipertList  组件为轮播图组件
bannerr  接受传入的banner数据 格式为Array


-->
<template>
	<div class="swiperList">
		<van-swipe @change="onChange" :autoplay="3000">
			<van-swipe-item v-for="item in banner" :key="item.id">
				<img :src="item.image_url" width="100%" alt="" />
			</van-swipe-item>
		</van-swipe>
	</div>
</template>
<script>
export default {
	props: {
		banner: {
			type: Array,
			default: [],
		},
	},
	data() {
		return {}
	},
	components: {},
	methods: {
		onChange() {
			this.$emit("onChange")
		},
	},
}
</script>

<style lang="less">
img {
	display: block;
}
</style>
