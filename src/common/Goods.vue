<template>
  <div class="goodsItem" @click="clickHandle">
    <div class="imgWrap flex_c_c">
      <img v-lazy="data.img_url" alt />
    </div>
    <p class="goodsText ellipsis_l2">{{data.title}}</p>
    <slot name="footer">
      <div class="price">
        <div>
          <span>&yen; {{data.sell_price}}</span>
        </div>
        <div class="buys">
          <!-- <span>{{ data.buy }} 购买</span> -->
          <span class="originPrice">原价:{{ data.market_price }}</span>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { fetchRecommend } from "../api/home.js";
export default {
  props: ["data"],
  methods: {
    clickHandle(event) {
      // 触发父绑定的自定义事件
      this.$emit("detailClick", event,this.data);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/common.scss";

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
        // color: #999;
        color: rgb(122, 122, 122);
      }
    }
  }
}
</style>