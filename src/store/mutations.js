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
    CLEAR_CART_FOOD,
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
            // 將food添加至cartFoods購物車中
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    //food(減少)
    [DECREMENT_FOOD_COUNT](state, { food }) {
        if (food.count) { // 確認有數量才減去
            food.count--
            if (food.count === 0) { // 若數量為0則將food從cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    //cartFood清空購物車
    [CLEAR_CART_FOOD](state) {
        // 移除food內的count參數
        state.cartFoods.forEach(food => {
            // 移除該物件中的count參數
            Vue.delete(food, 'count')
        });
        // 清空購物車
        state.cartFoods = []
    }
}