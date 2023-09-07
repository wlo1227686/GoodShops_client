<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <!-- 評價頭部 -->
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{ shopInfo.score }}</h1>
                    <div class="title">綜合評分</div>
                    <div class="rank">高於周邊商家99%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服務態度</span>
                        <Star :score="shopInfo.serviceScore" :size="36" />
                        <span class="score">{{ shopInfo.serviceScore }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品評分</span>
                        <Star :score="shopInfo.foodScore" :size="36" />
                        <span class="score">{{ shopInfo.foodScore }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送達時間</span>
                        <span class="delivery">{{ shopInfo.deliveryTime }} 分鐘</span>
                    </div>
                </div>
            </div>
            <div class="split"></div>
            <!-- 評價清單選項 -->
            <div class="ratingselect">
                <div class="rating-type border-1px">
                    <span class="block positive" :class="{ active: selectRatingType === 2 }"
                        @click="setSelectRatingType(2)">
                        全部<span class="count">{{ shopRatings.length }}</span>
                    </span>
                    <span class="block positive" :class="{ active: selectRatingType === 0 }"
                        @click="setSelectRatingType(0)">
                        滿意<span class="count">{{ positiveSize }}</span>
                    </span>
                    <span class="block negative" :class="{ active: selectRatingType === 1 }"
                        @click="setSelectRatingType(1)">
                        不滿意<span class="count">{{ negativeSize }}</span>
                    </span>
                </div>
                <div class="switch" :class="{ on: onlyShowText }" @click="toggleOnlyShowText">
                    <span class="iconfont icon-check_circle"></span>
                    <span class="text">只看內容的評價</span>
                </div>
            </div>
            <!-- 評價清單 -->
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
                        <!-- 帳戶圖片 -->
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <!-- 帳戶名稱 -->
                            <h1 class="name">{{ rating.username }}</h1>
                            <!-- 星級 -->
                            <div class="star-wrapper">
                                <Star :score="rating.score" :size="24" />
                                <span class="delivery">{{ rating.deliveryTime }}</span>
                            </div>
                            <!-- 評價內容 -->
                            <p class="text">{{ rating.text }}</p>
                            <!-- 評價下標籤 -->
                            <div class="recommend">
                                <span class="iconfont"
                                    :class="rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{ item }}</span>
                            </div>
                            <div class="time">{{ rating.rateTime }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import BScroll from 'better-scroll' // 頁面滑動功能

import Star from '../../../components/Star/Star.vue'
export default {
    data() {
        return {
            onlyShowText: true, // 只顯示有內文評價 true:顯示 false:不顯示
            selectRatingType: 2, // 評價類別 0:滿意 1:不滿意 2:全部
        }
    },
    mounted() {
        this.$store.dispatch('getShopRatings', () => { // 透過回調函數判斷action是否執行完畢
            this.$nextTick(() => {// 當畫面渲染完成後要執行better-scroll功能
                new BScroll(this.$refs.ratings, {
                    click: true
                })
            })
        })
    }, methods: {
        toggleOnlyShowText() { // 切換參數(有內容的評價)
            this.onlyShowText = !this.onlyShowText
        },
        setSelectRatingType(type) { // 設置評價類別參數
            this.selectRatingType = type
        }
    },
    computed: {
        ...mapState(['shopInfo', 'shopRatings']),
        ...mapGetters(['positiveSize', 'negativeSize']),

        filterRatings() {
            const { shopRatings, onlyShowText, selectRatingType } = this
            console.log('selectRatingType=' + selectRatingType)
            // 依照條件過濾shopRatings的內容
            return shopRatings.filter((ratings) => {
                // 取出 rateType,text用於以下判斷
                const { rateType, text } = ratings
                
                // // 條件1: 當onlyShowText為true的情況下,text字串長度不可小於等於0
                // if (onlyShowText && text.trim().length <= 0) {
                //     return false
                // }

                // // 條件2: 當 selectRatingType === 2 全顯示 或 selectRatingType === rateType
                // if (selectRatingType === 2) { // 顯示全部評價
                //     return true
                // } else if (selectRatingType === rateType) { 
                //     // 依照selectRatingType顯示滿意或不滿意的評價
                //     return true
                // }
                // return false

                // 條件1 : 
                // onlyShowText : true / false
                // text.trim().length : 大於0 或 不大於0
                // onlyShowText === false 的情況下 text.trim().length 不判斷直接回傳true
                // !onlyShowText || text.trim().length > 0

                // 條件2: 
                // selectRatingType 的參數為 0,1,2
                // rateType 的參數為 0,1
                // 當 selectRatingType === 2 或 selectRatingType === rateType 回傳ture
                // (selectRatingType === 2 || (selectRatingType === rateType))

                return (!onlyShowText || text.trim().length > 0) && (selectRatingType === 2 || (selectRatingType === rateType))
            })
        }
    },
    components: {
        Star
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .ratings
    position: absolute
    top: 40px
    width: 100%
    background: #fff
    overflow: hidden
    line-height: 0px
    height: calc(100vh)
    .overview
      display: flex
      padding: 8px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .ratingselect
      .rating-type
        padding: 18px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .block
          display: inline-block
          padding: 8px 12px
          margin-right: 8px
          line-height: 16px
          border-radius: 1px
          font-size: 12px
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: $green
            color: #fff
          .count
            margin-left: 2px
            font-size: 8px
      .switch
        padding: 12px 18px
        line-height: 24px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0
        &.on
          .icon-check_circle
            color: $green
        .icon-check_circle
          display: inline-block
          vertical-align: top
          margin-right: 4px
          font-size: 24px
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>