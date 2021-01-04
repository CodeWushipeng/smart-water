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
            <el-button type="primary" icon="el-icon-search" @click="getCrops">查询</el-button>
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
                    <el-dropdown-item @click.native="deleteCrop(scope.row)">删除</el-dropdown-item>
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
        <el-dialog title="编辑" :visible.sync="editDialog" center width="620px">
          <el-form :model="editForm">
            <el-form-item label="作物名称" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.crop"
                placeholder="请输入作物名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="每季每亩额定用量" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.water"
                placeholder="请输入额定用量"
              ></el-input>
            </el-form-item>
            <el-form-item label="系数" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.coefficient"
                placeholder="请输入系数"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="editCrop"
              >确 定</el-button
            >
            <el-button @click="editDialog = false">关 闭</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="新增"
          :visible.sync="addFaemerVisible"
          center
          width="665px"
        >
          <el-form :model="addForm">
            <el-form-item label="作物名称" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.crop"
                placeholder="请输入作物名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="每季每亩额定用量" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.water"
                placeholder="请输入额定用量"
              ></el-input>
            </el-form-item>
            <el-form-item label="系数" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.coefficient"
                placeholder="请输入系数"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="addCrop"
              >确 定</el-button
            >
            <el-button @click="addFaemerVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../../utils/bus";
import FileSaver from "file-saver";
import XLSX from "xlsx";
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
          label: "ID",
          value: "id",
        },
        {
          label: "作物名称",
          value: "crop",
        },
        {
          label: "额定水量",
          value: "water",
        },
        {
          label: "系数",
          value: "coefficient",
        },
      ],
      currentPage: 1,
      pageSize:10,
      total:0,
      editDialog: false,
      editForm: {
        crop: "",
        water: "",
        coefficient: "",
      },
      addForm: {
        crop: "",
        water: "",
        coefficient: "",
      },
      formLabelWidth: "130px",
    };
  },
  mounted() {
    this.getCrops()
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
        .post("/crop_index", data)
        .then((res) => {
          if (res.code == "0") {
            this.pumpData = res.data.data;
            this.total = res.data.total
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
    addCrop(){
      let data = {
        crop: this.addForm.crop,
        water: this.addForm.water,
        coefficient: this.addForm.coefficient,
      };
      this.axios
        .post("/crop_add", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type:"success",
              message:"添加作物成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"添加作物失败"
            })
          }
          this.addFaemerVisible = false
        })
        .catch((error) => {
          console.log(error);
          this.addFaemerVisible = false
        });
    },
    // 编辑弹出框
    handleClick(row) {
      console.log(row);
      this.editForm = row
      this.editDialog = true;
    },
    // 编辑作物
    editCrop(){
      let data = {
        id: this.editForm.id,
        crop: this.addForm.crop,
        water: this.addForm.water,
        coefficient: this.addForm.coefficient,
      };
      this.axios
        .post("/crop_edit", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type:"success",
              message:"编辑作物成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"编辑作物失败"
            })
          }
          this.editDialog = false
        })
        .catch((error) => {
          console.log(error);
          this.editDialog = false
        });
    },
    // 删除作物
    deleteCrop(row){
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
            .post("/crop_del", data)
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
    exportTable() {},
    handleSizeChange(val) {
      this.pageSize = val
      this.getCrops()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCrops()
    },
    // 上一页
    prevHandle(){
      this.currentPage--
      this.getCrops()
    },
    // 下一页
    nextHandle(){
      this.currentPage++
      this.getCrops()
    },
    // 作物详情
    getCropInfo() {
      let data = {
        id: "",
      };
      this.axios
        .post("/crop_record", data)
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
.add-crew{
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