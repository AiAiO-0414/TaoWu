import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import './assets/css/normalize.css'
import './vantui.js'

new Vue({
  store,
  router,
  render: h => h(App) 
}).$mount('#app')