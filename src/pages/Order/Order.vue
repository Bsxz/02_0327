<template>
  <section class="order">
    <header-top class="header" title="订单列表">
      <a class="header_title">
        <span class="header_title_text"></span>
      </a>
    </header-top>
                                          <!--  用户登入之后不显示  -->
    <section class="order_no_login" v-if="!userInfo._id">
      <img src="./images/person.png">
      <h3>登录后查看外卖订单</h3>
      <router-link to="/login">
        <button class="btn">立即登陆</button>
      </router-link>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {mapState} from 'vuex'

export default {
  name: 'Order',
  components: {
    HeaderTop
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.order //订单
  width 100%

  .order_no_login
    padding-top 140px
    width 60%
    margin 0 auto
    text-align center

    > img
      display block
      width 100%
      height 30%

    > h3
      padding 10px 0
      font-size 17px
      color #6a6a6a

    .btn
      display inline-block
      background #2694d4
      font-size 14px
      color #fff
      border 0
      outline none
      border-radius 5px
      padding 10px 20px
</style>
