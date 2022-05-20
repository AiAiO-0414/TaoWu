<template>
  <div class="goodsDetail-container">
    <!-- 商品轮播图 -->
    <div class="card" @click="previewImage">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ccc">
        <van-swipe-item v-for="(item, index) in thumb" :key="index">
          <van-image width="100%" height="60%" :src="item.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="card">
      <div class="price">
        <span class="sell_price">￥ {{info.sell_price}}</span>
        <van-tag plain type="primary">即将恢复{{info.market_price}}</van-tag>
        <span class="market_price">好评度99%</span>
      </div>
      <div class="title van-multi-ellipsis--l2">{{info.title}}</div>
    </div>
    <div class="card">
      <van-divider content-position="left">介绍</van-divider>
      <div class="contents" v-html="info.content"></div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button color="rgb(91 185 255)" type="warning" text="加入购物车" />
      <van-goods-action-button color="rgb(0 140 255)" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { fetchGoodsImages, fetchGoodsInfo } from "../api/goodsdetails.js";
import { ImagePreview } from "vant";
export default {
  //   props:['id'],
  data() {
    return {
      id: this.$route.params.id,
      thumb: [],
      info: [],
    };
  },
  created() {
    this._fetchGoodsImages();
    this._fetchGoodsInfo();
  },
  methods: {
    async _fetchGoodsImages() {
      let { message } = await fetchGoodsImages(this.id);
      console.log(message);
      this.thumb = message;
    },
    async _fetchGoodsInfo() {
      let { message } = await fetchGoodsInfo(this.id);
      this.info = message;
    },
    previewImage() {
      let imgs = this.thumb.map((item) => item.src);
      ImagePreview({
        images: imgs,
        startPosition: 1,
      });
    },
  },

  // props:['id']
};
</script>

<style lang="scss">
.goodsDetail-container {
  height: 100vh;
  background: rgba(234, 231, 231, 0.368627451);
  padding: 4px;
  .card {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 8px;
    // .my-swipe {
    //   .van-swipe-item {
    //     // height: 350px;
    //     // text-align: center;
    //     // img {
    //     //   // width: 100%;
    //     //   height: 100%;
    //     // }
    //   }
    // }
    .price {
      .sell_price {
        color: #fa865d;
        font-size: 20px;
        margin-right: 20px;
      }

      .market_price {
        color: #666;
        font-size: 14px;
        float: right;
      }
    }

    .title {
      margin-top: 8px;
      color: #333;
      font-weight: 500;
    }

    .contents {
      color: #666;
      margin-bottom: 8px;
      img {
        width: 100%;
        height: 100%;
      }
      table {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>