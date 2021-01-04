<template>
  <div class="video-wrap">
    <div class="tree-wrap">
      <sm-tree :treeData="treeData" :prop="treeProp"></sm-tree>
    </div>
    <div class="video-lists">
      <div class="overview">
        <p class="tips">
          说明：每天08：00-09：30，上报明天、后天、大后天的农户计划用水量，超出时间段无法填报
        </p>
        <div class="select-pump">
          <!-- <p>用水户</p>
          <el-input v-model="user" placeholder="请输入用水户"></el-input> -->
          <p>用水日期</p>
          <el-date-picker v-model="useDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="getWaterList"
            >查询</el-button
          >
          <!-- <el-button type="primary" @click="calculation = true">
            <i class="icon iconfont icon-jisuanqi"></i>
            测算计划水量
          </el-button> -->
          <el-button icon="el-icon-bottom">模板下载</el-button>
        </div>
        <div class="table-wrap">
          <div class="selectTips">
            已选择
            <span>{{ selectNumbers }}</span>
            项
          </div>
          <el-table
            :data="pumpData"
            style="width: 100%"
            :header-cell-style="headerStyle"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              align="center"
              prop="id"
              width="50"
              label="ID"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="date"
              label="用水日期"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="farmland_code"
              label="地块编码"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="peasant_name"
              label="农户名称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="canal_name"
              label="渠道名称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="pump_station_name"
              label="泵站名称"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="crop"
              label="农作物"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="user_water_use"
              label="用水量（m³）"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="date"
              label="灌季"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="area"
              label="面积（亩）"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="water_rates"
              label="金额（元）"
            ></el-table-column>
            <el-table-column align="center" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  >编辑</el-button
                >
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
              :page-size="pageSize"
              layout="prev, pager, next, sizes, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <el-dialog title="编辑" :visible.sync="editDialog" center width="700px">
          <el-form :model="form" class="form-wrap">
            <el-form-item label="用水户" :label-width="formLabelWidth">
              <el-input
                v-model="form.canal"
                placeholder="请输入用水户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker
                type="date"
                v-model="form.date"
                placeholder="请选择开始时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="需水量" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入需水量"
                v-model="form.waterNumber"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="editForm(form)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="测算计划水量"
          :visible.sync="calculation"
          center
          width="60%"
        >
          <div class="date-wrap">
            <p>测算时间</p>
            <el-date-picker
              type="date"
              v-model="form.personCode"
              placeholder="请选择开始时间"
            ></el-date-picker>
          </div>
          <div class="dialogwrap">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
            <div style="marginleft: 20px">
              <el-table
                :data="pumpData"
                style="width: 100%"
                :header-cell-style="headerStyle"
                border
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                  prop="date"
                  label="序号"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="date"
                  label="取水户名称"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="date"
                  label="行政区域"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="种植面积（亩）"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="种植作物"
                  width="150"
                ></el-table-column>
              </el-table>
            </div>
          </div>
          <div slot="footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../../utils/bus";
import { mapState } from "vuex";
export default {
  data() {
    return {
      treeData: [
        {
          canal_name: "灌区信息服务平台",
          id: "",
          child: [],
        },
      ],
      treeProp: {
        label: "canal_name",
        value: "id",
        children: "child",
      },
      treeValue: "",
      currentRow: {},
      selectNumbers: 0,
      defaultProps: {
        children: "children",
        label: "label",
      },
      select: -1,
      model: "",
      point: "",
      date: "",
      user: "",
      useDate: "",
      pumpData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      currentPage: 1,
      pageSize: 10,
      total: 10,
      editDialog: false,
      calculation: false,
      form: {
        canal: "",
        canalCode: "",
        person: "",
        personCode: "",
        waterNumber: "",
        date: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapState(["areaTree"]),
  },
  watch: {
    treeData: {
      immediate: true,
      deep: true,
      handler: function () {
        console.log(this.areaTree);
      },
    },
  },
  created() {
    this.treeData[0].child = this.areaTree;
  },
  mounted() {
    Bus.$on("getData", (value) => {
      console.log(value);
      this.treeValue = value.canal_name;
    });
  },
  methods: {
    // 请求用水列表
    getWaterList() {
      if (!this.useDate) {
        this.$message({
          type: "error",
          message: "请选择用水日期",
        });
        return;
      } else {
        let postData = {
          keyword: this.treeValue,
          order_field: "",
          order_type: "desc",
          page: this.currentPage,
          page_size: this.pageSize,
          date: this.useDate,
        };
        this.axios
          .post("/water_index", postData)
          .then((res) => {
            if (res.code == 0) {
              this.pumpData = res.data.data;
              this.total = res.data.total;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 表格选择
    handleSelectionChange(val) {
      console.log(val);
      this.selectNumbers = val.length;
    },
    handleClick(row) {
      console.log(row);
      this.currentRow = row;
      this.editDialog = true;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handelTab(index) {
      this.select = index;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getWaterList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getWaterList();
    },
    editForm(formName) {
      this.currentRow.peasant_id = this.form.personCode;
      this.currentRow.date = this.form.date;
      this.currentRow.user_water_use = this.form.waterNumber;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-wrap {
  display: flex;
  .tree-wrap {
    width: 334px;
    padding: 39px 0 0;
    font-size: 22px;
    color: #171819;
    cursor: pointer;
    .el-tree {
      height: 56px;
      .el-tree-node {
        height: 56px;
        padding-left: 76px;
        line-height: 56px;
      }
    }
    .tree-header {
      font-size: 22px;
      height: 56px;
      padding-left: 32px;
      display: flex;
      align-items: center;
      .icon-arr-left {
        margin-right: 10px;
        color: #4280dc;
        font-size: 26px;
        transition: all 0.2s linear;
      }
      .down {
        transform-origin: 50% 50%;
        transform: rotate(90deg);
      }
    }

    .active,
    .el-tree-node:hover {
      background: #4280dc;
      color: #fff;
    }
  }
  .video-lists {
    padding: 23px;
    background-color: #f0f0f0;
    width: 100vw;
    .overview {
      background: #fff;
      padding: 36px;
      border-radius: 10px;
      .tips {
        font-size: 20px;
        color: #f01818;
        margin-bottom: 20px;
      }
    }
  }
}
.form-wrap {
  width: 500px;
  margin: 0 auto;
}
.water-wrap {
  width: 641px;
  height: 142px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 25px;
  box-sizing: border-box;
  .area {
    margin: 0 0 17px 0;
    .el-input {
      margin-right: 22px;
    }
  }
}
.select-pump {
  height: 113px;
  display: flex;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-button,
  .el-input,
  .el-date-editor {
    margin-right: 30px;
  }
  .el-input {
    width: 250px;
  }
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.table-wrap {
  > .el-button {
    margin-bottom: 20px;
  }
  .el-dropdown {
    cursor: pointer;
    margin-left: 8px;
    color: #4280dc;
    font-size: 12px;
  }
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
.el-form-item {
  .el-select,
  .el-input {
    width: 300px;
  }
}
.dialogwrap {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.date-wrap {
  display: flex;
  align-items: center;
  p {
    margin-right: 20px;
  }
}
</style>