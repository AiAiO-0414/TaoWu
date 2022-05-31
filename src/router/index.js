import { IndexBar } from 'vant'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue' // 引入 Home页面组件
import NProgress from "nprogress"
import store from '../store/index.js'


// 注册路由插件
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home/Index',
    },
    {
        path: '/home',
        component: Index,
        children: [
            {
                path: 'index',
                name: 'Home',
                component: () => import('../views/Home.vue'),
                meta: {
                    name: 'Home',
                    isMainPage: true,
                },
                children:[
                    {
                        path: 'search',
                        name: 'Search',
                        component: () => import('../views/Search.vue'),
                        meta: {
                            name: 'search',
                            // title: '购物车'
                            isMainPage:true
                        }
                    },
                ]
            },
            {
                path: 'aboutuser',
                name: 'Aboutuser',
                component: () => import('../views/Aboutuser.vue'),
                meta: {
                    name: 'user',
                    isMainPage: true,
                    requireAuth: true,
                }
            },
            {
                path: 'goodscart',
                name: 'Goodscart',
                component: () => import('../views/Goodscart.vue'),
                meta: {
                    name: 'cart',
                    title: '购物车'
                    // isMainPage:true
                }
            },
           

        ]
    },

    {
        path: '/goodslist',
        name: 'GoodsList',
        component: () => import('../views/GoodsList.vue'),
        meta: {
            title: '商品列表'
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
        path: "/addressedit/:addressInfo",
        component: () => import('../views/AddressEdit.vue'),
        meta: {
            title: "地址编辑",
        }
    },
    {
        path: "/addaddress",
        component: () => import('../views/Addaddress.vue'),
        meta: {
            title: "添加地址",
        }
    },
    {
        path: "/login",
        component: () => import('../views/Login.vue'),
        meta: {
            title: "登录",
        }
    },
    {
        path: "/register",
        component: () => import('../views/Register.vue'),
        meta: {
            title: "注册",
        }
    },
    {
        path: "/addresslist",
        component: () => import('../views/AddressList.vue'),
        meta: {
            title: "地址列表",
        }
    },
    {
        path: "/order",
        component: () => import('../views/Order.vue'),
        meta: {
            title: "我的订单",
        }
    },
    {
        path: "/orderDetail/:order_id",
        component: () => import('../views/OrderDetail.vue'),
        meta: {
            title: "订单详情",
        }
    },
    {
        path: "/SearchResult/:keyword",
        component: () => import('../views/SearchResult.vue'),
        meta: {
            isMainPage:true
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
    if (to.meta.requireAuth) {
        if (!store.state.token) {
            router.push('/login')
            return
        } else {
            next()
        }
    }
    next();
})

router.afterEach((to, from) => {
    NProgress.done()
    // 关闭网页加载进度条
})


export default router
