import Vue from 'vue'
import VueRouter from 'vue-router'

import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
// import Msite from '../pages/Msite/Msite'
// import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
// import ShopRatings from '../pages/Shop/ShopGoods/ShopRatings'
// import ShopInfo from '../pages/Shop/ShopGoods/ShopInfo'
const Msite = () => import('../pages/Msite/Msite')
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods')
const ShopRatings = () => import('../pages/Shop/ShopGoods/ShopRatings')
const ShopInfo = () => import('../pages/Shop/ShopGoods/ShopInfo')
// const Search = () => import('../pages/Search/Search')
// const Order = () => import('../pages/Order/Order')
// const Profile = () => import('../pages/Profile/Profile')
// const Login = () => import('../pages/Login/Login')
// const Shop = () => import('../pages/Shop/Shop')
// import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
// import ShopInfo from '../pages/Shop/ShopGoods/ShopInfo'
// import ShopRatings from '../pages/Shop/ShopGoods/ShopRatings'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/Search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/Order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/Profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
