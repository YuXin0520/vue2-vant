import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
	return originalPush.call(this, location).catch((err) => {})
}

//import "vant/lib/index.css"
Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		redirect: "/home/homeComponents",
	},
	{
		path: "/home",
		name: "Home",
		component: Home,
		meta: {
			isShow: true,
		},
		children: [
			{
				path: "searchPopue",
				name: "SearchPopue",
				component: () =>
					import(
						/* webpackChunkName: "SearchPopue" */ "../views/SearchPopue.vue"
					),
			},
			{
				path: "brand",
				name: "Brand",
				component: () =>
					import(/* webpackChunkName: "Brand" */ "../views/Brand.vue"),
			},
			{
				path: "homeComponents",
				name: "HomeComponents",
				meta: {
					isShow: true,
				},
				component: () =>
					import(/* webpackChunkName: "Brand" */ "../views/homeComponents.vue"),
			},
		],
	},
	{
		path: "/topic",
		name: "Topic",
		meta: {
			activeNum: 1,
			isShow: true,
		},
		component: () =>
			import(/* webpackChunkName: "Topic" */ "../views/Topic.vue"),
	},
	{
		path: "/categtory",
		name: "Categtory",
		meta: {
			activeNum: 2,
			isShow: true,
		},
		component: () =>
			import(/* webpackChunkName: "Topic" */ "../views/Categtory.vue"),
	},
	{
		path: "/cart",
		name: "Cart",
		meta: {
			activeNum: 3,
			isShow: true,
		},
		component: () =>
			import(/* webpackChunkName: "Topic" */ "../views/Cart.vue"),
	},
	{
		path: "/user",
		name: "User",
		meta: {
			activeNum: 4,
			isShow: true,
		},
		component: () =>
			import(/* webpackChunkName: "Topic" */ "../views/User.vue"),
	},
	{
		path: "/productDetail",
		name: "ProductDetail",
		component: () =>
			import(/* webpackChunkName: "Topic" */ "../views/ProductDetail.vue"),
	},
	// {
	//   path: "/about",
	//   name: "about",
	//   component: () =>
	//     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	// },
	// {
	//   path: "/about",
	//   name: "about",
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () =>
	//     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	// },
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.path == "/cart") {
		let token = localStorage.getItem("token")
		if (token) {
			next()
		} else {
			next("/user")
			Vue.prototype.$toast("请先登陆")
			// setTimeout(() => {
			// 	next("/user")
			// }, 500)
		}
	}
	next()
})
export default router
