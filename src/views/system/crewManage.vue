<template>
  <div class="video-wrap">
    <div class="video-lists">
      <div class="overview">
        <div class="form-wrap">
          <div class="form-item">
            <p>泵站名称</p>
            <el-select v-model="pump" placeholder="请选择泵站">
              <el-option
                v-for="(item, index) in pumpList"
                :key="index"
                :label="item.pump_station_name"
                :value="item.pump_station_code"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <p>关键字</p>
            <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
          <div class="form-item">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
          </div>
        </div>
        <div class="table-wrap">
          <div class="add-crew">
            <el-button icon="el-icon-plus" type="primary" @click="addCrew"
              >添加</el-button
            >
          </div>
          <!-- <div class="selectTips">
            已选择
            <span>3</span>
            项
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
                    <el-dropdown-item @click.native="crewInfo(scope.row)">查看</el-dropdown-item>
                    <el-dropdown-item @click.native="deletePump(scope.row)">删除</el-dropdown-item>
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
            <el-form-item label="灌区编码" :label-width="formLabelWidth">
              <el-input
                v-model="editForm.canalCode"
                placeholder="请选择泵站编码"
              ></el-input>
            </el-form-item>
            <el-form-item label="泵站名称" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入泵站名称"
                v-model="editForm.pumpName"
              ></el-input>
            </el-form-item>
            <el-form-item label="地形扬程(m)" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入地形扬程"
                v-model="editForm.terrainLift"
              ></el-input>
            </el-form-item>
            <el-form-item label="设计扬程(m)" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入设计扬程(m)"
                v-model="editForm.designLift"
              ></el-input>
            </el-form-item>
            <el-form-item label="损耗系数" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入损耗系数"
                v-model="editForm.loss"
              ></el-input>
            </el-form-item>
            <el-form-item label="供水排序" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入供水排序"
                v-model="editForm.waterSort"
              ></el-input>
            </el-form-item>
            <el-form-item label="供水时间间隔" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入供水时间间隔"
                v-model="editForm.interval"
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
          title="添加斗渠"
          :visible.sync="addCrewVisible"
          center
          width="665px"
        >
          <el-form :model="addForm">
            <el-form-item label="灌区编码" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.canalCode"
                placeholder="请选择泵站编码"
              ></el-input>
            </el-form-item>
            <el-form-item label="泵站名称" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入泵站名称"
                v-model="addForm.pumpName"
              ></el-input>
            </el-form-item>
            <el-form-item label="地形扬程(m)" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入地形扬程"
                v-model="addForm.terrainLift"
              ></el-input>
            </el-form-item>
            <el-form-item label="设计扬程(m)" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入设计扬程(m)"
                v-model="addForm.designLift"
              ></el-input>
            </el-form-item>
            <el-form-item label="损耗系数" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入损耗系数"
                v-model="addForm.loss"
              ></el-input>
            </el-form-item>
            <el-form-item label="供水排序" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入供水排序"
                v-model="addForm.waterSort"
              ></el-input>
            </el-form-item>
            <el-form-item label="供水时间间隔" :label-width="formLabelWidth">
              <el-input
                placeholder="请输入供水时间间隔"
                v-model="addForm.interval"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="fetchAddForm"
              >确 定</el-button
            >
            <el-button @click="addCrewVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      addCrewVisible: false,
      pump: "",
      keyword: "",
      pumpData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      tableConfig: [
        {
          label: "泵站名称",
          value: "pump_station_name",
        },
        {
          label: "机组名称",
          value: "pump_name",
        },
        {
          label: "水泵型号",
          value: "pump_version",
        },
        {
          label: "电机型号",
          value: "electrical_version",
        },
        {
          label: "设计扬程(m)",
          value: "design_lift",
        },
        {
          label: "设计流量(m³/s)",
          value: "water_flow",
        },
        {
          label: "设计功率(KW)",
          value: "installed_capacity",
        },
        {
          label: "售后电话",
          value: "phone",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      editDialog: false,
      editForm: {
        id:"",
        canalCode: "",
        pumpName: "",
        terrainLift: "",
        designLift: "",
        loss: "",
        waterSort: "",
        interval: "",
      },
      addForm: {
        canalCode: "",
        pumpName: "",
        terrainLift: "",
        designLift: "",
        loss: "",
        waterSort: "",
        interval: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed:{
    ...mapState(["pumpList"])
  },
  created() {
    this.getPumpLists()
  },
  methods: {
    // 获取泵站数据
    getPumpLists() {
      let data = {
        keyword: this.keyword,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: this.pageSize,
      };
      this.axios
        .post("/pump_index", data)
        .then((res) => {
          if (res.code == 0) {
            this.pumpData = res.data.data;
            this.total = res.data.total;
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
    // 添加泵站
    addPump() {
      let data = {
        canal_code: this.addForm.canalCode,
        pump_station_name: this.addForm.pumpName,
        terrain_lift: this.addForm.terrainLift,
        design_lift: this.addForm.designLift,
        loss: this.addForm.loss,
        water_sort: this.addForm.waterSort,
        interval: this.addForm.interval,
      };
      this.axios
        .post("/pump_add", data)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "添加成功",
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
    },
    // 编辑泵站
    editPump() {
      let data = {
        id: this.editForm.id,
        canal_code: this.editForm.canalCode,
        pump_station_name: this.editForm.pumpName,
        terrain_lift: this.editForm.terrainLift,
        design_lift: this.editForm.designLift,
        loss: this.editForm.loss,
        water_sort: this.editForm.waterSort,
        interval: this.editForm.interval,
      };
      this.axios
        .post("/pump_edit", data)
        .then((res) => {
          if (res.code == 0) {
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
    },
    // 删除泵站
    deletePump(target){
      let data = {
        id: target.id
      }
      this.axios
        .post("/pump_del", data)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功",
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
    },
    // 编辑按钮事件
    handleClick(row) {
      console.log(row);
      this.editForm.id = row.id
      this.editForm.canalCode = row.canal_code
      this.editForm.pumpName = row.pump_station_name
      this.editForm.terrainLift = row.terrain_lift
      this.editForm.designLift = row.design_lift
      this.editForm.loss = row.loss
      this.editForm.waterSort = row.water_sort
      this.editForm.interval = row.interval
      this.editDialog = true;
    },
    fetchEditForm(){
      this.editPump()
      this.editDialog = false;
    },
    fetchAddForm(){
      this.addPump()
      this.addCrewVisible = false
    },
    // 添加
    addCrew() {
      this.addCrewVisible = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPumpLists();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPumpLists();
    },
    prevHandel() {
      this.currentPage--;
      this.getPumpLists();
    },
    nextHandel() {
      this.currentPage++;
      this.getPumpLists();
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
    width: 100%;
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