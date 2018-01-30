import Vue from 'vue'
import FastClick from 'fastclick'
import router from "./router/index"
import App from './App'
import Home from './components/home'
import Register from './components/register'

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
