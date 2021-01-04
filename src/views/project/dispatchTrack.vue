<template>
  <div class="overview">
    <div class="select-pump">
      <p>泵站名称</p>
      <el-select :value="area"></el-select>
      <p>机组</p>
      <el-select :value="model"></el-select>
      <p>责任人</p>
      <el-select :value="point"></el-select>
      <el-button type="primary" icon="el-icon-refresh-right">查询</el-button>
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
    </div>
    <div class="table-wrap">
      <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="name" label="泵站名称"></el-table-column>
        <el-table-column prop="name" label="负责人"></el-table-column>
        <el-table-column prop="address" label="机组编号"></el-table-column>
        <el-table-column prop="address" label="实际提水量（m³）"></el-table-column>
        <el-table-column prop="address" label="计划提水量（m³）"></el-table-column>
        <el-table-column prop="address" label="调度命令完成情况(%)"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: '',
      model: '',
      point: '',
      pumpData: [],
      headerStyle: {
        background: '#f0f0f0'
      },
      currentPage: 1,
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  }
}
</script>

<style lang="scss" scoped>
.overview{
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
  .el-button{
    margin-right: 30px;
  }
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>