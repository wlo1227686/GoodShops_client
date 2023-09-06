/**
 * 直接更新state的多個方法對象
 */
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    //Shop
    RECEIVE_SHOP_GOODS,
    RECEIVE_SHOP_INFO,
    RECEIVE_RATINGS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
} from './mutation-types'

export default {

    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },

    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },

    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },

    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },
    //shop
    [RECEIVE_SHOP_GOODS](state, { shopGoods }) {
        state.shopGoods = shopGoods
    },

    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },

    [RECEIVE_SHOP_INFO](state, { shopInfo }) {
        state.shopInfo = shopInfo
    },
    //food(增加)
    [INCREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) { // 首次增加
            // 在已經有數據綁定的物件,添加數據綁定
            Vue.set(food, 'count', 1)
        } else {
            food.count++
        }
    },
    //food(減少)
    [DECREMENT_FOOD_COUNT](state, { food }) {
        if (food.count && food.count > 0) {
            food.count--
        }
    }
}