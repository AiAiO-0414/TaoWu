<template>
  <div class="home-container">
    <!-- 搜索框 -->
    <van-sticky>
    <div class="searchWarp">
      <div class="logo">
        <img src="../assets/images/favicon.png" alt />
      </div>
      <div class="search">
        <van-search background="#fae2ff" shape="round" placeholder="请输入搜索关键词" />
      </div>
    </div>
    </van-sticky>
    <!-- 轮播图 -->
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swipes" :key="item.img">
          <img :src="item.img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 八宫格 -->
    <van-grid square clickable border>
      <van-grid-item v-for="item in gridItem" :key="item.img" :to="item.to">
        <div class="gridItems">
          <img :src="item.img" />
          <div class="text">{{ item.text }}</div>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 推荐商品 -->
    <van-divider>推荐商品</van-divider>
    <!-- 商品列表 -->
      <!-- <Goods v-for="item in goods" :key="item.id"></Goods> -->
      <Goods></Goods>
  </div>
</template>

<script>
import { fetchSwipe, fetchRecommend } from "../api/home.js";
import GoodsList from "../views/GoodsList.vue";
import Goods from "../common/Goods.vue";
import png1 from "../assets/images/1.png";
import png2 from "../assets/images/2.png";
import png3 from "../assets/images/3.png";
import png4 from "../assets/images/4.png";
import png5 from "../assets/images/5.png";
import png6 from "../assets/images/6.png";
import png7 from "../assets/images/7.png";
import morePng from "../assets/images/more.png";
export default {
  data() {
    return {
      swipes: [],
      goods: [],
      gridItem: [
        { text: "乐淘超市", img: png1 },
        { text: "新闻列表", img: png2 },
        { text: "乐淘生鲜", img: png3 },
        { text: "生活缴费", img: png4 },
        { text: "领津贴", img: png5 },
        { text: "plus会员", img: png6 },
        { text: "领乐豆", img: png7 },
        { text: "更多", img: morePng },
      ],
    };
  },
  created() {
    this._fetchSwipe();
    // this._fetchRecommend();
  },
  methods: {
    async _fetchSwipe() {
      let { message } = await fetchSwipe();
      // console.log(message);
      this.swipes = message;
    },
    // async _fetchRecommend() {
    //   let { message } = await fetchRecommend();
    //   console.log(message);
    //   this.goods = message;
    // },
  },
  components: {
    // GoodsList,
    Goods
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  .van-sticky  {
    background:#fae2ff;
    // background:#fff;
  .searchWarp {
    display: flex;
    // align-items: center;
    .logo {
      width: 60px;
      // height: 60px;
      padding: 0px 3px;
      background:#fae2ff;
      // background: #fff;
      img {
        width: 100%;
        height: 100%;
        transform: scale(0.8);
      }
    }
    .search {
      background: #fae2ff;
      flex: 1;
    }
    }
  }
  .my-swipe {
    .van-swipe-item {
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .van-grid {
    .gridItems {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #666;

      .text {
        margin-top: 6px;
      }

      img {
        width: 50%;
      }
    }
  }
  
}
</style>