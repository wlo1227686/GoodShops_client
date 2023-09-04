/**
 * 路由器(Router)對象模塊
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'


//聲明使用插件
Vue.use(VueRouter)


export default new VueRouter({
    // 所有路由
    routes: [
        { path: '/msite', component: Msite, meta: { showFooter: true } } // 首頁頁面
        , { path: '/order', component: Order, meta: { showFooter: true } } //訂單頁面
        , { path: '/profile', component: Profile, meta: { showFooter: true } } // 個人頁面
        , { path: '/search', component: Search, meta: { showFooter: true } } // 搜尋頁面
        , { path: '/login', component: Login, meta: { showFooter: false } } // 登入頁面
        , { path: '/*', redirect: '/msite' } // 非預期的請求跳轉(redirect)回msite
    ]
})