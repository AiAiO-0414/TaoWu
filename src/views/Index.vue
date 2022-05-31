<template>
  <div>
      <keep-alive>
           <router-view></router-view>
      </keep-alive>
   
    <div class="tabbar">
      <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home/index">主页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/home/goodscart">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/home/aboutuser">个人中心</van-tabbar-item>
    </van-tabbar>
    </div>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
            active:0
        }
    },
    watch:{
        '$route':{
            handler:function(newRoute,oldRoute) {
                let {name} = newRoute.meta
                const nameMap = {
                    'Home':0,
                    'cart':1,
                    'user':2
                }
                let active = nameMap[name]
                this.active = active
            },
            //立即执行，刷新后也会立即执行
            immediate:true
        },
    }
}
</script>

<style>
    .van-tabbar  {
        background: #fae2ff;
    }
    .van-tabbar-item--active {
        background: #fae2ff;
    }
</style>