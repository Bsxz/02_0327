<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item"
              v-for="(item,index) in goods"
              :key="index"
              :class="{current: index===currentIndex}"
              @click="clickMeunItem(index)">
            <span class="text bottom-border-1px">
            <img v-if="item.icon" v-lazy="item.icon" class="icon">
            {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook"
              v-for="(item,index) in goods"
              :key="index">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li class="food-item bottom-border-1px"
                  v-for="(food,index) in goods[index].foods"
                  :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       v-lazy="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售 {{ food.sellCount }} 份</span>
                    <span>好评率 {{ food.rating }}%</span></div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart :shopcart="foodcart"/>
    </div>
    <transition name="food">
      <food :food="food" ref="food"/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import BetterScroll from 'better-scroll'
import Cartcontrol from './Cartcontrol/Cartcontrol'
import Food from '../../../components/Food/Food'
import ShopCart from '../../../components/ShopCart/ShopCart'

export default {
  name: 'ShopGoods',
  data () {
    return {
      scrollY: 0, // 右侧滑动的Y轴坐标（滑动实时发生变化）
      tops: [], // 所有右侧分类li的top组成的数值（列表第一次显示之后不再发生变化）
      food: {}
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods', () => {
      if (this.goods) {
        this.$nextTick(() => { // 列表数据更新显示之后执行
          this._initScroll()
          this._initTops()
        })
      }
    })
  },
  computed: {
    ...mapState(['goods', 'foodcart']),
    // 计算分类的数组下标
    currentIndex () {
      // 得到条件数据
      const {scrollY, tops} = this
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1]
      })
      // 返回结果
      return index
    }
  },
  methods: {
    // 初始化滚动
    _initScroll () {
      // 列表渲染之后创建
      this.menuScroll = new BetterScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BetterScroll('.foods-wrapper', {
        probeType: 2,
        click: true
      })

      this.menuScroll.on('scroll', ({y}) => {
        this.scrollY = Math.abs(y)
      })
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on('scroll', ({y}) => {
        this.scrollY = Math.abs(y)
      })
      // 给右侧列表绑定scroll结束的监听
      this.foodsScroll.on('scrollEnd', ({y}) => {
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化tops
    _initTops () {
      // 初始化tops
      const tops = []
      let top = 0
      tops.push(top)
      // 收集
      const lis = this.$refs.foodsUl.children
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      // 更新数据
      this.tops = tops
    },
    clickMeunItem (index) {
      // 得到滚动目标坐标
      const top = this.tops[index]
      // 更新目标 scrollY 值
      this.scrollY = top
      // 平滑滚动到指定位置
      this.foodsScroll.scrollTo(0, -top, 300)
    },
    showFood (food) {
      this.food = food
      this.$refs.food.toggleShow()
    }
  },
  components: {Cartcontrol, Food, ShopCart}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow: hidden

  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7

    .menu-item
      display: table
      height: 80px
      width: 56px
      padding: 0 12px
      line-height: 14px

      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: $blue
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
      margin: 18px
      padding-bottom: 18px
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

        .extra, .count
          margin-right: 12px

        .price
          font-weight: 700
          line-height: 24px
          margin-top 5px

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

    &.food-enter-active, &.food-leave-active
      opacity 2
      transition all .5s

    &.food-enter, &.food-leave-to
      opacity 0
</style>
