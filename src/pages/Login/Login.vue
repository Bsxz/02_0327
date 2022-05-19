<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">大锤外卖</h2>
        <div class="login_header_title">
          <a :class="{on: showInfo}" @click="showInfo = true">短信登录</a>
          <a :class="{on: !showInfo}" @click="showInfo = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <!--    验证码登入      -->
          <div :class="{on: showInfo === true}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                :disabled="!JudgePhone"
                class="get_verification"
                @click.prevent="getVerificationCode"
                :style="{color: computerTime > 0 ? JudgePhoneOn : JudgePhone}">
                {{ computerTime > 0 ? `已发送(${computerTime}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册大锤外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!--    密码登入      -->
          <div :class="{on: showInfo === false}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-if="!showpwd" v-model="pwd">
                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button " :class="showpwd ? 'on' : 'off'" @click="showpwd = !showpwd">
                  <div class="switch_circle" :class="{right: showpwd}"></div>
                  <span class="switch_text">{{ showpwd ? 'abc' : '' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:10086/captcha" ref="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <router-link to="/profile" class="go_back">
        <i class="iconfont icon-jiantou1"></i>
      </router-link>
    </div>
    <alert-tip :alert-text="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script type="text/ecmascript-6">
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'

export default {
  name: 'Longin',
  data () {
    return {
      phone: '', // 手机号码
      name: '', // 用户名
      code: '', // 验证码
      captcha: '', // 图形验证码
      pwd: '', // 密码
      showInfo: true, // 判断是密码登入还是验证码登入
      computerTime: 0, // 计时器的时间
      showpwd: false, // 是否显示密码
      alertText: '', //  提示文本
      alertShow: false // 是否显示警告框
    }
  },
  components: {
    AlertTip
  },
  methods: {
    goTo (path) {
      this.$router.replace(path)
    },
    // 异步获取短信验证码
    async getVerificationCode () {
      // 判断数值是否存在并且等于0
      if (!this.computerTime) {
        this.computerTime = 60
        this.disabled = true
        // 启动倒计时
        this.times = setInterval(() => {
          this.computerTime--
          if (this.computerTime <= 0) {
            clearTimeout(this.times)
            this.disabled = false
          }
        }, 1000)
        // 发送Ajax请求
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          // 显示提示
          this.showAlert(result.msg)
          // 停止倒计时
          if (this.computerTime) {
            this.computerTime = 0
            this.disabled = false
            clearInterval(this.times)
            // 防止污染变量
            this.times = undefined
          }
        }
      }
    },
    showAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 关闭警告框
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },
    // 异步登入
    async login () {
      // 判断登入方式（表单前台验证）
      let result
      if (this.showInfo) {
        const {JudgePhone, phone, code} = this
        if (!JudgePhone) {
          // 手机号不正确
          this.showAlert('请输入手机号码')
        } else if (!(/^\d{6}$/.test(code))) {
          // 验证码位数不正确
          this.showAlert('验证码输入错误')
        } else {
          // 发送ajax请求
          result = await reqSmsLogin(phone, code)
        }
      } else {
        const {name, pwd, captcha} = this
        if (!name) {
          // 用户名必须指定
          this.showAlert('请输入手机号码')
        } else if (!pwd) {
          // 密码必须指定
          this.showAlert('密码错误')
        } else if (!captcha) {
          // 图形验证码必须指定
          this.showAlert('验证码输入错误')
        }
        // 发送ajax请求
        result = await reqPwdLogin({name, pwd, captcha})
      }
      // 停止倒计时
      if (this.computerTime) {
        this.computerTime = 0
        this.disabled = false
        clearInterval(this.times)
        // 防止污染变量
        this.times = undefined
      }
      // 根据结果处理上数据
      if (result.code === 0) {
        // 成功了
        const user = result.data
        // 将用户名保存到vuex中
        this.$store.dispatch('recordUser', user)
        // 跳转路由
        this.$router.replace('/profile')
      } else {
        // 失败了
        const msg = result.msg
        this.showAlert(msg)
        this.getCaptcha()
      }
    },
    // 获取图形验证码
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:10086/captcha?time=' + new Date()
    }
  },
  computed: {
    JudgePhone () {
      if (/^1\d{10}$/.test(this.phone)) {
        if (this.disabled) {
          return '#ccc'
        } else {
          return '#000'
        }
      }
    },
    // 当在成功正在获取验证码 并发生倒计时时改变color
    JudgePhoneOn () {
      return '#ccc'
    }
  },
  mounted () {
    this.$refs.captcha.src = 'http://localhost:10086/captcha?time=' + new Date()
  }
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
        color #2694d4
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #2694d4
            font-weight 700
            border-bottom 2px solid #2694d4

    .login_content
      > form
        > div
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
              border 1px solid #2694d4

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
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              cursor pointer
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #2694d4

              > .switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s

                &.right
                  transform translate(28px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
              color #2694d4

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #2074d4
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

      > .iconfont
        font-size 20px
        color #999
</style>
