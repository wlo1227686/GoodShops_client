<template>
  <div>
    <div class="goods">
      <!-- 左側項目清單 -->
      <div class="menu-wrapper">
        <ul>
          <!-- current -->
          <li class="menu-item" v-for="(good, index) in shopGoods" :key="index"
            :class="{ current: currentIndex === index }" @click="clickMenuitem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右側食物清單 -->
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in shopGoods" :key="index">
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好評率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">${{ food.price }}</span><!-- 最新價格 -->
                    <span class="old" v-if="food.oldPrice">${{ food.oldPrice }}</span><!-- 原始價格 -->
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- <ShopCart /> -->
    </div>
  </div>
  <!-- <Food :food="food" ref="food" /> -->
</template>
<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import CartControl from '../../../components/CartControl/CartControl.vue'
// import Food from '../../../components/Food/Food.vue'
// import ShopCart from '../../../components/ShopCart/ShopCart.vue'


export default {
  data() {
    return {
      scrollY: 0, // 右側分類當前滑動到的座標 (滑動過程隨時變化)
      tops: [], // 所有右側分類<li>的Top所組成的陣列(初始化後則不變動)
      // food: {}, // 需要显示的food
    }
  },
  mounted() {
    this.$store.dispatch('getShopGoods', () => { // shopGoods數據更新後
      this.$nextTick(() => { // 確認數據顯示(渲染)完成
        this._initScroll()
        this._initTops()
      })
    })
  },
  computed: {
    ...mapState(['shopGoods']),

    // 計算左側分類相對應的index
    currentIndex() { // 初始計算與參數異動時會執行
      const { scrollY, tops } = this
      //透過scrollY的參數判斷當前tops為第N項
      const index = tops.findIndex((top, index) => {
        // scrollY 大於等於 top 並且 scrollY 小於下個 top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      // 依照右側座標返回左側相對應的分類index
      // console.log('index='+index)
      return index
    }
  },

  methods: {
    // 初始化滾動
    _initScroll() {
      // 列表渲染完成後創建
      new BScroll('.menu-wrapper', {
        click: true,
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        click: true,
        probeType: 3,  // 參數為1、2、3則綁定scroll監聽
      })

      // 右側分類綁定scroll的監聽
      this.foodsScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
        // console.log("scrollY=" + this.scrollY)
      })

      // 右側分類綁定scroll結束的監聽
      this.foodsScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y)
        // console.log("scrollEnd_scrollY=" + this.scrollY)
      })

    },
    // 初始化Tops
    _initTops() {
      // 1. 初始化tops
      const tops = []
      let top = 0
      tops.push(top)

      // 2. 收集ref為foodUl底下li的class為所有分类的li
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })

      // 3. 更新狀態
      this.tops = tops
      // console.log('Tops=' + tops)
    },
    clickMenuitem(index) { // 點擊左側分類右側滑動到對應效果
      // 指定右側列表滑動到對應位置
      const y = this.tops[index]
      this.scrollY = y 
      // 平滑滾動右側列表
      this.foodsScroll.scrollTo(0, -y, 300)
    },

    // 显示点击的food
    // showFood(food) {
    //     // 设置food
    //     this.food = food
    //     // 显示food组件 (在父组件中调用子组件对象的方法)
    //     this.$refs.food.toggleShow()
    // }
  },

  components: {
    CartControl,
    // Food,
    // ShopCart
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 40px
    // bottom: 46px
    height: calc(100vh)
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 5px
        padding-bottom: 5px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
