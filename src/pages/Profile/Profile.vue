<template>
  <section class="profile">
    <!--首頁頭部-->
    <HeaderTop title="我的" />

    <section class="profile-number">
      <!-- 登入頁面 -->
      <router-link class="profile-link" :to="userInfo._id ? '/userinfo' : '/login'">
        <div class="profile_image">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="!userInfo.phone">{{ userInfo.name || '登入/註冊' }}</p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-shouji icon-mobile"></i>
            </span>
            <span class="icon-mobile-number">{{ userInfo.phone || '無綁定手機號碼' }}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">帳戶餘額</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">優惠券</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">紅利點數</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的訂單 -->
      <a href='javascript:' class="my_order">
        <span>
          <i class="iconfont icon-order-s"></i>
        </span>
        <div class="my_order_div">
          <span>我的訂單</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 紅利商城 -->
      <a href='javascript:' class="my_order">
        <span>
          <i class="iconfont icon-jifen"></i>
        </span>
        <div class="my_order_div">
          <span>紅利商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 賣會員卡 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-vip"></i>
        </span>
        <div class="my_order_div">
          <span>會員卡</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服務中心 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-fuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服務中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px" v-show="userInfo._id">
      <!-- 登出按鈕 -->
      <mt-button type="danger" style="width:100%" @click="logout">登出</mt-button>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex' // vuex
import { MessageBox } from 'mint-ui' // mint-ui
import { reqLogout } from '../../api'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  computed: {
    ...mapState(['userInfo']),
  }, methods: {
    logout() {
      MessageBox.confirm('是否要退出').then(
        action => { // 點擊確認
          this.$store.dispatch('doUserLogout')
        },
        action => { // 點擊取消
          console.log('點擊取消')
        }
      )
    }
  },
  components: {
    HeaderTop
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .profile //我的
    width 100%
    overflow hidden
    .profile-number
      margin-top 45.5px
    .profile-link
      clearFix()
      position relative
      display block
      background #02a774
      padding 20px 10px
    .profile_image
      float left
      width 60px
      height 60px
      border-radius 50%
      overflow hidden
      vertical-align top
      .icon-person
        background #e4e4e4
        font-size 62px
    .user-info
      float left
      margin-top 8px
      margin-left 15px
      p
        font-weight: 700
        font-size 18px
        color #fff
    .user-info-top
      padding-bottom 8px
    .user-icon
      display inline-block
      margin-left -15px
      margin-right 5px
      width 20px
      height 20px
    .icon-mobile
      font-size 30px
      vertical-align text-top
    .icon-mobile-number
      font-size 14px
      color #fff
    .arrow
      width 12px
      height 12px
      position absolute
      right 15px
      top 40%
      .icon-jiantou1
        color #fff
        font-size 5px
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    background #fff
    overflow hidden
    .info_data_list
      clearFix()
      .info_data_link
        float left
        width 33%
        text-align center
        border-right 1px solid #f1f1f1
        .info_data_top
          display block
          width 100%
          font-size 14px
          color #333
          padding 15px 5px 10px
          span
            display inline-block
            font-size 30px
            color #f90
            font-weight 700
            line-height 30px
        .info_data_bottom
          display inline-block
          font-size 14px
          color #666
          font-weight 400
          padding-bottom 10px
      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e
      .info_data_link:nth-of-type(3)
        border 0
        .info_data_top
          span
            color #6ac20b
  .profile_my_order
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .my_order
      display flex
      align-items center
      padding-left 15px
      >span
        display flex
        align-items center
        width 20px
        height 20px
        >.iconfont
          margin-left -10px
          font-size 30px
        .icon-order-s
          color #02a774
        .icon-jifen
          color #ff5f3e
        .icon-vip
          color #f90
        .icon-fuwu
          color #02a774
      .my_order_div
        width 100%
        border-bottom 1px solid #f1f1f1
        padding 18px 10px 18px 0
        font-size 16px
        color #333
        display flex
        justify-content space-between
        span
          display block
        .my_order_icon
          width 10px
          height 10px
          .icon-jiantou1
            color #bbb
            font-size 10px
</style>