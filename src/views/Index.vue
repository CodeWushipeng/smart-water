<template>
  <div class="index-wrap">
      <nav-bar v-if="$route.path!='/login'" :menuList="menu"></nav-bar>
      <router-view></router-view>
  </div>
</template>

<script>
import navBar from "./components/navBar/navBar";
export default {
  name: 'Index',
  components: {
    navBar,
  },
  data(){
    return{
      menu: JSON.parse(localStorage.getItem("routes")),
    }
  }
}
</script>
<style lang="scss" scoped>
.index-wrap {
  height: 100%;
}
</style>