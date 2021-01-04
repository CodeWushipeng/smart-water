<template>
  <div class="overview">
    <div class="select-pump">
      <p>泵站名称</p>
      <el-select v-model="pump"></el-select>
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
    <div class="table-wrap">
      <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
        <el-table-column
          align="center"
          v-for="(item, index) in tableConfig"
          :key="index"
          :prop="item.value"
          :label="item.label"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">生成二维码</el-button>
          </template>
        </el-table-column>
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
    <el-dialog title="生成二维码" :visible.sync="QRcodeVisible" width="430px">
      <div class="code-main">
        <div class="code-wrap">
          <img src="../../images/code.png" alt="">
        </div>
        <div class="btns">
          <el-button type="primary">打印</el-button>
          <el-button>关闭</el-button>
        </div>
      </div>
    </el-dialog>
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
      QRcodeVisible: false
    }
  },
  mounted() {},
  methods: {
    handleClick(row) {
      console.log(row)
      this.QRcodeVisible = true
    },
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
.overview {
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
.code-main{
  width: 100%;
  border-top: 1px solid #707070;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .code-wrap{
    width: 236px;
    height: 236px;
    margin-bottom: 40px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .btns{
    width: 190px;
    display: flex;
    justify-content: space-between;
  }
}
</style>