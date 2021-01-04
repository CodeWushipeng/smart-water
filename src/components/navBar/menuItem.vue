<template>
  <div
    class="menu-item"
    :class="activeNav == now ? 'active' : ''"
    @click.self="menuHandel(itemdata, now)"
    @mouseenter="mouseHandel(itemdata, now)"
    @mouseleave="hideMenu"
  >
    {{ itemdata.text }}
    <i v-if="itemdata.children" class="icon iconfont icon-xiala down-arrow"></i>
    <el-collapse-transition>
      <sub-menu
        v-if="hoverIndex == now && itemdata.children"
        :subData="itemdata.children"
        @hide="hideMenu"
      ></sub-menu>
    </el-collapse-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import subMenu from "./subMenu";
export default {
  props: {
    itemdata: {
      type: Object,
    },
    now: {
      type: Number,
    },
  },
  components: {
    subMenu,
  },
  computed: {
    ...mapState(["activeNav"]),
  },
  data() {
    return {
      hoverIndex: null,
    };
  },
  methods: {
    mouseHandel(target, index) {
      if (target.children) {
        this.hoverIndex = index;
      }
    },
    hideMenu() {
      this.hoverIndex = null;
    },
    menuHandel(target, index) {
      debugger
      if (target.name) {
        this.$store.commit("setActiveNav", index);
        if (this.$route.name == target.name) {
          return;
        } else {
          let postData = {
            target,
            type:"out"
          }
          this.$store.commit("setBreadList", postData);
          this.$router.push({ name: target.name });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  width: 120px;
  line-height: 65px;
  text-align: center;
  border-top: 5px solid #0b0f2a;
  cursor: pointer;
  position: relative;
  .down-arrow {
    position: absolute;
    right: 0;
    top: 2px;
    font-size: 12px;
  }
}
.menu-item.active {
  border-top: 5px solid #4280dc;
  background: #060917;
  color: #fff;
}
</style>