/**
 * 使用mockjs提供mock數據
 */

import Mock from 'mockjs'
import data from './data.json'

// 返回goods的接口
Mock.mock('/shopGoods', { code: 0, data: data.goods })

// 返回ratings的接口
Mock.mock('/shopRatings', { code: 0, data: data.ratings })

// 返回info的接口
Mock.mock('/shopInfo', { code: 0, data: data.info })
