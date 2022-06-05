<template>
  <section class="msite">
    <header-top :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <span class="iconfont icon-sousuo"></span>
      </router-link>
      <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="header_login" slot="right">
        <span class="header_login_text" v-if="!userInfo._id">
          登入|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-geren1"></i>
        </span>
      </router-link>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cs,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c,index2) in cs" :key="index2">
              <div class="food_container">
                <img v-lazy="imgBaseUrl+c.image_url">
              </div>
              <span>{{ c.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list/>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'

export default {
  name: 'Msite',
  data () {
    return {
      imgBaseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mapState,
  mounted () {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
    // 创建swiper实例对象，来实现轮播
    /* eslint-disable no-new */
    // new Swiper('.swiper-container', {
    //   // 可以循环轮播
    //   loop: true,
    //   // 如果需要分页器
    //   pagination: {
    //     el: '.swiper-pagination'
    //   }
    // })
  },
  computed: {
    ...mapState(['address', 'categorys', 'userInfo']),
    categorysArr () {
      const max = 8
      const arr = []
      const {categorys} = this
      let smallArr = []
      categorys.forEach((c, index) => {
        if (smallArr.length === 0) {
          arr.push(smallArr)
        }
        smallArr.push(c)
        if (smallArr.length === max) {
          smallArr = []
        }
      })
      return arr
    }
  },
  watch: {
    categorys (value) {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true
        })
      })
    }
  },
  components: {
    HeaderTop, ShopList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.msite //首页
  width 100%

  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff

    .swiper-container
      width 100%
      height 100%

      .swiper-wrapper
        width 100%
        height 100%

        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap

          .link_to_food
            width 25%

            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0

              img
                display inline-block
                width 50px
                height 50px

            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666

      .swiper-pagination
        > span.swiper-pagination-bullet-active
          background #2694d4

</style>
