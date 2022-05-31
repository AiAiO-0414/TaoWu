import axios from "./request.js"

export function fetchLogin(formData){
    return axios.post('/login',formData)
}

export function upload(formData) {
    return axios.post('/upload',formData)
}


export function fetchRegister(formData) {
    return axios.post('/register',formData)
}

