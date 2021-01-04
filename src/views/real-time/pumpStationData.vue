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
        <pump-info v-if="activeTab==0"></pump-info>
        <real-time v-else-if="activeTab==1"></real-time>
        <!-- <overview v-else-if="activeTab==2"></overview> -->
        <history v-else-if="activeTab==2"></history>
        <crew v-else-if="activeTab==3"></crew>
      </div>
    </div>
  </div>
</template>

<script>
import realTime from './realTime.vue'
import overview from './overview.vue'
import history from './historyData.vue'
import crew from './crewData.vue'
import pumpInfo from './pumpInfo.vue'
export default {
  name: 'pumpData',
  components: {
    realTime,
    overview,
    history,
    crew,
    pumpInfo
  },
  data() {
    return {
      tabLists: [
        {
          text: '泵站详情'
        },
        {
          text: '实时数据'
        },
        // {
        //   text: '概览'
        // },
        {
          text: '历史数据'
        },
        {
          text: '机组数据'
        }
      ],
      activeTab: 0,
      
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
      width: 160px;
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