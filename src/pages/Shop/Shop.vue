<template>
    <div>
        <ShopHeader />
        <div class="tab">
            <!-- router-link 路由標籤 -->
            <div class="tab-item">
                <router-link to="/shop/goods">菜單</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/shop/ratings">評價</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/shop/info">簡介</router-link>
            </div>
            <!-- 復用路由組件獲得後台數據 -->
            <keep-alive>
                <!-- router-view 路由顯示 -->
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import ShopHeader from '../../components/ShopHeader/ShopHeader';
export default {
    mounted() {
        this.$store.dispatch('getShopInfo')
    },
    components: {
        ShopHeader,
    },
    computed: {
        ...mapState(['shopInfo']),
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>