import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import request from '../utils/request';
import Login from '../views/Login.vue';
import Home from '../views/home';
import pump from '../views/real-time/pumpStationData.vue';
import mainCanal from '../views/real-time/mainCanal.vue';
import source from '../views/real-time/source.vue';
import video from '../views/real-time/video.vue';
import intake from '../views/real-time/intake.vue';
import dispatch from '../views/project/dispatch.vue';
import waterPlan from '../views/project/waterPlan.vue';
import dispatchCollection from '../views/project/dispatchCollection.vue';
import chargeRecords from '../views/project/chargeRecords.vue';
import userRecords from '../views/project/userRecords.vue';
import chargeTotal from '../views/project/chargeTotal.vue';
import reportForm from '../views/project/reportForm.vue';
import canalList from '../views/project/canalList.vue';
import chargeList from '../views/project/chargeList.vue';
import account from '../views/project/account.vue';
import basic from '../views/manage/basic.vue';
import runtime from '../views/manage/runtime.vue';
import inspection from '../views/manage/inspection.vue';
import machine from '../views/manage/machine.vue';
import manageStore from '../views/manage/store.vue';
import history from '../views/manage/history.vue';
import pumpBasic from '../views/system/pumpBasic.vue';
import crewManage from '../views/system/crewManage.vue';
import journal from '../views/system/journal.vue';
import areainfo from '../views/system/areainfo.vue';
import farmer from '../views/system/farmer.vue';
import canal from '../views/system/canal.vue';
import config from '../views/system/config.vue';
import user from '../views/system/user.vue';
import nonExistent from '../views/404.vue';
import massif from '../views/system/massif.vue';
import dataRuler from '../views/system/dataRuler.vue';
import department from '../views/manage/department.vue';
import jobs from '../views/manage/jobs.vue';
import crops from '../views/system/crops.vue';
import region from '../views/system/region.vue';
import canalRecord from '../views/canalRecord';
import setMenus from '../views/system/setMenus.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      menu_name: '登录',
      icon: '',
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      menu_name: '首页',
      icon: '',
    },
  },
  {
    path: '/gis',
    name: 'Gis',
    component: () => import('../views/Gis.vue'),
    meta: {
      menu_name: 'Gis图',
      icon: '',
    },
  },
];

let common = {
  path: '*',
  name: 'nonExistent',
  component: nonExistent,
};
let originRoutes = [
  {
    path: '/real/pump',
    name: 'pump',
    component: pump,
    meta: {
      menu_name: '泵站实时数据',
      icon: '',
    },
  },
  {
    path: '/real/mainCanal',
    name: 'mainCanal',
    component: mainCanal,
    meta: {
      menu_name: '干渠实时数据',
      icon: '',
    },
  },
  {
    path: '/real/branch',
    name: 'branch',
    component: intake,
    meta: {
      menu_name: '支渠实时数据',
      icon: '',
    },
  },
  {
    path: '/real/source',
    name: 'source',
    component: source,
    meta: {
      menu_name: '取水口实时数据',
      icon: '',
    },
  },
  {
    path: '/real/video',
    name: 'video',
    component: video,
    meta: {
      menu_name: '视频监控',
      icon: '',
    },
  },
  {
    path: '/project/dispatch',
    name: 'dispatch',
    component: dispatch,
    meta: {
      menu_name: '配水调度',
      icon: '',
    },
  },
  {
    path: '/project/plan',
    name: 'plan',
    component: waterPlan,
    meta: {
      menu_name: '用水计划',
      icon: '',
    },
  },
  {
    path: '/canal/canalList',
    name: 'canalList',
    component: canalList,
    meta: {
      menu_name: '渠系配水列表',
      icon: '',
    },
  },
  {
    path: '/canal/chargeList',
    name: 'chargeList',
    component: chargeList,
    meta: {
      menu_name: '负责人列表',
      icon: '',
    },
  },
  {
    path: '/project/cost/collection',
    name: 'collection',
    component: dispatchCollection,
    meta: {
      menu_name: '水费征收',
      icon: '',
    },
  },
  {
    path: '/project/cost/records',
    name: 'records',
    component: chargeRecords,
    meta: {
      menu_name: '水费计收记录',
      icon: '',
    },
  },
  {
    path: '/project/cost/userrecords',
    name: 'userrecords',
    component: userRecords,
    meta: {
      menu_name: '用水户用水记录',
      icon: '',
    },
  },
  {
    path: '/project/cost/total',
    name: 'total',
    component: chargeTotal,
    meta: {
      menu_name: '水费统计',
      icon: '',
    },
  },
  // {
  //   path: '/project/comprehensive/:type',
  //   name: 'comprehensive',
  //   component: reportForm,
  //   meta: {
  //     menu_name: '综合报表',
  //     icon: '',
  //   },
  // },
  {
    path: '/project/implement',
    name: 'implement',
    component: reportForm,
  },
  {
    path: '/project/complete',
    name: 'complete',
    component: reportForm,
  },
  {
    path: '/project/inlet',
    name: 'inlet',
    component: reportForm,
  },
  {
    path: '/project/extraction',
    name: 'extraction',
    component: reportForm,
  },
  {
    path: '/project/utilization',
    name: 'utilization',
    component: reportForm,
  },
  {
    path: '/project/sale',
    name: 'sale',
    component: reportForm,
  },
  {
    path: '/project/saleprogress',
    name: 'saleprogress',
    component: reportForm,
  },
  {
    path: '/project/compare',
    name: 'compare',
    component: reportForm,
  },
  {
    path: '/project/peasant',
    name: 'peasant',
    component: reportForm,
  },
  {
    path: '/manage/basic',
    name: 'basic',
    component: basic,
    meta: {
      menu_name: '基础信息',
      icon: '',
    },
  },
  {
    path: '/manage/runtime',
    name: 'runtime',
    component: runtime,
    meta: {
      menu_name: '运行管理',
      icon: '',
    },
  },
  {
    path: '/manage/standard/inspection',
    name: 'inspection',
    component: inspection,
    meta: {
      menu_name: '巡检管理',
      icon: '',
    },
  },
  {
    path: '/manage/standard/machine',
    name: 'machine',
    component: machine,
    meta: {
      menu_name: '设备二维码',
      icon: '',
    },
  },
  {
    path: '/manage/standard/store',
    name: 'store',
    component: manageStore,
    meta: {
      menu_name: '出入库管理',
      icon: '',
    },
  },
  {
    path: '/manage/history',
    name: 'history',
    component: history,
    meta: {
      menu_name: '历史数据',
      icon: '',
    },
  },
  {
    path: '/setMenus',
    name: 'setMenus',
    component: setMenus,
  },
  {
    path: '/setting/pumpinfo',
    name: 'pumpBasic',
    component: pumpBasic,
    meta: {
      menu_name: '泵站基础信息',
      icon: '',
    },
  },
  {
    path: '/setting/crewManage',
    name: 'crewManage',
    component: crewManage,
    meta: {
      menu_name: '机组管理',
      icon: '',
    },
  },
  {
    path: '/setting/journal',
    name: 'journal',
    component: journal,
    meta: {
      menu_name: '操作日志',
      icon: '',
    },
  },
  {
    path: '/setting/areainfo',
    name: 'areainfo',
    component: areainfo,
    meta: {
      menu_name: '灌区基础信息',
      icon: '',
    },
  },
  {
    path: '/setting/farmer',
    name: 'farmer',
    component: farmer,
    meta: {
      menu_name: '农户管理',
      icon: '',
    },
  },
  {
    path: '/setting/canal',
    name: 'canal',
    component: canal,
    meta: {
      menu_name: '渠系管理',
      icon: '',
    },
  },
  {
    path: '/setting/config',
    name: 'config',
    component: config,
    meta: {
      menu_name: '系统运行参数',
      icon: '',
    },
  },
  {
    path: '/setting/user',
    name: 'user',
    component: user,
    meta: {
      menu_name: '用户管理',
      icon: '',
    },
  },
  {
    path: '/setting/massif',
    name: 'massif',
    component: massif,
    meta: {
      menu_name: '地块管理',
      icon: '',
    },
  },
  {
    path: '/setting/dataRuler',
    name: 'dataRuler',
    component: dataRuler,
    meta: {
      menu_name: '数据权限',
      icon: '',
    },
  },
  {
    path: '/project/account',
    name: 'account',
    component: account,
    meta: {
      menu_name: '账户管理',
      icon: '',
    },
  },
  {
    path: '/manage/department',
    name: 'department',
    component: department,
    meta: {
      menu_name: '部门管理',
      icon: '',
    },
  },
  {
    path: '/manage/jobs',
    name: 'jobs',
    component: jobs,
    meta: {
      menu_name: '职务管理',
      icon: '',
    },
  },
  {
    path: '/setting/crops',
    name: 'crops',
    component: crops,
    meta: {
      menu_name: '作物管理',
      icon: '',
    },
  },
  {
    path: '/setting/region',
    name: 'region',
    component: region,
    meta: {
      menu_name: '区域管理',
      icon: '',
    },
  },
  {
    path: '/canalRecord',
    name: 'canalRecord',
    component: canalRecord,
  },
];

let menus = [
  {
    text: '首页',
    name: 'Home',
    icon: 'icon-index',
  },
  {
    text: 'GIS一张图',
    name: 'Gis',
    icon: 'icon-GIS',
  },
  {
    text: '实时数据',
    icon: 'icon-shishishuju',
    children: [
      {
        text: '干渠实时数据',
        name: 'mainCanal',
      },
      {
        text: '支渠实时数据',
        name: 'branch',
      },
      {
        text: '泵站实时数据',
        name: 'pump',
      },
      {
        text: '取水口实时数据',
        name: 'source',
      },
      {
        text: '视频监控',
        name: 'video',
      },
    ],
  },
  {
    text: '业务应用',
    icon: 'icon-yewu',
    children: [
      {
        text: '用水计划',
        name: 'plan',
      },
      {
        text: '配水调度',
        name: 'dispatch',
      },
      {
        text: '取水统计',
        name: 'total',
      },
      {
        text: '综合报表',
        children: [
          {
            text: '用水计划执行对照表',
            name: 'implement',
          },
          {
            text: '泵站指标完成情况统计表',
            name: 'complete',
          },
          {
            text: '进水流量统计表',
            name: 'inlet',
          },
          {
            text: '泵站提水量表',
            name: 'extraction',
          },
          {
            text: '干渠利用率日报表',
            name: 'utilization ',
          },
          {
            text: '售水情况日报表',
            name: 'sale',
          },
          {
            text: '售水进度日报表',
            name: 'saleprogress',
          },
          {
            text: '用水计划对照表',
            name: 'compare',
          },
          {
            text: '农户用水情况表',
            name: 'peasant',
          },
        ],
      },
    ],
  },
  {
    text: '水费计收',
    name: 'account',
    // children: [
    // {
    //   text: '水费征收',
    //   name: 'collection',
    // },
    // {
    //   text: '水费计收记录',
    //   name: 'records',
    // },
    // {
    //   text: '用水户用水记录',
    //   name: 'userrecords',
    // },
    // {
    //   text: '水费统计',
    //   name: 'total',
    // },
    // {
    //   text: '渠系配水',
    //   children: [
    //     {
    //       text: '渠系配水列表',
    //       name: 'canalList',
    //     },
    //     {
    //       text: '负责人列表',
    //       name: 'chargeList',
    //     },
    //   ],
    // },
    // ],
  },
  {
    text: '入渠备案',
    name: 'canalRecord',
  },
  {
    text: '泵站管理',
    icon: 'icon-bengzhan',
    children: [
      {
        text: '基础信息',
        name: 'basic',
      },
      {
        text: '运行管理',
        name: 'runtime',
      },
      {
        text: '历史数据',
        name: 'history',
      },
      // {
      //   text: '标准化体系',
      //   children: [
      //     {
      //       text: '巡检管理',
      //       name: 'inspection',
      //     },
      //     {
      //       text: '设备二维码',
      //       name: 'machine',
      //     },
      //     {
      //       text: '出入库管理',
      //       name: 'store',
      //     },
      //   ],
      // },
    ],
  },
  {
    text: '系统设置',
    icon: 'icon-shezhi',
    children: [
      {
        text: '区域管理',
        name: 'region',
      },
      {
        text: '农户管理',
        name: 'farmer',
      },
      {
        text: '作物管理',
        name: 'crops',
      },
      {
        text: '灌区管理',
        children: [
          {
            text: '泵站基础信息',
            children: [
              {
                text: '泵站列表',
                name: 'pumpBasic',
              },
              {
                text: '机组管理',
                name: 'crewManage',
              },
            ],
          },
          {
            text: '灌区基本信息',
            name: 'canal',
          },
          {
            text: '地块管理',
            name: 'massif',
          },
          // {
          //   text: '负责人管理',
          //   name: 'massif',
          // },
          // {
          //   text: '渠系管理',
          //   name: 'canal',
          // },
        ],
      },
      {
        text: '行政管理',
        children: [
          {
            text: '部门管理',
            name: 'department',
          },
          {
            text: '用户管理',
            name: 'user',
          },
          {
            text: '职务管理',
            name: 'jobs',
          },
        ],
      },
      {
        text: '操作日志',
        name: 'journal',
      },
      {
        text: '权限配置',
        children: [
          {
            text: '菜单管理',
            name: 'setMenus',
          },
          {
            text: '数据权限',
            name: 'dataRuler',
          },
          {
            text: '权限配置',
            name: 'jurisdiction',
          },
          // {
          //   text: '系统配置',
          //   name: 'config',
          // },
        ],
      },
    ],
  },
];
// 过滤生成路由
function generateRoutes(originRoutes, menu) {
  originRoutes.forEach((item, index) => {
    if (menu.indexOf(item.name) == -1) {
      originRoutes.splice(index, 1);
    }
  });
}
// 菜单过滤函数
function filterMenus(target) {
  for (let i = 0; i < target.length; i++) {
    if (target[i].name) {
      if (store.state.menu.indexOf(target[i].name) == -1) {
        target.splice(i, 1);
        return filterMenus(target);
      }
    } else if (target[i].children && target[i].children.length > 0) {
      filterMenus(target[i].children);
    }
    if (target[i].children && target[i].children.length == 0) {
      target.splice(i, 1);
      return filterMenus(target);
    }
  }
}
let router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let my_cookies = document.cookie;
  let token = my_cookies && my_cookies.slice(6);
  if (!token) {
    if (to.name !== 'Login') {
      next({ name: 'Login' });
    } else if (to.name == 'Login') {
      next();
    }
  } else if (token) {
    if (to.name == 'Login') next(from.name);
    else if (store.state.routes.length == 0) {
      store.commit('setToken', token);
      store.commit('setName', localStorage.getItem('user_name'));
      let menu = JSON.parse(localStorage.getItem('originMenus'));
      store.commit('setMenu', menu);
      // filterMenus(menus);
      store.commit('setUserMenu', menus);
      // generateRoutes(originRoutes, menu);
      originRoutes.push(common);
      store.commit('setRoutes', originRoutes);
      localStorage.setItem('userRoutes', JSON.stringify(originRoutes));
      router.addRoutes(store.state.routes);
      console.log(originRoutes, router);
      store.dispatch('getPumpLists');
      store.dispatch('getCanelLists');
      store.dispatch('getCanalTree');
      store.dispatch('getRegion');
      store.dispatch('getOrgLists');
      store.dispatch('getMenuLists');
      if (!to.name) {
        next({ path: to.path });
      } else {
        next();
      }
    } else next();
  }
});

export default router;
