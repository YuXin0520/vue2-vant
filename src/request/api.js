import request from "./request"

//请求首页数据
export const GetHomeList = () => request.get("/index/index")  

//获取搜索弹出框的数据
export const GetSearchPopueData = () => request.get("/search/index")

//输入数值请求例表数据
// request.get('/search/helper',{params:{keyword:xxx}})========{params:params} (Object)
export const GetSearchInputData = (params) =>
	request.get("/search/helper", { params })

//搜索的产品数据
export const GetSearchPtData = (params) =>
	request.get("/goods/list", { params })

//清除历史记录
export const ClearHistoryHot = () => request.post("/search/clearhistory")

//登陆接口
export const GoLogin = (params) => request.post("/auth/loginByWeb", params)

//单个商品数据
export const GetProductDetail = (params) =>
	request.get("/goods/detail", { params })

//相关产品数据
export const GetRelatedData = (params) =>
	request.get("/goods/related", { params })

//加入购物车
export const AddCartData = (params) => request.post("/cart/add", params)

//获取购物栏购物车总数量
export const GetCartNumber = () => request.get("/cart/goodscount")

//获取购物车商品数据
export const GetCartGoods = () => request.get("/cart/index")

//点击切换商品
export const ChanegCheckedBox = (params) =>
	request.post("/cart/checked", params)
//删除商品
export const DeleteGoods = (params) => request.post("/cart/delete", params)

//改变数量
export const changeNumber = (params) => request.post("/cart/update", params)

//跳转品牌页
export const BrandDate = (params) => request.get("/brand/detail", { params })

//专题数据请求
export const TopsDate = (params) => request.get("/topic/list", { params })

//分类数据
export const CategtoryData = (params) =>
	request.get("/goods/category", { params })
