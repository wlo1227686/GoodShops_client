/**
 * 通過mutations間接更新state的多個方法的對象
 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    //Shop
    RECEIVE_GOODS,
    RECEIVE_SHOP_INFO,
    RECEIVE_RATINGS,
} from './mutation-types'

import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    //Shop
    reqShopGoods,
    reqShopInfo,
    reqShopRatings,
} from '../api'

export default {
    //異步獲取地址
    async getAddress({ commit, state }) {
        // 發送異步ajax請求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        // 提交一個mutation
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, { address })
        }
    },

    //異步獲取食品分類清單
    async getCategorys({ commit }) {
        // 發送異步ajax請求
        const result = await reqFoodCategorys()
        // 提交一個mutation
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, { categorys })
        }
    },

    //異步獲取商家清單
    async getShops({ commit, state }) {
        // 發送異步ajax請求
        const { longitude, latitude } = state
        const result = await reqShops(longitude, latitude)
        // 提交一個mutation
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },

    //同步獲取用戶訊息
    saveUserInfo({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },

    //異步取得用戶訊息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        // 提交一個mutation
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USER_INFO, { userInfo })
        }
    },

    //異步取得用戶訊息
    async doUserLogout({ commit }) {
        const result = await reqLogout()
        // 提交一個mutation
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },

    // 異步取得商家簡介
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const shopInfo = result.data
            commit(RECEIVE_SHOP_INFO, { shopInfo })
        }
    },

    // 異步取得商家評價
    async getShopRatings({ commit }) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
        }
    },

    // 異步取得商家菜單
    async getShopGoods({ commit }) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
        }
    }
}