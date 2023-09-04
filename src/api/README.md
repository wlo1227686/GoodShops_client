# API 接口文件

## 目錄:

[1、根據經緯度取得相關位置](#1根據經緯度取得相關位置)<br/>
[2、取得食品分類表](#2取得食品分類表)<br/>
[3、根據經緯度獲取商鋪清單](#3根據經緯度獲取商鋪清單)<br/>
[6、(登入)用戶名密碼](#6(登入)用戶名密碼)<br/>
[7、(登入)手機號碼驗證碼](#7(登入)手機號碼驗證碼)<br/>
[8、發送手機簡訊驗證碼](#8發送手機簡訊驗證碼)<br/>
[9、取得客戶資訊](#9用戶密碼登入)<br/>
[10、用戶帳號登出](#10用戶帳號登出)<br/>




## 1、根據經緯度取得相關位置

### 請求網址 Url:

http://localhost:4000/position/:geohash

### 請求方式:

GET

### 參數類型(param)

| 參數名稱 | 是否必填 |  類型  |  說明  |
| :------: | :------: | :----: | :----: |
| geohash  |    Y     | String | 經緯度 |

### 範例:

[http://localhost:4000/position/25.058767,121.554846](http://localhost:4000/position/25.058767,121.554846)

### 回傳格式:

    {
        "code": 0,
        "data": {
            "address": "台湾省台北市松山区",
            "city": "台湾省",
            "geohash": "25.058767,121.554846",
            "latitude": "25.058767",
            "longitude": "121.554846",
            "name": "松山区财团法人资讯工业策进会创新应用服务研究所北"
        }
    }

## 2、取得食品分類表

### 請求網址 Url:

http://localhost:4000/index_category

### 請求方式:

GET

### 參數類型(param)

無

### 回傳格式:

    {
    "code": 0,
    "data": [
        {
        "id": 1,
        "is_in_serving": true,
        "description": "早餐時間到！開啟你的美好早晨。",
        "title": "預約早餐",
        "link": "",
        "image_url": "/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg",
        "icon_url": "",
        "title_color": "",
        "__v": 0
        },
        {
        "id": 65,
        "is_in_serving": true,
        "description": "",
        "title": "店長推薦",
        "image_url": "/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg",
        "link": "",
        "icon_url": "",
        "title_color": "",
        "__v": 0
        },
        ......多筆資料
        ]
    }

## 3、根據經緯度獲取商鋪清單

### 請求網址 Url:

http://localhost:4000/shops

### 請求方式:

GET

### 參數類型(param)

| 參數名稱  | 是否必填 |  類型  | 說明 |
| :-------: | :------: | :----: | :--: |
| latitude  |    Y     | String | 緯度 |
| longitude |    Y     | String | 緯度 |

### 範例:

[http://localhost:4000/shops?latitude=25.058767&longitude=121.554846](http://localhost:4000/shops?latitude=25.058767&longitude=121.554846)

### 回傳格式:

    {
    "code": 0,
    "data": [
        {
        "name": "摩斯漢堡 民生店",
        "address": "105台北市松山區民生東路四段114號",
        "id": 1,
        "latitude": 25.0580573,
        "longitude": 121.5542962,
        "location": [25.0580573,121.5542962],
        "phone": "0227186375",
        "category": "速食店",
        "supports": [
            {
            "description": "已加入“外賣保”計畫，食品安全有保障",
            "icon_color": "999999",
            "icon_name": "保",
            "id": 7,
            "name": "外賣保",
            "_id": "591bec73c2bbc84a6328a1e5"
            }
        ],
        "status": 0,
        "recent_order_num": 615,
        "rating_count": 389,
        "rating": 1.6,
        "promotion_info": "他依然有人有人有人有人有人",
        "piecewise_agent_fee": {
            "tips": "配送费约¥5"
        },
        "opening_hours": ["6:00/23:00"],
        "license": {
            "catering_service_license_image": "",
            "business_license_image": ""
        },
        "is_new": true,
        "is_premium": true,
        "image_path": "/img/shop/15c1513a00615.jpg",
        "identification": {
            "registered_number": "",
            "registered_address": "",
            "operation_period": "",
            "licenses_scope": "",
            "licenses_number": "",
            "licenses_date": "",
            "legal_person": "",
            "identificate_date": null,
            "identificate_agency": "",
            "company_name": ""
        },
        "float_minimum_order_amount": 20,
        "float_delivery_fee": 5,
        "distance": "19.5公里",
        "order_lead_time": "40分钟",
        "description": "好吃的",
        "delivery_mode": {
            "color": "57A9FF",
            "id": 1,
            "is_solid": true,
            "text": "XX專送"
        },
        "activities": [
            {
            "icon_name": "减",
            "name": "满减优惠",
            "description": "满30减5，满60减8",
            "icon_color": "f07373",
            "id": 1,
            "_id": "591bec73c2bbc84a6328a1e7"
            }
        ]
        },
        ......多筆資料
        ]
    }

## 6、(登入)用戶名密碼

### 請求網址 Url:

http://localhost:4000/login_pwd

### 請求方式:

POST

### 參數類型(param)

| 參數名稱 | 是否必填 |  類型  |    說明    |
| :------: | :------: | :----: | :--------: |
|   name   |    Y     | String |  用戶名稱  |
|   pwd    |    Y     | String |  用戶密碼  |
| captcha  |    Y     | String | 圖型驗證碼 |

### 範例:

無

### 回傳格式:

    * 登入成功
      {
        "code": 0,
        "data": {
          "_id": "5a9cd9c6ad5b2d34d42b385d",
          "name": "aaa"
        }
      }

    * 登入失敗
      {
        "code": 1,
        "msg": "用戶名稱或密碼不正確!"
      }

## 7、(登入)手機號碼驗證碼

### 請求網址 Url:

http://localhost:4000/login_sms

### 請求方式:

POST

### 參數類型(param)

| 參數名稱 | 是否必填 |  類型  |    說明    |
| :------: | :------: | :----: | :--------: |
|  phone   |    Y     | String |  手機號碼  |
|   code   |    Y     | String | 簡訊驗證碼 |

### 範例:

無

### 回傳格式:

    * 登入成功
      {
        "code": 0,
        "data": {
          "_id": "5a9cd9c6ad5b2d34d42b385d",
          "name": "aaa"
        }
      }

    * 登入失敗
      {
        "code": 1,
        "msg": "手機號碼或簡訊驗證碼不正確!"
      }

## 8、發送手機簡訊驗證碼

### 請求網址 Url:

http://localhost:4000/sendcode

### 請求方式:

GET

### 參數類型(param)

| 參數名稱 | 是否必填 |  類型  |   說明   |
| :------: | :------: | :----: | :------: |
|  phone   |    Y     | String | 手機號碼 |

### 範例:

[http://localhost:4000/sendcode?phone=0987654321](http://localhost:4000/sendcode?phone=0987654321)

### 回傳格式:

    * 發送成功
      {
        "code": 0,
      }

    * 發送失敗
      {
        "code": 1,
        "msg": "手機驗證碼發送失敗"
      }

## 9、取得客戶資訊

### 請求網址 Url:

http://localhost:4000/userinfo

### 請求方式:

GET

### 參數類型(param)

無

### 範例:

[http://localhost:4000/sendcode?phone=0987654321](http://localhost:4000/sendcode?phone=0987654321)

### 回傳格式:

    * 發送成功
      {
      "code": 0,
      "data": {
          "_id": "5a9cd9c6ad5b2d34d42b385d",
          "phone": "13716962779"
          }
      }

    * 發送失敗
      {
        "code": 1,
        "msg": "請先登入"
      }

## 10、用戶帳號登出

### 請求網址 Url:

http://localhost:4000/logout

### 請求方式:

GET

### 參數類型(param)

無

### 範例:

無

### 回傳格式:

    * 發送成功/失敗
    { "code": 0 }
