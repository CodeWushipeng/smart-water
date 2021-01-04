"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "pump", {
  enumerable: true,
  get: function get() {
    return _pumpStationData["default"];
  }
});
Object.defineProperty(exports, "mainCanal", {
  enumerable: true,
  get: function get() {
    return _mainCanal["default"];
  }
});
Object.defineProperty(exports, "source", {
  enumerable: true,
  get: function get() {
    return _source["default"];
  }
});
Object.defineProperty(exports, "video", {
  enumerable: true,
  get: function get() {
    return _video["default"];
  }
});
Object.defineProperty(exports, "intake", {
  enumerable: true,
  get: function get() {
    return _intake["default"];
  }
});
Object.defineProperty(exports, "dispatch", {
  enumerable: true,
  get: function get() {
    return _dispatch["default"];
  }
});
Object.defineProperty(exports, "waterPlan", {
  enumerable: true,
  get: function get() {
    return _waterPlan["default"];
  }
});
Object.defineProperty(exports, "dispatchCollection", {
  enumerable: true,
  get: function get() {
    return _dispatchCollection["default"];
  }
});
Object.defineProperty(exports, "chargeRecords", {
  enumerable: true,
  get: function get() {
    return _chargeRecords["default"];
  }
});
Object.defineProperty(exports, "userRecords", {
  enumerable: true,
  get: function get() {
    return _userRecords["default"];
  }
});
Object.defineProperty(exports, "chargeTotal", {
  enumerable: true,
  get: function get() {
    return _chargeTotal["default"];
  }
});
Object.defineProperty(exports, "reportForm", {
  enumerable: true,
  get: function get() {
    return _reportForm["default"];
  }
});
Object.defineProperty(exports, "basic", {
  enumerable: true,
  get: function get() {
    return _basic["default"];
  }
});
Object.defineProperty(exports, "runtime", {
  enumerable: true,
  get: function get() {
    return _runtime["default"];
  }
});
Object.defineProperty(exports, "inspection", {
  enumerable: true,
  get: function get() {
    return _inspection["default"];
  }
});
Object.defineProperty(exports, "machine", {
  enumerable: true,
  get: function get() {
    return _machine["default"];
  }
});
Object.defineProperty(exports, "store", {
  enumerable: true,
  get: function get() {
    return _store["default"];
  }
});
Object.defineProperty(exports, "history", {
  enumerable: true,
  get: function get() {
    return _history["default"];
  }
});
Object.defineProperty(exports, "pumpBasic", {
  enumerable: true,
  get: function get() {
    return _pumpBasic["default"];
  }
});
Object.defineProperty(exports, "journal", {
  enumerable: true,
  get: function get() {
    return _journal["default"];
  }
});
Object.defineProperty(exports, "areainfo", {
  enumerable: true,
  get: function get() {
    return _areainfo["default"];
  }
});
Object.defineProperty(exports, "farmer", {
  enumerable: true,
  get: function get() {
    return _farmer["default"];
  }
});
Object.defineProperty(exports, "canal", {
  enumerable: true,
  get: function get() {
    return _canal["default"];
  }
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function get() {
    return _config["default"];
  }
});
Object.defineProperty(exports, "user", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
Object.defineProperty(exports, "nonExistent", {
  enumerable: true,
  get: function get() {
    return _["default"];
  }
});
exports.menus = exports.originRoutes = exports.common = void 0;

var _pumpStationData = _interopRequireDefault(require("../views/real-time/pumpStationData.vue"));

var _mainCanal = _interopRequireDefault(require("../views/real-time/mainCanal.vue"));

var _source = _interopRequireDefault(require("../views/real-time/source.vue"));

var _video = _interopRequireDefault(require("../views/real-time/video.vue"));

var _intake = _interopRequireDefault(require("../views/real-time/intake.vue"));

var _dispatch = _interopRequireDefault(require("../views/project/dispatch.vue"));

var _waterPlan = _interopRequireDefault(require("../views/project/waterPlan.vue"));

var _dispatchCollection = _interopRequireDefault(require("../views/project/dispatchCollection.vue"));

var _chargeRecords = _interopRequireDefault(require("../views/project/chargeRecords.vue"));

var _userRecords = _interopRequireDefault(require("../views/project/userRecords.vue"));

var _chargeTotal = _interopRequireDefault(require("../views/project/chargeTotal.vue"));

var _reportForm = _interopRequireDefault(require("../views/project/reportForm.vue"));

var _basic = _interopRequireDefault(require("../views/manage/basic.vue"));

var _runtime = _interopRequireDefault(require("../views/manage/runtime.vue"));

var _inspection = _interopRequireDefault(require("../views/manage/inspection.vue"));

var _machine = _interopRequireDefault(require("../views/manage/machine.vue"));

var _store = _interopRequireDefault(require("../views/manage/store.vue"));

var _history = _interopRequireDefault(require("../views/manage/history.vue"));

var _pumpBasic = _interopRequireDefault(require("../views/system/pumpBasic.vue"));

var _journal = _interopRequireDefault(require("../views/system/journal.vue"));

var _areainfo = _interopRequireDefault(require("../views/system/areainfo.vue"));

var _farmer = _interopRequireDefault(require("../views/system/farmer.vue"));

var _canal = _interopRequireDefault(require("../views/system/canal.vue"));

var _config = _interopRequireDefault(require("../views/system/config.vue"));

var _user = _interopRequireDefault(require("../views/system/user.vue"));

var _ = _interopRequireDefault(require("../views/404.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var common = {
  path: "*",
  name: "nonExistent",
  component: _["default"]
};
exports.common = common;
var originRoutes = [{
  path: "/real/pump",
  name: "pump",
  component: _pumpStationData["default"],
  meta: {
    menu_name: "泵站实时数据",
    icon: ""
  }
}, {
  path: "/real/mainCanal",
  name: "mainCanal",
  component: _mainCanal["default"],
  meta: {
    menu_name: "干渠实时数据",
    icon: ""
  }
}, {
  path: "/real/branch",
  name: "branch",
  component: _intake["default"],
  meta: {
    menu_name: "支渠实时数据",
    icon: ""
  }
}, {
  path: "/real/source",
  name: "source",
  component: _source["default"],
  meta: {
    menu_name: "取水口实时数据",
    icon: ""
  }
}, {
  path: "/real/video",
  name: "video",
  component: _video["default"],
  meta: {
    menu_name: "视频监控",
    icon: ""
  }
}, {
  path: "/project/dispatch",
  name: "dispatch",
  component: _dispatch["default"],
  meta: {
    menu_name: "配水调度",
    icon: ""
  }
}, {
  path: "/project/plan",
  name: "plan",
  component: _waterPlan["default"],
  meta: {
    menu_name: "用水计划",
    icon: ""
  }
}, {
  path: "/project/cost/collection",
  name: "collection",
  component: _dispatchCollection["default"],
  meta: {
    menu_name: "水费征收",
    icon: ""
  }
}, {
  path: "/project/cost/records",
  name: "records",
  component: _chargeRecords["default"],
  meta: {
    menu_name: "水费计收记录",
    icon: ""
  }
}, {
  path: "/project/cost/userrecords",
  name: "userrecords",
  component: _userRecords["default"],
  meta: {
    menu_name: "用水户用水记录",
    icon: ""
  }
}, {
  path: "/project/cost/total",
  name: "total",
  component: _chargeTotal["default"],
  meta: {
    menu_name: "水费统计",
    icon: ""
  }
}, {
  path: "/project/comprehensive/:type",
  name: "comprehensive",
  component: _reportForm["default"],
  meta: {
    menu_name: "综合报表",
    icon: ""
  }
}, {
  path: "/manage/basic",
  name: "basic",
  component: _basic["default"],
  meta: {
    menu_name: "基础信息",
    icon: ""
  }
}, {
  path: "/manage/runtime",
  name: "runtime",
  component: _runtime["default"],
  meta: {
    menu_name: "运行管理",
    icon: ""
  }
}, {
  path: "/manage/standard/inspection",
  name: "inspection",
  component: _inspection["default"],
  meta: {
    menu_name: "巡检管理",
    icon: ""
  }
}, {
  path: "/manage/standard/machine",
  name: "machine",
  component: _machine["default"],
  meta: {
    menu_name: "设备二维码",
    icon: ""
  }
}, {
  path: "/manage/standard/store",
  name: "store",
  component: _store["default"],
  meta: {
    menu_name: "出入库管理",
    icon: ""
  }
}, {
  path: "/manage/history",
  name: "history",
  component: _history["default"],
  meta: {
    menu_name: "历史数据",
    icon: ""
  }
}, {
  path: "/setting/pumpinfo",
  name: "pumpBasic",
  component: _pumpBasic["default"],
  meta: {
    menu_name: "泵站基础信息",
    icon: ""
  }
}, {
  path: "/setting/journal",
  name: "journal",
  component: _journal["default"],
  meta: {
    menu_name: "操作日志",
    icon: ""
  }
}, {
  path: "/setting/areainfo",
  name: "areainfo",
  component: _areainfo["default"],
  meta: {
    menu_name: "灌区基础信息",
    icon: ""
  }
}, {
  path: "/setting/farmer",
  name: "farmer",
  component: _farmer["default"],
  meta: {
    menu_name: "农户管理",
    icon: ""
  }
}, {
  path: "/setting/canal",
  name: "canal",
  component: _canal["default"],
  meta: {
    menu_name: "渠系管理",
    icon: ""
  }
}, {
  path: "/setting/config",
  name: "config",
  component: _config["default"],
  meta: {
    menu_name: "系统运行参数",
    icon: ""
  }
}, {
  path: "/setting/user",
  name: "user",
  component: _user["default"],
  meta: {
    menu_name: "用户管理",
    icon: ""
  }
}];
exports.originRoutes = originRoutes;
var menus = [{
  text: "首页",
  name: "Home",
  icon: "icon-index"
}, {
  text: "GIS一张图",
  name: "Gis",
  icon: "icon-GIS"
}, {
  text: "实时数据",
  icon: "icon-shishishuju",
  children: [{
    text: "干渠实时数据",
    name: "mainCanal"
  }, {
    text: "支渠实时数据",
    name: "branch"
  }, {
    text: "泵站实时数据",
    name: "pump"
  }, {
    text: "取水口实时数据",
    name: "source"
  }, {
    text: "视频监控",
    name: "video"
  }]
}, {
  text: "业务应用",
  icon: "icon-yewu",
  children: [{
    text: "用水计划",
    name: "plan"
  }, {
    text: "配水调度",
    name: "dispatch"
  }, {
    text: "水费计收",
    children: [{
      text: "水费征收",
      name: "collection"
    }, {
      text: "水费计收记录",
      name: "records"
    }, {
      text: "用水户用水记录",
      name: "userrecords"
    }, {
      text: "水费统计",
      name: "total"
    }]
  }, {
    text: "入渠备案",
    name: "record"
  }, {
    text: "综合报表",
    router: "/project/comprehensive",
    children: [{
      text: "用水计划执行对照表",
      router: "/project/comprehensive/implement"
    }, {
      text: "泵站指标完成情况统计表",
      router: "/project/comprehensive/complete"
    }, {
      text: "进水流量统计表",
      router: "/project/comprehensive/inlet"
    }, {
      text: "泵站提水量表",
      router: "/project/comprehensive/extraction"
    }, {
      text: "干渠利用率日报表",
      router: "/project/comprehensive/utilization "
    }, {
      text: "售水情况日报表",
      router: "/project/comprehensive/sale"
    }, {
      text: "售水进度日报表",
      router: "/project/comprehensive/saleprogress"
    }, {
      text: "用水计划对照表",
      router: "/project/comprehensive/compare"
    }, {
      text: "农户用水情况表",
      router: "/project/comprehensive/peasant"
    }]
  }]
}, {
  text: "泵站管理",
  icon: "icon-bengzhan",
  children: [{
    text: "基础信息",
    name: "basic"
  }, {
    text: "运行管理",
    name: "runtime"
  }, {
    text: "历史数据",
    name: "history"
  }, {
    text: "标准化体系",
    children: [{
      text: "巡检管理",
      name: "inspection"
    }, {
      text: "设备二维码",
      name: "machine"
    }, {
      text: "出入库管理",
      name: "store"
    }]
  }]
}, {
  text: "系统设置",
  icon: "icon-shezhi",
  children: [{
    text: "系统运行参数",
    name: "config"
  }, {
    text: "灌区基础信息",
    name: "areainfo"
  }, {
    text: "泵站基础信息",
    name: "pumpinfo"
  }, {
    text: "农户管理",
    name: "farmer"
  }, {
    text: "用户管理",
    name: "user"
  }, {
    text: "渠系管理",
    name: "canal"
  }, {
    text: "权限配置",
    name: "jurisdiction"
  }, {
    text: "操作日志",
    name: "journal"
  }]
}];
exports.menus = menus;