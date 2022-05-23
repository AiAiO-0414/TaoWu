import axios from "./request.js"

//获取购物车数据
export function fetchGoodsCart(ids) {
    return axios.get(`/getshopcarlist/${ids}`)
}