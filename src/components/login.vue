<template>
	<div class="login" @click="showLogin">
		<!--把van-from隔开来防止冒泡-->
		<!-- <div class="login-model" @click="showLogin"></div> -->
		<van-form @submit="onSubmit" class="login-from" @click.native.stop>
			<van-field
				v-model="username"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="密码"
				label="密码"
				placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<div style="margin: 16px">
				<van-button round block type="info" native-type="submit"
					>提交</van-button
				>
			</div>
		</van-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: "123456",
			password: "123456",
		}
	},
	components: {},
	methods: {
		onSubmit(values) {
			// console.log("submit", values)
			this.$emit("onSubmit", values)
		},
		showLogin() {
			this.$emit("showLogin")
		},
	},
}
</script>

<style lang="less" scoped>
.login {
	width: 100%;
	z-index: 99;
	height: 100%;
	position: absolute;
	//padding: 0.2rem;
	top: 0;
	left: 0%;
	background: rgba(0, 0, 0, 0.3);
	//box-sizing: border-box;
	.login-from {
		width: 90%;
		position: absolute;
		margin: auto;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 0.2rem 0;
		background: #fff;
	}
	// .login-model {
	// 	width: 100%;
	// 	height: 100%;
	// 	background: rgba(0, 0, 0, 0.3);
	// }
}
</style>
