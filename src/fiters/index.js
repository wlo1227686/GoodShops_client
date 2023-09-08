import Vue from "vue"
import format from 'date-fns/format' // 透過輕量化 date-fns來實現日期格式轉換
// 自定義filter
Vue.filter('dateFormat', function (value, formatStr = 'yyyy-MM-dd HH:mm:ss') {
    return format(value,formatStr)
})