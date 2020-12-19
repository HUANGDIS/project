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

var _Users = _interopRequireDefault(require("../components/Users.vue"));

var _Roles = _interopRequireDefault(require("../components/Roles.vue"));

var _Rights = _interopRequireDefault(require("../components/Rights.vue"));

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
    path: '/roless',
    name: 'Roles',
    component: _Roles["default"]
  }, {
    path: '/rights',
    name: 'Rights',
    component: _Rights["default"]
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