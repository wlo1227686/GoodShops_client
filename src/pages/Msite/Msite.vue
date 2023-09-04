<template>
  <section class="msite">
    <!--首頁頭部-->
    <HeaderTop :title="address.name">
      <!-- slot左側(L) -->
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <!-- slot右側(R) -->
      <span class="header_login" slot="right">
        <span class="header_login_text">登入|註冊</span>
      </span>
    </HeaderTop>
    <!--導航Swiper-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categoryArrays " :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys " :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 預設畫面 -->
      <img src="./images/msite_back.svg" alt="back" v-else />
    </nav>
    <!--首頁附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <!-- 商家清單 -->
      <ShopList />
    </div>
  </section>
</template>
<script>

import { mapState } from 'vuex'
import Swiper from 'swiper' // 導航Swiper
import 'swiper/dist/css/swiper.min.css'

import HeaderTop from '../../components/HeaderTop/HeaderTop.vue' // 首頁頭部
import ShopList from '../../components/ShopList/shopList'  // 商家清單

export default {
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted() {
    this.$store.dispatch('getCategorys') // 取得食品分類清單
    this.$store.dispatch('getShops') // 取得商鋪清單
  },
  computed: {
    ...mapState(['address', 'categorys']),
    //根據categorys內容，整理成一個2維陣列,每個陣列元素最多為8個
    categoryArrays() {
      const { categorys } = this
      // 空的2維陣列
      const arr = [] // 大陣列
      let minArry = [] // 小陣列(最大長度為8)

      //遍歷categorys陣列
      categorys.forEach(element => {
        // 如果小陣列長度為8,則創建新的
        if (minArry.length === 8) {
          minArry = []
        }
        // 如果小陣列為空的,將小陣列與大陣列做關聯
        if (minArry.length === 0) {
          arr.push(minArry)
        }
        // 將資料放入小陣列
        minArry.push(element)
      })
      return arr
    }
  },
  watch: {
    categorys(value) { // categorys陣列中有資料,在異步更新介面前執行
      // 介面更新就立即創建Swiper對象
      this.$nextTick(() => { //一旦完成介面更新,立即調用
        // 創建Swiper對象實現輪播
        new Swiper('.swiper-container', {
          loop: true, //循環輪播
          pagination: {
            el: '.swiper-pagination',
          }
        })
      })
    }
  },
  components: {
    HeaderTop, ShopList
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首頁
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
      .swiper-wrapper
        width 100%
        height 100%
      .swiper-slide
        display flex
        justify-content center
        align-items flex-start
        flex-wrap wrap
        .link_to_food
          width 25%
          .food_container
            display block
            width 100%
            text-align center
            padding-bottom 10px
            font-size 0
            img
              display inline-block
              width 50px
              height 50px
          span
            display block
            width 100%
            text-align center
            font-size 13px
            color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
