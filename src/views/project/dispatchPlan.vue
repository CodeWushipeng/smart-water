<template>
  <div class="overview">
    <div class="select-pump">
      <!-- <p>泵站名称</p>
      <el-select v-model="area">
        <el-option
          v-for="(item, index) in pumpList"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <p>机组</p>
      <el-select v-model="model">
        <el-option
          v-for="(item, index) in crewList"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
      <p>状态</p>
      <el-select v-model="status">
        <el-option label="全部" value=""></el-option>
        <el-option label="作废" value="1"></el-option>
        <el-option label="执行中" value="2"></el-option>
        <el-option label="已完成" value="3"></el-option>
      </el-select>
      <p>关键字</p>
      <el-input v-model="keyword"> </el-input>
      <p>放水日期</p>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="放水日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="getPlanLists"
        >查询</el-button
      >
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
    </div>
    <div class="table-wrap">
      <el-button type="primary" icon="el-icon-plus" @click="addTable"
        >新增</el-button
      >
      <el-table
        :data="pumpData"
        style="width: 100%"
        :header-cell-style="headerStyle"
        border
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="80px"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="pump_station_name"
          label="泵站名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="admin_name"
          label="负责人"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="station_id"
          label="机组编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="start_time"
          label="开始时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="end_time"
          label="结束时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="actual_water_use"
          label="提水量（m³）"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
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
          @prev-click="prevHandel"
          @next-click="nextHandel"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="新增" :visible.sync="addDialog" center width="600px">
      <el-form :model="form">
        <el-form-item label="泵站" :label-width="formLabelWidth">
          <el-select v-model="form.pump" placeholder="请选择泵站">
            <el-option
              v-for="(item, index) in pumpList"
              :key="index"
              :label="item.pump_station_name"
              :value="item.pump_station_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调度" :label-width="formLabelWidth">
          <el-select v-model="form.person" placeholder="请选择调度">
            <el-option label="调度一" value="1"></el-option>
            <el-option label="调度二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机组" :label-width="formLabelWidth">
          <el-select v-model="form.machine" placeholder="请选择机组">
            <el-option
              v-for="(item, index) in pumpList"
              :key="index"
              :label="item.pump_station_name"
              :value="item.pump_station_code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开机时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.start"
            type="date"
            placeholder="请选择开机时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.end"
            type="date"
            placeholder="请选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="放水日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.waterDate"
            type="date"
            placeholder="请选择放水日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="提水量" :label-width="formLabelWidth">
          <el-input v-model="form.water" placeholder="请输入提水量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addTask">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      status: '',
      keyword: '',
      date: '',
      pumpData: [],
      headerStyle: {
        background: '#f0f0f0',
      },
      currentPage: 1,
      total: 0,
      pageSize: 10,
      addDialog: false,
      form: {
        dispatch: '',
        pump: '',
        person: '',
        machine: '',
        start: '',
        end: '',
      },
      formLabelWidth: '100px',
    };
  },
  computed: {
    ...mapState(['pumpList']),
  },
  methods: {
    // 获取调度列表
    getPlanLists() {
      let postData = {
        dispatch_id: '',
        station_id: '',
        keyword: this.keyword,
        order_field: '',
        order_type: 'desc',
        page: this.currentPage,
        page_size: this.pageSize,
        date: this.date,
        status: this.status,
      };
      this.axios
        .post('/task_index', postData)
        .then(res => {
          if (res.code == 0) {
            if (res.data.total == 0) {
              this.$message({
                type: 'error',
                message: '所选组合无数据',
              });
            } else {
              this.pumpData = res.data.data;
              this.total = res.data.total;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 添加机组调度任务
    addTask() {
      let postData = {
        dispatch_id: this.form.dispatch,
        start_time: this.form.start,
        end_time: this.form.end,
        pump_id: this.form.pump,
        date: this.form.waterDate,
        plan_water_use: this.form.water,
      };
      this.axios
        .post('/task_add', postData)
        .then(res => {
          if (res.code == 0) {
            this.pumpData = res.data.data;
            this.total = res.data.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.addDialog = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPlanLists();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPlanLists();
    },
    prevHandel() {
      this.currentPage--;
      this.getPlanLists();
    },
    nextHandel() {
      this.currentPage++;
      this.getPlanLists();
    },
    addTable() {
      this.addDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  padding: 0 26px;
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p {
    margin-right: 30px;
  }
  .el-select,
  .el-input,
  .el-date-editor {
    margin-right: 30px;
    width: 300px;
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
.el-form {
  .el-select,
  .el-date-editor {
    width: 300px;
  }
}
</style>
