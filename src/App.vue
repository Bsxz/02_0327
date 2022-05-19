<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {FooterGuide},
  mounted () {
    // 防抖
    let timer = null
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // 异步获取address
      this.getAddress()
      // 异步获取用户cookie
      this.getUserinfo()
    }, 700)
  },
  methods: {
    ...mapActions(['getAddress', 'getUserinfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
  overflow-y auto
</style>
