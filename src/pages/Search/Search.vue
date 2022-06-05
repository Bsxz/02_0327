<template>
  <section class="search">
    <header-top class="header" title="搜索">
      <a class="header_title">
        <span class="header_title_text"></span>
      </a>
    </header-top>
    <form class="search_form" @submit.prevent="search">
      <input v-model="keyword" class="search_input" name="search" placeholder="请输入商家或美食名称" type="search">
      <input type="submit" name="submit" class="search_submit">
    </form>
    <section v-if="!noSearch" class="list">
      <ul class="list_container">
        <router-link v-for="(item,index) in searchShops" :key="index" :to="{path: '/shop',query:{id:item.id}}"
                     class="list_li" tag="li">
          <section class="item_left">
            <img
              v-lazy="imgBaseUrl + item.image_path"
              class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.name }}</span>
              </p>
              <p>月售 {{ item.rating_count }} 单</p>
              <p>{{ item.float_minimum_order_amount }} 元起送 / 距离 {{ item.distance }} 公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div v-else class="search_none">很抱歉！无搜索结果</div>
  </section>
</template>

<script type="text/ecmascript-6">
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {mapState} from 'vuex'

export default {
  name: 'Search',
  data () {
    return {
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      keyword: '',
      noSearch: false
    }
  },
  components: {
    HeaderTop
  },
  computed: {
    ...mapState(['searchShops'])
  },
  methods: {
    search () {
      const keyword = this.keyword.trim()
      if (keyword) {
        this.$store.dispatch('searchShop', keyword)
      }
    }
  },
  watch: {
    searchShops (value) {
      if (!value.length) {
        this.noSearch = true
      } else {
        this.noSearch = false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.search //搜索
  width 100%

  .search_form
    clearFix()
    margin-top 55px
    background-color #fff
    padding 12px 8px

    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none

      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2

      &.search_submit
        float right
        width 18%
        border 4px solid #2694d4
        font-size 16px
        color #fff
        background-color #2694d4

  .list
    .list_container
      background-color #fff

      .list_li
        display flex
        justify-content center
        padding 10px
        border-bottom 1px solid $bc

        .item_left
          margin-right 10px

          .restaurant_img
            width 50 p
            height 50px
            display bloc

        .item_right
          font-size 12px
          flex 1

          .item_right_text
            p
              line-height 12px
              margin-bottom 6px

              &:last-child
                margin-bottom

  .search_none
    margin 0 auto
    color #333
    background-color #fff
    text-align center
    margin-top 0.125 re
</style>
