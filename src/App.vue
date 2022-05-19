<template>
  <div id="app">
    <van-nav-bar
      nav-bar-text-color="pink"
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      v-show="isShowNavBar"
      @click-left="$router.back()"
      @click-right="onClickRight"
    />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowNavBar: false,
      title: "",
    };
  },
  methods: {
    onClickRight() {},
  },
  watch: {
    $route: {
      handler: function (newRoute, oldRoute) {
        let { isMainPage, title } = newRoute.meta;
        this.isShowNavBar = !isMainPage;
        this.title = title;
      }
    },
  },
};
</script>
<style lang="scss">
@import './assets/scss/common.scss';
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

