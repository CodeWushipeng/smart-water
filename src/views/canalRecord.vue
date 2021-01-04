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
            <el-button type="primary" icon="el-icon-search" @click="getCrops"
              >查询</el-button
            >
          </div>
        </div>
        <div class="table-wrap">
          <!-- <div class="add-crew">
            <el-button icon="el-icon-plus" type="primary" @click="addFarmer"
              >新增</el-button
            >
          </div> -->
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
                <el-dropdown trigger="click" style="width: 60px">
                  <span class="el-dropdown-link">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="deleteCrop(scope.row)"
                      >删除备案</el-dropdown-item
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
              :prev-click="prevHandle"
              :next-click="nextHandle"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="prev, pager, next, sizes, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <el-dialog
          title="新增"
          :visible.sync="addFaemerVisible"
          center
          width="665px"
        >
          <el-form :model="addForm" :rules="addRules" ref="addForm">
            <el-form-item
              label="作物名称"
              :label-width="formLabelWidth"
              prop="crop"
            >
              <el-input
                v-model="addForm.crop"
                placeholder="请输入作物名称"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="农户姓名"
              :label-width="formLabelWidth"
              prop="peasant_code"
            >
              <el-input
                v-model="addForm.peasant_code"
                placeholder="请输入农户姓名"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="农户地块"
              :label-width="formLabelWidth"
              prop="farmland_code"
            >
              <el-input
                v-model="addForm.farmland_code"
                placeholder="请输入农户地块"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="种植面积"
              :label-width="formLabelWidth"
              prop="area"
            >
              <el-input
                v-model="addForm.area"
                placeholder="请输入种植面积"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="addCrop">确 定</el-button>
            <el-button @click="addFaemerVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
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
          label: "农户名称",
          value: "peasant_name",
        },
        {
          label: "地块编码",
          value: "farmland_code",
        },
        {
          label: "区域名称",
          value: "region_name",
        },
        {
          label: "种植面积",
          value: "area",
        },
        {
          label: "种植作物",
          value: "crop",
        },
        {
          label: "灌区名称",
          value: "canal_name",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addForm: {
        crop: "",
        peasant_code: "",
        farmland_code: "",
        area: "",
      },
      addRules: {
        crop: [
          {
            required: true,
            message: "请输入作物名称",
            trigger: "blur",
          },
        ],
        peasant_code: [
          {
            required: true,
            message: "请输入农户姓名",
            trigger: "blur",
          },
        ],
        farmland_code: [
          {
            required: true,
            message: "请输入农户地块",
            trigger: "blur",
          },
        ],
        area: [
          {
            required: true,
            message: "请输入种植面积",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "130px",
    };
  },
  mounted() {
    this.getCrops();
  },
  methods: {
    // 获取作物列表
    getCrops() {
      let data = {
        keyword: this.search,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: this.pageSize,
      };
      this.axios
        .post("/plant_index", data)
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
    // 显示添加表单
    addFarmer() {
      this.addFaemerVisible = true;
    },
    // 添加作物
    addCrop() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          let data = {
            crop: this.addForm.crop,
            peasant_code: this.addForm.peasant_code,
            farmland_code: this.addForm.farmland_code,
            area: this.addForm.area,
          };
          this.axios
            .post("/plant_add", data)
            .then((res) => {
              if (res.code == "0") {
                this.$message({
                  type: "success",
                  message: "添加作物成功",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "添加作物失败",
                });
              }
              this.addFaemerVisible = false;
            })
            .catch((error) => {
              console.log(error);
              this.addFaemerVisible = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除作物
    deleteCrop(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: row.farmland_code,
          };
          this.axios
            .post("/plant_del", data)
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCrops();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCrops();
    },
    // 上一页
    prevHandle() {
      this.currentPage--;
      this.getCrops();
    },
    // 下一页
    nextHandle() {
      this.currentPage++;
      this.getCrops();
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