<template>
  <div class="overview">
    <div class="select-pump">
      <p>灌区</p>
      <el-cascader
        v-model="area"
        :options="areaTree"
        :props="props"
        :show-all-levels="false"
        placeholder="请选择灌区"
      ></el-cascader>
      <p>计量点类型</p>
      <el-select v-model="model"></el-select>
      <p>测量点</p>
      <el-select v-model="point"></el-select>
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
        <el-table-column prop="name" label="渠道名称"></el-table-column>
        <el-table-column prop="address" label="测量时间"></el-table-column>
        <el-table-column prop="address" label="水深（m）"></el-table-column>
        <el-table-column prop="address" label="流量（m³/s）"></el-table-column>
        <el-table-column
          prop="address"
          label="累计水量（m³）"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="剩余水量（m³）"
        ></el-table-column>
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
import {mapState} from 'vuex'
export default {
  data() {
    return {
      area: "",
      model: "",
      point: "",
      pumpData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      props: {
        value: "canal_code",
        label: "canal_name",
        children: "child",
        emitPath: false,
      },
      currentPage: 1,
    };
  },
  computed:{
    ...mapState(['areaTree'])
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
  .el-cascader,
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