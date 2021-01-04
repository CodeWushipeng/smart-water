<template>
  <div class="video-wrap">
    <div class="video-lists">
      <div class="overview">
        <div class="form-wrap">
          <div class="form-item">
            <p>灌区</p>
            <el-select v-model="area" placeholder="请选择灌区">
              <el-option
                v-for="(item, index) in areaList"
                :key="index"
                :label="item.canal_name"
                :value="item.canal_code"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <p>关键字</p>
            <el-input
              v-model="farmerName"
              placeholder="请输入关键字"
            ></el-input>
          </div>
          <div class="form-item">
            <p>农户编码</p>
            <el-input v-model="idCard" placeholder="请输入农户编码"></el-input>
          </div>
          <div class="form-item">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchFarmer"
              >查询</el-button
            >
            <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
          </div>
        </div>
        <div class="table-wrap">
          <div class="add-crew">
            <el-button icon="el-icon-plus" type="primary" @click="addFarmer"
              >新增</el-button
            >
            <el-button
              icon="el-icon-download"
              type="primary"
              @click="exportTable"
              >导出</el-button
            >
          </div>
          <div class="selectTips">
            已选择
            <span>{{ seleNumber }}</span>
            项
          </div>
          <el-table
            :data="farmerList"
            style="width: 100%"
            :header-cell-style="headerStyle"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              v-for="(item, index) in tableConfig"
              :key="index"
              :prop="item.value"
              :label="item.label"
              align="center"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="220px"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  style="width: 60px"
                  >编辑</el-button
                >
                <el-dropdown trigger="click" style="width: 60px">
                  <span class="el-dropdown-link">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="deleteFarmer(scope.row)"
                      >删除</el-dropdown-item
                    >
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
              :page-size="100"
              layout="prev, pager, next, sizes, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <el-dialog title="编辑" :visible.sync="editDialog" center width="620px">
          <el-form :model="editForm">
            <el-form-item label="行政区划" :label-width="formLabelWidth">
              <el-cascader
                v-model="editForm.region_num"
                placeholder="请选择所属行政区"
                :props="regionProps"
                :options="regionTree"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="农户名称" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.peasant_name"
                placeholder="请输入农户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="农户电话" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.mobile"
                placeholder="请输入农户电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="农户身份证号" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.identity_card"
                placeholder="请输入农户身份证号"
              ></el-input>
            </el-form-item>
            <el-form-item label="农户地址" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.address"
                placeholder="请输入农户地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="水权证号" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.water_code"
                placeholder="请输入水权证号"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="editFarmer">确 定</el-button>
            <el-button @click="addDialog = false">关 闭</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="新增"
          :visible.sync="addFaemerVisible"
          center
          width="665px"
        >
          <el-form :model="addForm">
            <!-- <el-form-item label="灌区名称" :label-width="formLabelWidth">
              <el-select
                v-model="addForm.area"
                placeholder="请选择灌区"
              >
                <el-option v-for="(item,index) in areaList" :key="index" :label="item.canal_name" :value="item.canal_code"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="行政区划" :label-width="formLabelWidth">
              <el-cascader
                v-model="addForm.region"
                placeholder="请选择所属行政区"
                :props="regionProps"
                :options="regionTree"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="农户名称" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.farmerName"
                placeholder="请输入农户名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="农户电话" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.farmerPhone"
                placeholder="请输入农户电话"
              ></el-input>
            </el-form-item>
            <el-form-item label="农户身份证号" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.farmerId"
                placeholder="请输入农户身份证号"
              ></el-input>
            </el-form-item>
            <el-form-item label="农户地址" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.address"
                placeholder="请输入农户地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="水权证号" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.waterCode"
                placeholder="请输入水权证号"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="种植面积(亩)" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.measure"
                placeholder="请输入种植面积"
              ></el-input>
            </el-form-item> -->
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="addFarmerData">确 定</el-button>
            <el-button @click="addFaemerVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    let that = this;
    return {
      addFaemerVisible: false,
      area: "",
      farmerName: "",
      idCard: "",
      select: -1,
      pump: "",
      crew: "",
      farmerList: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      tableConfig: [
        {
          label: "灌区名称",
          value: "region_name_path",
        },
        {
          label: "农户名称",
          value: "peasant_name",
        },
        {
          label: "农户手机号",
          value: "mobile",
        },
        {
          label: "农户身份证号",
          value: "identity_card",
        },
        {
          label: "余额",
          value: "account",
        },
      ],
      seleNumber: 0,
      currentPage: 1,
      total: 0,
      editDialog: false,
      editForm: {
        farmerName: "",
        farmerPhone: "",
        farmerId: "",
        address: "",
        area: "",
        region: "",
        waterCode: "",
      },
      addForm: {
        farmerName: "",
        farmerPhone: "",
        farmerId: "",
        address: "",
        area: "",
        region: "",
        waterCode: "",
      },
      formLabelWidth: "120px",
      regionProps: {
        value: "region_num",
        label: "region_name",
        children: "child",
        emitPath:false
      },
    };
  },
  computed: {
    ...mapState(["areaList", "regionTree"]),
  },
  mounted() {
    this.searchFarmer();
  },
  methods: {
    // 查询农户列表
    searchFarmer() {
      let postData = {
        keyword: this.farmerName,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: 1000,
        peasant_code: this.idCard,
        region_num: this.area,
      };
      this.axios
        .post("/peasant_index", postData)
        .then((res) => {
          if (res.code == 0) {
            this.farmerList = res.data.data;
            this.total = res.data.total;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 选择行
    handleSelectionChange(val) {
      this.seleNumber = val.length;
    },
    handleClick(row) {
      console.log(row);
      this.editForm = row;
      this.editDialog = true;
    },
    // 编辑农户
    editFarmer() {
      let data = {
        id: this.editForm.id,
        peasant_name: this.editForm.peasant_name,
        identity_card: this.editForm.identity_card,
        region_num: this.editForm.region_num,
        water_code: this.editForm.water_code,
        address: this.editForm.address,
        mobile: this.editForm.mobile,
      };
      this.axios
        .post("/peasant_edit", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "编辑农户成功",
            });
            this.searchFarmer();
          } else {
            this.$message({
              type: "error",
              message: "编辑农户失败",
            });
          }
          this.editDialog = false;
        })
        .catch((error) => {
          console.log(error);
          this.editDialog = false;
        });
    },
    addFarmer() {
      this.addFaemerVisible = true;
    },
    // 添加农户请求
    addFarmerData() {
      let data = {
        peasant_name: this.addForm.farmerName,
        identity_card: this.addForm.farmerId,
        region_num: this.addForm.region,
        water_code: this.addForm.waterCode,
        address: this.addForm.address,
        mobile: this.addForm.farmerPhone,
      };
      this.axios
        .post("/peasant_add", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "添加农户成功",
            });
            this.searchFarmer();
          } else {
            this.$message({
              type: "error",
              message: "添加农户失败",
            });
          }
          this.addFaemerVisible = false;
        })
        .catch((error) => {
          console.log(error);
          this.addFaemerVisible = false;
        });
    },
    exportTable() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 删除农户
    deleteFarmer(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: row.id,
          };
          this.axios
            .post("/peasant_del", data)
            .then((res) => {
              if (res.code == "0") {
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
                this.searchFarmer();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 农户详情
    getFarmerInfo() {
      let data = {
        id: 7,
      };
      this.axios
        .post("/peasant_record", data)
        .then((res) => {
          if (res.code == "0") {
            this.pumpData = res.data;
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
  padding: 25px;
  .video-lists {
    background-color: #f0f0f0;
    width: 100%;
    .overview {
      background: #fff;
      padding: 36px;
      border-radius: 10px;
    }
  }
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
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.table-wrap {
  padding: 36px 0;
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