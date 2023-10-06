<template>
	<div class="search">
		<form action="/">
			<van-search
				v-model="searchValModel"
				:show-action="searchDisabled ? false : true"
				:autofocus="searchDisabled ? false : true"
				:placeholder="placeholder"
				@search="onSearch"
				@cancel="onCancel"
				@click="goSearchList"
				@input="onInput"
				:disabled="searchDisabled"
				ref="searchRef"
			/>
		</form>
	</div>
</template>

<script>
export default {
	props: {
		//是否禁用输入框，默认不禁用,传true会显示取消按钮
		searchDisabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: "请输入搜索关键词",
		},
		searchVal: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			searchValModel: "",
		}
	},
	components: {},
	//监听props属性变化中转赋值给searchValModel
	watch: {
		searchVal: {
			handler(val) {
				//console.log("watch", val)
				this.searchValModel = val
			},
			immediate: true,
		},
	},
	methods: {
		goSearchList() {
			this.$emit("goSearchList")
		},
		//取消按钮
		onCancel() {
			this.$store.commit("changeShowPopue", false)
			this.$router.go(-1)
		},
		//onSearch搜索
		onSearch(val) {
			//console.log(val)
			this.$emit("onSearch", val)
		},
		//输入时搜索
		onInput(val) {
			this.$emit("onInput", val)
		},
		onkeyup(val) {
			this.$emit('onKeyup',val)
		}
	},
	created() {
		//console.log(this.searchVal)
	},
	mounted() {
		//console.log(this.$refs.searchRef.focus())
		//console.log(this.searchVal)
	},
}
</script>

<style lang="less"></style>
