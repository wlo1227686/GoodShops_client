/**
 * 直接更新state的多個方法對象
 */

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
}