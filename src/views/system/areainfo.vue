<template>
  <div class="video-wrap">
    <div class="video-lists">
      <div class="overview">
        <div class="form-wrap">
          <div class="form-item">
            <p>灌区名称</p>
            <el-input v-model="area" placeholder="请输入搜索关键词"></el-input>
          </div>
          <div class="form-item">
            <p>时间</p>
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="date"
            ></el-date-picker>
          </div>
          <div class="form-item">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
          </div>
        </div>
        <div class="table-wrap">
          <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
            <el-table-column
              v-for="(item, index) in tableConfig"
              :key="index"
              :prop="item.value"
              :label="item.label"
              align="center"
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
  </div>
</template>

<script>
import Bus from '../../utils/bus'
export default {
  data() {
    return {
      area: '',
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
          label: '灌区名称',
          value: ''
        },
        {
          label: '时间',
          value: ''
        },
        {
          label: '系统版本',
          value: ''
        },
        {
          label: '运行环境',
          value: ''
        },
        {
          label: '服务器负载',
          value: ''
        },
      ],
      currentPage: 1,
    }
  },
  mounted() {
    Bus.$on('getvalue', (value) => {
      console.log(value)
      this.treeValue = value
    })
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
.video-wrap {
  display: flex;
  padding: 25px;
  .video-lists {
    background-color: #f0f0f0;
    width: 82.6vw;
    .overview {
      background: #fff;
      padding: 36px;
      border-radius: 10px;
    }
  }
}
.form-wrap {
  display: flex;
  height: 40px;
  align-items: center;
  .form-item {
    display: flex;
    margin-right: 30px;
    align-items: center;
    p,
    .el-button {
      margin-right: 30px;
    }
  }
  .el-input {
    width: 250px;
  }
}
.table-wrap{
  padding-top: 30px;
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>