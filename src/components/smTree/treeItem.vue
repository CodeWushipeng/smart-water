<template>
  <div class="tree-item" @click.stop="handelTree(itemData)">
    <div class="tree-header" :class="selectTree==itemData[prop.value] && itemShow ? 'now' : ''">
      <div
        class="icon iconfont icon-arr-left sm-arrow"
        :class="[nodes && selectTree==itemData[prop.value] && itemShow ? 'active' : '',itemShow ? 'down' : '', nodes ? '' : 'no-child']"
      ></div>
      <span>{{
        itemData[prop.label]
      }}</span>
    </div>
    <el-collapse-transition>
      <div class="tree-group" v-if="itemShow">
        <!-- <tree-item
          v-for="(node, index) in nodes"
          :key="index"
          :itemData="node"
          :nodes="node.children"
        ></tree-item> -->
        <tree-item v-for="(node, index) in nodes"
          :key="index"
          :itemData="node"
          :prop="prop"
          :nodes="node[prop.children]"></tree-item>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import Bus from '../../utils/bus'
import {mapState} from "vuex"
export default {
  name: "treeItem",
  props: {
    itemData: {
      type: Object,
    },
    nodes:{
      type: Array
    },
    prop:{
      type: Object,
      default: function () {
        return {
          label: "label",
          value: "value",
          children: "child"
        }
      }
    }
  },
  computed:{
    ...mapState(["selectTree"])
  },
  data() {
    return {
      itemShow: false,
    };
  },
  methods: {
    handelTree(target) {
      this.itemShow = !this.itemShow;
      this.$store.commit("setSelectTree",target.canal_code)
      Bus.$emit("getData",target)
      // if (!target.children && this.itemShow) {
      //   Bus.$emit("getData",target)
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-item{
  cursor: pointer;
}
.tree-header {
  font-size: 22px;
  height: 56px;
  padding-left: 32px;
  display: flex;
  align-items: center;
  .icon-arr-left {
    margin-right: 10px;
    color: #4280dc;
    font-size: 26px;
    transition: all 0.2s linear;
  }
  .no-child {
    color: transparent;
  }
  .down {
    transform-origin: 50% 50%;
    transform: rotate(90deg);
  }
  .active {
    color: #fff;
  }
}
.tree-header.now{
  background-color: #4280dc;
  color: #fff;
}
.tree-header .icon-arr-left.now {
  background-color: #4280dc;
  color: #fff;
}
.tree-group {
  display: block;
  padding-left: 20px;
}
</style>