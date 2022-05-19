<template>
  <div class="goodsList">
    <div class="goodsItem" v-for="item in goodslist" :key="item.id">
      <div class="imgWrap flex_c_c">
        <img v-lazy="item.img_url" alt />
      </div>
      <p class="goodsText ellipsis_l2">{{item.title}}</p>
      <div class="price">
        <div>
          <span>&yen; {{item.sell_price}}</span>
          <span class="originPrice">原价:{{ item.market_price }}</span>
        </div>
        <div class="buys">
          <span>{{ item.buy }} 购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchRecommend } from "../api/home.js";
export default {
  data() {
    return {
      goodslist: [],
    };
  },
  created() {
    this._fetchRecommend();
  },
  methods: {
    async _fetchRecommend() {
      let { message } = await fetchRecommend();
      console.log(message);
      this.goodslist = message;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/common.scss";
.goodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: rgba(234, 231, 231, 0.368627451);
  // margin-top: 4px;
  .goodsItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 3px;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 4px;
    font-size: 14px;
    width: 48%;

    .imgWrap {
      height: 184px;
      border-radius: 8px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .goodsText {
        margin-top: 10px;
    }

    .price {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 10px 0;
      width: 100%;
      .originPrice {
        text-decoration: line-through;
        font-size: 12px;
        // transform: scale(.8);
      }
      span:nth-child(1) {
        color: #ff4142;
        font-size: 18px;
        font-weight: 700;
      }
      .buys {
          padding-top: 10px;
        span:nth-child(1) {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>