<template>
  <div class="overview">
    <div class="select-pump">
      <p>泵站名称</p>
      <el-select :value="pump"></el-select>
      <p>机组</p>
      <el-select :value="crew"></el-select>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
    </div>
    <div class="table-wrap">
      <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
        <el-table-column align="center" v-for="(item, index) in tableConfig" :key="index" :prop="item.value" :label="item.label"></el-table-column>
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
      pump: '',
      crew: '',
      pumpData: ['1', '1', '1', '1', '1', '1', '1', '1'],
      headerStyle: {
        background: '#f0f0f0'
      },
      tableConfig: [
        {
          label: '序号',
          value: ''
        },
        {
          label: '泵站名称',
          value: ''
        },
        {
          label: '机组编号',
          value: ''
        },
        {
          label: '实际提水量（m³）',
          value: ''
        },
        {
          label: '计划提水量（m³）',
          value: ''
        },
      ],
      currentPage: 1
    }
  },
  mounted() {
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
  padding: 36px;
  background-color: #fff;
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-date-editor,
  .el-button {
    margin-right: 30px;
  }
}
.charts-wrap {
  display: flex;
  height: 460px;
  margin-bottom: 24px;
  .mark {
    width: 6px;
    height: 24px;
    background-color: #4280dc;
    margin-right: 10px;
  }
  #analysis {
    width: 90%;
    height: 100%;
  }
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>