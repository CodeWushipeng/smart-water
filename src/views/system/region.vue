<template>
  <div class="video-wrap">
    <div class="video-lists">
      <div class="overview">
        <div class="form-wrap">
          <div class="form-item">
            <p>关键词</p>
            <el-input v-model="search" placeholder="请输入关键词"></el-input>
          </div>
          <div class="form-item">
            <el-button type="primary" icon="el-icon-search" @click="getRegion"
              >查询</el-button
            >
          </div>
        </div>
        <div class="table-wrap">
          <div class="add-crew">
            <el-button icon="el-icon-plus" type="primary" @click="addFarmer"
              >新增</el-button
            >
          </div>
          <el-table
            :data="pumpData"
            style="width: 100%"
            :header-cell-style="headerStyle"
            border
          >
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
              width="180px"
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
              @prev-click="prevHandel"
              @next-click="nextHandel"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="prev, pager, next, sizes, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <el-dialog title="编辑" :visible.sync="editDialog" center width="620px">
          <el-form :model="editForm">
            <el-form-item label="上级区域" :label-width="formLabelWidth">
              <el-cascader
                ref="area"
                v-model="editForm.father"
                :options="regionTree"
                :props="props"
                placeholder="请选择上级区域"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="区域名称" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.regionName"
                placeholder="请输入区域名称"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="fetchEditForm"
              >确 定</el-button
            >
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
            <el-form-item label="上级区域" :label-width="formLabelWidth">
              <el-cascader
                ref="area"
                v-model="addForm.father"
                :options="regionTree"
                :props="props"
                placeholder="请选择上级区域"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="区域名称" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.regionName"
                placeholder="请输入区域名称"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="toAddRegion">确 定</el-button>
            <el-button @click="addFaemerVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      addFaemerVisible: false,
      search: "",
      pumpData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      tableConfig: [
        {
          label: "地区编码",
          value: "region_num",
        },
        {
          label: "地区名称",
          value: "region_name",
        },
      ],
      currentPage: 1,
      pageSize: 0,
      total: 0,
      editDialog: false,
      props: {
        value: "region_num",
        label: "region_name",
        children: "child",
        emitPath:false
      },
      editForm: {
        father: "",
        regionName: "",
      },
      addForm: {
        father: "",
        regionName: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapState(["regionTree"]),
  },
  mounted() {
    this.getRegion();
  },
  methods: {
    // 获取区域列表
    getRegion() {
      let data = {
        keyword: this.search,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: 10,
        fid: "",
      };
      this.axios
        .post("/region_index", data)
        .then((res) => {
          if (res.code == "0") {
            this.pumpData = res.data.data;
            this.total = res.data.total;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleClick(row) {
      console.log(row);
      this.editDialog = true;
    },
    addFarmer() {
      this.addFaemerVisible = true;
    },
    // 增加区域
    toAddRegion() {
      let data = {
        region_name: this.addForm.regionName,
        fid: this.addForm.father,
      };
      this.axios
        .post("/region_add", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "添加成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "添加失败",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.addFaemerVisible = false;
    },
    // 编辑区域
    fetchEditForm() {
      let data = {
        region_name: this.addForm.regionName,
        region_num: this.addForm.father,
      };
      this.axios
        .post("/region_edit", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "编辑成功",
            });
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
      this.editDialog = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getRegion();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getRegion();
    },
    prevHandel() {
      this.currentPage--;
      this.getRegion();
    },
    nextHandel() {
      this.currentPage++;
      this.getRegion();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDialog = false;
        } else {
          console.log("error submit!!");
          return false;
        }
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
    addFarmerData() {
      let data = {
        peasant_name: "王武",
        identity_card: 140107196004043477,
        water_code: "codjh5W",
        address: "地址地址地址",
        mobile: 13566667449,
      };
      this.axios
        .post("/peasant_add", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "添加农户成功",
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
  .tree-wrap {
    width: 334px;
    margin-right: 25px;
    background: #fff;
  }
  .video-lists {
    background-color: #f0f0f0;
    width: 100vw;
    .overview {
      background: #fff;
      padding: 36px;
      border-radius: 10px;
    }
  }
}
.add-crew {
  margin-bottom: 20px;
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