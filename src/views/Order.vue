<template>
  <div>
    <van-tabs v-model="active" @click="tabsClick">
      <van-tab v-for="item in TabStatus" :title="item.title" :key="item.title">
        <van-card  @click="$router.push('/orderDetail/'+item.order_id)"
          v-for="item in findStatusOrder"
          :key="item.order_id"
          :num="item.number"
          :price="item.total_price/100"
          :desc="item.pay_way"
          :title="item.goodsInfo.message[0].title"
          :thumb="item.goodsInfo.message[0].thumb_path"
        >
          <template #tags>
            下单时间：{{item.add_time | timeFormat}}
          </template>
          <template #footer>
            <van-button v-if="item.status===0" size="mini" type="danger">立即付款</van-button>
            <van-button v-if="item.is_out===1" size="mini" type="primary">物流信息</van-button>
            <van-button
              v-if="item.is_out===1"
              size="mini"
              type="primary"
              v-clipboard:copy="item.order_id"
              v-clipboard:success="copy"
            >复制订单号</van-button>
            <template v-if="item.status===2">
              <van-button size="mini" type="info">已完成</van-button>
              <van-button size="mini" type="warning">评价</van-button>
            </template>
            <van-button v-if="item.status===0" size="mini" @click.stop="callPhone" type="danger">客服</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { fetchGetUserOrder } from "../api/order.js";
import { fetchGoodsCart } from "../api/goodscart.js";
export default {
  data() {
    return {
      active: 0,
      TabStatus: [
        { status: "all", title: "全部" },
        { status: "0", title: "待付款" },
        { status: "1", title: "已付款" },
        { status: "2", title: "完成" },
      ],
      allOrderDatas: [],
      status: "all",
    };
  },
  computed: {
    findStatusOrder() {
      if (this.status === "all") {
        return this.allOrderDatas;
      }
      return this.allOrderDatas.filter(
        (orderItem) => orderItem.status == this.status
      );
    },
  },
  created() {
    this._fetchGetUserOrder();
  },
  methods: {
    async _fetchGetUserOrder() {
      let user_id = this.$store.state.userInfo.id;
      let orderData = await fetchGetUserOrder(user_id);
      let dataArr = [];
      orderData.forEach((order) => {
        dataArr.push(fetchGoodsCart(order.goods_ids));
      });
      //并发关联订单和商品
      let allOrderGoods = await Promise.all(dataArr);
      orderData = orderData.map((order, index) => {
        order.goodsInfo = allOrderGoods[index];
        return order;
      });
      this.allOrderDatas = orderData;
    },
    tabsClick(index, text) {
      let statusMap = {
        '全部': "all",
        '待付款': "0",
        '已付款': "1",
        '完成': "2",
      };
      this.status = statusMap[text];
    },
    copy() {
       // 阻止事件冒泡（传播）
      event.stopPropagation();
      this.$toast("复制成功");
    },
  },
};
</script>

<style>
</style>