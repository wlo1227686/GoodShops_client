/**
 * 直接更新state的多個方法對象
 */

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
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
}