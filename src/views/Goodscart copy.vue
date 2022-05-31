<template>
  <div class="cart-container">
    <van-button
      v-if="$store.state.goodsCartData.length > 0"
      block
      type="info"
      plain
      @click="$router.push('/addressedit')"
    >添加地址</van-button>
    <div class="cartlist" v-for="(item,index) in $store.state.goodsCartData" :key="item.id">
      <van-checkbox
        v-model="$store.getters.getGoodsCheckedStatus[item.id]"
        @click="checkBoxChange(index, $store.getters.getGoodsCheckedStatus[item.id])"
      ></van-checkbox>
      <van-swipe-cell>
        <van-card
          :num="item.number"
          :price="item.price"
          :title="item.title"
          :thumb="item.img"
          class="goods-card"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <!-- <van-stepper :value="12" min="1" :name="index" @change="AddNumber" /> -->
    </div>
    <van-submit-bar
      button-color="rgb(0 140 255)"
      :price="this.$store.getters.getCarTotalNumber"
      button-text="提交订单"
    >
      <van-checkbox
        :value="$store.getters.isAllCheck"
        @click="isCheckAll($store.getters.isAllCheck)"
      >共选中 {{$store.getters.getCheckedTotalNumber }} 件</van-checkbox>
      <template #tip>仅支持微信支付</template>
    </van-submit-bar>
    <!-- 购物车没商品时 -->
    <div v-if="$store.state.goodsCartData.length === 0">
      <van-empty :image="emptyImg" description="购物车竟然是空的">
        <van-button round type="info" class="bottom-button">去逛逛吧</van-button>
        <!-- <van-button type="info">信息按钮</van-button> -->
      </van-empty>
    </div>
  </div>
</template>

<script>
import { fetchGoodsCart } from "../api/goodscart.js";
import emptyImg from "../assets/images/goodscart.png";
export default {
  data() {
    return {
      emptyImg,
      goodsCartList: [],
      ids: this.$store.getters.getCarGoodsIds,
    };
  },
  created() {
    this._fetchGoodsCart();
  },
  methods: {
    AddNumber(number, { name: index }) {
      this.$store.commit("numAdds", { number, index });
    },
    checkBoxChange(index, checked) {
      this.$store.commit("itemIsCheck", { index, checked });
    },
    isCheckAll(checkedAll) {
      this.$store.commit("isCheckedAlls", { checkedAll });
    },
    async _fetchGoodsCart() {
      let {message} = await fetchGoodsCart(this.ids);
      console.log(message);
      this.goodsCartList = message;
    },
  
  },
};
</script>

<style lang="scss">
.cart-container {
  .cartlist {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    .van-swipe-cell {
      flex: 1;
      .goods-card {
        margin: 0;
        background-color: #fff;
        display: flex;
      }

      .delete-button {
        height: 100%;
      }
    }
    .van-stepper {
      display: flex;
      align-items: center;
    }
  }
  .van-submit-bar {
    margin-bottom: 50px;
  }
  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>