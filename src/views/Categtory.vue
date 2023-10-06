<template>
  <div class="categtory">
    <van-tree-select
      height="100vh"
      :items="categtoryItem"
      :main-active-index.sync="active"
      @click-nav="getList"
    >
      <template #content>
        <div class="main">
          <!-- <div class="v-name">{{ v.name }}</div> -->
          <div
            class="main-item"
            v-for="item in categtroryRight"
            :key="item.id"
            @click="goProdutDetail(item.id)"
          >
            <img :src="item.list_pic_url" alt="" />
            <div class="name">{{ item.name }}</div>
            <div class="price">{{ item.retail_price | RMBformat }}</div>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { GetHomeList, CategtoryData } from "@/request/api";
export default {
  name: "Categtory",
  data() {
    return {
      active: 0,
      //左侧导航数据
      categtoryItem: [],
      //分类数据
      categoryList: [],
      //右侧数据
      categtroryRight: [],
      //goodlist
      goodsList: [],
      //active
      active: 0,
    };
  },
  components: {},
  methods: {
    async getCateId() {
      const { data: res } = await GetHomeList();
      for (let index = 0; index < res.categoryList.length; index++) {
        //处理左侧导航数据
        let obj = {};
        obj.text = res.categoryList[index].name;
        obj.id = res.categoryList[index].id;
        this.categtoryItem.push(obj);
        //提取全部goodsList
        //console.log("goodsList", res.categoryList[index].goodsList)
      }
      //全部categoryList数据
      this.categoryList = res.categoryList;
      //右侧导航数据
      this.categtroryRight = res.categoryList[0].goodsList;
      // eslint-disable-next-line prettier/prettier
      this.getActive();
      //this.getList()
      //console.log("categoryList", res.categoryList)
      //console.log("categoryList[0]", res.categoryList[0])
      //console.log("goodsList", res.goodsList)
      //console.log(this.categtoryItem)
    },
    //点击获取右侧数据
    getList(val) {
      let index = 0;
      if (val != -1) {
        index = val;
      }
      this.categtroryRight = this.categoryList[index].goodsList;
    },
    // async getCateList(id) {
    // 	const { data: res } = await CategtoryData({ id })
    // 	console.log("List", res)
    // },
    //goProdutDetail跳转详情页
    goProdutDetail(id) {
      this.$router.push("/productDetail?id=" + id);
    },
    //getActive获取导航显示
    getActive() {
      //console.log("categtoryItem", this.categtoryItem)
      //console.log("categtoryItem[0]", this.categtoryItem[0])
      this.active = this.categtoryItem.findIndex((item) => {
        return item.id == this.$route.query.id;
      });
      if (this.active == -1) {
        this.active = 0;
      }
    },
  },
  created() {
    this.getCateId();
  },
  mounted() {},
  watch: {
    //监听导航变化重新获取高亮
    $route: {
      handler() {
        this.getActive();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.categtory {
  width: 100%;
  height: 100%;
  .van-tree-select {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 0.2rem;
    .tree-select-item-height {
      height: 1rem;
    }
  }
}
.van-tree-select__content {
  padding-bottom: 0.5rem;
}
.main {
  padding: 0.1rem;
  .v-name {
    width: 100%;
    margin: 0.05rem;
  }
  padding: 0.1rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .main-item {
    width: 49%;
    height: 100%;
    margin: 0.05rem 0;
    background-color: #fff;
    padding-bottom: 0.1rem;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .name {
      text-align: center;
      margin: 0.1rem;
      font-size: 0.18rem;
      line-height: 0.25rem;
    }
    .price {
      text-align: center;
      font-size: 0.15rem;
      color: red;
    }
  }
}
</style>
