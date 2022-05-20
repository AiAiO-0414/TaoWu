import axios from "./request.js"

// 获取商品详情的轮播图
export function fetchGoodsImages(goodsid) {
    return axios.get(`/getthumbimages/${goodsid}`)
}

export function fetchGoodsInfo(goodsid) {
    return axios.get(`/getgoodsinfo/${goodsid}`)
}