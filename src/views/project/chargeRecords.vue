<template>
  <div class="overview">
    <div class="wrap">
      <div class="select-pump">
        <p>灌区</p>
        <el-select :value="model"></el-select>
        <p>责任人</p>
        <el-select :value="point"></el-select>
        <p>缴费时间</p>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-refresh-right">查询</el-button>
        <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
      </div>
      <div class="table-wrap">
        <el-button type="primary" icon="el-icon-bottom">导出</el-button>
        <el-button>打印</el-button>
        <div class="selectTips">
          已选择
          <span>3</span>
          项
        </div>
        <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="序号"></el-table-column>
          <el-table-column prop="date" label="渠道（取水点）"></el-table-column>
          <el-table-column prop="date" label="缴费时间"></el-table-column>
          <el-table-column prop="date" label="用水量（m³）"></el-table-column>
          <el-table-column prop="name" label="缴费金额（圆）"></el-table-column>
          <el-table-column prop="name" label="冲红金额（圆）"></el-table-column>
          <el-table-column prop="address" label="水费金额（圆）"></el-table-column>
          <el-table-column prop="address" label="缴费人"></el-table-column>
          <el-table-column prop="address" label="收费人"></el-table-column>
          <el-table-column prop="address" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
              >打印</el-button>
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
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      date: '',
      model: '',
      point: '',
      pumpData: ['1', '1', '1', '1', '1', '1', '1', '1'],
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
.overview {
  padding: 24px;
  background: #f0f0f0;
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 0 0 40px;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-date-editor,
  .el-button {
    margin-right: 30px;
  }
}
.wrap{
  background-color: #fff;
  padding: 24px;
  border-radius: 5px;
}
.table-wrap {
  .selectTips {
    height: 24px;
    background: rgba($color: #4280dc, $alpha: 0.1);
    border-radius: 5px;
    margin-top: 28px;
    margin-bottom: 16px;
    font-size: 18px;
    color: #171819;
    padding: 6px 27px;
    span {
      color: #4280dc;
    }
  }
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>