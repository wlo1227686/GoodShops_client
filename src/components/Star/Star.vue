<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" :class="starClass" v-for="(starClass, index) in starClassArray" :key="index"></span>
  </div>
</template>

<script>

const STSR_CLASS_HALF = 'half'
const STSR_CLASS_OFF = 'off'
const STSR_CLASS_ON = 'on'
export default {

  props: {
    score: Number,
    size: Number,
  }, computed: {
    starClassArray() {
      const { score } = this // 星級分數
      const scs = [] // 星級陣列
      const scoreInteger = Math.floor(score) // 取出整數
      const scoreToFixed = Math.round((score - scoreInteger) * 10) // 取得小數點第一位(初始值減去整數在乘上10)
      for (var i = 0; i < scoreInteger; i++) {
        // 向scs添加n個 STSR_CLASS_ON
        scs.push(STSR_CLASS_ON)
      }
      if (scoreToFixed >= 5) {
        // 向scs添加n個 STSR_CLASS_HALF
        scs.push(STSR_CLASS_HALF)
      }

      // 向scs添加n個 STSR_CLASS_OFF
      while (scs.length < 5) {
        scs.push(STSR_CLASS_OFF)
      }
      // console.log("原始值=" + score + " 整數部位=" + scoreInteger + " 小數部位=" + scoreToFixed)
      // console.log("處理結果=" + scs)
      return scs
    }
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x圖 3x圖
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>