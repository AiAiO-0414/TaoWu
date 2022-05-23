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
    <!-- 商品价格 -->
    <div class="card">
      <div class="price">
        <span class="sell_price">￥ {{info.sell_price}}</span>
        <van-tag plain type="primary">即将恢复{{info.market_price}}</van-tag>
        <span class="market_price">好评度99%</span>
      </div>
      <div class="title van-multi-ellipsis--l2">{{info.title}}</div>
    </div>
    <!-- 商品信息 -->
    <div class="card">
      <van-divider content-position="left">介绍</van-divider>
      <div class="contents" v-html="info.content"></div>
    </div>
    <!-- 商品底部栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o"  @click="$router.push('/home/goodscart')" text="购物车" :badge="$store.getters.getTotalNumber" />
      <van-goods-action-button
        color="rgb(91 185 255)"
        type="warning"
        text="加入购物车"
        @click="addGoodsCart(true)"
      />
      <van-goods-action-button
        color="rgb(0 140 255)"
        type="danger"
        text="立即购买"
        @click="buyGoods(false)"
      />
    </van-goods-action>
    <van-sku
      show-soldout-sku:false
      v-model="isShowSku"
      :sku="sku"
      :goods="goods"
      :show-add-cart-btn="isShowAddCartBtn"
      :goods-id="info.id"
      :hide-stock="sku.hide_stock" 
      :reset-stepper-on-hide="true"
      @add-cart="onAddGoodsCart"
      @buy-clicked="buyClicked"
    >
      <template #sku-messages>
        <div class="card">
          <div>商品货号：{{ info.goods_no }}</div>
          <div>库存：{{ info.stock_quantity }}件</div>
        </div>
      </template>
    </van-sku>
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
      isShowSku: false,
      isShowAddCartBtn: false, //是否展示购物车按钮
      sku: {
        // 数据结构见下方文档
        tree: [
        //   {
        //     k: "规格", // skuKeyName：规格类目名称
        //     k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        //     v: [
        //       {
        //         id: "1", // skuValueId：规格值 id
        //         name: "32G", // skuValueName：规格值名称
        //         imgUrl: "http://test.w0824.com/huaweiry.png", // 规格类目图片，只有第一个规格类目可以定义图片
        //         previewImgUrl: "http://test.w0824.com/huaweiry.png", // 用于预览显示的规格类目图片
        //       },
        //       {
        //         id: "2",
        //         name: "64G",
        //         imgUrl: "http://test.w0824.com/huaweiry2.png",
        //         previewImgUrl: "http://test.w0824.com/huaweiry2.png",
        //       },
        //     ],
        //     largeImageMode: true, //  是否展示大图模式
        //   },
        ],
        // list: [
        //   {
        //     id: 2259, // skuId
        //     s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
        //     // s2: "2", // 规格类目 k_s 为 s2 的对应规格值 id
        //     price: 100, // 价格（单位分）
        //     stock_num: 110, // 当前 sku 组合对应的库存
        //   },
        //   {
        //     id: 2260, // skuId
        //     s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
        //     // s2: "2", // 规格类目 k_s 为 s2 的对应规格值 id
        //     price: 100, // 价格（单位分）
        //     stock_num: 110, // 当前 sku 组合对应的库存
        //   },
        // ],
        price: "0.00", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
        picture: "",
      },
    };
  },
  created() {
    this._fetchGoodsImages();
    this._fetchGoodsInfo();
  },
  methods: {
    async _fetchGoodsImages() {
      let { message } = await fetchGoodsImages(this.id);
      this.thumb = message;
      this.goods.picture = this.thumb[0].src;
    },
    async _fetchGoodsInfo() {
      let { message } = await fetchGoodsInfo(this.id);
      this.info = message;
      this.sku.price = this.info.sell_price;
      this.sku.stock_num = this.info.stock_quantity;
    },
    //预览图片
    previewImage() {
      let imgs = this.thumb.map((item) => item.src);
      ImagePreview({
        images: imgs,
        startPosition: 1,
      });
    },
    //加入购物车
    addGoodsCart(boolean) {
      this.isShowSku = true;
      this.isShowAddCartBtn = boolean;
    },
    //立即购买
    buyGoods(boolean) {
      this.isShowSku = true;
      this.isShowAddCartBtn = boolean;
    },
    //加入购物车后依然在当前页面
    onAddGoodsCart(skuData) {
      let { goodsId, selectedNum } = skuData;
      let price = this.info.sell_price;
      let title = this.info.title;
      let img =  this.thumb[0].src

      let item = {
        id: goodsId,
        number: selectedNum,
        price: price,
        img:img,
        title:title,
        checked: true,
      };
      this.$store.commit("addGoodsCart", item);
      this.isShowSku = false;
      this.$dialog.alert({
        message: "成功加入购物车",
      });
    },
    //立即购买后条状到购物车页面
    buyClicked() {},
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