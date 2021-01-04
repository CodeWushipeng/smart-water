<template>
  <div class="manage">
    <div class="overview">
      <div class="select-pump">
        <p>泵站名称</p>
        <el-select v-model="pump"></el-select>
        <p>时间区间</p>
        <el-date-picker
          type="daterange"
          v-model="date"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
      </div>
      <div class="table-wrap">
        <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
          <el-table-column
            align="center"
            v-for="(item, index) in tableConfig"
            :key="index"
            :prop="item.value"
            :label="item.label"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      pump: '',
      date: '',
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
          label: '监测时间',
          value: ''
        },
        {
          label: '控制面积(万亩)',
          value: ''
        },
        {
          label: '地形扬程(m)',
          value: ''
        },
        {
          label: '设计扬程(m)',
          value: ''
        },
        {
          label: '装机流量(m³/s)',
          value: ''
        },
        {
          label: '装机容量(KW)',
          value: ''
        }
      ],
      currentPage: 1,
    }
  },
  mounted() {},
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
.manage {
  background: #f0f0f0;
  padding: 24px;
  .overview {
    border-radius: 10px;
    background-color: #fff;
    padding: 37px;
    .select-pump {
      height: 113px;
      display: flex;
      padding-bottom: 40px;
      height: 40px;
      align-items: center;
      p,
      .el-select,
      .el-date-editor,
      .el-button {
        margin-right: 30px;
      }
    }
    .handel {
      width: 50px;
      text-align: center;
    }
  }
  .page {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>