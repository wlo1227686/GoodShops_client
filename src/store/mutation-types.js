/**
 * 包含n個mutation的type名稱常量
 */
export const RECEIVE_ADDRESS = 'receive_address' // 接收地址
export const RECEIVE_CATEGORYS = 'receive_categorys' // 接收食品分類清單
export const RECEIVE_SHOPS = 'receive_shops' // 接收食品分類清單
export const RECEIVE_USER_INFO = 'receive_user_info' // 接收客戶資訊
export const RESET_USER_INFO = 'reset_user_info' // 重置客戶資訊
//shop
export const RECEIVE_SHOP_GOODS = 'receive_shop_goods' // 接收商家菜單
export const RECEIVE_SHOP_RATINGS = 'receive_shop_ratings' // 接收商家評價
export const RECEIVE_SHOP_INFO = 'receive_shop_info' // 接收商家簡介

// food.count
export const INCREMENT_FOOD_COUNT = 'increment_food_count' // 增加food中count數量
export const DECREMENT_FOOD_COUNT = 'decrement_food_count' // 減少food中count數量
export const CLEAR_CART_FOOD ='clear_cart_food' // 清空購物車

export const RECEIVE_SEARCH_SHOPS = 'receive_search_shops' // 接收搜尋指定的商家清單