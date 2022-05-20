import axios from "./request.js"

export function fetchGoodsList(page = 1, limit = 6) {
    return axios.get(`/getgoods?pageindex=${page}&pagesize=${limit}`)
}