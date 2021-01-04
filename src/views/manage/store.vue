<template>
  <div class="manage">
    <div class="overview">
      <div class="select-pump">
        <p>泵站名称</p>
        <el-select v-model="pump">
          <el-option
          v-for="(item, index) in pumpList"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
        </el-select>
        <p>机组</p>
        <el-select v-model="crew">
          <el-option
          v-for="(item, index) in crewList"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="searchStore"
          >查询</el-button
        >
        <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
      </div>
      <div class="table-wrap">
        <el-table
          :data="pumpData"
          style="width: 100%"
          :header-cell-style="headerStyle"
          border
        >
          <el-table-column
            align="center"
            v-for="(item, index) in tableConfig"
            :key="index"
            :prop="item.value"
            :label="item.label"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button class="handel" @click="warehousing(scope)" type="text"
                >入库</el-button
              >
              <el-button class="handel" @click="warehouseout(scope)" type="text"
                >出库</el-button
              >
              <el-button class="handel" @click="allocation(scope)" type="text"
                >调拨</el-button
              >
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
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      :title="dialogConfig.title"
      :visible.sync="handelVisible"
      width="560px"
    >
      <el-form
        :model="dialogConfig.form"
        class="form-main"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="时间">
          <el-date-picker
            class="form-in"
            v-model="dialogConfig.form.date"
            type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number
            class="form-in"
            v-model="dialogConfig.form.number"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="用途" v-if="dialogConfig.title === '出库'">
          <el-input
            class="form-in"
            type="textarea"
            v-model="dialogConfig.form.purpose"
          ></el-input>
        </el-form-item>
        <el-form-item label="调拨至" v-if="dialogConfig.title === '调拨'">
          <el-select class="form-in" v-model="dialogConfig.form.allocation">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input
            class="form-in"
            v-model="dialogConfig.form.operator"
            autocomplete="on"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary" @click="handelStore">确 定</el-button>
        <el-button @click="handelVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pump: "",
      crew: "",
      pumpData: ["1", "1", "1", "1", "1", "1", "1", "1"],
      headerStyle: {
        background: "#f0f0f0",
      },
      pumpList: [
        {
          label: "一号泵站",
          value: "1号",
        },
        {
          label: "二号泵站",
          value: "2号",
        },
        {
          label: "三号泵站",
          value: "3号",
        },
        {
          label: "四号泵站",
          value: "4号",
        },
      ],
      crewList: [
        {
          label: "一号机组",
          value: "1号",
        },
        {
          label: "二号机组",
          value: "2号",
        },
        {
          label: "三号机组",
          value: "3号",
        },
        {
          label: "四号机组",
          value: "4号",
        },
      ],
      tableConfig: [
        {
          label: "序号",
          value: "",
        },
        {
          label: "泵站名称",
          value: "",
        },
        {
          label: "机组编号",
          value: "",
        },
        {
          label: "责任人",
          value: "",
        },
        {
          label: "品牌",
          value: "",
        },
        {
          label: "规格/参数",
          value: "",
        },
        {
          label: "数量",
          value: "",
        },
      ],
      currentPage: 1,
      total: 1,
      handelVisible: false,
      dialogConfig: {
        title: "",
        form: {
          date: "",
          number: "",
          operator: "",
          purpose: "",
          allocation: "",
        },
      },
      options: [],
      material_id: "",
    };
  },
  mounted() {},
  methods: {
    // 查询
    searchStore() {
      let searchData = {
        keyword: "",
        order_field: "",
        order_type: "",
        page: "",
        page_size: "",
        type: "",
        start_time: "",
        end_time: "",
      };
      this.axios
        .post("/stock_index", searchData)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "查询成功",
            });
            this.pumpData = res.data.data
            this.total = res.data.total
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "网络错误",
          });
        });
    },
    warehousing(row) {
      console.log(row);
      this.dialogConfig.title = "入库";
      this.handelVisible = true;
      let addData = {
        material_id: this.material_id,
        type: "1",
        stock_change: this.dialogConfig.form.number,
        person: this.dialogConfig.form.operator,
        explain: "",
      };
      this.axios
        .post("/stock_add", addData)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "入库成功",
            });
            this.handelVisible = false;
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "网络错误",
          });
        });
    },
    warehouseout(row) {
      console.log(row);
      this.dialogConfig.title = "出库";
      this.handelVisible = true;
    },
    allocation(row) {
      console.log(row);
      this.dialogConfig.title = "调拨";
      this.handelVisible = true;
    },
    handelStore() {},
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
    .handel {
      width: 50px;
      text-align: center;
    }
  }
  .form-main {
    border-top: 1px solid #707070;
    padding-top: 30px;
    .form-in {
      width: 367px;
    }
  }
  .btns {
    display: flex;
    justify-content: center;
  }
  .page {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>