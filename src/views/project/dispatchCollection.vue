<template>
  <div class="video-wrap">
    <div class="tree-wrap">
      <sm-tree :treeData="treeData"></sm-tree>
    </div>
    <div class="video-lists">
      <div class="overview">
        <div class="select-pump">
          <p>责任人</p>
          <el-select :value="point"></el-select>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
        </div>
        <div class="table-wrap">
          <el-button type="primary" icon="el-icon-plus" @click="handelAdd">新增</el-button>
          <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
            <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
            <el-table-column align="center" prop="name" label="灌区"></el-table-column>
            <el-table-column align="center" prop="name" label="渠道（取水点）"></el-table-column>
            <el-table-column align="center" prop="address" label="责任人"></el-table-column>
            <el-table-column align="center" prop="address" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                >编辑</el-button>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>删除</el-dropdown-item>
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
        <el-dialog :title="dialogTitle" :visible.sync="addDialog" center>
          <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="渠系名称" :label-width="formLabelWidth" prop="canal">
              <el-select v-model="form.canal" placeholder="请选择渠系名称"></el-select>
            </el-form-item>
            <el-form-item label="渠系代码" :label-width="formLabelWidth" prop="canalCode">
              <el-input v-model="form.canalCode" placeholder="请选择渠系代码"></el-input>
            </el-form-item>
            <el-form-item label="责任人名称" :label-width="formLabelWidth" prop="person">
              <el-input v-model="form.person" placeholder="请选择责任人名称"></el-input>
            </el-form-item>
            <el-form-item label="责任人代码" :label-width="formLabelWidth">
              <el-input v-model="form.personCode" placeholder="请输入责任人代码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../utils/bus'
export default {
  data() {
    return {
      treeData: [
        {
          label: '灌区信息服务平台',
          show: false,
          children: [
            {
              label: '一干渠',
              show: false,
              children: [
                {
                  label: '一干渠'
                }
              ]
            },
            {
              label: '一灌区',
              show: false,
              children: [
                {
                  label: '一干渠'
                }
              ]
            },
            {
              label: '一灌区',
              show: false,
              children: [
                {
                  label: '一干渠'
                }
              ]
            },
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      select: -1,
      area: '',
      model: '',
      point: '',
      date: '',
      pumpData: ['1', '1', '1', '1', '1', '1', '1', '1'],
      headerStyle: {
        background: '#f0f0f0'
      },
      currentPage: 1,
      total: 0,
      addDialog: false,
      dialogTitle: "新增",
      form: {
        canal: '',
        canalCode: '',
        person: '',
        personCode: ''
      },
      rules: {
        canal: [{ required: true, message: '请选择渠系名称', trigger: 'blur' }],
        canalCode: [
          { required: true, message: '请输入渠系代码', trigger: 'blur' }
        ],
        person: [{ required: true, message: '请输入责任人名称', trigger: 'blur' }]
      },
      formLabelWidth: '120px'
    }
  },
  mounted(){
    Bus.$on('getvalue',value => {
      console.log(value)
      this.treeValue = value
    })
  },
  methods: {
    handelAdd(){
      this.addDialog=true
      this.dialogTitle = "新增"
    },
    handleClick(row) {
      this.addDialog=true
      this.dialogTitle = "编辑"
      console.log(row)
    },
    handleNodeClick(data) {
      console.log(data)
    },
    handelTab(index) {
      this.select = index
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrap {
  display: flex;
  .tree-wrap {
    width: 334px;
    padding: 39px 0 0;
    font-size: 22px;
    color: #171819;
    cursor: pointer;
  }
  .video-lists {
    padding: 23px;
    background-color: #f0f0f0;
    width: 82.6vw;
    .overview {
      background: #fff;
      padding: 36px;
      border-radius: 10px;
    }
  }
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 0 0 40px;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-button,
  .el-date-editor {
    margin-right: 30px;
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
    margin-left: 55px;
    color: #4280dc;
    font-size: 12px;
  }
}
.el-form-item {
  .el-select,
  .el-input {
    width: 300px;
  }
}
</style>