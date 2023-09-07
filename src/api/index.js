/**
 * 包含N個接口請求函數模塊
 * 函數的返回值:promise對象
 */

import ajax from './ajax'

// const BASE_URL='http://localhost:4000'

// 處理 CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
const BASE_URL = '/api'

// 1. 根據經緯度獲得位置詳情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

// 2. 取得食品分類清單
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category')

// 3. 根據經緯度獲取商鋪清單
export const reqShops = (a, b) => ajax(BASE_URL + '/shops', { latitude: a, longitude: b })

// 4. 根據經緯度和關鍵字搜索商鋪列表
export const reqSearchShops = (geohash, keyword) => ajax(BASE_URL + '/search_shops', { geohash, keyword })

// 6. 登入_用戶名密碼
export const reqLoginPwd = ({ name, pwd, captcha }) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')

// 7. 登入_手機號碼驗證碼
export const reqLoginSms = (phone, code) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')

// 8. 發送短信驗證碼
export const reqSendPhoneCode = (phone) => ajax(BASE_URL + '/sendcode', { phone })

// 9. 根據會話獲取用戶信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

//10. 用戶登出
export const reqLogout = () => ajax(BASE_URL + '/logout')

// 透過mockjs來產生畫面資料
//Shop頁面取得商家簡介
export const reqShopInfo =()=>ajax('/shopInfo')

//Shop頁面取得商家評價
export const reqShopRatings =()=>ajax('/shopRatings')

//Shop頁面取得商家菜單
export const reqShopGoods =()=>ajax('/shopGoods')