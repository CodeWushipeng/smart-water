<template>
  <div class="menu-wrap">
    <div class="title">
      <div class="mark"></div>
      职务管理
    </div>
    <!-- <el-button type="primary" icon="el-icon-plus" @click="append"
      >新增职务</el-button
    > -->
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
            @click="() => append(data)"
          >
            新增
          </el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-delete"
            size="mini"
            @click="() => remove(node, data)"
          >
            删除
          </el-button>
        </span>
      </span>
      <!-- <div class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </div> -->
    </el-tree>
    <el-dialog title="新增职务" :visible.sync="addDialog" center width="700px">
      <el-form :model="form">
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-select v-model="form.org" placeholder="请选择所属部门">
            <el-option
              v-for="(item, index) in orgList"
              :key="index"
              :label="item.organization_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入职务名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth">
          <el-cascader
            v-model="form.ruler"
            :options="menuList"
            :props="menuProp"
            placeholder="请选择菜单权限"
          ></el-cascader>
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
import { mapState } from 'vuex';
export default {
  data() {
    return {
      props: {
        label: 'organization_name',
        value: 'id',
        children: 'child',
      },
      form: {
        org: '',
        name: '',
        ruler: [],
      },
      addDialog: false,
      formLabelWidth: '130px',
      menuProp: {
        value: 'id',
        label: 'menu_name',
        children: 'child',
        emitPath: false,
        multiple: true,
      },
    };
  },
  computed: {
    ...mapState(['orgList', 'menuList']),
  },
  methods: {
    // 添加菜单
    append(data) {
      console.log(data);
      this.form.org = data.id;
      this.addDialog = true;
    },
    addMenu() {
      this.toAddMenu();
      this.addDialog = false;
      this.form = {
        org: '',
        name: '',
        ruler: [],
      };
    },
    // 添加菜单请求
    toAddMenu() {
      let data = {
        menu_name: '编辑菜单',
        url: 'rbac_edit',
        fid: 0,
        authority: 1,
        show: 0,
        sort: 1,
        relevancy_table: '',
        icon: '',
        h5_name: '',
      };
      this.axios
        .post('/menu_add')
        .then(res => {
          if (res.code == 0) {
            const newChild = { id: id++, label: value, children: [] };
            if (!data.children) {
              this.$set(data, 'children', []);
            }
            data.children.push(newChild);
            this.$message({
              type: 'success',
              message: '添加成功',
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除菜单
    remove(node, data) {
      this.$confirm('确定删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
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
.jobList {
  width: 300px;
  height: 200px;
  border: 1px solid #eee;
}
</style>
