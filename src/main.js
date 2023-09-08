/**
 * App.js 入口Js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import { Button } from 'mint-ui'

import './mock/mockServer' // 加載mockServer服務
import loadingGif from './common/img/loading.gif'
import './fiters' // 加載自定義過濾器
//註冊全局標籤
Vue.component(Button.name, Button) // <mt-Button>

//vue-lazyLoad
Vue.use(VueLazyload, { // 自定義一個指令Lazy
    loading: loadingGif
})
new Vue({
    el: '#app',
    render: h => h(App),
    router, // 使用Vue-router
    store, // 使用vuex
})