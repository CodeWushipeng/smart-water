<template>
  <div class="sub-menu">
    <div
      class="sub-item"
      v-for="(subItem, index) in subData"
      :key="index"
      @click.self="toSubMenu(subItem, index)"
      @mouseenter="mouseHandel(subItem, index)"
      @mouseleave="hideMenu"
    >
      {{ subItem.text }}
      <i
        v-if="subItem.children"
        class="icon iconfont icon-gengduo right-arrow"
      ></i>
      <el-collapse-transition>
        <sub-menu
          v-if="hoverIndex == index && subItem.children"
          :subData="subItem.children"
          @hide="hideMenu"
        ></sub-menu>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "subMenu",
  data() {
    return {
      hoverIndex: null,
      acitve: null,
      flag: false,
      callNumber: 0,
    };
  },
  props: {
    subData: {
      type: Array,
    },
  },
  computed: {
    ...mapState(["user_menu"]),
  },
  methods: {
    mouseHandel(target, index) {
      if (target.children) {
        this.hoverIndex = index;
      }
    },
    // 检索顶级菜单
    searchMenu(menu, target) {
      // debugger;
      for (let i = 0; i <= menu.length; i++) {
        if (this.flag) {
          if (this.callNumber >1) {
            this.callNumber--;
            break;
          } else {
            this.acitve = i-1;
            this.flag = false;
            return;
          }
        } else {
          if (i == menu.length) {
            break;
          } else {
            if (menu[i].text == target.text) {
              if (this.callNumber > 0) {
                this.callNumber--;
              }
              this.flag = true;
              break;
            } else if (
              i == menu.length - 1 &&
              menu[i].text != target.text &&
              !menu[i].children
            ) {
              this.callNumber--;
              break;
            } else if (menu[i].children) {
              this.callNumber++;
              this.searchMenu(menu[i].children, target);
            }
          }
        }
      }
    },
    hideMenu() {
      this.hoverIndex = null;
    },
    toSubMenu(target, index) {
      debugger
      if (this.$route.name == target.name) {
        return;
      } else {
        if (target.name) {
          this.searchMenu(this.user_menu, target);
          console.log(this.acitve);
          this.$store.commit("setActiveNav", this.acitve);
          let postData = {
            target,
            type: "inner",
          };
          this.$store.commit("setBreadList", postData);
          this.$emit("hide");
          this.$router.push({ name: target.name });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-menu {
  position: absolute;
  width: 164px;
  z-index: 1000;
  // background-color: #060917;
  box-shadow: 0px 0px 1px #fff;
  font-size: 14px;
  color: #fff;
  top: 65px;
  left: 0;
  .sub-item {
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    position: relative;
    background-color: #060917;
    .right-arrow {
      position: absolute;
      right: 10px;
      top: 0;
      font-size: 12px;
    }
    .sub-menu {
      position: absolute;
      width: 164px;
      z-index: 1000;
      padding: 0 0 0 5px;
      // background-color: #060917;
      background: transparent;
      box-shadow: 0px 0px 1px #fff;
      font-size: 14px;
      color: #fff;
      top: 0;
      left: 100%;
    }
  }
  .sub-item:hover {
    background: #4280dc;
  }
}
</style>