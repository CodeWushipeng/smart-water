<template>
  <div class="menu-wrap">
    <div class="title">菜单列表</div>
    <el-button type="primary" @click="showAdd"> 添加菜单 </el-button>
    <el-tree
      :data="menuLists"
      :props="props"
      show-checkbox
      node-key="id"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="btn-group">
          <!-- <el-button type="text" size="mini" @click="() => append(data)">
            添加
          </el-button> -->
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="新增菜单" :visible.sync="addDialog" center width="700px">
      <el-form :model="form" :rules="rules" ref="addForm">
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="father">
          <el-cascader
            v-model="form.father"
            :options="menuLists"
            :props="menuProp"
            placeholder="请选择上级菜单"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" prop="url">
          <el-input v-model="form.url" placeholder="请输入菜单地址"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" placeholder="请输入菜单图标"></el-input>
        </el-form-item>
        <el-form-item label="是否需要访问权限" :label-width="formLabelWidth" prop="ruler">
          <el-switch v-model="form.ruler"></el-switch>
        </el-form-item>
        <el-form-item label="是否在菜单栏展示" :label-width="formLabelWidth" prop="show">
          <el-switch v-model="form.show"></el-switch>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="关联表名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.table"
            placeholder="请输入关联表名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="H5标示" :label-width="formLabelWidth">
          <el-input v-model="form.router" placeholder="请输入H5标示"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    return {
      props: {
        label: "menu_name",
        children: "child",
      },
      form: {
        father: "",
        name: "",
        url: "",
        icon: "",
        ruler: false,
        show: false,
        sort: "",
        table: "",
        router: "",
      },
      rules: {
        father: [
          { required: true, message: "请选择上级菜单", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        url: [
          {
            required: true,
            message: "请请输入菜单地址",
            trigger: "blur",
          },
        ],
        ruler: [
          {
            required: true,
            message: "请选择是否需要权限",
            trigger: "blur",
          },
        ],
        show: [
          {
            required: true,
            message: "请选择是否显示菜单",
            trigger: "change",
          },
        ],
        sort: [{ required: true, message: "请输入排序序号", trigger: "blur" }],
      },
      addDialog: false,
      formLabelWidth: "140px",
      menuLists: [],
      menuProp: {
        value: "id",
        label: "menu_name",
        children: "child",
        emitPath: false,
        checkStrictly: true,
      },
    };
  },
  created() {
    this.getMenuLists();
  },
  methods: {
    // 获取菜单
    getMenuLists() {
      let data = {};
      this.axios
        .post("/menu_index", data)
        .then((res) => {
          if (res.code == "0") {
            this.menuLists = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加菜单
    append() {
      this.addDialog = true;
    },
    // 添加菜单弹出框
    showAdd() {
      this.addDialog = true;
    },
    addMenu() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          this.toAddMenu();
          this.addDialog = false;
          this.form = {
            father: 0,
            name: "",
            url: "",
            icon: "",
            ruler: false,
            show: false,
            sort: "",
            table: "",
            router: "",
          };
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加菜单请求
    toAddMenu() {
      let data = {
        menu_name: this.form.name,
        url: this.form.url,
        fid: this.form.father?this.form.father:0,
        authority: this.form.ruler,
        show: this.form.show,
        sort: this.form.sort,
        relevancy_table: this.form.table,
        icon: this.form.icon,
        h5_name: this.form.router,
      };
      this.axios
        .post("/menu_add", data)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "添加成功",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除菜单请求
    deleteMenu(menu) {
      let data = {
        id: menu.id,
      };
      this.axios
        .post("/menu_del", data)
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
    // 删除菜单
    remove(node, data) {
      console.log(node, data);
      this.$confirm("确定删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteMenu(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.menu-wrap {
  padding: 20px;
}
.menu-wrap > .title {
  margin: 20px 0;
}
.el-select,
.el-input {
  width: 400px;
}
.btn-group {
  margin-left: 20px;
}
</style>