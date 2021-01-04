<template>
  <div class="pump-info">
    <el-table :data="infoData" :header-cell-style="headerStyle" :cell-style="cellStyle">
      <el-table-column prop="date" label="提水站名"></el-table-column>
      <el-table-column label="进水池">
        <el-table-column prop="name" label="水深（m）"></el-table-column>
        <el-table-column prop="name" label="水位（m）"></el-table-column>
      </el-table-column>
      <el-table-column label="出水池">
        <el-table-column prop="name" label="水深（m）"></el-table-column>
        <el-table-column prop="name" label="水位（m）"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="运行（台）"></el-table-column>
      <el-table-column prop="date" label="流量（m³/s）"></el-table-column>
      <el-table-column prop="date" label="累积水量（m³）"></el-table-column>
    </el-table>
    <div class="total-wrap">
      <div class="total-item" v-for="(item, index) in viewList" :key="index">
        <p>{{item.pumpName}}<span>{{item.pumpNumber}}</span></p>
        <p>{{item.totalName}}<span>{{item.totalNumber}}</span></p>
      </div>
    </div>
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
</template>

<script>
export default {
  data(){
    return{
      infoData: [],
      headerStyle: {
        textAlign: 'center'
      },
      cellStyle: {
        textAlign: 'center'
      },
      viewList: [
        {
          pumpName: '东下供水总量',
          pumpNumber: '3.52 m³/s',
          totalName: '总水量累积',
          totalNumber: '53.26 m³'
        },
        {
          pumpName: '东下供水总量',
          pumpNumber: '3.52 m³/s',
          totalName: '总水量累积',
          totalNumber: '53.26 m³'
        },
        {
          pumpName: '东下供水总量',
          pumpNumber: '3.52 m³/s',
          totalName: '总水量累积',
          totalNumber: '53.26 m³'
        },
        {
          pumpName: '东下供水总量',
          pumpNumber: '3.52 m³/s',
          totalName: '总水量累积',
          totalNumber: '53.26 m³'
        },
        {
          pumpName: '东下供水总量',
          pumpNumber: '3.52 m³/s',
          totalName: '总水量累积',
          totalNumber: '53.26 m³'
        },
        {
          pumpName: '东下供水总量',
          pumpNumber: '3.52 m³/s',
          totalName: '总水量累积',
          totalNumber: '53.26 m³'
        },
      ],
      currentPage: 1,
      total:1
    }
  },
  methods: {
    // 获取泵站详情
    getPumpInfo(){
      let data = {
        id: "2号",
      };
      this.axios
        .post("/canal_index", data)
        .then((res) => {
          if (res.code == "0") {
            this.$store.commit("setAreaList",res.data.data)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.pump-info{
  padding-top: 46px;
}
.total-wrap{
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid #E7E7E7;
  border-top: 1px solid #E7E7E7;
  margin-top: 10px;
}
.total-item{
  width: 591px;
  height: 70px;
  border-right: 1px solid #E7E7E7;
  border-bottom: 1px solid #E7E7E7;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  >p{
    font-size: 20px;
    color: #171819;
    margin-right: 20px;
    span{
      color: #4280DC;
      margin-left: 10px;
    }
  }
}
.page{
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>