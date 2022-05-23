
import axios from "./request.js"

export function fetchAddUserAddress(user_id, formData) {
    return axios.post(`/addaddress/${user_id}`, formData)
}