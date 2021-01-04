<template>
  <div class="sm-tree">
    <!-- <tree-item v-for="(item, index) in treeData" :key="index" :itemData="item" :nodes="item.children"></tree-item> -->
    <tree-item v-for="(item, index) in treeData" :key="index" :itemData="item" :nodes="item[prop.children]" :prop="prop"></tree-item>
  </div>
</template>

<script>
import Bus from '../../utils/bus'
import treeItem from './treeItem'
export default {
  name: 'smTree',
  components:{
    treeItem
  },
  props: {
    treeData: {
      type: Array,
      default: function () {
        return [
          {
            label: '一级 1',
            value: '',
            children: [
              {
                label: '二级 1-1',
                value: '',
                children: [
                  {
                    label: '三级 1-1-1',
                    value: '',
                  }
                ]
              }
            ]
          }
        ]
      }
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
  watch:{
    treeData:{
      immediate: true,
      deep: true,
      handler:function(val){
        console.log(val)
      }
    }
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.sm-tree{
  box-sizing: border-box;
  background-color: #fff;
}
</style>