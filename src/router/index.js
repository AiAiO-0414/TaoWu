import { IndexBar } from 'vant'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue' // 引入 Home页面组件
import NProgress from "nprogress" 


// 注册路由插件
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/home/Index'
    },
    {
        path: '/home',
        component: Index,
        children: [
            {
                path: 'index',
                name: 'Home',
                component: () => import('../views/Home.vue'),
                meta:{
                    name:'Home',
                    isMainPage:true,
                }
            },
            {
                path: 'aboutuser',
                name: 'Aboutuser',
                component: () => import('../views/Aboutuser.vue'),
                meta:{
                    name:'user',
                    isMainPage:true
                }
            },
            {
                path: 'goodscart',
                name: 'Goodscart',
                component: () => import('../views/Goodscart.vue'),
                meta:{
                    name:'cart',
                    title:'购物车'
                    // isMainPage:true
                }
            },
        ]
    },

    {
        path:'/goodslist',
        name:'GoodsList',
        component: () => import('../views/GoodsList.vue'),
        meta:{
           title:'商品列表'
        }
    },
    {
        path: "/goodsdetail/:id",
        component: () => import('../views/GoodsDetail.vue'),
        meta: {
            title: "商品详情",
        }
    },
    {
        path: "/addressedit",
        component: () => import('../views/AddressEdit.vue'),
        meta: {
            title: "地址编辑",
        }
    },
    {
        path: "/address",
        component: () => import('../views/Addaddress.vue'),
        meta: {
            title: "地址编辑",
        }
    },
]


const router = new VueRouter({
    routes
})

NProgress.configure({
    showSpinner: false,
});

router.beforeEach((to, from, next) => {
    // 开启网页加载进度条
    NProgress.start()
    next();
})

router.afterEach((to, from) => {
    NProgress.done()
    // 关闭网页加载进度条
})


export default router
