<template>
  <div class="video-wrap">
    <div class="video-lists">
      <div class="overview">
        <div class="form-wrap">
          <div class="form-item">
            <p>渠道名称</p>
            <el-cascader
              ref="area"
              v-model="area"
              :options="areaTree"
              :props="props"
              placeholder="请选择渠道名称"
            ></el-cascader>
          </div>
          <div class="form-item">
            <p>行政区划</p>
            <el-cascader
              ref="region"
              v-model="region"
              :options="regionTree"
              :props="regionProps"
              placeholder="请选择行政区划"
            ></el-cascader>
          </div>
          <div class="form-item">
            <p>关键词</p>
            <el-input v-model="keyWord" placeholder="请输入关键词"></el-input>
          </div>
          <div class="form-item">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="getMassifList"
              >查询</el-button
            >
            <!-- <el-button icon="el-icon-refresh" @click="reset">重置</el-button> -->
          </div>
        </div>
        <div class="table-wrap">
          <div class="add-crew">
            <el-button icon="el-icon-plus" type="primary" @click="addFarmer"
              >新增</el-button
            >
          </div>
          <div class="selectTips">
            已选择
            <span>{{ selectNum }}</span>
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
                <el-dropdown
                  trigger="click"
                  style="width: 60px"
                  @command="handelMassif"
                >
                  <span class="el-dropdown-link">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      :command="commandHandel(scope.row, 'detail')"
                      >地块详情</el-dropdown-item
                    >
                    <el-dropdown-item
                      :command="commandHandel(scope.row, 'delete')"
                      >删除地块</el-dropdown-item
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
        <el-dialog
          title="地块详情"
          :visible.sync="infoDialog"
          center
          width="620px"
        >
          <el-form :model="infoForm">
            <el-form-item label="渠道名称" :label-width="formLabelWidth">
              <el-input v-model="infoForm.canal_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="行政区划" :label-width="formLabelWidth">
              <el-input readonly v-model="infoForm.region_name"></el-input>
            </el-form-item>
            <el-form-item label="渠系面积(亩)" :label-width="formLabelWidth">
              <el-input readonly v-model="infoForm.area"></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
          title="新增"
          :visible.sync="addFaemerVisible"
          center
          width="665px"
        >
          <el-form :model="addForm">
            
            <el-form-item label="灌区名称" :label-width="formLabelWidth">
              <el-cascader
                v-model="addForm.canal"
                :options="areaTree"
                :props="props"
                placeholder="请选择灌区名称"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="行政区划" :label-width="formLabelWidth">
              <el-cascader
                v-model="addForm.region"
                :options="regionTree"
                :props="regionProps"
                placeholder="请选择行政区划"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="种植面积(亩)" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.area"
                placeholder="请输入种植面积(亩)"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="addMassif">确 定</el-button>
            <el-button @click="addFaemerVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="编辑"
          :visible.sync="editDialog"
          center
          width="665px"
        >
          <el-form :model="editForm">
            
            <el-form-item label="灌区名称" :label-width="formLabelWidth">
              <el-cascader
                v-model="editForm.canal"
                :options="areaTree"
                :props="props"
                placeholder="请选择灌区名称"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="行政区划" :label-width="formLabelWidth">
              <el-cascader
                v-model="editForm.region"
                :options="regionTree"
                :props="regionProps"
                placeholder="请选择行政区划"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="种植面积(亩)" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.area"
                placeholder="请输入种植面积(亩)"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="editMassif">确 定</el-button>
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
      checkList: [],
      addFaemerVisible: false,
      area: "",
      selectNum: 0,
      props: {
        value: "canal_code",
        label: "canal_name",
        children: "child",
        emitPath:false
      },
      region: "",
      regionProps: {
        value: "region_num",
        label: "region_name",
        children: "child",
        emitPath:false
      },
      keyWord: "",
      pumpData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      tableConfig: [
        {
          label: "地块编号",
          value: "farmland_code",
        },
        // {
        //   label: "农户名称",
        //   value: "peasant_name",
        // },
        // {
        //   label: "农户编号",
        //   value: "peasant_code",
        // },
        {
          label: "所属地区",
          value: "region_name",
        },
        {
          label: "地区编号",
          value: "region_num",
        },
        {
          label: "所属灌区",
          value: "canal_name",
        },
        {
          label: "灌区编号",
          value: "canal_code",
        },
        {
          label: "种植面积(亩)",
          value: "area",
        },
        // {
        //   label: "种植作物",
        //   value: "crop",
        // },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      infoDialog:false,
      editDialog: false,
      editForm: {
        id:null,
        canal: "",
        region: "",
        area: "",
      },
      addForm: {
        canal: "",
        region: "",
        area: "",
      },
      infoForm:{},
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapState(["regionTree", "areaTree"]),
  },
  mounted() {
    this.getMassifList();
  },
  methods: {
    // 重置
    reset() {
      this.area = "";
      this.farmerName = "";
      this.pumpData = [];
    },
    // 获取地块列表
    getMassifList() {
      let postData = {
        keyword: this.keyWord,
        canal_code: this.area,
        region_num: this.region,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: this.pageSize,
      };
      this.axios
        .post("/farmland_index", postData)
        .then((res) => {
          if (res.code == 0) {
            this.pumpData = res.data.data;
            this.total = res.data.total;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加地块
    addMassif() {
      let postData = {
        region_num: this.addForm.region,
        canal_code: this.addForm.canal,
        area: this.addForm.area,
      };
      this.axios
        .post("/farmland_add", postData)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type:"success",
              message:"添加成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"添加失败"
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 表格选择
    handleSelectionChange(val) {
      this.selectNum = val.length;
    },
    // 下拉菜单
    handelMassif(row) {
      console.log(row);
      if (row.type == "detail") {
        this.infoDialog = true;
        let postData = {
          id: row.id,
          code: row.farmland_code,
        };
        this.axios
          .post("/farmland_record", postData)
          .then((res) => {
            if (res.code == 0) {
              this.infoForm = res.data;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (row.type == "delete") {
        this.$confirm("确认删除？")
          .then((_) => {
            let postData = {
              id: row.id,
            };
            this.axios
              .post("/farmland_del", postData)
              .then((res) => {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: "删除成功",
                  });
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
            done();
          })
          .catch((_) => {});
      }
    },
    // 下拉菜单参数转换
    commandHandel(row, type) {
      return {
        ...row,
        type,
      };
    },
    handleClick(row) {
      console.log(row);
      this.editForm.region = row.region_num
      this.editForm.canal = row.canal_code
      this.editForm.area = row.area
      this.editForm.id = row.id
      this.editDialog = true;
    },
    // 编辑地块
    editMassif(){
      let postData = {
        region_num: this.editForm.region,
        canal_code: this.editForm.canal,
        area: this.editForm.area,
        id: this.editForm.id
      };
      this.axios
        .post("/farmland_edit", postData)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type:"success",
              message:"编辑成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"编辑失败"
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addFarmer() {
      this.addFaemerVisible = true;
    },
    exportTable() {},
    handleSizeChange(val) {
      this.pageSize = val
      this.getMassifList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getMassifList()
    },
    prevHandel(){
      this.currentPage--
      this.getMassifList()
    },
    nextHandel(){
      this.currentPage++
      this.getMassifList()
    }
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