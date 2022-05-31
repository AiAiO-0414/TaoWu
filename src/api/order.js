import axios from "./request.js"
import instance from "./request.js"

export function fetchCommitOrder(orderData) {
    return axios.post('/commitorder', orderData)
}

export function fetchGetUserOrder(user_id) {
    return axios.post(`/userorder/${user_id}`)
}

// 获取订单信息
export function fetchOrderInfo(order_id) {
    return axios.post('/getorder/' + order_id)
}

// 模拟用户支付订单成功
export function fetchPayOrder(order_id) {
    return instance.post(`/payorder/${order_id}`)
}

// 获取物流信息
export function fetchGetExpress() {
    return instance.get(`/kuaidi100`)
}