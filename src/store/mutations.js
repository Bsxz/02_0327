import Vue from 'vue'
/*  vuex的mutations模块  */
import {
  CLEAR_CART,
  INCREMENT_FOOD_COUNT,
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
<<<<<<< HEAD
  RECEIVE_SEARCH_SHOPS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECREMENT_FOOD_COUNT,
  RESTE_USER
=======
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  RECREMENT_FOOD_COUNT,
  CLEAR_CART
>>>>>>> d8106d107152237645cc0fb3c18a8875eea6f9cf
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESTE_USER] (state) {
    state.userInfo = {}
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if (!food.count) {
      // food.count = 1  // 没有数据代理
      Vue.set(food, 'count', 1)
      state.foodcart.push(food)
    } else {
      food.count++
    }
  },
  [RECREMENT_FOOD_COUNT] (state, {food}) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.foodcart.splice(state.foodcart.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    // eslint-disable-next-line no-return-assign
    state.foodcart.forEach(food => food.count = 0)
    state.foodcart = []
<<<<<<< HEAD
  },
  [RECEIVE_SEARCH_SHOPS] (state, {searchShops}) {
    state.searchShops = searchShops
=======
>>>>>>> d8106d107152237645cc0fb3c18a8875eea6f9cf
  }
}
