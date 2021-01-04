<template>
  <div class="history-wrap">
    <div class="select-pump">
      <p>泵站名称</p>
      <el-select :value="pump"></el-select>
      <p>时间区间</p>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
    </div>
    <el-table :data="historyData" style="width: 100%" :header-cell-style="headerStyle" border>
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="name" label="提水站名"></el-table-column>
        <el-table-column prop="address" label="监测时间"></el-table-column>
        <el-table-column prop="address" label="开机台数（台）"></el-table-column>
        <el-table-column prop="address" label="流量（m³/s）"></el-table-column>
        <el-table-column prop="address" label="提水量（m³）"></el-table-column>
        <el-table-column prop="address" label="进水池水位（m）"></el-table-column>
        <el-table-column prop="address" label="出水池水位（m）"></el-table-column>
        <el-table-column prop="address" label="进水池水深（m）"></el-table-column>
        <el-table-column prop="address" label="出水池水位（m）"></el-table-column>
        <el-table-column prop="address" label="地形扬程（m）"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="prev, pager, next, sizes, jumper"
        :total="400"
      ></el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pump: '',
      historyData: [],
      date: '',
      headerStyle: {
        background: '#f0f0f0'
      },
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-button,
  .el-date-editor {
    margin-right: 30px;
  }
}
.page{
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>