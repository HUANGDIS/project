import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import About from '../components/About.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Roles from '../components/power/Roles.vue'
import Rights from '../components/power/Rights.vue'
import Goods from '../components/goods/Goods.vue'
import Add from '../components/goods/add.vue'
import Params from '../components/goods/Params.vue'
import Categories from '../components/goods/Categories.vue'
import Orders from '../components/order/Orders.vue'
import Reports from '../components/report/Reports.vue'

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    // 路由重定向
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome,
      },
      {
        path: '/users',
        name: 'Users',
        component: Users,
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles,
      },
      {
        path: '/rights',
        name: 'Rights',
        component: Rights,
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods,
      },
      {
        path: '/goods/add',
        name: 'Add',
        component: Add,
      },
      {
        path: '/params',
        name: 'Params',
        component: Params,
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Categories,
      },
      {
        path: '/orders',
        name: 'Orders',
        component: Orders,
      },
      {
        path: '/reports',
        name: 'Reports',
        component: Reports,
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
