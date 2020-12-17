import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

//导入全局样式
import './assets/css/init.css'
import less from 'less'
axios.defaults.baseURL = 'http://119.23.53.78:8888/api/private/v1'
Vue.use(less)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
