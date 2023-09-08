<template>
    <div class="shop-info">
        <div class="info-content">
            <!-- 外送資訊 -->
            <section class="section">
                <h3 class="section-title">外送資訊</h3>
                <div class="delivery">
                    <div>
                        <span class="delivery-icon">{{ shopInfo.description }}</span>
                        <span>店家提供外送，約{{ shopInfo.deliveryTime }}分鐘後到達，距離{{ shopInfo.distance }}</span>
                    </div>
                    <div class="delivery-money">外送費${{ shopInfo.deliveryPrice }}</div>
                </div>
            </section>
            <div class="split"></div>
            <!-- 活動服務 -->
            <section class="section">
                <h3 class="section-title">活動與服務</h3>
                <div class="activity">
                    <div class="activity-item" v-for="(support, index) in shopInfo.supports" :key="index"
                        :class="supportClasses[support.type]">
                        <span class="content-tag">
                            <span class="mini-tag">{{ support.name }}</span>
                        </span>
                        <span class="activity-content">{{ support.content }}</span>
                    </div>
                </div>
            </section>
            <div class="split"></div>
            <!-- 店家圖片 -->
            <section class="section">
                <h3 class="section-title">店家圖片</h3>
                <div class="pic-wrapper">
                    <ul class="pic-list" ref="picsUl">
                        <li class="pic-item" v-for="(pic, index) in shopInfo.pics" :key="index">
                            <img width="120" height="90" :src="pic" />
                        </li>
                    </ul>
                </div>
            </section>
            <div class="split"></div>
            <!-- 店家資訊 -->
            <section class="section">
                <h3 class="section-title">店家資訊</h3>
                <ul class="detail">
                    <li><span class="bold">種類</span> <span>{{ shopInfo.category }}</span></li>
                    <li><span class="bold">聯絡電話</span> <span>{{ shopInfo.phone }}</span></li>
                    <li><span class="bold">地址</span> <span>{{ shopInfo.address }}</span></li>
                    <li><span class="bold">營業時間</span> <span>{{ shopInfo.workTime }}</span></li>
                </ul>
            </section>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex' // vuex
import BScroll from 'better-scroll' // 頁面滑動功能
export default {
    data() {
        return {
            supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
        }
    },
    mounted() {
        if (!this.shopInfo.pics) { //如果沒有初始值則離開
            return
        }
        this._initScroll()
    },
    methods: {
        _initScroll() {
            new BScroll('.shop-info') // 商家資訊(垂直滑動)
            const ul = this.$refs.picsUl
            const liWidth = 120 // 單個li寬度
            const space = 6 // 單個li的間隔
            const count = this.shopInfo.pics.length
            ul.style.width = (liWidth + space) * count - space + 'px'
            // 店家圖片(水平滑動)
            new BScroll('.pic-wrapper', {
                scrollX: true,
            })
        }
    },
    computed: {
        ...mapState(['shopInfo'])
    },
    watch: {
        shopInfo() { // 監聽shopInfo是否有取得值
            this.$nextTick(() => {// 當畫面渲染完成後要執行better-scroll功能
                this._initScroll()
            })
        }
    }

}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

.shop-info
  position absolute
  top 40px
  width 100%
  background #fff
  overflow hidden
  height calc(100vh)
  .section
    padding 16px 14px 14px
    font-size 16px
    background-color #fff
    color #666
    border-bottom 1px solid #eee
    position relative
    .section-title
      color #000
      font-weight 700
      line-height 16px
      > .iconfont
        float right
        color #ccc
    .delivery
      margin-top 16px
      font-size 13px
      line-height 18px
      .delivery-icon
        width 55px
        font-size 11px
        margin-right 10px
        display inline-block
        text-align center
        color #fff
        background-color #0097ff
        padding 1px 0
        border-radius 4px
      .delivery-money
        margin-top 5px

    .activity
      margin-top 16px
      .activity-item
        margin-bottom 12px
        line-height 10px 
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
    .pic-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      margin-top 16px
      .pic-list
        // width fit-content //透過js取得width寬度
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 0
    .detail
      margin-bottom -16px
      > li
        display flex
        justify-content space-between
        align-items center
        margin-right -10px
        padding 16px 12px 16px 0
        line-height 16px
        bottom-border-1px(#ddd)
        font-size 13px
        > .bold
          font-weight 700
          color #333
        &:last-child
          border-none()


  .split
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7
</style>