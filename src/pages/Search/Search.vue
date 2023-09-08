<template>
  <section class="search">
    <!--首頁頭部-->
    <HeaderTop title="搜尋" />

    <form class="search_form" @submit.prevent="doSearch">
      <input type="search" placeholder="請輸入商家或食物名稱" class="search_input" v-model="keyword">
      <input type="submit" class="search_submit">
    </form>
    <!-- 顯示查無資料訊息 -->
    <div class="search_none" v-if="showSearchNotFound">查無任何資料</div>
    <!-- 顯示查詢結果 -->
    <section class="list" v-else>
      <ul class="list_container">
        <!--:to="'/shop?id='+item.id"-->
        <router-link :to="{ path: '/shop', query: { id: item.id } }" tag="li" v-for="item in searchShops" :key="item.id"
          class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.name }}</span>
              </p>
              <p>月售 {{ item.month_sales || item.recent_order_num }} 單</p>
              <p>{{ item.delivery_fee || item.float_minimum_order_amount }} 元起送 / 距離{{ item.distance }}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
  data() {
    return {
      keyword: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      showSearchNotFound: false, // 是否顯示查無結果訊息(true:是 false:否)
    }
  },
  methods: {
    doSearch() { // 執行查詢
      // 取得查詢關鍵字(keyword)
      const keyword = this.keyword.trim()
      // 執行搜尋
      if (keyword) {
        this.$store.dispatch('getSearchShops', keyword)
      }
    }

  },
  components: {
    HeaderTop
  }, computed: {
    ...mapState(['searchShops'])
  },
  watch: {
    searchShops(value) { // 參數監聽
      console.log('value.length=' + value.length)
      if (value.length) { //有資料
        this.showSearchNotFound = false
      } else { // 無資料
        this.showSearchNotFound = true
      }
    },
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>