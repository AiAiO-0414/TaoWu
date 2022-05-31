<template>
  <div class="user-container">
    <div class="userBag">
      <div class="userInfo">
        <div class="avatar">
          <van-image @click="uploadAvatar" round width="6rem" height="6rem" :src="avatar" />
          <input v-show="false" type="file" ref="avatar" @change="uploadAvatars" />
          <div class="username">{{ $store.state.userInfo.username }}</div>
          <!-- <div @click="$router.push('/login')" v-show="isShow" class="username">请登录</div> -->
        </div>
        <div style="color:#fff">
          <!-- <van-button  size="mini">更换头像</van-button> -->
        </div>
        <!-- <div class="username">{{ $store.state.userInfo.username }}</div> -->
        <van-icon class="setting" name="setting-o" size="24" />
      </div>
    </div>
    <div class="order-container">
      <div class="orderItem">
        <van-cell title="我的订单" is-link value @click="$router.push('/order')" />
        <div class="order flex_a_c">
          <div class="order-from">
            <van-icon name="pending-payment" size="1.5rem" />
            <div class="order-msg-text">待付款</div>
          </div>
          <div class="order-from">
            <van-icon name="logistics" size="1.5rem" />
            <div class="order-msg-text">待收货</div>
          </div>
          <div class="order-from">
            <van-icon name="like-o" size="1.5rem" />
            <div class="order-msg-text">收藏夹</div>
          </div>
          <div class="order-from">
            <van-icon name="sign" size="1.5rem" />
            <div class="order-msg-text">退换修</div>
          </div>
        </div>
      </div>
      <user-info leftIocn="vip-card-o" leftText="会员中心" iocColor="#1989fa" />
      <user-info leftIocn="smile-comment-o" leftText="服务中心" iocColor="#1989fa" />
      <user-info leftIocn="gift-card-o" leftText="地址管理" iocColor="#1989fa" link="/addresslist" />
      <div style="margin: 16px">
        <van-button  round block type="info" native-type="submit" @click="outLogin">退出登录</van-button>
      </div>
      <!-- <div style="margin: 16px">
        
      </div> -->
    </div>
  </div>
</template>

<script>
import { upload } from "../api/username";
import UserInfo from "../common/UserInfo.vue";
import { Dialog } from 'vant';

export default {
  data() {
    return {
      ids: this.$store.state.userInfo.id,
      isShow:false,
    };
  },
  components: {
    UserInfo,
  },
  methods: {
    uploadAvatar() {
      this.$refs.avatar.click();
    },
    async uploadAvatars() {
      let file = this.$refs.avatar.files[0];
      if (file) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", this.ids);
        let { message, status, src } = await upload(formData);
        if (status === 0) {
          this.$toast(message);
          this.$store.commit("setAvatar", src);
        }
      } else {
        return;
      }
    },
    // 点击登录
    // isLogin() {
    //   // 判断是否登录了 登录了 就不去登录页 不弹出服务条款
    //   if (!this.$store.state.userInfo) {
    //   }
    // },
    outLogin() {
      // 是否 退出 退出 时清空 用户信息
      Dialog.confirm({
        title: "是否退出登录",
      }).then(() => {
        this.isShow = true
        this.$store.commit("clearUserInfo");
        // this.$router.push('/login')
      });
    },
  },
  computed: {
    avatar() {
      return "http://api.w0824.com/" + this.$store.state.userInfo.avatar;
    },
    isLoginText() {
      console.log("吗");
      if (!this.$store.state.userInfo) {
        return "登录/注册";
      } else {
        //  判断 用户是否 有自己的图片 没有就显示默认图
        if (this.$store.state.userInfo.avatar) {
          this.imgLink =
            "http://api.w0824.com/" + this.$store.state.userInfo.avatar;
        }
        return this.$store.state.userInfo.username;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/common.scss";

.user-container {
  height: 100vh;
  background: #eee;

  .userBag {
    padding: 10px;
    height: 180px;
    background: rgb(99 153 179);
  }

  .userInfo {
    position: relative;
    display: flex;
    // justify-content: space-around;
    // align-items: center;
    // padding: 10px 16px;
    color: #eee;
    margin: 0 10px;
    font-size: 14px;

    .avatar {
      display: flex;
      position: relative;
      padding-top: 15px;
      img {
        width: 100%;
      }
      .username {
        height: 100%;
        text-align: start;
        margin: 16px 0 0 18px;
        font-size: 24px;
      }
    }

    .setting {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .info {
    width: 90vw;
    padding: 10px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: #fff;
    margin-top: -40px;
  }
  .user-info {
    background: #4823;
    height: 100px;
    padding: 0 20px;

    .user-info-text {
      padding: 10px;
      color: #a5a5a5;
      font-size: 0.5rem;
    }
    .user-img-wrap {
      width: 2rem;
      height: 2rem;
      .user-img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
  }
  .order-container {
    position: absolute;
    width: 100%;
    top: 156px;
    .orderItem {
      //   position: absolute;
      background: #fff;
      padding: 10px;
      border-radius: 20px;
      .van-cell[data-v-09001594]::before {
      background: #fff;
      }
      .order {
        text-align: center;
        .order-from {
          font-size: 0.5rem;
          .van-icon {
            font-size: 2rem;
            color: #1989fa;
            margin-bottom: 5px;
          }
          .order-msg-text {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>