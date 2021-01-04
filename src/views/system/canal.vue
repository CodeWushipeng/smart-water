<template>
  <div class="video-wrap">
    <div class="tree-wrap">
      <!-- <sm-tree :treeData="treeData" :prop="treeProp"></sm-tree> -->
      <el-tree
        :data="treeData"
        :props="treeProp"
        highlight-current
        check-on-click-node
        node-key="id"
        ref="canal"
        @node-click="getSelectData"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              v-if="data.canal_name == '尊村灌区'"
              type="text"
              size="mini"
              @click.stop="() => addBucket(data, node)"
            >
              添加灌区
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click.stop="() => addBucket(data, node)"
              v-else
            >
              添加渠系
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="video-lists">
      <div class="overview">
        <div class="form-wrap">
          <!-- <div class="form-item">
            <p>渠道名称</p>
            <el-input v-model="canal" placeholder="请输入渠道名称"></el-input>
          </div> -->
          <div class="form-item">
            <p>关键字</p>
            <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
          <div class="form-item">
            <el-button type="primary" icon="el-icon-search" @click="canelLists"
              >查询</el-button
            >
            <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
          </div>
        </div>
        <div class="table-wrap">
          <div class="add-crew">
            <el-button icon="el-icon-plus" type="primary" @click="addBucket"
              >添加斗渠</el-button
            >
            <el-button icon="el-icon-download" type="primary">导出</el-button>
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
                    <el-dropdown-item @click.native="deleteCanal(scope.row)"
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
              @next-click="nextHandel"
              @prev-click="prevHandel"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="prev, pager, next, sizes, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <el-dialog
          :title="title"
          :visible.sync="addCrewVisible"
          center
          width="900px"
        >
          <el-form :model="form" class="edit-form">
            <div class="left">
              <el-form-item
                label="上级渠道"
                :label-width="formLabelWidth"
                v-if="showCanal"
              >
                <!-- <el-input
                  v-model="form.canal"
                  placeholder="请选择上级渠道"
                ></el-input> -->
                <el-cascader
                  ref="area"
                  v-model="area"
                  :options="areaTree"
                  :props="props"
                  placeholder="请选择上级渠道"
                ></el-cascader>
              </el-form-item>
              <template>
                <el-form-item
                  label="渠道名称"
                  :label-width="formLabelWidth"
                  v-if="showCanal"
                >
                  <el-input
                    placeholder="请输入渠道名称"
                    v-model="form.canelName"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="灌区名称"
                  :label-width="formLabelWidth"
                  v-else
                >
                  <el-input
                    placeholder="请输入灌区名称"
                    v-model="form.canelName"
                  ></el-input>
                </el-form-item>
              </template>
              <el-form-item label="渠道长度" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入渠道长度"
                  v-model="form.canalLength"
                ></el-input>
              </el-form-item>
              <el-form-item label="设计流量" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入设计流量"
                  v-model="form.canalFlow"
                ></el-input>
              </el-form-item>
              <el-form-item label="斗口数量" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入斗口数量"
                  v-model="form.outletNum"
                ></el-input>
              </el-form-item>
              <el-form-item label="节制闸(个)" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入节制闸数量"
                  v-model="form.valveNum"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="设计农户" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入装机流量(m³/s)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              
              <el-form-item label="桥梁" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入控制面积(万亩)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="设计口宽(m)" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入控制面积(万亩)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="设计底宽(m)" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入控制面积(万亩)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item> -->
            </div>
            <!-- <div class="left">
              <el-form-item label="有效面积" :label-width="formLabelWidth">
                <el-input
                  v-model="form.canal"
                  placeholder="请选择泵站编码"
                ></el-input>
              </el-form-item>
              <el-form-item label="实际面积" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入装机容量(KW)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="受益村庄" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入机组台数(台)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="种植结构" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入地形扬程(m)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="起止桩号" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入设计扬程(m)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="渠道高程" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入装机流量(m³/s)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="渠堤高程" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入控制面积(万亩)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="渠深" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入控制面积(万亩)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="纵坡" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入控制面积(万亩)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
              <el-form-item label="上级渠道" :label-width="formLabelWidth">
                <el-input
                  placeholder="请输入控制面积(万亩)"
                  v-model="form.waterNumber"
                ></el-input>
              </el-form-item>
            </div> -->
          </el-form>
          <div slot="footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="addCrewVisible = false">关 闭</el-button>
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
    return {
      treeData: [],
      treeProp: {
        label: 'canal_name',
        value: 'canal_code',
        children: 'child',
      },
      area: '',
      props: {
        value: 'canal_code',
        label: 'canal_name',
        children: 'child',
        emitPath: false,
        checkStrictly: true,
      },
      addCrewVisible: false,
      title: '添加',
      canal: '',
      keyword: '',
      pumpData: [],
      headerStyle: {
        background: '#f0f0f0',
      },
      tableConfig: [
        // {
        //   label: "渠道编码",
        //   value: "canal_code",
        // },
        // {
        //   label: "渠道名称",
        //   value: "canal_name",
        // },
        // {
        //   label: "渠道长度(km)",
        //   value: "length",
        // },
        // {
        //   label: "设计流量(m³/s)",
        //   value: "design_flow",
        // },
        {
          label: '设计面积(亩)',
          value: 'design_area',
        },
        {
          label: '有效面积(亩)',
          value: 'active_area',
        },
        {
          label: '灌溉面积(亩)',
          value: 'actual_area',
        },
        // {
        //   label: "实际面积(亩)",
        //   value: "actual_area",
        // },
        // {
        //   label: "斗口数量",
        //   value: "outlet_num",
        // },
        // {
        //   label: "阀门数量",
        //   value: "valve_num",
        // },
        {
          label: '受益农户数',
          value: 'peasant_household',
        },
        {
          label: '控制人口',
          value: 'peasant_household',
        },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      editDialog: false,
      form: {
        canelName: '',
        canalLength: '',
        canalFlow: '',
        outletNum: '',
        valveNum: '',
      },
      addForm: {
        crewName: '',
        flow: '',
        capacity: '',
      },
      showCanal: true,
      formLabelWidth: '120px',
    };
  },
  computed: {
    ...mapState(['areaTree']),
  },
  watch: {
    areaTree: {
      immediate: true,
      deep: true,
      handler: function(val) {
        if (val.length > 0) {
          let temp = {
            canal_name: '尊村灌区',
            id: '',
            child: val,
          };
          if (!this.treeData.length) {
            this.treeData.push(temp);
          }
        }
      },
    },
  },
  mounted() {
    this.canelLists();
  },
  methods: {
    // 树节点点击事件
    getSelectData() {
      let treeNode = this.$refs.canal.getCurrentNode();
      this.treeValue = treeNode.canal_code;
      console.log(this.treeValue);
    },
    handleClick(row) {
      console.log(row);
      this.addCrewVisible = true;
      this.title = '编辑';
      this.form.canelName = row.canal_name;
      this.form.canalLength = row.length;
      this.form.canalFlow = row.design_flow;
      this.form.outletNum = row.outlet_num;
      this.form.valveNum = row.valve_num;
    },
    addBucket(target, node) {
      console.log(target, node);
      if (target.canal_name == '尊村灌区') {
        this.area = 0;
        this.showCanal = false;
      } else {
        this.area = '';
        this.showCanal = true;
      }
      this.title = '添加';
      this.form.canelName = '';
      this.form.canalLength = '';
      this.form.canalFlow = '';
      this.form.outletNum = '';
      this.form.valveNum = '';
      this.addCrewVisible = true;
    },
    submitForm() {
      if (this.title == '编辑') {
        this.editCanal();
      } else {
        this.handelAddBucket();
      }
      this.addCrewVisible = false;
    },
    // 编辑渠道
    editCanal() {
      let data = {
        canal_name: this.form.canelName,
        f_code: this.area,
        length: this.form.canalLength,
        design_flow: this.form.canalFlow,
        outlet_num: this.form.outletNum,
        valve_num: this.form.valveNum,
      };
      this.axios
        .post('/canal_edit', data)
        .then(res => {
          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '编辑成功',
            });
            this.$store.dispatch('getCanalTree');
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
    },
    // 添加渠道
    handelAddBucket() {
      let data = {
        canal_name: this.form.canelName,
        f_code: this.area,
        length: this.form.canalLength,
        design_flow: this.form.canalFlow,
        outlet_num: this.form.outletNum,
        valve_num: this.form.valveNum,
      };
      this.axios
        .post('/canal_add', data)
        .then(res => {
          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '添加灌区成功',
            });
            this.$store.dispatch('getCanalTree');
          } else {
            this.$message({
              type: 'error',
              message: '添加灌区失败',
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 灌区列表
    canelLists() {
      let data = {
        keyword: this.keyword,
        canal_code: this.treeValue ? this.treeValue.canal_code : '',
        order_field: '',
        order_type: 'desc',
        page: this.currentPage,
        page_size: this.pageSize,
      };
      this.axios
        .post('/canal_index', data)
        .then(res => {
          if (res.code == '0') {
            this.pumpData = res.data.data;
            this.total = res.data.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除
    deleteCanal(target) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let data = {
            canal_code: target.canal_code,
          };
          this.axios
            .post('/canal_del', data)
            .then(res => {
              if (res.code == '0') {
                this.$message({
                  type: 'success',
                  message: '删除成功',
                });
                this.$store.dispatch('getCanalTree');
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败',
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.canelLists();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.canelLists();
    },
    nextHandel() {
      this.currentPage++;
      this.canelLists();
    },
    prevHandel() {
      this.currentPage--;
      this.canelLists();
    },
  },
};
</script>

<style>
.tree-wrap .el-tree-node__content {
  height: 50px;
}
</style>

<style lang="scss" scoped>
.el-cascader {
  width: 100%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 18px;
}

.video-wrap {
  display: flex;
  padding: 25px;
  background-color: #f0f0f0;
  .tree-wrap {
    width: 334px;
    margin-right: 25px;
    background: #fff;
  }
  .video-lists {
    background-color: #f0f0f0;
    width: 82.6vw;
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
.add-crew {
  padding-bottom: 30px;
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
.edit-form {
  display: flex;
  justify-content: space-around;
}
</style>
