<template>
  <div class="ruler-wrap">
    <div class="ruler-panel">
      <el-button type="primary" icon="el-icon-plus" @click="showAdd"
        >新增</el-button
      >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="menu_name" label="菜单"> </el-table-column>
        <el-table-column prop="organization_name" label="科室">
        </el-table-column>
        <el-table-column prop="role_name" label="职务"> </el-table-column>
        <el-table-column prop="content" label="说明"> </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="showEdit(scope.row)"
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
                <el-dropdown-item @click.native="deleteRule(scope.row)"
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
          :page-size="10"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="addDialog" center width="700px">
      <el-form :model="form">
        <el-form-item label="菜单" :label-width="formLabelWidth">
          <el-cascader
            v-model="form.menu"
            :options="menuList"
            :props="menuProp"
            placeholder="请选择菜单"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-cascader
            v-model="form.org"
            :options="orgList"
            :props="orgProp"
            placeholder="请选择部门"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="职务" :label-width="formLabelWidth">
          <el-select
            v-model="form.role"
            @focus="checkOrg"
            placeholder="请选择职务"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则说明" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="规则说明"
            v-model="form.content"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <div class="in-table">
            <div class="in-wrap">
              <el-select v-model="dataItem" placeholder="数据项"></el-select>
              <el-select v-model="handle" placeholder="操作"></el-select>
              <el-input v-model="dataValue" placeholder="数据值"></el-input>
              <el-button type="primary" icon="el-icon-plus">新增</el-button>
            </div>
            <el-table
              :data="form.ruler"
              height="250"
              border
              style="width: 100%"
            >
              <el-table-column prop="date"> </el-table-column>
              <el-table-column prop="name"> </el-table-column>
              <el-table-column prop="address"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button
                    @click="deleteRule(scope.row)"
                    type="text"
                    size="small"
                    icon="el-icon-edit-outline"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="fetchAddRule">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      form: {
        menu: "",
        org: "",
        role: null,
        content: "",
        ruler: [],
      },
      title: "新增",
      dataItem: "",
      dataValue: "",
      handle: "",
      formLabelWidth: "100px",
      currentPage: 1,
      total: 1,
      addDialog: false,
      menuProp: {
        value: "h5_name",
        label: "menu_name",
        children: "child",
        emitPath: false,
      },
      orgProp: {
        value: "id",
        label: "organization_name",
        children: "child",
        emitPath: false,
      },
      roleList: [],
      roleProp: {
        value: "id",
        label: "role_name",
        children: "child",
        emitPath: false,
      },
    };
  },
  created() {
    this.getRuleLists();
  },
  computed: {
    ...mapState(["orgList", "menuList"]),
  },
  methods: {
    // 获取职务列表
    getRoleLists(org = "") {
      let data = {
        organization_id: org,
      };
      this.axios
        .post("/role_index", data)
        .then((res) => {
          if (res.code == "0") {
            let temp = res.data;
            let result;
            for (const key in temp) {
              if (temp.hasOwnProperty(key)) {
                result = temp[key];
              }
            }
            this.roleList = result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 职务级联聚焦事件
    checkOrg() {
      if (!this.form.org) {
        this.$message({
          type: "error",
          message: "选择部门后才能选择职务",
        });
      } else {
        this.getRoleLists(this.form.org);
      }
    },
    // 获取数据列表
    getRuleLists() {
      let data = {
        page_size: this.pageSize,
        page: this.currentPage,
      };
      this.axios
        .post("/rule_index", data)
        .then((res) => {
          if (res.code == "0") {
            this.tableData = res.data.data;
            this.total = res.data.total;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAdd() {
      this.title = "新增";
      this.form = {
        menu: "",
        org: "",
        role: "",
        content: "",
        ruler: [],
      },
      this.addDialog = true;
    },
    showEdit(target) {
      this.form.menu = target.menu_url,
      this.form.org = target.organization_id,
      this.form.role = target.role_id,
      this.form.content = target.content,
      this.form.ruler = target.rule;
      this.form.id = target.id;
      this.title = "编辑";
      this.addDialog = true;
    },
    // 添加规则
    addRule() {
      let data = {
        menu_url: this.form.menu,
        organization_id: this.form.org,
        role_id: this.form.role,
        content: this.form.content,
        rule: this.form.ruler,
      };
      this.axios
        .post("/rule_add", data)
        .then((res) => {
          if (res.code == "0") {
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
    editRuler() {
      let data = {
        id: this.from.id,
        menu_url: this.form.menu,
        organization_id: this.form.org,
        role_id: this.form.role,
        content: this.form.content,
        rule: this.form.ruler,
      };
      this.axios
        .post("/rule_edit", data)
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
    },
    fetchAddRule() {
      if ((this.title = "新增")) {
        this.addRule();
      } else if ((this.title = "编辑")) {
        this.editRuler();
      }
      this.addDialog = false;
    },
    fetchDeleteRuler(target) {
      let data = {
        id: target,
      };
      this.axios
        .post("/rule_del", data)
        .then((res) => {
          if (res.code == "0") {
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
    // 删除规则
    deleteRule(row) {
      let deleteID = row.id;
      this.$confirm("确定删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.fetchDeleteRuler(deleteID);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getRuleLists();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getRuleLists(0);
    },
  },
};
</script>

<style scoped lang="scss">
.ruler-wrap {
  padding: 25px;
  background-color: #f5f5f5;
}
.ruler-panel {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
}
.el-button {
  margin-bottom: 20px;
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.el-dropdown {
  cursor: pointer;
  margin-left: 30px;
  color: #4280dc;
  font-size: 12px;
}
.in-table {
  border-radius: 10px;
  border: 1px solid #eee;
  background: #f5f5f5;
  padding: 10px;
  width: 480px;
}
.el-form-item__content > .el-textarea,
.el-form-item__content > .el-select {
  width: 500px;
}
.in-wrap {
  display: flex;
  justify-content: space-between;
}
.in-wrap .el-select,
.in-wrap .el-input {
  width: 100px;
}
</style>
