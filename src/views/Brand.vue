<template>
	<div class="brand">
		<div class="brand-item">
			<img :src="brand.app_list_pic_url" alt="" />
			<div>{{ brand.name }}</div>
			<div>{{ brand.simple_desc }}</div>
		</div>
	</div>
</template>

<script>
import { BrandDate } from "@/request/api"
export default {
	name: "Brand",
	data() {
		return {
			brand: [],
		}
	},
	components: {},
	methods: {
		async getBrand() {
			const { data: res } = await BrandDate({
				id: this.$route.query.id,
			})
			this.brand = res.brand
			//console.log(res)
			//console.log(this.$route.query.id)
		},
	},
	created() {
		this.getBrand()
	},
}
</script>

<style lang="less" scoped>
.brand {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: #f1f1f1;
	z-index: 99;
	text-align: center;
	font-size: 0.25rem;
	line-height: 0.3rem;
	img {
		width: 100%;
		display: block;
	}
	.brand-item {
		background: #fff;
		padding-bottom: 0.2rem;
		div {
			margin: 0.1rem;
			&:last-child {
				font-size: 0.18rem;
				color: #999;
			}
		}
	}
}
</style>
