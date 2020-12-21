"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../components/Home.vue"));

var _Login = _interopRequireDefault(require("../components/Login.vue"));

var _About = _interopRequireDefault(require("../components/About.vue"));

var _Welcome = _interopRequireDefault(require("../components/Welcome.vue"));

var _Users = _interopRequireDefault(require("../components/user/Users.vue"));

var _Roles = _interopRequireDefault(require("../components/power/Roles.vue"));

var _Rights = _interopRequireDefault(require("../components/power/Rights.vue"));

var _Goods = _interopRequireDefault(require("../components/goods/Goods.vue"));

var _Params = _interopRequireDefault(require("../components/goods/Params.vue"));

var _Categories = _interopRequireDefault(require("../components/goods/Categories.vue"));

var _Orders = _interopRequireDefault(require("../components/order/Orders.vue"));

var _Reports = _interopRequireDefault(require("../components/report/Reports.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

var routes = [{
  path: '/',
  // 路由重定向
  redirect: '/login'
}, {
  path: '/login',
  name: 'Login',
  component: _Login["default"]
}, {
  path: '/home',
  name: 'Home',
  component: _Home["default"],
  redirect: '/welcome',
  children: [{
    path: '/welcome',
    name: 'Welcome',
    component: _Welcome["default"]
  }, {
    path: '/users',
    name: 'Users',
    component: _Users["default"]
  }, {
    path: '/roles',
    name: 'Roles',
    component: _Roles["default"]
  }, {
    path: '/rights',
    name: 'Rights',
    component: _Rights["default"]
  }, {
    path: '/goods',
    name: 'Goods',
    component: _Goods["default"]
  }, {
    path: '/params',
    name: 'Params',
    component: _Params["default"]
  }, {
    path: '/categories',
    name: 'Categories',
    component: _Categories["default"]
  }, {
    path: '/orders',
    name: 'Orders',
    component: _Orders["default"]
  }, {
    path: '/reports',
    name: 'Reports',
    component: _Reports["default"]
  }]
}, {
  path: '/about',
  name: 'About',
  component: _About["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
router.beforeEach(function (to, from, next) {
  if (to.path === '/login') return next();
  var tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});
var _default = router;
exports["default"] = _default;