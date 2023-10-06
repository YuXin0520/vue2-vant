import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		showPopur: false,
		loadingShow: false,
	},
	getters: {},
	mutations: {
		//展示遮罩层
		changeShowPopue(state, paye) {
			state.showPopur = paye
		},
		//改变加载
		changeLoading(state, paye) {
			state.loadingShow = paye
		},
	},
	actions: {},
	modules: {},
})
