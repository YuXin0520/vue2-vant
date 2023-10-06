<template>
	<div class="search-tips-list">
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<van-cell
				v-for="(item, index) in searchTipsListData"
				:key="index"
				:title="item"
				@click="searchListClick(item)"
			/>
		</van-list>
	</div>
</template>

<script>
export default {
	props: ["searchTipsListData"],
	data() {
		return {
			//searchTipsList: [],
			loading: false,
			finished: true,
		}
	},
	components: {},
	methods: {
		onLoad() {},
		searchListClick(item) {
			this.$emit("searchListClick", item)
		},
	},
}
</script>

<style lang="less"></style>
