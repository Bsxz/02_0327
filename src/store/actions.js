/*  vuex的actions模块  */

import {reqAddress, reqCategorys, reqShops, reqUser, reqLogout, reqShopInfo, reqShopGoods, reqShopRatings} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESTE_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  RECREMENT_FOOD_COUNT,
  CLEAR_CART
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
  async getShopInfo ({commit}, cb) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
      cb && cb()
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
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
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
  }
}
