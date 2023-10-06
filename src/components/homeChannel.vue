<template>
	<div class="home-channel">
		<div
			class="channel-item"
			v-for="item in channel"
			:key="item.id"
			@click="turnPage(item)"
		>
			<img :src="item.icon_url" alt="" />
			<div class="title">{{ item.name }}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["channel"],
	data() {
		return {}
	},
	components: {},
	methods: {
    turnPage(item) {
     
			this.$emit("turnPage", item.url)
		},
	},
}
</script>

<style lang="less" scoped>
.home-channel {
	width: 100%;
	display: flex;
	background: #fff;
	.channel-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 20%;
		padding: 0.1rem;
		height: 0.6rem;
		border-right: 1px solid rgb(248, 209, 135);
		&:last-child {
			border: 0;
		}
		img {
			width: 60%;
			display: block;
		}
		.title {
			margin-top: 0.08rem;
		}
	}
}
</style>
