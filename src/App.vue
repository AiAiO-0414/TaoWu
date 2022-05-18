<template>
  <div id="app">
    <van-nav-bar nav-bar-text-color="pink"
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
            isShowNavBar:false,
            title:''
        }
    },
  methods: {
    
    onClickRight() {},
  },
  watch:{
      '$route':{
          handler:function(newRoute,oldRoute) {
                let {isMainPage,title} = newRoute.meta
                if(isMainPage) {
                    this.isShowNavBar = false
                }else {
                    this.isShowNavBar = true
                }
                this.title = title
            },
            //立即执行，刷新后也会立即执行
            // immediate:true
      }
  }
};
</script>
<style lang="scss">
#app {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
}
</style>

