
import axios from "./request.js"

export function fetchAddUserAddress(user_id, data) {
    return axios.post(`/addaddress/${user_id}`, data)
}

export function fetchGetUserAddress(user_id) {
    return axios.get(`/getaddress/${user_id}`)
}

export function fetchUpdUserAddress(user_id,data) {
    return axios.post(`/updateaddress/${user_id}`,data)
}


export function fetchDelUserAddress(user_id) {
    return axios.post(`/deladdress/${user_id}`)
}