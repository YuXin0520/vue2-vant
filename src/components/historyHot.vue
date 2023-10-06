<template>
	<div class="history-hot">
		<div class="history">
			<div class="hd">
				<h2>历史记录</h2>
				<van-icon name="delete-o" @click="clearHistoryHot" />
			</div>
			<div class="bd">
				<van-tag
					plain
					type="primary"
					color="#999"
					v-for="(item, index) in historyKeywordList"
					:key="index"
					@click="searchTag(item)"
					>{{ item }}</van-tag
				>
			</div>
		</div>

		<div class="history">
			<div class="hd">
				<h2>热门搜索</h2>
			</div>
			<div class="bd">
				<van-tag
					plain
					type="primary"
					:color="item.is_hot ? 'red' : '#999'"
					v-for="(item, index) in hotKeywordList"
					:key="index"
					@click="searchTag(item)"
					>{{ item.keyword }}</van-tag
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		historyKeywordList: {
			type: Array,
			default: [],
		},
		hotKeywordList: {
			type: Array,
			default: [],
		},
	},
	data() {
		return {}
	},
	components: {},
	methods: {
		//点击标签查询数据
		searchTag(item) {
			let value = item
			if (item.keyword) {
				value = item.keyword
			}
			this.$emit("searchTag", value)
		},
		//点击清楚历史记录
		clearHistoryHot() {
			this.$emit("clearHistoryHot")
		},
	},
}
</script>

<style lang="less">
.history {
	width: 100%;
	background: #fff;
	padding: 0.12rem;
	box-sizing: border-box;
	margin-bottom: 0.2rem;
	.hd {
		display: flex;
		justify-content: space-between;
		font-size: 0.24rem;
		margin-bottom: 0.1rem;
		h2 {
			font-size: 0.2rem;
		}
	}
	.bd {
		.van-tag {
			padding: 0.05rem 0.09rem;
			margin-right: 0.08rem;
			margin-bottom: 0.1rem;
			font-size: 0.15rem;
		}
	}
}
</style>
