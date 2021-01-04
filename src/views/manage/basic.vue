<template>
  <div class="manage">
    <div class="overview">
      <div class="select-pump">
        <p>泵站名称</p>
        <el-select v-model="area" placeholder="请选择灌区"></el-select>
        <p>机组</p>
        <el-select :value="model" placeholder="请选择机组"></el-select>
        <el-button type="primary" icon="el-icon-search" @click="getPumpLists">查询</el-button>
        <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
      </div>
      <div class="table-wrap">
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
        </el-table>
        <div class="page">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="prev, pager, next, sizes, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: "",
      model: "",
      point: "",
      pumpData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      tableConfig: [
        {
          label: "序号",
          value: "id",
        },
        {
          label: "泵站名称",
          value: "pump_station_name",
        },
        {
          label: "机组编码",
          value: "pump_station_code",
        },
        {
          label: "控制面积",
          value: "area",
        },
        {
          label: "设计扬程",
          value: "design_lift",
        },
        {
          label: "装机流量(m³)",
          value: "water_flow",
        },
        {
          label: "装机容量(KW)",
          value: "installed_capacity",
        },
      ],
      currentPage: 1,
      total: 10
    };
  },
  mounted(){
    this.getPumpLists()
  },
  methods: {
    // 获取泵站数据
    getPumpLists() {
      let data = {
        keyword: this.area,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: 10,
      };
      this.axios.post("/station_index",data)
      .then(res=>{
        if(res.code == 0){
          this.pumpData = res.data.data
          this.total = res.data.total
        }else{
          this.$message({
            type:"error",
            message: res.msg
          })
        }
      })
      .catch(error =>{
        console.log(error)
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPumpLists()
    },
  },
};
</script>

<style lang="scss" scoped>
.manage {
  background: #f0f0f0;
  padding: 24px;
  .overview {
    border-radius: 10px;
    background-color: #fff;
    padding: 37px;
  }
}
.select-pump {
  height: 113px;
  display: flex;
  padding-bottom: 40px;
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
</style>