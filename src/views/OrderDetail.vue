<template>
  <div class="orderDetailContainer">
    <div class="status">
      <div class="text">{{statusText}}</div>
      <img :src="statusImg" alt width="80px" />
    </div>
    <div class="addressWrap">
      <div class="address">
        <div class="location flex_c_c">
          <van-icon name="location-o" />
        </div>
        <div v-if="OrderInfo.address_info" class="info">
          <div>{{OrderInfo.address_info.name}} {{OrderInfo.address_info.tel}}</div>
          <div>{{OrderInfo.address_info.province}}/{{OrderInfo.address_info.city}}/{{OrderInfo.address_info.country}}/{{OrderInfo.address_info.addressDetail}}</div>
        </div>
        <van-divider />
      </div>
    </div>

    <van-card
      v-for="item in goods"
      :key="item.id"
      :price="item.sell_price"
      :title="item.title"
      :thumb="item.thumb_path"
    ></van-card>

    <!-- 订单一些基本信息 -->
    <div class="orderInfo">
      <div class="item">
        <span>下单时间</span>
        <span>{{OrderInfo.add_time | timeFormat}}</span>
      </div>
      <div class="item">
        <span>商品总价</span>
        <span>￥ {{OrderInfo.total_price}}</span>
      </div>
      <div class="item">
        <span>实付款</span>
        <span>￥ {{OrderInfo.actual_price}}</span>
      </div>
      <div class="item">
        <span>付款方式</span>
        <span>{{OrderInfo.pay_way}}</span>
      </div>
      <div class="item">
        <span>运费险</span>
        <span>&yen; 0.00</span>
      </div>
      <div class="item">
        <span>订单号</span>
        <span>{{OrderInfo.order_id}}</span>
        <span class="copy" v-clipboard:copy="OrderInfo.order_id" v-clipboard:success="onCopy">复制</span>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btns">
      <van-button v-if="OrderInfo.status == 0" size="mini" type="danger" @click="pay">立即付款</van-button>
      <van-button
        v-if="OrderInfo.is_out == 1 && OrderInfo.status == 1 && OrderInfo.is_take == 0"
        size="mini"
        type="primary"
        @click="showExpress"
      >物流信息</van-button>

      <van-button
        v-if="OrderInfo.status == 1 && OrderInfo.is_out == 0"
        size="mini"
        type="danger"
      >提醒发货</van-button>
      <template v-if="OrderInfo.is_take == 1 && OrderInfo.is_out == 1 && OrderInfo.status == 2">
        <van-button size="mini" type="info">已完成</van-button>
        <van-button size="mini" type="warning">去评价</van-button>
      </template>
    </div>
    <!-- 物流信息 -->
    <van-popup v-model="isShow" position="bottom" :style="{ height: '60%' }">
      <!-- 目标收获地址 -->
      <div class="addressWrap">
        <div class="address">
          <div class="location flex_c_c">
            <van-icon name="location-o" />
          </div>

          <div class="info" v-if="OrderInfo.address_info">
            <div>{{ OrderInfo.address_info.name }} {{ OrderInfo.address_info.tel }}</div>
            <div>
              {{ OrderInfo.address_info.province }}{{ OrderInfo.address_info.city }}{{
              OrderInfo.address_info.country
              }}{{ OrderInfo.address_info.addressDetail }}
            </div>
          </div>
          <van-divider />
        </div>
      </div>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="item in expressData" :key="item.time">
          <h3>{{ item.location }}</h3>
          <p>{{ item.time }}</p>
        </van-step>
      </van-steps>
    </van-popup>
  </div>
</template>

<script>
import statusImg from "../assets/images/car2.png";
import {
  fetchOrderInfo,
  fetchPayOrder,
  fetchGetExpress,
} from "../api/order.js";
import { fetchGoodsCart } from "../api/goodscart.js";
export default {
  data() {
    return {
      statusImg,
      order_id: this.$route.params.order_id,
      OrderInfo: {},
      goods: [],
      isShow: false,
      expressData: [],
    };
  },
  computed: {
    statusText() {
      if (this.OrderInfo.is_take === 0 && this.OrderInfo.is_out === 1 && this.OrderInfo.status === 1) {
        return "您的包裹正在运输中";
      }
      if (this.OrderInfo.is_out === 0) {
        return "商家还未发货";
      }
      if (this.OrderInfo.status === 2) {
        return "已完成";
      }
      
    },
  },
  created() {
    this._fetchOrderInfo();
  },
  methods: {
    async _fetchOrderInfo() {
      let result = await fetchOrderInfo(this.order_id);
      this.OrderInfo = result;
      this._fetchGoodsCart();
    },
    async _fetchGoodsCart() {
      let { message } = await fetchGoodsCart(this.OrderInfo.goods_ids);
      this.goods = message;
    },
    onCopy(e) {
      // 阻止事件冒泡（传播）
      event.stopPropagation(e);
      this.$toast("复制成功");
    },
    pay() {
      this.$dialog
        .confirm({
          title: "付款",
          message: "确定支付吗",
        })
        .then(async () => {
          try {
            let result = await fetchPayOrder(this.OrderInfo.order_id);
            this.$toast.success({
              message: "成功支付",
              icon: "wechat-pay",
            });
            this.OrderInfo.status = 1;
            this.OrderInfo.is_take = 0;
            this.OrderInfo.is_out = 0;
          } catch (error) {
            this.$toast("网络繁忙，请稍后再试");
          }
        })
        .catch(() => {});
    },
    async showExpress() {
      if (this.expressData.length !== 0) {
        this.isShow = true;
        return;
      }
      let expressData = await fetchGetExpress();
      this.expressData = expressData;
      this.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.orderDetailContainer {
  .van-card {
    .van-card__thumb {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .status {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    background-color: #fe5102;
    color: #f4d9be;
  }

  .addressWrap {
    .address {
      display: flex;
      align-items: center;
      padding: 10px 10px;
      background-color: #fff;
      border-radius: 6px;
      margin: 6px 0;

      .location {
        width: 30px;
        height: 30px;
        background: #f34a09;
        border-radius: 50%;
        padding-left: 20px;
        margin-right: 20px;
      }

      .van-icon {
        margin-right: 20px;
        color: #fff;
        font-size: 20px;
      }
    }
  }

  .orderInfo {
    padding: 2px 10px;

    .item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #787373;
      margin: 5px 0;

      .copy {
        color: orangered;
      }
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    padding: 0 10px;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>