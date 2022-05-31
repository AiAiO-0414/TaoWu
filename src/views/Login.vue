<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
      <router-link tag="div" :to="{path:'/register'}" class="text-center text-gray-color">没有账号？去注册</router-link>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import { fetchLogin } from "../api/username.js";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(fromData) {
      let { message, token, status, userInfo } = await fetchLogin(fromData);
      if (status === 0) {
        this.$store.commit("setToken", { token, userInfo });
        // this.$store.commit("setUserInfo", {});
        Toast.success(message);
        // 获取重定向的参数redirect
        let { redirect } = this.$route.query;
        if (redirect) {
          this.$router.push(redirect); // 打回到之前没有访问权限的页面
        } else {
          this.$router.push("/home/index");
        }
      } else {
        Toast.fail(message);
      }
    },
  },
};
</script>

<style>
</style>