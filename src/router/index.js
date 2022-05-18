import { IndexBar } from 'vant'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue' // 引入 Home页面组件

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
                    isMainPage:true
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
    }
]

const router = new VueRouter({
    routes
})

export default router
