<template>
  <div class="canal-wrap">
    <div class="tree-aside">
      <sm-tree :treeData="treeData" :prop="treeProp"></sm-tree>
    </div>
    <div class="water-main">
      <div class="handel">
        <!-- <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin: 20px 0"
        @click="handelDialog"
        >充值</el-button> -->
        <el-select placeholder="请选择缴费状态" v-model="status" style="margin-right:30px">
          <el-option label="全部" value="0"></el-option>
          <el-option label="未缴费" value="1"></el-option>
          <el-option label="已缴费" value="2"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getRecords"
          >查询</el-button
        >
      </div>
      <div class="table-wrap">
        <el-tabs type="border-card">
          <el-tab-pane label="消费记录">
            <el-table
              :data="waterRate"
              style="width: 100%"
              :header-cell-style="headerStyle"
              border
            >
              <el-table-column
                align="center"
                prop="id"
                label="记录编号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="create_time"
                label="交易时间"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="peasant_name"
                label="农户名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="peasant_code"
                label="农户编号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="change_type"
                label="类型"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="money"
                label="变动金额"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="content"
                label="说明"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="status"
                label="状态"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="account"
                label="金额"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="balance"
                label="用户变动后余额"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row[scope.column.property]<100" style="color:red">{{scope.row[scope.column.property]}}</span>
                  <span v-else>{{scope.row[scope.column.property]}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="address" label="操作">
                <template>
                  <el-button type="text" icon="el-icon-edit-outline"
                    >详情</el-button
                  >
                </template>
              </el-table-column>
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
          </el-tab-pane>
          <el-tab-pane label="充值记录">
            <el-table
              :data="rateRecords"
              style="width: 100%"
              :header-cell-style="headerStyle"
              border
            >
              <el-table-column
                align="center"
                prop="date"
                label="记录编号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="name"
                label="交易时间"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="农户名称"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="农户编号"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="类型"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="变动金额"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="说明"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="状态"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="金额"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="用户变动后余额"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row[scope.column.property]<100" style="color:red">{{scope.row[scope.column.property]}}</span>
                  <span v-else>{{scope.row[scope.column.property]}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="address" label="操作">
                <template>
                  <el-button type="text" icon="el-icon-edit-outline"
                    >详情</el-button
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
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="prev, pager, next, sizes, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="addDialog"
      center
      width="700px"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="农户编码"
          :label-width="formLabelWidth"
          prop="canal"
        >
          <el-input
            v-model="form.person"
            placeholder="请输入农户编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="农户信息" :label-width="formLabelWidth">
          <div class="info">
            <div>www</div>
            <div>www</div>
            <div>www</div>
            <div>www</div>
          </div>
        </el-form-item>
        <el-form-item
          label="金额"
          :label-width="formLabelWidth"
          prop="canalCode"
        >
          <el-input v-model="form.money" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="说明" :label-width="formLabelWidth" prop="person">
          <el-input type="textarea" placeholder="请进行说明" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="toRecharge">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Bus from "../../utils/bus";
import { mapState } from "vuex";
export default {
  data() {
    return {
      headerStyle: {
        background: "#f6f6f6",
      },
      treeData: [
        {
          canal_name: "尊村灌区服务中心",
          id: "",
          child: [],
        },
      ],
      treeProp: {
        label: "canal_name",
        value: "canal_code",
        children: "child",
      },
      treeValue: "",
      status: "0",
      waterRate: [],
      rateRecords: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      form: {
        person: "",
        money: "",
        content: "",
      },
      dialogTitle: "充值",
      addDialog: false,
      formLabelWidth: "100px",
      rules: {},
    };
  },
  computed: {
    ...mapState(["areaTree"]),
  },
  created() {
    this.treeData[0].child = this.areaTree;
    this.getRecords();
  },
  mounted() {
    console.log(this.treeData);
    Bus.$on("getData", (value) => {
      console.log(value);
      this.treeValue = value;
    });
  },
  methods: {
    handelDialog() {
      this.addDialog = true;
    },
    // 获取金额变动列表
    getRecords() {
      let data = {
        keyword: this.status,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: this.pageSize,
      };
      this.axios
        .post("/cost_index", data)
        .then((res) => {
          if (res.code == "0") {
            this.total = res.data.total;
            this.waterRate = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 充值
    toRecharge() {
      let data = {
        peasant_id: this.form.person,
        money: this.form.money,
        content: this.form.content,
      };
      this.axios
        .post("/cost_add", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "充值成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "充值失败",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRecords();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRecords();
    },
    prevHandel() {
      this.currentPage--;
      this.getRecords();
    },
    nextHandel() {
      this.currentPage++;
      this.getRecords();
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
    background: #fff;
  }
  .water-main {
    flex: 1;
    .handel {
      margin: 20px 0;
      .select-pump {
        height: 113px;
        display: flex;
        padding: 40px 0;
        height: 40px;
        align-items: center;
      }
    }

    .page {
      margin-top: 40px;
      display: flex;
      justify-content: center;
    }
    .el-dropdown {
      color: #409eff;
      margin-left: 20px;
    }
    .area .el-form-item__content .el-form-item {
      display: flex;
    }
    .area .el-form-item__content .el-form-item .el-select {
      width: 100px;
      margin-right: 10px;
    }
    .info {
      border-radius: 10px;
      background-color: #f5f5f5;
      padding: 10px 20px;
    }
    .el-form-item {
      width: 500px;
    }
  }
}
</style>