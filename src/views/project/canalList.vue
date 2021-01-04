<template>
  <div class="canal-wrap">
    <div class="water-main">
      <div class="select-pump">
        <p>泵站名称</p>
        <el-select v-model="pump"></el-select>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <div class="table-wrap">
        <el-table
          :data="waterRate"
          style="width: 100%"
          :header-cell-style="headerStyle"
          border
        >
          <el-table-column
            align="center"
            prop="date"
            label="提水日期"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="灌区编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="灌区名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="计划提水"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="灌溉面积"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="作物类型"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="农户数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="负责人"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="状态"
          ></el-table-column>
          <el-table-column align="center" prop="address" label="操作">
            <template>
              <el-button type="text">查看</el-button>
            </template>
          </el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      pump: "",
      headerStyle: {
        background: "#f6f6f6",
      },
      waterRate: [],
      currentPage: 1,
      pageSize:10,
      total: 0,
    };
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

<style scoped lang="scss">
.canal-wrap {
  padding: 0 26px;
  background: #f0f0f0;
  display: flex;
  .tree-aside {
    width: 400px;
    margin-right: 30px;
  }
  .water-main {
    flex: 1;
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
  }
}
</style>