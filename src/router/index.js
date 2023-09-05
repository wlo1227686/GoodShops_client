/**
 * 路由器(Router)對象模塊
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// pages
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'

// pages/shop
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'

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
        , { // Shop頁面
            path: '/shop', component: Shop, children: [
                { path: '/shop/goods', component: ShopGoods } // 商品資訊
                , { path: '/shop/info', component: ShopInfo } // 店家資訊
                , { path: '/shop/ratings', component: ShopRatings } // 店家評論
                , { path: '', redirect: '/shop/goods' } // 非預期的請求跳轉(redirect)回/shop/goods
            ]
        }
        , { path: '/*', redirect: '/msite' } // 非預期的請求跳轉(redirect)回msite

    ]
})