<template>
  <section class="order">
    <!--首頁頭部-->
    <HeaderTop title="訂單列表" />
    <section class="order_no_login">
      <img src="./images/order/person.png">
      <h3>登入後查看外送訂單</h3>
      <button>立即登錄</button>
    </section>
  </section>
</template>
<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
export default {
  components: {
    HeaderTop
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
.order  //訂單
  width 100%
  overflow hidden
  .order_no_login
    padding-top 140px
    width 60%
    margin 0 auto
    text-align center
    >img
      display block
      width 100%
      height 30%
    >h3
      padding 10px 0
      font-size 17px
      color #6a6a6a
    >button
      display inline-block
      background #02a774
      font-size 14px
      color #fff
      border 0
      outline none
      border-radius 5px
      padding 10px 20px
</style>