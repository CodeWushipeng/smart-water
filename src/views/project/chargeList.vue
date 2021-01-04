<template>
  <div class="canal-wrap">
    <div class="select-pump">
      <p>关键词</p>
      <el-input
        v-model="searchData"
        placeholder="请输入搜索关键词"
        style="width: 300px; margin-right: 30px"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="getChargeList"
        >查询</el-button
      >
    </div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 20px"
      @click="handelDialog"
      >新增</el-button
    >
    <div class="table-wrap">
      <el-table
        :data="pumpData"
        style="width: 100%"
        :header-cell-style="headerStyle"
        border
      >
        <el-table-column
          align="center"
          prop="manager_code"
          label="负责人编码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="manager_name"
          label="负责人名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="canal_name"
          label="负责灌区"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="canal_code"
          label="灌区编码"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit-outline"
              @click="editPerson(scope.row)"
              >编辑</el-button
            >
            <el-dropdown @command="deletePerson(scope.row)">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>删除</el-dropdown-item
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
          :page-size="10"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addDialog"
      center
      width="700px"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="负责人名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.person"
            placeholder="请输入负责人名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.tel" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item
          label="负责灌区"
          :label-width="formLabelWidth"
          class="area"
        >
          <div>
            <el-form-item label="干渠">
              <el-select v-model="form.trunk">
                <el-option
                  v-for="(item, index) in trunkList"
                  :key="index"
                  :label="item.canal_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支渠">
              <el-select
                v-model="form.branch"
                :loading="loading"
                @focus="getAreaList(form.trunk, 'branch')"
              >
                <el-option
                  v-for="(item, index) in branchList"
                  :key="index"
                  :label="item.canal_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="斗渠">
              <el-select
                v-model="form.funnel"
                @focus="getAreaList(form.branch, 'funnel')"
              >
                <el-option
                  v-for="(item, index) in funnelList"
                  :key="index"
                  :label="item.canal_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addPerson">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: "",
      headerStyle: {
        background: "#f6f6f6",
      },
      pumpData: [1],
      currentPage: 1,
      total: 1,
      form: {
        person: "",
        tel: "",
        trunk: "",
        branch: "",
        funnel: "",
      },
      trunkList: [],
      branchList: [],
      funnelList: [],
      dialogTitle: "新增",
      addDialog: false,
      formLabelWidth: "100px",
      rules: {},
      loading: true,
    };
  },
  mounted() {
    this.getChargeList();
  },
  methods: {
    // 获取负责人列表
    getChargeList() {
      let data = {
        keyword: this.searchData,
        page: this.currentPage,
        page_size: 10,
      };
      this.axios
        .post("/manager_index", data)
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
    // 获取灌区
    getAreaList(id = 0, type = "area") {
      let data = {
        keyword: "",
        order_field: "",
        order_type: "desc",
        fid: id,
        page: 1,
        page_size: 1000,
      };
      this.axios
        .post("/canal_index", data)
        .then((res) => {
          this.loading = false;
          if (res.code == 0) {
            if (type == "area") {
              this.trunkList = res.data.data;
            } else if (type == "branch") {
              this.branchList = res.data.data;
            } else if (type == "funnel") {
              this.funnelList = res.data.data;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加负责人
    addPerson() {
      let data, url;
      if (this.dialogTitle == "新增") {
        data = {
          manager_name: this.form.person,
          phone: this.form.tel,
          canal_id: this.form.funnel,
        };
        url = "/manager_add";
      } else if (this.dialogTitle == "编辑") {
        data = {
          manager_name: this.form.person,
          phone: this.form.tel,
          canal_id:
            typeof this.form.funnel == "Number"
              ? this.form.funnel
              : this.form.canal_id,
          id: this.form.id,
        };
        url = "/manager_edit";
      }

      this.axios
        .post(url, data)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "操作失败",
            });
          }
          this.addDialog = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handelDialog() {
      this.dialogTitle = "新增";
      this.addDialog = true;
      this.getAreaList();
    },
    // 编辑
    editPerson(row) {
      console.log(row);
      this.dialogTitle = "编辑";
      this.addDialog = true;
      this.form.person = row.manager_name;
      this.form.tel = row.phone;
      this.form.funnel = row.canal_name;
      this.form.canal_id = row.canal_id;
      this.form.id = row.id;
    },
    // 删除负责人
    deletePerson(row) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.deletePerson(row.id)
          done();
        })
        .catch((_) => {});
    },
    toDelete(id){
      let data = {
        id: id
      }
      this.axios
        .post("/manager_del", data)
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
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getChargeList();
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style scoped lang="scss">
.canal-wrap {
  padding: 0 26px;
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-button {
    margin-right: 30px;
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
.el-input {
  width: 440px;
}
.area .el-form-item__content .el-form-item {
  display: flex;
  margin-bottom: 10px;
}
.area .el-form-item__content .el-form-item .el-select {
  width: 400px;
  margin-right: 10px;
}
</style>