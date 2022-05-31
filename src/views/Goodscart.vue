<template>
  <div class="cart-container">
    <!-- 有设置收货地址 -->
    <div class="addressWrap" v-if="hasAddress">
      <div class="address">
        <van-icon name="location-o" />
        <div class="info" @click="$router.push('/address')">
          <div>{{address.name}} / {{address.tel}} 邮编: {{ address.postalCode }}</div>
          <div>{{ address.province }}{{ address.city }}{{ address.country }}{{ address.addressDetail }}</div>
        </div>
      </div>
    </div>
    <van-button v-else block type="info" plain @click="$router.push('/addaddress')">添加地址</van-button>
    <div class="cartlist" v-for="(item,index) in goodsCartList" :key="item.id">
      <van-checkbox
        v-model="$store.getters.getGoodsCheckedStatus[item.id]"
        @click="checkBoxChange(item.id, $store.getters.getGoodsCheckedStatus[item.id])"
      ></van-checkbox>
      <van-swipe-cell>
        <van-card
          :num="item.number"
          :price="item.sell_price"
          :title="item.title"
          :thumb="item.thumb_path"
          class="goods-card"
        >
          <div slot="footer">
            <van-stepper
              :value="item.number"
              min="1"
              :name="index"
              @change="AddNumber"
            />
          </div>
        </van-card>

        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delGoods(item.id,index)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar
      button-color="rgb(0 140 255)"
      :price="this.$store.getters.getCarTotalNumber"
      button-text="提交订单"
      :disabled="isDisable"
      @submit="onSubmit"
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
        <van-button
          round
          type="info"
          class="bottom-button"
          @click="$router.push('/home/index')"
        >去逛逛吧</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script>
import { getOrderId } from "../util/tool.js";
import { fetchGoodsCart } from "../api/goodscart.js";
import { fetchGetUserAddress } from "../api/address.js";
import { fetchCommitOrder } from "../api/order.js";
import emptyImg from "../assets/images/goodscart.png";
export default {
  data() {
    return {
      emptyImg,
      hasAddress: "false",
      goodsCartList: [],
      address: {},
      ids: this.$store.getters.getCarGoodsIds,
    };
  },
  created() {
    this._fetchGoodsCart();
    this._fetchGetUserAddress();
  },
  computed: {
    isDisable() {
      if (
        this.goodsCartList.length === 0 ||
        !this.$store.getters.getCheckedCarGoodsIds
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    AddNumber(number, { name: index }) {
      this.$store.commit("numAdds", { number, index });
    },
    checkBoxChange(id, checked) {
      console.log(id);
      this.$store.commit("itemIsCheck", { id, checked });
    },
    isCheckAll(checkedAll) {
      this.$store.commit("isCheckedAlls", { checkedAll });
    },
    delGoods(id, index) {
      this.goodsCartList.splice(index, 1);
      this.$store.commit("delCartGoods", id);
    },
    async _fetchGoodsCart() {
      if (!this.ids) {
        return;
      }
      let { message } = await fetchGoodsCart(this.ids);
      this.goodsCartList = message;
    },
    async _fetchGetUserAddress() {
      let user_id = this.$store.state.userInfo.id;
      let result = await fetchGetUserAddress(user_id);
      this.address = result;
      if (result.length === 0 || this.$store.state.userInfo.length === 0) {
        this.hasAddress = false;
      } else {
        this.hasAddress = true;
      }
      let defaultIndex = result.findIndex((item) => item.isDefault === 1);
      if (defaultIndex !== -1) {
        this.address = result[defaultIndex];
      } else {
        this.address = result[0];
      }
    },
    async onSubmit() {
      if (!this.address) {
        this.$dialog({
          message: "请完善收货地址",
        });
        return;
      }
      let orderData = {
        user_id: this.$store.state.userInfo.id,
        address_id: this.address.id,
        total_price: this.$store.getters.getCarTotalNumber,
        number: this.$store.getters.getCheckedTotalNumber,
        goods_ids: this.$store.getters.getCheckedCarGoodsIds,
        order_id: getOrderId(),
      };
      console.log(orderData);
      // 提交订单loading提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "提交订单中",
        forbidClick: true,
        overlay: true,
      });
      let {message,status} = await fetchCommitOrder(orderData);
      if(status === 0) {
        this.$store.commit('clearCheckedGoods')
        this.$router.replace("/order");
      }
    },
  },
};
</script>

<style lang="scss">
.cart-container {
  height: 100vh;
  background: rgba(234, 231, 231, 0.368627451);
  .addressWrap {
    background: #fff;
    .address {
      display: flex;
      align-items: center;
      padding: 10px;
      .van-icon {
        margin-right: 10px;
      }
    }
  }
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
    .van-card__footer {
      display: flex;
      align-items: end;
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