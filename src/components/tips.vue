<template>
	<div class="tips">
		<van-row>
			<van-col span="8"
				><van-icon name="checked" color="darkred" />30天无忧退货</van-col
			>
			<van-col span="8"
				><van-icon color="darkred" name="checked" />48小时快速退费</van-col
			>
			<van-col span="8"
				><van-icon color="darkred" name="checked" />满88元免邮费</van-col
			>
		</van-row>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	components: {},
	methods: {},
}
</script>

<style lang="less" scoped>
.tips {
	background: #f1f1f1;
	padding: 0.1rem 0;
	text-align: center;
	.van-icon {
		margin-right: 0.03rem;
	}
}
</style>
