import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import './assets/css/normalize.css'
import '../node_modules/nprogress/nprogress.css'
import "./assets/css/iconfont.css"
import './vantui.js'
import  './filters/filters.js'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

new Vue({
  store,
  router,
  render: h => h(App) 
}).$mount('#app')