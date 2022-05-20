<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="goodsLists">
        <Goods v-for="item in lists" :key="item.id" :data="item" @detailClick="toDetailPage">
          <template #footer>
            <div class="price">
              <div>
                <span>&yen; {{item.sell_price}}</span>
                <!-- <span class="originPrice">111</span> -->
                <van-tag plain type="primary">自 营</van-tag>
              </div>
              <div class="buys">
                <span>{{ item.market_price }}+条评论</span>
              </div>
            </div>
          </template>
        </Goods>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { fetchGoodsList } from "../api/goodslist.js";
import Goods from "../common/Goods.vue";
export default {
  data() {
    return {
      page: 0,
      pagesize: 10,
      lists: [],
      refreshing: false,
      loading: false,
      finished: false,
    };
  },
  methods: {
    //下拉加载
    onLoad() {
      console.log("onload");
      this.page++;
      this._fetchGoodsList();
    },
    //上拉刷新
    onRefresh() {
      console.log(" onRefresh");
      this.page = 0;
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async _fetchGoodsList() {
      if (this.refreshing) {
        this.lists = [];
        this.refreshing = false;
      }
      const result = await fetchGoodsList(this.page, this.pagesize);
      this.loading = false; // 已经加载完毕了
      this.lists = [...this.lists, ...result.message];
      if (result.message.length === 0) {
        this.finished = true; // 已经把接口所有数据都加载完成，在往上拉不会发请求
      }
    },
    toDetailPage(event,data){
       this.$router.push(`/goodsDetail/${data.id}`)
    },
  },
  components: {
    Goods,
  },
};
</script>

<style lang="scss">
.goodsLists {
  display: flex;
  flex-wrap: wrap;
}
</style>