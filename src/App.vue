<template>
  <div id="app">
    <van-nav-bar
      nav-bar-text-color="pink"
      :title="title"
      left-text="返回"
      left-arrow
      v-show="isShowNavBar"
      @click-left="$router.back()"
    />
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowNavBar: false,
      title: "",
      netStatus: window.navigator.onLine,
    };
  },
  methods: {
    isOnline(e) {
      console.log(e);
      let { type } = e;
      console.log(type);
      this.netStatus = type === "online" ? true : false;
    },
  },
  watch: {
    $route: {
      handler: function (newRoute, oldRoute) {
        let { isMainPage, title } = newRoute.meta;
        this.isShowNavBar = !isMainPage;
        this.title = title;
      },
    },
    netStatus: {
      handler: function (newStatus, oldStatus) {
        if (newStatus === true) {
          this.$toast("连接网络成功");
        } else {
          this.$dialog.alert({ message: "网络异常，请注意流量的使用" });
        }
      },
    },
  },
  mounted() {
    window.addEventListener("online", this.isOnline);
    window.addEventListener("offline", this.isOnline);
  },
};
</script>
<style lang="scss">
@import "./assets/scss/common.scss";
html {
  scroll-behavior: smooth;
}
#app {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

