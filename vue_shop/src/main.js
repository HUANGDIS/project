import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

//导入全局样式
import './assets/css/init.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import less from 'less'
axios.defaults.baseURL = 'http://119.23.53.78:8888/api/private/v1'
Vue.use(less)
Vue.prototype.$http = axios

axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
