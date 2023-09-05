/**
 * App.js 入口Js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button } from 'mint-ui'

import './mock/mockServer' // 加載mockServer服務

//註冊全局標籤
Vue.component(Button.name, Button) // <mt-Button>

new Vue({
    el: '#app',
    render: h => h(App),
    router, // 使用Vue-router
    store, // 使用vuex
})