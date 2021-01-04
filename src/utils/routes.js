import pump from "../views/real-time/pumpStationData.vue";
import mainCanal from "../views/real-time/mainCanal.vue";
import source from "../views/real-time/source.vue";
import video from "../views/real-time/video.vue";
import intake from "../views/real-time/intake.vue";
import dispatch from "../views/project/dispatch.vue";
import waterPlan from "../views/project/waterPlan.vue";
import dispatchCollection from "../views/project/dispatchCollection.vue";
import chargeRecords from "../views/project/chargeRecords.vue";
import userRecords from "../views/project/userRecords.vue";
import chargeTotal from "../views/project/chargeTotal.vue";
import reportForm from "../views/project/reportForm.vue";
import basic from "../views/manage/basic.vue";
import runtime from "../views/manage/runtime.vue";
import inspection from "../views/manage/inspection.vue";
import machine from "../views/manage/machine.vue";
import store from "../views/manage/store.vue";
import history from "../views/manage/history.vue";
import pumpBasic from "../views/system/pumpBasic.vue";
import journal from "../views/system/journal.vue";
import areainfo from "../views/system/areainfo.vue";
import farmer from "../views/system/farmer.vue";
import canal from "../views/system/canal.vue";
import config from "../views/system/config.vue";
import user from "../views/system/user.vue";
import nonExistent from "../views/404.vue";


let common = {
  path: "*",
  name: "nonExistent",
  component: nonExistent,
};
let originRoutes = [
  {
    path: "/real/pump",
    name: "pump",
    component: pump,
    meta: {
      menu_name: "泵站实时数据",
      icon: "",
    },
  },
  {
    path: "/real/mainCanal",
    name: "mainCanal",
    component: mainCanal,
    meta: {
      menu_name: "干渠实时数据",
      icon: "",
    },
  },
  {
    path: "/real/branch",
    name: "branch",
    component: intake,
    meta: {
      menu_name: "支渠实时数据",
      icon: "",
    },
  },
  {
    path: "/real/source",
    name: "source",
    component: source,
    meta: {
      menu_name: "取水口实时数据",
      icon: "",
    },
  },
  {
    path: "/real/video",
    name: "video",
    component: video,
    meta: {
      menu_name: "视频监控",
      icon: "",
    },
  },
  {
    path: "/project/dispatch",
    name: "dispatch",
    component: dispatch,
    meta: {
      menu_name: "配水调度",
      icon: "",
    },
  },
  {
    path: "/project/plan",
    name: "plan",
    component: waterPlan,
    meta: {
      menu_name: "用水计划",
      icon: "",
    },
  },
  {
    path: "/project/cost/collection",
    name: "collection",
    component: dispatchCollection,
    meta: {
      menu_name: "水费征收",
      icon: "",
    },
  },
  {
    path: "/project/cost/records",
    name: "records",
    component: chargeRecords,
    meta: {
      menu_name: "水费计收记录",
      icon: "",
    },
  },
  {
    path: "/project/cost/userrecords",
    name: "userrecords",
    component: userRecords,
    meta: {
      menu_name: "用水户用水记录",
      icon: "",
    },
  },
  {
    path: "/project/cost/total",
    name: "total",
    component: chargeTotal,
    meta: {
      menu_name: "水费统计",
      icon: "",
    },
  },
  {
    path: "/project/comprehensive/:type",
    name: "comprehensive",
    component: reportForm,
    meta: {
      menu_name: "综合报表",
      icon: "",
    },
  },
  {
    path: "/manage/basic",
    name: "basic",
    component: basic,
    meta: {
      menu_name: "基础信息",
      icon: "",
    },
  },
  {
    path: "/manage/runtime",
    name: "runtime",
    component: runtime,
    meta: {
      menu_name: "运行管理",
      icon: "",
    },
  },
  {
    path: "/manage/standard/inspection",
    name: "inspection",
    component: inspection,
    meta: {
      menu_name: "巡检管理",
      icon: "",
    },
  },
  {
    path: "/manage/standard/machine",
    name: "machine",
    component: machine,
    meta: {
      menu_name: "设备二维码",
      icon: "",
    },
  },
  {
    path: "/manage/standard/store",
    name: "store",
    component: store,
    meta: {
      menu_name: "出入库管理",
      icon: "",
    },
  },
  {
    path: "/manage/history",
    name: "history",
    component: history,
    meta: {
      menu_name: "历史数据",
      icon: "",
    },
  },
  {
    path: "/setting/pumpinfo",
    name: "pumpBasic",
    component: pumpBasic,
    meta: {
      menu_name: "泵站基础信息",
      icon: "",
    },
  },
  {
    path: "/setting/journal",
    name: "journal",
    component: journal,
    meta: {
      menu_name: "操作日志",
      icon: "",
    },
  },
  {
    path: "/setting/areainfo",
    name: "areainfo",
    component: areainfo,
    meta: {
      menu_name: "灌区基础信息",
      icon: "",
    },
  },
  {
    path: "/setting/farmer",
    name: "farmer",
    component: farmer,
    meta: {
      menu_name: "农户管理",
      icon: "",
    },
  },
  {
    path: "/setting/canal",
    name: "canal",
    component: canal,
    meta: {
      menu_name: "渠系管理",
      icon: "",
    },
  },
  {
    path: "/setting/config",
    name: "config",
    component: config,
    meta: {
      menu_name: "系统运行参数",
      icon: "",
    },
  },
  {
    path: "/setting/user",
    name: "user",
    component: user,
    meta: {
      menu_name: "用户管理",
      icon: "",
    },
  },
];
let menus = [
  {
    text: "首页",
    name: "Home",
    icon: "icon-index",
  },
  {
    text: "GIS一张图",
    name: "Gis",
    icon: "icon-GIS",
  },
  {
    text: "实时数据",
    icon: "icon-shishishuju",
    children: [
      {
        text: "干渠实时数据",
        name: "mainCanal",
      },
      {
        text: "支渠实时数据",
        name: "branch",
      },
      {
        text: "泵站实时数据",
        name: "pump",
      },
      {
        text: "取水口实时数据",
        name: "source",
      },
      {
        text: "视频监控",
        name: "video",
      },
    ],
  },
  {
    text: "业务应用",
    icon: "icon-yewu",
    children: [
      {
        text: "用水计划",
        name: "plan",
      },
      {
        text: "配水调度",
        name: "dispatch",
      },
      {
        text: "水费计收",
        children: [
          {
            text: "水费征收",
            name: "collection",
          },
          {
            text: "水费计收记录",
            name: "records",
          },
          {
            text: "用水户用水记录",
            name: "userrecords",
          },
          {
            text: "水费统计",
            name: "total",
          },
        ],
      },
      {
        text: "入渠备案",
        name: "record",
      },
      {
        text: "综合报表",
        router: "/project/comprehensive",
        children: [
          {
            text: "用水计划执行对照表",
            router: "/project/comprehensive/implement",
          },
          {
            text: "泵站指标完成情况统计表",
            router: "/project/comprehensive/complete",
          },
          {
            text: "进水流量统计表",
            router: "/project/comprehensive/inlet",
          },
          {
            text: "泵站提水量表",
            router: "/project/comprehensive/extraction",
          },
          {
            text: "干渠利用率日报表",
            router: "/project/comprehensive/utilization ",
          },
          {
            text: "售水情况日报表",
            router: "/project/comprehensive/sale",
          },
          {
            text: "售水进度日报表",
            router: "/project/comprehensive/saleprogress",
          },
          {
            text: "用水计划对照表",
            router: "/project/comprehensive/compare",
          },
          {
            text: "农户用水情况表",
            router: "/project/comprehensive/peasant",
          },
        ],
      },
    ],
  },
  {
    text: "泵站管理",
    icon: "icon-bengzhan",
    children: [
      {
        text: "基础信息",
        name: "basic",
      },
      {
        text: "运行管理",
        name: "runtime",
      },
      {
        text: "历史数据",
        name: "history",
      },
      {
        text: "标准化体系",
        children: [
          {
            text: "巡检管理",
            name: "inspection",
          },
          {
            text: "设备二维码",
            name: "machine",
          },
          {
            text: "出入库管理",
            name: "store",
          },
        ],
      },
    ],
  },
  {
    text: "系统设置",
    icon: "icon-shezhi",
    children: [
      {
        text: "系统运行参数",
        name: "config",
      },
      {
        text: "灌区基础信息",
        name: "areainfo",
      },
      {
        text: "泵站基础信息",
        name: "pumpinfo",
      },
      {
        text: "农户管理",
        name: "farmer",
      },
      {
        text: "用户管理",
        name: "user",
      },
      {
        text: "渠系管理",
        name: "canal",
      },
      {
        text: "权限配置",
        name: "jurisdiction",
      },
      {
        text: "操作日志",
        name: "journal",
      },
    ],
  },
];

export {
  common,
  originRoutes,
  menus,
  pump,
  mainCanal,
  source,
  video,
  intake,
  dispatch,
  waterPlan,
  dispatchCollection,
  chargeRecords,
  userRecords,
  chargeTotal,
  reportForm,
  basic,
  runtime,
  inspection,
  machine,
  store,
  history,
  pumpBasic,
  journal,
  areainfo,
  farmer,
  canal,
  config,
  user,
  nonExistent,
};
