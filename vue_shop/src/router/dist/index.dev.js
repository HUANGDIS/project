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
  name: 'Login',
  component: _Login["default"]
}, {
  path: '/login',
  name: 'Login',
  component: _Login["default"]
}, {
  path: '/home',
  name: 'Home',
  component: _Home["default"]
}, {
  path: '/about',
  name: 'About',
  component: _About["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;