<template>
  <div class="pump-wrap">
    <div class="tabs-wrap">
      <div class="tabs">
        <div
          class="tab"
          :class="activeTab==index?'active':''"
          v-for="(item, index) in tabLists"
          :key="index"
          @click="activeTab=index"
        >{{item.text}}</div>
      </div>
      <div class="tab-panel">
        <overview v-if="activeTab==0"></overview>
        <plan v-else-if="activeTab==1"></plan>
        <distrack v-else-if="activeTab==2"></distrack>
        <disanalysis v-else-if="activeTab==3"></disanalysis>
        <disport v-else-if="activeTab==4"></disport>
      </div>
    </div>
  </div>
</template>

<script>
import overview from './dispatchView.vue'
import plan from './dispatchPlan'
import distrack from './dispatchTrack'
import disanalysis from './dispatchAnalysis'
import disport from './dispatchPort'
export default {
  components: {
    overview,
    plan,
    distrack,
    disanalysis,
    disport
  },
  data() {
    return {
      tabLists: [
        {
          text: '概览'
        },
        {
          text: '调度计划'
        },
        {
          text: '调度跟踪'
        },
        {
          text: '运行分析'
        },
        {
          text: '调度评价'
        },
      ],
      activeTab: 0
    }
  },
  watch: {
    $route: {
      handler: function(){
        if(this.$route.fullPath=='/branch'){

        }else if(this.$route.fullPath=='/mainCanal'){

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pump-wrap {
  background-color: #f0f0f0;
  padding: 25px;
  .tabs {
    display: flex;
    .tab {
      padding: 15px;
      text-align: center;
      font-size: 22px;
      color: #171819;
      border: 1px solid #dbdbdb;
      min-width: 160px;
      cursor: pointer;
    }
    .active {
      border-top: 3px solid #4280dc;
      background-color: #fff;
      color: #4280dc;
    }
  }
  .tab-panel {
    background-color: #fff;
    padding: 0 37px 60px;
  }
}
</style>