import Vue from "vue"
import axios from "axios"
import store from "../store"
//创建axios实例对象
const instrance = axios.create({
	baseURL: "http://kumanxuan1.f3322.net:8001",
	settimeout: 5000,
})
//请求拦截器
instrance.interceptors.request.use(
	(config) => {
		//请求发送之前调用
		//Vue.$store.commit("changeLoading", true)
		store.commit("changeLoading", true)
		const token = localStorage.getItem("token")
		if (token) {
			config.headers["X-Nideshop-Token"] = token
		}
		return config
	},
	(err) => {
		return Promise.reject(err)
	}
)

instrance.interceptors.response.use(
	(res) => {
		//响应前调用
		//Vue.$store.commit("changeLoading", false)
		store.commit("changeLoading", false)
		return res.data
	},
	(err) => {
		return Promise.reject(err)
	}
)

export default instrance
