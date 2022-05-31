import axios from "./request.js"

export function fetchSwipe() {
    return axios.get('/getlunbo')
}

export function fetchRecommend(page = 1, limit = 10) {
    return axios.get(`/recommend?page=${page}&limit=${limit}`)
}

// 搜索结果
// https://api.w0824.com/api/search?value=机&sort=buy&order=desc&page=1&pagesize=10
export function fetchGetSearchResult(searchData) {
    // let searchData = Object.keys[searchData].map(item => {
    //     return item[key] === searchData[key]
        // });
    let searchQuery = Object.keys(searchData).map(key => `${key}=${encodeURIComponent(searchData[key])}`).join('&');
    return axios.get(`/search?${searchQuery}`)
}

