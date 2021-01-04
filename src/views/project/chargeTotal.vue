<template>
  <div class="overview">
    <div class="select-pump">
      <p>查询方式</p>
      <el-select :value="area"></el-select>
      <p>请输入年份</p>
      <el-date-picker
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        v-model="model"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button type="primary" icon="el-icon-download">导出</el-button>
      <el-button>打印</el-button>
    </div>
    <div class="charts-wrap">
      <div class="mark"></div>
      <div id="analysis"></div>
    </div>
    <div class="table-wrap">
      <el-table
        :data="pumpData"
        style="width: 100%"
        :header-cell-style="headerStyle"
        border
      >
        <el-table-column prop="date" label="配水日期"></el-table-column>
        <el-table-column
          prop="plan_water_use"
          label="计划用水量"
        ></el-table-column>
        <el-table-column
          prop="actual_water_use"
          label="实际用水量	"
        ></el-table-column>
        <el-table-column prop="area" label="浇灌面积"></el-table-column>
        <el-table-column prop="crops" label="作物结构"></el-table-column>
        <el-table-column prop="peasant_num" label="配水日期"></el-table-column>
        <el-table-column prop="date" label="用水农户数量"></el-table-column>
        <el-table-column prop="canal_name" label="渠系名称"></el-table-column>
        <el-table-column prop="date" label="负责人名称"></el-table-column>
        <el-table-column prop="manager_name" label="灌区名称"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
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
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
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
      currentPage: 1,
      pageSize: 10,
      total: 0,
      keyword: "",
      date: "",
    };
  },
  mounted() {
    this.initCharts();
    this.getCanalWaterList()
  },
  methods: {
    // 获取渠系配水列表
    getCanalWaterList() {
      let postData = {
        keyword: this.keyword,
        order_field: "",
        order_type: "desc",
        page: this.currentPage,
        page_size: this.pageSize,
        date: this.date,
      };
      this.axios
        .post("/canaldispatch_index", postData)
        .then((res) => {
          if (res.code == 0) {
            this.pumpData = res.data.data;
            this.total = res.data.total;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCanalWaterList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCanalWaterList()
    },
    prevHandel() {
      this.currentPage--
      this.getCanalWaterList()
    },
    nextHandel() {
      this.currentPage++
      this.getCanalWaterList()
    },
    initCharts() {
      var myChart = this.$echarts.init(document.getElementById("analysis"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        color: ["#4280DC"],
        title: {
          text: "水费统计",
        },
        grid: [
          {
            left: "2%",
            bottom: "2%",
            right: "0",
            containLabel: true,
          },
        ],
        xAxis: [
          {
            type: "category",
            data: [
              "一灌区",
              "二灌区",
              "三灌区",
              "四灌区",
              "五灌区",
              "六灌区",
              "七灌区",
              "八灌区",
              "九灌区",
            ],
            axisLabel: {
              color: "#333",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "水费统计",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value}(元)",
            },
          },
        ],
        series: [
          {
            name: "水费统计",
            type: "bar",
            barWidth: "20",
            itemStyle: {
              emphasis: {
                barBorderRadius: 30,
              },
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3,
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  padding: 36px;
  background-color: #fff;
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-date-editor,
  .el-button {
    margin-right: 30px;
  }
}
.charts-wrap {
  display: flex;
  height: 460px;
  margin-bottom: 24px;
  .mark {
    width: 6px;
    height: 24px;
    background-color: #4280dc;
    margin-right: 10px;
  }
  #analysis {
    width: 90%;
    height: 100%;
  }
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>