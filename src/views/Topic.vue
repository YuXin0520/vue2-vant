<template>
	<div class="topic">
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			:immediate-check="false"
		>
			<div class="brand-item" v-for="item in topic" :key="item.id">
				<img :src="item.scene_pic_url" alt="" />
				<div>{{ item.title }}</div>
				<div>{{ item.subtitle }}</div>
			</div>
		</van-list>
	</div>
</template>

<script>
import { TopsDate } from "@/request/api"
export default {
	name: "Brand",
	data() {
		return {
			topic: [],
			list: [],
			loading: false,
			finished: false,
			page: 1,
			size: 5,
		}
	},
	components: {},
	methods: {
		async getBrand() {
			const { data: res } = await TopsDate({
				page: this.page,
				size: this.size,
			})
			this.loading = false
			this.topic = [...this.topic, ...res.data]
			//console.log(this.topic)
			//console.log(res)
		},
		onLoad() {
			if (this.page > this.topic.length / this.size)
				return (this.finished = true)
			this.page++
			this.getBrand()
		},
	},
	created() {
		this.getBrand()
	},
}
</script>

<style lang="less" scoped>
.topic {
	width: 100%;
	height: 100%;
	background: #f1f1f1;
	text-align: center;
	font-size: 0.25rem;
	line-height: 0.3rem;

	.van-list {
		padding-bottom: 0.5rem;
	}
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
