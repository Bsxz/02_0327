<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-Remove" v-if="food.count" @click.stop="updataFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{ food.count }}</div>
    <div class="iconfont icon-24gf-plusCircle" @click.stop="updataFoodCount(true)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Cartcontrol',
  props: {
    food: Object
  },
  methods: {
    updataFoodCount (isAdd) {
      this.$store.dispatch('updataFoodCount', {isAdd, food: this.food})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/mixins.styl"
.cartcontrol
  font-size: 0
  .cart-decrease
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)

  .icon-Remove
    display: inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $blue
    &.move-enter-active,&.move-leave-active
      transition all .3s
    &.move-enter,&.move-leave-to
      opacity 0
      transform translateX(20px) rotate(360deg)
  .cart-count
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)

  .icon-24gf-plusCircle
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color $blue
</style>
