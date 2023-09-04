<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">Chenfu外賣</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{ on: loginType == 1 }" @click="loginType = 1">手機登入</a>
          <a href="javascript:;" :class="{ on: loginType == 2 }" @click="loginType = 2">密碼登入</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <!-- 手機登入 loginType=1  -->
          <div :class="{ on: loginType == 1 }">
            <section class="login_message">
              <input type="tel" maxlength="10" placeholder="手機號碼" v-model="phoneNumber"
                oninput="value=value.replace(/[^\d]/g,'')" :readonly="phoneNumberLock">
              <button :disabled="!checkPhoneNumber" class="get_verification"
                :class="{ right_phoneNumber: checkPhoneNumber }" @click.prevent="getPhoneCode">
                {{ computeTime > 0 ? `簡訊已發送(${computeTime}s)` : '獲取驗證碼' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="驗證碼" v-model="phoneCode">
            </section>
            <section class="login_hint">
              温馨提示：未註冊Chenfu外賣的手機號碼，登入時將自動註冊，且代表已同意
              <a href="javascript:;">《用戶服務協議》</a>
            </section>
          </div>
          <!-- 密碼登入 loginType=2  -->
          <div :class="{ on: loginType == 2 }">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手機/Email/用戶名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="[showPassword ? 'text' : 'password']" maxlength="8" placeholder="密碼" v-model="pwd">
                <!-- <input type="password" maxlength="8" placeholder="密碼" v-model="pwd" v-else> -->
                <div class="switch_button" :class="[showPassword ? 'on' : 'off']" @click="showPassword = !showPassword">
                  <div class="switch_circle" :class="{ right: showPassword }"></div>
                  <span class="switch_text">{{ showPassword ? 'abc' : '...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="驗證碼" v-model="captcha">
                <img class="get_verification" src="./images/captcha.svg" alt="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登入</button>
        </form>
        <a href="javascript:;" class="about_us">關於我們</a>
      </div>
      <!-- 返回上一頁 $router.back() -->
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip" />
  </section>
</template>
<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
let intervalId = ''
export default {
  data() {
    return {
      alertText: '', // 提示訊息
      loginType: 1, // 登入模式 (1:手機登入 2:密碼登入)
      showAlert: false, // 是否顯示提示視窗( true:顯示 false:隱藏)

      // 手機登入 loginType=1
      computeTime: 0, // 驗證碼倒數計時的時間
      phoneNumber: '', // 手機號碼
      phoneNumberLock: false, // 手機號碼輸入框是否鎖定
      phoneCode: '', // 手機驗證碼

      // 密碼登入 loginType=2
      name: '',
      pwd: '',// 用戶密碼
      showPassword: false, // 密碼輸入框是否需要遮掩 (true:不遮掩 false:遮掩)
      captcha: '', // 圖形驗證碼
    }
  }, computed: {
    checkPhoneNumber() { // 檢查電話號碼格式(true:正確 false:錯誤)
      return /^09\d{8}$/.test(this.phoneNumber)
    },
  }, methods: {
    getPhoneCode() { // 手機登入取得驗證碼
      //      console.log('---getPhoneCode---intervalId=' + intervalId)
      if (intervalId === '') { // 確定目前沒有計時Id才啟動
        this.computeTime = 30 // 設置計時秒數
        this.phoneNumberLock = true //鎖定電話輸入框
        // 倒數計時器啟動
        intervalId = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            clearInterval(intervalId)
            intervalId = ''
            this.phoneNumberLock = false //解鎖電話輸入框
          }
        }, 1000)
        // 發送ajax請求(向指定手機號碼發送驗證碼訊息)
      } // end_if
    },
    login() { // 異步登入
      // 判斷登入模式
      if (this.loginType == 1) { // 1:手機登入
        // console.log("checkPhoneNumber=" + this.phoneNumber + " phoneCode=" + this.phoneCode)
        const { checkPhoneNumber, phoneNumber, phoneCode } = this
        if (!this.checkPhoneNumber) {
          this.alertMessage('手機號碼不正確') // 手機號碼不正確
        } else if (!/^\d{6}$/.test(phoneCode) || '' === phoneCode) {
          this.alertMessage('驗證碼不正確') // 驗證碼不正確
        }
      } else if (this.loginType == 2) { // 2:密碼登入
        const { name, pwd, captcha } = this
        if (!this.name) {
          this.alertMessage('用戶名稱為必填') // 用戶名稱為必填
        } else if (!this.pwd) {
          this.alertMessage('密碼為必填') // 密碼為必填
        } else if (!this.captcha) {
          this.alertMessage('驗證碼必填') // 驗證碼必填
        }
      }// end-if 
    },
    alertMessage(message) { // 提示訊息
      this.alertText = message
      this.showAlert = true
    },
    closeTip() { // 關閉提示視窗
      this.alertText = ''
      this.showAlert = false
    }
  }, components: {
    AlertTip
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phoneNumber
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                  &.on
                    background #02a774
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>