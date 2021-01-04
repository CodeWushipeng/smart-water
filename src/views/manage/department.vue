<template>
  <div class="menu-wrap">
    <div class="title">
      <div class="mark"></div>
      科室管理
    </div>
    <el-button type="primary" icon="el-icon-plus" @click="showAdd">新增科室</el-button>
    <el-tree
      :data="orgList"
      :props="props"
      show-checkbox
      node-key="id"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="btn-group">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="() => editLog(data)"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-delete"
            size="mini"
            @click="() => remove(data)"
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="title" :visible.sync="addDialog" center width="700px">
      <el-form :model="form">
        <el-form-item label="上级科室" :label-width="formLabelWidth">
          <el-cascader
            v-model="form.father"
            :options="orgList"
            :props="menuProp"
            placeholder="请选择上级科室"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="组织架构名称	" :label-width="formLabelWidth">
          <el-input v-model="form.org" placeholder="请输入组织架构名称	"></el-input>
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
import {mapState} from "vuex"
export default {
  data() {
    return {
      props: {
        label: "organization_name",
        children: "child",
      },
      form: {
        father: "",
        org: "",
        id:""
      },
      addDialog: false,
      formLabelWidth: "130px",
      title:"增加科室",
      menuProp:{
        value: "id",
        label: "organization_name",
        children: "child",
        emitPath:false,
        checkStrictly: true
      },
    };
  },
  computed:{
    ...mapState(["orgList"])
  },
  methods: {
    // 添加组织架构
    addOrg() {
      let data = {
        organization_name: this.form.org,
        fid: this.form.father?this.form.father:0,
      };
      this.axios
        .post("/organization_add", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: 'success',
              message: "添加成功"
            })
            this.$store.dispatch('getOrgLists');
          }else{
            this.$message({
              type: 'error',
              message: "添加失败"
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 弹出添加科室表单
    showAdd(){
      this.title = "增加科室"
      this.addDialog = true;
    },
    // 编辑菜单弹窗
    editLog(org) {
      this.title = "编辑科室"
      this.form.father = org.fid
      this.form.org = org.organization_name
      this.form.id = org.id
      this.addDialog = true;
    },
    // 编辑菜单请求
    editOrg(){
      let data = {
        organization_name: this.form.org,
        fid: this.form.father,
        id:this.form.id
      };
      this.axios
        .post("/organization_edit", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: 'success',
              message: "编辑成功"
            })
            this.$store.dispatch('getOrgLists');
          }else{
            this.$message({
              type: 'error',
              message: "编辑失败"
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 发送添加科室请求
    addMenu() {
      if(this.title=="增加科室"){
        this.addOrg();
      }else if(this.title=="编辑科室"){
        this.editOrg()
      }
      this.addDialog = false;
      this.form.father = ""
      this.form.org = ""
      this.form.id = ""
    },
    // 删除科室请求
    deleteOrg(org) {
      let data = {
        id: org.id,
      };
      this.axios
        .post("/organization_del", data)
        .then((res) => {
          if (res.code == "0") {
            this.$message({
              type: 'success',
              message: "删除成功"
            })
            this.$store.dispatch('getOrgLists');
          }else{
            this.$message({
              type: 'error',
              message: "删除失败"
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除科室
    remove(node, data) {
      this.$confirm("删除该科室, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteOrg(data)
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

<style>
.el-tree .el-tree-node {
  margin: 8px 0;
}
</style>
<style scoped>
.menu-wrap {
  padding: 20px;
}
.menu-wrap > .title {
  margin: 20px 0;
  display: flex;
  height: 20px;
  align-items: center;
}
.mark {
  width: 5px;
  height: 20px;
  background-color: #409eff;
  margin-right: 10px;
}
.el-select,
.el-input {
  width: 400px;
}
.btn-group {
  margin-left: 20px;
}
</style>