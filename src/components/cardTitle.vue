<template>
	<div class="card-title">
		<div>——</div>
		<div>{{ title }}</div>
		<div>——</div>
	</div>
</template>

<script>
export default {
	props: ["title"],
	data() {
		return {}
	},
	components: {},
	methods: {},
}
</script>

<style lang="less" scoped>
.card-title {
	width: 100%;
	height: 0.25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	div {
		padding: 0.05rem;
		font-size: 0.2rem;
	}
}
</style>
