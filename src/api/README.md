# API 接口文件

## 目錄:

[1、根據經緯度取得相關位置](#1根據經緯度取得相關位置)<br/>
[2、取得食品分類表](#2取得食品分類表)<br/>

## 1、根據經緯度取得相關位置

### 請求網址 Url:
http://localhost:4000/position/:geohash

### 請求方式:
GET

### 參數類型(param)

| 參數名稱 | 是否必填 | 類型 | 說明 |
|:--------:|:----:|:----:|:----:|
|geohash|Y|String|經緯度|

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