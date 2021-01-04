<template>
  <div class="video-wrap">
    <div class="video-lists">
      <div class="overview">
        <div class="form-wrap">
          <div class="form-item">
            <p>搜索日志</p>
            <el-input
              v-model="journal"
              placeholder="请输入搜索关键词"
            ></el-input>
          </div>
          <div class="form-item">
            <p>创建时间</p>
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="date"
              value-format="yyyy-mm-dd"
            ></el-date-picker>
          </div>
          <div class="form-item">
            <p>操作类型</p>
            <el-select
              v-model="handelModel"
              placeholder="请选择操作类型"
            ></el-select>
          </div>
          <div class="form-item">
            <el-button type="primary" icon="el-icon-search" @click="getHandelLogs">查询</el-button>
            <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
          </div>
        </div>
        <div class="table-wrap">
          <el-table
            :data="pumpData"
            style="width: 100%"
            :header-cell-style="headerStyle"
            border
          >
            <el-table-column type="selection" width="55"></el-table-column>
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
import Bus from "../../utils/bus";
export default {
  data() {
    return {
      journal: "",
      date: "",
      handelModel: "",
      pumpData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      tableConfig: [
        {
          label: "序号",
          value: "",
        },
        {
          label: "日志内容",
          value: "",
        },
        {
          label: "操作人ID",
          value: "",
        },
        {
          label: "操作人名称",
          value: "",
        },
        {
          label: "IP",
          value: "",
        },
        {
          label: "耗时(毫秒)",
          value: "",
        },
        {
          label: "日志类型",
          value: "",
        },
        {
          label: "操作类型",
          value: "",
        },
        {
          label: "创建时间",
          value: "",
        },
      ],
      currentPage: 1,
    };
  },
  mounted() {
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 获取操作日志
    getHandelLogs() {
      let data = {
        keyword: this.journal,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: 10,
        start_time: this.date[0],
        end_time: this.data[1],
      };
      this.axios
        .post("/log_index",data)
        .then((res) => {
          if (res.code == 0) {
            this.pumpData = res.data;
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
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
.table-wrap {
  padding-top: 30px;
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>