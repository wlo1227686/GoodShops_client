<template>
    <div class="shop-header">
        <!-- 透過vue的綁定方式來處理css的圖片訊息 -->
        <nav class="shop-nav" :style="{ backgroundImage: `url(${shopInfo.bgImg})` }">
            <a class="back" @click="$router.replace('/msite')">
                <i class="iconfont icon-arrow_left"></i>
            </a>
        </nav>
        <!-- 標題Title -->
        <div class="shop-content" @click="toggleShopShow">
            <!-- 商家icon -->
            <img class="content-image" :src="shopInfo.avatar">
            <div class="header-content">
                <h2 class="content-title">
                    <span class="content-tag">
                        <span class="mini-tag">品牌</span>
                    </span>
                    <span class="content-name">{{ shopInfo.name }}</span>
                    <i class="content-icon"></i>
                </h2>
                <div class="shop-message">
                    <span class="shop-message-detail">{{ shopInfo.score }}</span>
                    <span class="shop-message-detail">月售{{ shopInfo.sellCount }}單</span>
                    <span class="shop-message-detail">
                        {{ shopInfo.description }}
                        <span>約{{ shopInfo.deliveryTime }}分鐘</span>
                    </span>
                    <span class="shop-message-detail">距離{{ shopInfo.distance }}</span>
                </div>
            </div>
        </div>
        <!-- 透過v-if來處理優惠活動div，避免shopInfo.support在初始沒數據時被解析 -->
        <div class="shop-header-discounts" v-if="shopInfo.supports" @click="toggleSupportShow">
            <div class="discounts-left">
                <div class="activity" :class="supportClasses[shopInfo.supports[0].type]">
                    <!-- 優惠活動(首單、滿減、特價) -->
                    <span class="content-tag">
                        <span class="mini-tag">{{ shopInfo.supports[0].name }}</span>
                    </span>
                    <!-- 優惠活動(簡述) -->
                    <span class="activity-content ellipsis">{{ shopInfo.supports[0].content }}</span>
                </div>
            </div>
            <!-- 優惠活動下拉按鈕 -->
            <div class="discounts-right">
                {{ shopInfo.supports.length }}個優惠
            </div>
        </div>

        <transition name="fade">
            <!-- 商家訊息 -->
            <div class="shop-brief-modal" v-show="shopShow">
                <div class="brief-modal-content">
                    <h2 class="content-title">
                        <span class="content-tag">
                            <span class="mini-tag">品牌</span>
                        </span>
                        <span class="content-name">{{ shopInfo.name }}</span>
                    </h2>
                    <ul class="brief-modal-msg">
                        <li>
                            <h3>{{ shopInfo.score }}</h3>
                            <p>評分</p>
                        </li>
                        <li>
                            <h3>{{ shopInfo.sellCount }}單</h3>
                            <p>月售</p>
                        </li>
                        <li>
                            <h3>{{ shopInfo.description }}</h3>
                            <p>约{{ shopInfo.deliveryTime }}分鐘</p>
                        </li>
                        <li>
                            <h3>{{ shopInfo.deliveryPrice }}元</h3>
                            <p>配送費用</p>
                        </li>
                        <li>
                            <h3>{{ shopInfo.distance }}</h3>
                            <p>距離</p>
                        </li>
                    </ul>
                    <h3 class="brief-modal-title">
                        <span>公告</span>
                    </h3>
                    <div class="brief-modal-notice">
                        {{ shopInfo.bulletin }}
                    </div>
                    <!-- 商家訊息關閉按鈕 -->
                    <div class="mask-footer" @click="toggleShopShow">
                        <span class="iconfont icon-close"></span>
                    </div>
                </div>
                <div class="brief-modal-cover"></div>
            </div>
        </transition>

        <transition name="fade">
            <!-- 優惠活動 -->
            <div class="activity-sheet" v-show="supportShow">
                <div class="activity-sheet-content">
                    <h2 class="activity-sheet-title">優惠活動</h2>
                    <ul class="list">
                        <li class="activity-item" v-for="(support, index) in shopInfo.supports" :key="index"
                            :class="supportClasses[support.type]">
                            <span class="content-tag">
                                <span class="mini-tag">{{ support.name }}</span>
                            </span>
                            <span class="activity-content">{{ support.content }}</span>
                        </li>
                    </ul>
                    <!-- 優惠活動關閉按鈕 -->
                    <div class="activity-sheet-close" @click="toggleSupportShow">
                        <span class="iconfont icon-close"></span>
                    </div>
                </div>
                <div class="activity-sheet-cover"></div>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            // 優惠活動的class屬性( 0:activity-green 1:activity-red 2:activity-orange )
            supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
            shopShow: false, // 是否顯示商家訊息(true:是 false:否)
            supportShow: false // 是否顯示優惠訊息(true:是 false:否)
        }
    },
    computed: {
        ...mapState(['shopInfo'])
    },

    methods: {
        toggleShopShow() { // 顯示/隱藏 商家訊息
            this.shopShow = !this.shopShow
        },

        toggleSupportShow() { // 顯示/隱藏 優惠訊息
            this.supportShow = !this.supportShow
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

.shop-header
  height 100%
  position relative
  background #fff
  color #fff
  overflow hidden
  .shop-nav
    background-size cover
    background-repeat no-repeat
    height 40px
    padding 5px 10px
    position relative
    &::before
      content ""
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background-color rgba(119, 103, 137, .43)
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow_left
        display: block
        padding: 5px
        font-size: 20px
        color: #fff

  .shop-content
    padding 30px 20px 5px 20px
    position relative
    display flex
    background #fff
    text-align center
    img
      box-shadow 0 0 0.4vw 0 rgba(0, 0, 0, .2)
      position absolute
      top 0
      left 50%
      width 66px
      height 66px
      border-radius 2px
      margin-left -33px
      margin-top -40px
    .header-content
      flex 1
      width 72%
      .content-title
        font-size 20px
        line-height 24px
        font-weight 700
        white-space nowrap
        position relative
        display flex
        align-items center
        justify-content center
        color #333
        .content-tag
          border-radius 2px
          background-image linear-gradient(90deg, #fff100, #ffe339)
          width 36px
          height: 18px
          margin-right 10px
          color #6a3709
          font-style normal
          font-weight 700
          position relative
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 24px
            font-weight 600
            transform scale(.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center
        .content-name
          font-weight 700
          text-align left
          overflow hidden
          text-overflow ellipsis
        .content-icon
          width 20px
          position relative
          height 16px
          &::after
            content ""
            border-style solid
            border-width: 6px 0 6px 7px
            border-color transparent transparent transparent rgba(0, 0, 0, .67)
            position absolute
            left 8px
            top 3px
    .shop-message
      white-space nowrap
      height 12px
      margin-top 8px
      font-size 11px
      color #333
      .shop-message-detail:not(:last-child)::after
        content " \B7 "
        opacity .2
    .shop-notice
      width 63%
      font-size 11px
      font-weight 300
      color #999
      overflow hidden
      text-overflow ellipsis
      margin 8px auto 10px
      white-space nowrap

  .shop-header-discounts
    display flex
    background #fff
    border-radius 1px
    border 1px solid #eee
    padding 5px 7px
    font-size 11px
    color #666
    margin 0 30px
    align-items center
    .discounts-left
      flex 1
      overflow hidden
      .activity
        display flex
        align-items center
        .content-tag
          border-radius 1px
          width 25px
          height 13px
          margin-right 5px
          color #fff
          font-style normal
          font-weight 700
          position relative
          background-color rgb(112, 188, 70)
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 18px
            font-weight 600
            transform scale(.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center

    .discounts-right
      width 50px
      flex-shrink 0
      position relative
      padding-right 10px
      text-align right
      &::after
        content ""
        display block
        border-style solid
        border-width 4px 4px 0
        border-color rgba(0, 0, 0, .57) transparent transparent
        position absolute
        top 50%
        transform translateY(-50%)
        right 0

  .shop-brief-modal
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    display flex
    justify-content center
    align-items center
    z-index 52
    flex-direction column
    color #333
    &.fade-enter-active,&.fade-leave-active
      transition opacity .5s
    &.fade-enter,&.fade-leave-to
      opacity 0
    .brief-modal-cover
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      background-color rgba(0, 0, 0, .5)
      z-index 1

    .brief-modal-content
      position relative
      width 80%
      padding 25px 20px
      border-radius 5px
      background #fff
      z-index 99
      display flex
      flex-direction column
      .content-title
        font-size 20px
        line-height 24px
        font-weight 700
        white-space nowrap
        position relative
        display flex
        align-items center
        justify-content center
        > span
          font-weight 600
        .content-tag
          border-radius 2px
          background-image linear-gradient(90deg, #fff100, #ffe339)
          width 36px
          height: 18px
          margin-right 10px
          color #6a3709
          font-style normal
          position relative
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 24px
            transform scale(.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center
      .brief-modal-msg
        display flex
        margin 20px -10px 0
        > li
          flex 1
          text-align center
          > h3
            font-size 15px
            font-weight 600
            color #333
            margin-bottom 8px
          > p
            font-size 12px
            color #999
      .brief-modal-title
        position relative
        text-align center
        margin 15px auto 15px
        width 85px
        background-image linear-gradient(90deg, #fff, #333 50%, #fff)
        background-size 100% 1px
        background-position 50%
        background-repeat no-repeat
        > span
          font-size 12px
          padding 0 6px
          color #999
          background-color #fff
      .brief-modal-notice
        font-size 13px
        line-height 1.54
        color #333
        overflow-y auto

      .mask-footer
        position absolute
        bottom -60px
        left 50%
        padding 6px
        border 1px solid rgba(255, 255, 255, .7)
        border-radius 50%
        transform translateX(-50%)
        span
          font-size 16px
          color rgba(255, 255, 255, .7)
  .activity-sheet
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 99
    &.fade-enter-active,&.fade-leave-active
      transition opacity .5s
    &.fade-enter,&.fade-leave-to
      opacity 0
      
    .activity-sheet-content
      position absolute
      background-color #f5f5f5
      box-shadow 0 -1px 5px 0 rgba(0, 0, 0, .4)
      bottom 0
      left 0
      right 0
      z-index 100
      padding 20px 30px
      box-sizing border-box
      transition transform .2s
      will-change transform
      color #333
      .activity-sheet-title
        text-align center
        font-size 20px
        font-weight 600
        margin-bottom 20px
      .list
        font-size 16px
        height 160px
        overflow-y auto
        .activity-item
          margin-bottom 12px
          display flex
          font-size 13px
          align-items center
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color: rgb(241, 136, 79)
          .content-tag
            display inline-block
            border-radius 2px
            width 36px
            height: 18px
            margin-right 10px
            color #fff
            font-style normal
            position relative
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 24px
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
      .activity-sheet-close
        position absolute
        right 6px
        top 10px
        width 25px
        height 25px
        > span
          font-size 20px

    .activity-sheet-cover
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      background-color rgba(0, 0, 0, .5)
</style>