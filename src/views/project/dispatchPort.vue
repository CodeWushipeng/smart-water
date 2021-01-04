<template>
  <div class="overview">
    <div class="select-pump">
      <p>时间</p>
      <el-date-picker
        v-model="area"
        type="date"
        placeholder="请选择日期"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button type="primary" icon="el-icon-bottom">导出</el-button>
    </div>
    <div class="table-wrap">
      <el-table
        :data="pumpData"
        style="width: 100%"
        :header-cell-style="headerStyle"
        border
      >
        <el-table-column  align="center" prop="date" label="站名"></el-table-column>
        <el-table-column  align="center" prop="name" label="监测时间"></el-table-column>
        <el-table-column  align="center" prop="address" label="提水量（m³）">
          <el-table-column align="center" prop="actual" label="实际"></el-table-column>
          <el-table-column
            prop="completion"
            label="完成率(%)"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          prop="address"
          label="累计能耗(kw.h)"
          align="center"
        ></el-table-column>
        <el-table-column align="center" prop="address" label="进水池水位(m)"></el-table-column>
        <el-table-column align="center" prop="address" label="出水池水位(m)"></el-table-column>
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
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      area: "",
      model: "",
      point: "",
      pumpData: [],
      headerStyle: {
        background: "#f6f6f6",
      },
      currentPage: 1,
      pageSize:10,
      total:0
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
    },
    prevHandel(){
      this.currentPage--
    },
    nextHandel(){
      this.currentPage++
    }
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
  .el-date-editor,
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