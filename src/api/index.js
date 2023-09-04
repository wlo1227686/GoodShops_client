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

// 5. 獲取一次性驗證碼
export const reqCaptcha = () => ajax(BASE_URL + '/captcha')

// 6. 用戶名密碼登入
export const reqLoginPwd = (name, pwd, captcha) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha })

// 7. 發送短信驗證碼
// 8. 手機號碼驗證碼登入
// 9. 根據會話獲取用戶信息
//10. 用戶登出