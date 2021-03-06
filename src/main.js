// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'
import 'mockjs'
import './mock/mockServer'
import loading from '../src/common/imgs/loading.gif'
import './filters'

Vue.config.productionTip = false
Vue.component(Button.name, Button)

Vue.use(VueLazyload, {
  loading
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
