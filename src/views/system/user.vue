<template>
  <div class="video-wrap">
    <div class="video-lists">
      <div class="overview">
        <div class="form-wrap">
          <div class="form-item">
            <p>关键字</p>
            <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
          <div class="form-item">
            <p>部门</p>
            <el-cascader
              v-model="org"
              :options="orgList"
              :props="orgProp"
              placeholder="请选择部门"
            ></el-cascader>
          </div>
          <div class="form-item">
            <p>职务</p>
            <el-cascader
              v-model="role"
              :options="roleList"
              :props="roleProp"
              placeholder="请选择职务"
            ></el-cascader>
          </div>
          <div class="form-item">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
          </div>
        </div>
        <div class="table-wrap">
          <div class="add-crew">
            <el-button icon="el-icon-plus" type="primary" @click="addFarmer"
              >新增</el-button
            >
            <el-button
              icon="el-icon-download"
              type="primary"
              @click="exportTable"
              >导出</el-button
            >
          </div>
          <div class="selectTips">
            <!-- 已选择
            <span>3</span>
            项 -->
          </div>
          <el-table
            :data="accountList"
            style="width: 100%"
            :header-cell-style="headerStyle"
            border
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              v-for="(item, index) in tableConfig"
              :key="index"
              :prop="item.value"
              :label="item.label"
              align="center"
            ></el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.status|changeStatu}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="180px"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  @click="shoeEdit(scope.row)"
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
                    <!-- <el-dropdown-item>详情</el-dropdown-item> -->
                    <!-- <el-dropdown-item>删除</el-dropdown-item> -->
                    <el-dropdown-item @click.native="freezeUser(scope.row)">冻结</el-dropdown-item>
                    <el-dropdown-item @click.native="handelModify(scope.row)"
                      >修改密码</el-dropdown-item
                    >
                    <el-dropdown-item>代理人</el-dropdown-item>
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
          title="修改密码"
          :visible.sync="modifyVisible"
          center
          width="665px"
        >
          <el-form :model="modifyForm" :rules="rules" ref="modifyForm">
            <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPwd">
              <el-input
                v-model="modifyForm.oldPwd"
                placeholder="请输入旧密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
              <el-input
                v-model="modifyForm.newPwd"
                placeholder="请输入新密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="againPwd">
              <el-input
                v-model="addForm.againPwd"
                placeholder="请再次输入新密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="modifyPwd"
              >确 定</el-button
            >
            <el-button @click="modifyVisible=false">关 闭</el-button>
          </div>
        </el-dialog>
        <el-dialog
          :title="title"
          :visible.sync="addFaemerVisible"
          center
          width="665px"
        >
          <el-form :model="addForm">
            <el-form-item label="登录密码" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.password"
                placeholder="请输入登录密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.againPwd"
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.userName"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.userid"
                placeholder="请输入工号"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门" :label-width="formLabelWidth">
              <el-cascader
                v-model="addForm.userOrg"
                :options="orgList"
                :props="orgProp"
                placeholder="请选择部门"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="职务" :label-width="formLabelWidth">
              <el-cascader
                v-model="addForm.userWork"
                :options="roleList"
                :props="roleProp"
                @focus="checkOrg"
                placeholder="请选择职务"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="addForm.imageUrl"
                  :src="addForm.imageUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="生日" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.borthday"
                placeholder="请输入生日"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.sex"
                placeholder="请输入性别"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="addUser">确 定</el-button>
            <el-button @click="addFaemerVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.modifyForm.againPwd !== '') {
          this.$refs.modifyForm.validateField('againPwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.modifyForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        oldPwd:[{required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPwd: [{ validator: validatePass, trigger: 'blur' }],
        againPwd: [{ validator: validatePass2, trigger: 'blur' }],
      },
      addFaemerVisible: false,
      modifyVisible: false,
      keyword: '',
      org: '',
      role: '',
      accountList: [],
      headerStyle: {
        background: '#f0f0f0',
      },
      tableConfig: [
        {
          label: '用户名',
          value: 'admin_name',
        },
        {
          label: '真实姓名',
          value: 'real_name',
        },
        {
          label: '部门名称',
          value: 'organization_name',
        },
        {
          label: '职务名称',
          value: 'role_name',
        },
        {
          label: '手机号码',
          value: 'mobile',
        },
        {
          label: '邮箱',
          value: 'email',
        },
        // {
        //   label: '状态',
        //   value: 'status',
        // },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      editDialog: false,
      title: '新增',
      addForm: {
        password: '',
        againPwd: '',
        userName: '',
        userid: '',
        userWork: '',
        imageUrl: '',
        borthday: '',
        sex: '',
        email: '',
        phone: '',
        userOrg: '',
      },
      modifyForm: {
        oldPwd: '',
        newPwd: '',
        againPwd: '',
      },
      orgProp: {
        value: 'id',
        label: 'organization_name',
        children: 'child',
        emitPath: false,
      },
      roleList: [],
      roleProp: {
        value: 'id',
        label: 'role_name',
        children: 'child',
        emitPath: false,
      },
      formLabelWidth: '120px',
    };
  },
  mounted() {
    this.getUserList();
  },
  filters:{
    changeStatu:function(val){
      if(val==0){
        return "未审核"
      }else if(val==1){
        return "正常"
      }else if(val==2){
        return "禁用"
      }
    }
  },
  computed: {
    ...mapState(['name', 'orgList', 'menuList']),
  },
  methods: {
    // 获取用户列表
    getUserList() {
      let data = {
        organization_id: this.org,
        role_id: this.role,
        keyword: this.keyword,
        page: this.currentPage,
        page_size: this.pageSize,
      };
      this.axios
        .post('/admin_index', data)
        .then(res => {
          if (res.code == '0') {
            this.total = res.data.total;
            this.accountList = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 添加用户
    addUser() {
      let data = {
        admin_name: this.name,
        real_name: this.addForm.userName,
        mobile: this.addForm.phone,
        email: this.addForm.email,
        organization_id: this.addForm.org,
        role_id: this.addForm.userWork,
        status: 0,
        password: this.addForm.password,
      };
      this.axios
        .post('/admin_add', data)
        .then(res => {
          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '添加成功',
            });
          } else {
            this.$message({
              type: 'error',
              message: '添加失败',
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.addFaemerVisible = false;
    },
    // 编辑用户
    addUser() {
      let data = {
        admin_name: this.name,
        real_name: this.addForm.userName,
        mobile: this.addForm.phone,
        email: this.addForm.email,
        organization_id: this.addForm.org,
        role_id: this.addForm.userWork,
        status: 0,
        password: this.addForm.password,
        id: this.addForm.id,
      };
      this.axios
        .post('/admin_edit', data)
        .then(res => {
          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '编辑成功',
            });
          } else {
            this.$message({
              type: 'error',
              message: '编辑失败',
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.addFaemerVisible = false;
    },
    // 修改密码
    handelModify() {
      this.modifyVisible = true;
    },
    modifyPwd() {
      let data = {
        new_pass: this.modifyForm.newPwd,
        old_pass: this.modifyForm.oldPwd,
      };
      this.axios
        .post('/change_pass', data)
        .then(res => {
          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '密码修改成功',
            });
            this.modifyVisible = false;
          } else {
            this.$message({
              type: 'error',
              message: '密码修改失败',
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 禁用用户
    freezeUser(target){
      let data = {
        id: target.id,
      };
      this.axios
        .post('/admin_del', data)
        .then(res => {
          if (res.code == '0') {
            this.$message({
              type:"success",
              message:"禁用用户成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"禁用用户失败"
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取职务列表
    getRoleLists(org = '') {
      let data = {
        organization_id: org,
      };
      this.axios
        .post('/role_index', data)
        .then(res => {
          if (res.code == '0') {
            this.roleList = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 职务级联聚焦事件
    checkOrg() {
      if (!this.addForm.userOrg) {
        this.$message({
          type: 'error',
          message: '选择部门后才能选择职务',
        });
      } else {
        this.getRoleLists(this.addForm.userOrg);
      }
    },
    shoeEdit(row) {
      console.log(row);
      this.title = '编辑';
      this.addForm.id = row.id;
      this.editDialog = true;
    },
    addFarmer() {
      this.title = '新增';
      this.addFaemerVisible = true;
    },
    exportTable() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getUserList();
    },
    prevHandel(){
      this.currentPage--
      this.getUserList();
    },
    nextHandel(){
      this.currentPage++
      this.getUserList();
    },
    handleAvatarSuccess(res, file) {
      this.addForm.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-wrap {
  padding: 25px;
  .video-lists {
    background-color: #f0f0f0;
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
  flex-wrap: wrap;
  align-items: center;
  .form-item {
    display: flex;
    margin-right: 30px;
    margin-bottom: 30px;
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
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
