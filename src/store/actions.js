/*  vuex的actions模块  */

import {
  reqAddress,
  reqCategorys,
  reqLogout,
  reqSearchGoods,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqShops,
  reqUser
} from '../api'
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
  //  1.异步获取地址
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  //  2.异步获取分类列表
  async getCategorys ({commit}) {
    const result = await reqCategorys()
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },
  //  3.异步获取商家列表
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    commit(RECEIVE_SHOPS, {shops: result.data})
  },
  // 4.同步请求 将用户名存入
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 5.异步获取用户信息
  async getUserinfo ({commit}) {
    const result = await reqUser()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 6.异步请求用户退出登入
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESTE_USER)
    }
  },
  // 7.异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
  // 8.异步获取商家商品评价数组
  async getShopRatings ({commit}, cb) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      cb && cb()
    }
  },
  // 9.异步获取商家商品数组
  async getShopGoods ({commit}, cb) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新了, 通知一下组件
      cb && cb()
    }
  },
  // 10.同步更新foodcount的数据
  updataFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(RECREMENT_FOOD_COUNT, {food})
    }
  },
  // 11.同步更新清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
<<<<<<< HEAD
  },
  // 12.同步获取关键字信息
  async searchShop ({commit, state}, keyword) {
    const {latitude, longitude} = state
    const geohash = latitude + ',' + longitude
    const result = await reqSearchGoods(geohash, keyword)
    if (result.code === 0) {
      commit(RECEIVE_SEARCH_SHOPS, {searchShops: result.data})
    }
=======
>>>>>>> d8106d107152237645cc0fb3c18a8875eea6f9cf
  }
}
