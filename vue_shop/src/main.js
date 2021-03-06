import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

import moment from "moment"
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})
//导入全局样式
import './assets/css/init.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入字体图标
import './assets/fonts/iconfont.css'
import less from 'less'

import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件

axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
Vue.use(less)
Vue.prototype.$http = axios
Vue.component('tree-table', TreeTable)
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
