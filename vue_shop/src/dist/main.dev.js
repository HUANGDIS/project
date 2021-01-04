"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

require("./plugins/element.js");

var _axios = _interopRequireDefault(require("axios"));

var _moment = _interopRequireDefault(require("moment"));

require("./assets/css/init.css");

var _vueTableWithTreeGrid = _interopRequireDefault(require("vue-table-with-tree-grid"));

require("./assets/fonts/iconfont.css");

var _less = _interopRequireDefault(require("less"));

var _echarts = _interopRequireDefault(require("echarts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].filter('dateformat', function (dataStr) {
  var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm:ss';
  return (0, _moment["default"])(dataStr).format(pattern);
}); //导入全局样式


//引入echarts
_vue["default"].prototype.$echarts = _echarts["default"]; //引入组件

_axios["default"].defaults.baseURL = 'http://119.23.53.78:8888/api/private/v1';

_vue["default"].use(_less["default"]);

_vue["default"].prototype.$http = _axios["default"];

_vue["default"].component('tree-table', _vueTableWithTreeGrid["default"]);

_axios["default"].interceptors.request.use(function (config) {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');