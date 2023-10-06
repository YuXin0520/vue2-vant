<template>
	<div class="home-brand">
		<div class="brand-main">
			<div class="main-title">品牌制造商直供</div>
			<div class="main-content">
				<div
					class="main-item"
					v-for="item in brandList"
					:key="item.id"
					@click="goBrand(item)"
				>
					<img :src="item.pic_url" alt="" />
					<div class="main-text">
						<div class="text-title">{{ item.name }}</div>
						<div class="text-price">{{ item.floor_price | RMBformat }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["brandList"],
	data() {
		return {}
	},
	components: {},
	methods: {
		goBrand(item) {
			this.$emit("goBrand", item)
		},
	},
}
</script>

<style lang="less" scoped>
.brand-main {
	background: #fff;
	width: 100%;
	margin-top: 0.1rem;
	padding: 0.1rem 0;
	.main-title {
		font-size: 0.2rem;
		text-align: center;
		padding: 0.15rem 0;
	}
	.main-content {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.main-item {
			position: relative;
			width: 49.5%;
			margin-top: 0.05rem;
			img {
				width: 100%;
				display: block;
			}
			.main-text {
				position: absolute;
				left: 0.1rem;
				top: 0.1rem;
				.text-title {
					font-size: 0.18rem;
				}
				.text-price {
					color: #999;
					font-size: 0.16rem;
					margin-top: 0.1rem;
				}
			}
		}
	}
}
</style>
