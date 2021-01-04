<template>
  <div class="nav-menu">
    <menu-item v-for="(item, index) in menuList" :key="index" :itemdata="item" :now="index"></menu-item>
  </div>
</template>

<script>
import menuItem from "./menuItem";
export default {
  props: {
    menuList: {
      type: Array,
    },
  },
  components: {
    menuItem,
  },
};
</script>

<style scoped>
.nav-menu {
  font-size: 16px;
  color: #4280dc;
  display: flex;
}
</style>