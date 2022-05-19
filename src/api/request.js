import axios from "axios"

import {
    Toast
} from "vant"

import store from "../store/index.js"
import router from "../router/index.js"
// 创建请求实例

const instance = axios.create({
    baseURL: 'http://api.w0824.com' + '/api',
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 若有token,添加请求头token给服务器校验(获取的有时是旧token)
    // console.log('请求拦截器-token:', store.state.token)
    if (store.state.token) {
        config.headers['token'] = store.state.token;
    }
    // 告诉服务器，不需要缓存
    // If-Modified-Since 是标准的HTTP请求头标签，在发送HTTP请求时，
    // 把浏览器端缓存页面的最后修改时间一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较
    config.headers['If-Modified-Since'] = 0; //设置请求头，告诉服务端不要缓存，获取最新数据
    // 在发送请求之前做些什么
    Toast.loading({
        message: "加载中",
        forbidClick: true
    });

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    Toast.clear()
    // 对响应数据做点什么
    if (response.data.status === 40001) {
        // 清空token、用户信息
        store.commit('clearUserInfo')
        Toast(response.data.message)
        // 打回到登录页面,登录成功之后，回到当前所访问的页面(redirect)
        router.replace({
            path: "/login",
            query: {
                // 获取当前路由完整地址,便于登录成功跳回此地址
                redirect: router.currentRoute.fullPath
            }
        })
        return;
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    Toast.clear()
    return Promise.reject(error);

});

export default instance
// 导出实例
