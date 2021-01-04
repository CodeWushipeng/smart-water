<template>
  <div class="overview">
    <div class="select-pump">
      <p>泵站名称</p>
      <el-select v-model="pump">
        <el-option
          v-for="(item, index) in pumpList"
          :key="index"
          :label="item.pump_station_name"
          :value="item.pump_station_code"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-refresh-right">查询</el-button>
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
    </div>
    <div class="table-wrap">
      <el-table
        :data="pumpData"
        style="width: 100%"
        :header-cell-style="headerStyle"
        border
      >
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="name" label="提水站名"></el-table-column>
        <el-table-column prop="address" label="监测时间"></el-table-column>
        <el-table-column
          prop="address"
          label="开机台数（台）"
        ></el-table-column>
        <el-table-column prop="address" label="流量（m³/s）"></el-table-column>
        <el-table-column prop="address" label="提水量（m³）"></el-table-column>
        <el-table-column
          prop="address"
          label="进水池水位（m）"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="出水池水位（m）"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="进水池水深（m）"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="出水池水位（m）"
        ></el-table-column>
        <el-table-column prop="address" label="地形扬程（m）"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      pump: "",
      pumpData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      currentPage: 1,
      total: 1,
    };
  },
  computed:{
    ...mapState(['pumpList'])
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  padding: 0 26px;
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-button {
    margin-right: 30px;
  }
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>