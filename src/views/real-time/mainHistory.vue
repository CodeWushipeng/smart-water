<template>
  <div class="history-wrap">
    <div class="select-pump">
      <div class="pump-item">
        <p>灌区</p>
        <el-cascader
        v-model="area"
        :options="areaTree"
        :props="props"
        :show-all-levels="false"
        placeholder="请选择灌区"
      ></el-cascader>
      </div>
      <div class="pump-item">
        <p>计量点类型</p>
        <el-select v-model="pointModel"></el-select>
      </div>
      <div class="pump-item">
        <p>测量点</p>
        <el-select v-model="point"></el-select>
      </div>
      <div class="pump-item">
        <p>数据类型</p>
        <el-select v-model="dataModel"></el-select>
      </div>
      <div class="pump-item">
        <p>时间区间</p>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
    </div>
    <el-table :data="historyData" style="width: 100%" :header-cell-style="headerStyle" border>
      <el-table-column prop="date" label="序号"></el-table-column>
      <el-table-column prop="name" label="渠道名称"></el-table-column>
      <el-table-column prop="address" label="仪器编码"></el-table-column>
      <el-table-column prop="address" label="测量时间"></el-table-column>
      <el-table-column prop="address" label="水深（m）"></el-table-column>
      <el-table-column prop="address" label="流量（m³/s）"></el-table-column>
      <el-table-column prop="address" label="水量（m³）"></el-table-column>
      <el-table-column prop="address" label="累计水量（m³）"></el-table-column>
      <el-table-column prop="address" label="剩余水量"></el-table-column>
      <el-table-column prop="address" label="数据类型"></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="prevHandel"
        @next-click="nextHandel"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="prev, pager, next, sizes, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      area:"",
      point: '',
      pointModel:'',
      dataModel:'',
      historyData: [],
      date: '',
      headerStyle: {
        background: '#f0f0f0'
      },
      props: {
        value: "canal_code",
        label: "canal_name",
        children: "child",
        emitPath: false,
      },
      currentPage: 1,
      pageSize:10,
      total:0
    }
  },
  computed:{
    ...mapState(['areaTree'])
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  }
}
</script>

<style lang="scss" scoped>
.select-pump {
  display: flex;
  flex-wrap: wrap;
  padding: 40px 0;
  .pump-item {
    display: flex;
    height: 40px;
    align-items: center;
    margin-bottom: 24px;
  }
  p,
  .el-select,
  .el-cascader,
  .el-button,
  .el-date-editor {
    margin-right: 30px;
  }
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>