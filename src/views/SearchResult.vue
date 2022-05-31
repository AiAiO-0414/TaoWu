<template>
  <div class="search-result">
    <van-search
      v-model="keyword"
      @cancel="onCancel"
      @search="onSearch"
      show-action
      placeholder="请输入搜索关键词"
    />
    <van-dropdown-menu>
      <van-dropdown-item @change="changeSort" v-model="sort" :options="option1" />
    </van-dropdown-menu>

    <div class="goodslist" v-if="goodsList.length>0">
      <Goods @detailClick="ToDetail" v-for="item in goodsList" :key="item.id" :data="item" />
    </div>
    <van-empty v-else description="暂无搜索结果" />
  </div>
</template>

<script>
import { fetchGetSearchResult } from "../api/home.js";
import Goods from "../common/Goods.vue";
export default {
  data() {
    return {
      keyword: this.$route.params.keyword,
      sort: "buy", // 默认bug是排序的字段
      order: "desc", // 默认降序
      option1: [
        { text: "销量", value: "buy" },
        { text: "好评", value: "likes" },
        { text: "价格", value: "sell_price" },
      ],
      page: 1,
      pagesize: 10,
      goodsList: [],
    };
  },
  created() {
    this._fetchGetSearchResult();
  },
  //加了Keep-alive缓存后不会再执行created，需加activated
  activated(){
      this.keyword = this.$route.params.keyword
      this._fetchGetSearchResult();
  },
  methods: {
    async _fetchGetSearchResult() {
      let searchData = {
        value: this.keyword,
        sort: this.sort,
        order: this.order,
        page: this.page,
        pagesize: this.pagesize,
      };
      let result = await fetchGetSearchResult(searchData);
      this.goodsList = result;
    },
    onCancel() {
      this.$router.back();
    },
    onSearch() {
      this._fetchGetSearchResult();
    },
    ToDetail(event,data) {
        console.log(data);
     this.$router.push(`/goodsDetail/${data.id}`)
    },
    changeSort(sort){
        this.sort = sort
        this._fetchGetSearchResult();
    }
  },
  components: {
    Goods,
  },
};
</script>

<style lang="scss" scoped>
.search-result {
  height: 100vh;
  background: #f0eded;

  .goodslist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 10px;
  }
}
</style>