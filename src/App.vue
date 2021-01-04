<template>
  <div id="app">
    <nav-bar v-if="$route.path != '/login'" :menuList="user_menu"></nav-bar>
    <router-view />
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import navBar from './components/navBar/navBar';
import { mapState } from 'vuex';
export default {
  components: {
    navBar,
  },
  data() {
    return {
      _beforeUnload_time: '',
      _gap_time: '',
    };
  },
  computed: {
    ...mapState(['user_menu']),
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', e =>
      this.beforeunloadHandler(e)
    );
    window.removeEventListener('unload', e => this.unloadHandler(e));
  },
  mounted() {
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e));
    window.addEventListener('unload', e => this.unloadHandler(e));
  },
  methods: {
    beforeunloadHandler() {
      this._beforeUnload_time = new Date().getTime();
    },
    unloadHandler(e) {
      this._gap_time = new Date().getTime() - this._beforeUnload_time;
      debugger;
      //判断是窗口关闭还是刷新
      if (this._gap_time <= 5) {
        localStorage.clear();
      }
    },
  },
  // mounted(){
  //   if(!document.cookie){
  //     this.$message({
  //       type:"error",
  //       message:"登录已过期，请重新登录"
  //     })
  //     this.$router.replace("/login")
  //   }
  // }
};
</script>

<style>
#app {
  width: 100%;
  min-width: 1280px;
  height: 100%;
  /* background-color: #f0f0f0; */
}
</style>
