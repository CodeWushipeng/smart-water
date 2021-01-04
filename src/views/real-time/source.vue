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
        <intake v-else-if="activeTab==1"></intake>
        <history v-else-if="activeTab==2"></history>
      </div>
    </div>
  </div>
</template>

<script>
import overview from './canalView.vue'
import intake from './intake.vue'
import history from './mainHistory.vue'
export default {
  components: {
    overview,
    intake,
    history,
  },
  data() {
    return {
      tabLists: [
        {
          text: '概览'
        },
        {
          text: '日取水量对比分析'
        },
        {
          text: '历史数据'
        },
        
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