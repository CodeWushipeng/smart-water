import Vue from 'vue';
import Vuex from 'vuex';
import request from '../utils/request';

Vue.use(Vuex);
// 检测面包屑数组是否包含当前路由
function checkBread(bread, routers) {
  debugger;
  let result;
  for (let i = 0; i < bread.length; i++) {
    if (bread[i].name == routers.name) {
      return result = false;
    } else {
      result = true;
    }
  }
  return result;
}
const store = new Vuex.Store({
  state: {
    menu: [],
    user_menu: [],
    name: '',
    oldNav: 0,
    activeNav: localStorage.getItem('activeNav')
      ? localStorage.getItem('activeNav')
      : 0,
    token: '',
    routes: [],
    breadList: localStorage.getItem('breadList')
      ? JSON.parse(localStorage.getItem('breadList'))
      : [
          {
            text: '首页',
            name: 'Home',
            icon: 'icon-index',
          },
        ],
    pumpList: [],
    menuList:[],
    areaList: [],
    areaTree: [],
    regionTree: [],
    selectTree: '',
    orgList: [],
    roleList: [],
  },
  mutations: {
    setMenu(state, val) {
      state.menu = val;
    },
    setUserMenu(state, val) {
      state.user_menu = val;
    },
    setMenuList(state, val) {
      state.menuList = val;
    },
    setOrgList(state, val) {
      state.orgList = val;
    },
    setRoleList(state, val) {
      state.roleList = val;
    },
    setName(state, val) {
      state.name = val;
    },
    setActiveNav(state, val) {
      state.oldNav = state.activeNav;
      state.activeNav = val;
      localStorage.setItem('activeNav', state.activeNav);
    },
    setToken(state, val) {
      state.token = val;
    },
    setRoutes(state, val) {
      state.routes = val;
    },
    setPumpList(state, val) {
      state.pumpList = val;
    },
    setAreaList(state, val) {
      state.areaList = val;
    },
    setAreaTree(state, val) {
      state.areaTree = val;
    },
    setRegionTree(state, val) {
      state.regionTree = val;
    },
    setSelectTree(state, val) {
      state.selectTree = val;
    },
    setBreadList(state, val) {
      if (checkBread(state.breadList, val.target)) {
        debugger;
        if (state.oldNav == state.activeNav) {
          state.breadList.push(val.target);
        } else {
          state.breadList = [];
          if (val.type == 'inner') {
            let menu = {
              text: '',
              name: '',
            };
            menu.text = state.user_menu[state.activeNav].text;
            menu.name = state.user_menu[state.activeNav].name
              ? state.user_menu[state.activeNav].name
              : '';
            state.breadList.push(menu);
          } else {
            state.breadList.push(val.target);
          }
        }
        localStorage.setItem('breadList', JSON.stringify(state.breadList));
      }
    },
  },
  actions: {
    // 获取泵站列表
    getPumpLists(context) {
      let data = {
        keyword: '',
        order_field: '',
        order_type: 'desc',
        page: 1,
        page_size: 10000,
      };
      request
        .post('/station_index', data)
        .then(res => {
          if (res.code == 0) {
            context.commit('setPumpList', res.data.data);
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 灌区列表
    getCanelLists() {
      let data = {
        keyword: '',
        order_field: '',
        order_type: 'desc',
        page: 1,
        page_size: 10000,
      };
      request
        .post('/canal_index', data)
        .then(res => {
          if (res.code == '0') {
            store.commit('setAreaList', res.data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 灌区树形
    getCanalTree() {
      request
        .post('/canal_tree')
        .then(res => {
          if (res.code == 0) {
            store.commit('setAreaTree', res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 行政区划
    getRegion() {
      let data = {};
      request
        .post('/region_tree', data)
        .then(res => {
          if (res.code == '0') {
            store.commit('setRegionTree', res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取机构列表
    getOrgLists() {
      let data = {};
      request
        .post('/organization_index', data)
        .then(res => {
          if (res.code == '0') {
            store.commit('setOrgList', res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取菜单
    getMenuLists() {
      let data = {};
      request
        .post('/menu_index', data)
        .then(res => {
          if (res.code == '0') {
            store.commit('setMenuList', res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
});

export default store;
