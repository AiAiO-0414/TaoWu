import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        goodsCartData: [],
    },
    mutations: {
        //加入购物车之前，判断商品是否存在，存在则累加数量，不存在则push
        addGoodsCart(state, goods) {
            const index = state.goodsCartData.findIndex(item => item.id == goods.id)
            if (index !== -1) {
                state.goodsCartData[index].number += goods.number
            } else {
                state.goodsCartData.push(goods)
            }
        },
        numAdds(state, { number, index }) {
            state.goodsCartData[index].number = number
            state.goodsCartData[index].price * number
        },
        itemIsCheck(state, { index, checked }) {
            state.goodsCartData[index].checked = checked
        },
        isCheckedAlls(state, { checkedAll }) {
            state.goodsCartData.forEach(item => {
                item.checked = !checkedAll;
            })
        }
    },
    getters: {
        //获取商品总数量
        getTotalNumber(state) {
            let result = 0;
            state.goodsCartData.forEach(item => result += item.number)
            return result
        },
        //获取商品总价格
        getCarTotalNumber(state) {
            let totalNumber = 0;
            // state.goodsCartData.forEach(item => totalNumber += item.number)
            state.goodsCartData.forEach(item => {
                if (item.checked) {
                    totalNumber += item.price * item.number * 100
                }
            });
            return totalNumber;
        },
        getGoodsCheckedStatus(state) {
            let selectedMap = {}
            state.goodsCartData.forEach(item => {
                selectedMap[item.id] = item.checked
            })
            return selectedMap
        },
        isAllCheck(state) {
           let isCheckedAll = false
           isCheckedAll = state.goodsCartData.every(item=>{
               return item.checked === true
           })
           return isCheckedAll
        }
    },
    plugins: [createPersistedState()]
})