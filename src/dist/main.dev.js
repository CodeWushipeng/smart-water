"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _index = _interopRequireDefault(require("./store/index"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

var _echarts = _interopRequireDefault(require("echarts/lib/echarts"));

var _index3 = _interopRequireDefault(require("./components/smTree/index"));

var _index4 = _interopRequireDefault(require("./components/empty/index"));

var _index5 = _interopRequireDefault(require("./components/table/index"));

var _request = _interopRequireDefault(require("./utils/request"));

require("echarts/lib/chart/line");

require("echarts/lib/chart/bar");

require("echarts/lib/chart/pie");

require("echarts/lib/chart/funnel");

require("echarts/lib/component/title");

require("echarts/lib/component/legend");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/dataZoom");

require("echarts/lib/component/toolbox");

require("echarts/lib/component/markLine");

require("echarts/lib/component/markPoint");

require("zrender/lib/svg/svg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 按需引入类型
// 折线图
// 柱形图
// 饼状图
// 地理图
// 按需引入配置功能组件
// 引入 SVG 渲染器模块
_vue["default"].prototype.$echarts = _echarts["default"];
_vue["default"].prototype.axios = _request["default"];
_vue["default"].config.productionTip = false;

_vue["default"].use(_elementUi["default"]);

_vue["default"].use(_index3["default"]);

_vue["default"].use(_index4["default"]);

_vue["default"].use(_index5["default"]);

new _vue["default"]({
  router: _router["default"],
  store: _index["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');