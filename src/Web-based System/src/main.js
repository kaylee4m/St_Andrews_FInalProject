import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'
import $http from '@/utils/http'

import router from './router/'
import store from './store/'

Vue.config.productionTip = false
Vue.prototype.$http = $http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
