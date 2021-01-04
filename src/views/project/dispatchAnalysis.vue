<template>
  <div class="overview">
    <div class="select-pump">
      <p>泵站名称</p>
      <el-select :value="area"></el-select>
      <el-button type="primary" icon="el-icon-refresh-right">查询</el-button>
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
    </div>
    <div class="charts-wrap">
      <div class="mark"></div>
      <div id="analysis"></div>
    </div>
    <div class="select-pump">
      <p>机组</p>
      <el-select :value="model"></el-select>
      <el-button type="primary" icon="el-icon-refresh-right">查询</el-button>
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
    </div>
    <div class="charts-wrap">
      <div class="mark"></div>
      <div id="crew"></div>
    </div>
    <div class="table-wrap">
      <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
        <el-table-column align="center" type="index" width="100" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="泵站名称"></el-table-column>
        <el-table-column align="center" prop="address" label="机组编号"></el-table-column>
        <el-table-column align="center" prop="address" label="实际提水量（m³）"></el-table-column>
        <el-table-column align="center" prop="address" label="计划提水量（m³）"></el-table-column>
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
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      area: '',
      model: '',
      point: '',
      pumpData: ['1', '1', '1', '1', '1', '1', '1', '1'],
      headerStyle: {
        background: '#f0f0f0'
      },
      currentPage: 1
    }
  },
  mounted() {
    this.initAnalysisCharts()
    this.initCrewCharts()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    initAnalysisCharts() {
      var myChart = this.$echarts.init(document.getElementById('analysis'))
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        color: ['#4280DC', '#4CCB72'],
        title: {
          text: '数据对比'
        },
        legend: {
          data: ['计划提水量', '实际提水量']
        },
        grid: [
          {
            left: '2%',
            bottom: '2%',
            right: '0',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [
              '一级站',
              '二级站',
              '三级站',
              '四级站',
              '五级站',
              '六级站',
              '七级站',
              '八级站',
              '九级站'
            ],
            axisLabel: {
              color: '#333'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '计划提水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} m³'
            }
          },
          {
            type: 'value',
            name: '实际提水量',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} m³'
            }
          }
        ],
        series: [
          {
            name: '计划提水量',
            type: 'bar',
            barWidth: '20',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [10,10,0,0]
              }
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
              3.3
            ]
          },
          {
            name: '实际提水量',
            type: 'bar',
            barWidth: '20',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [10,10,0,0]
              }
            },
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          }
        ]
      })
    },
    initCrewCharts() {
      var myChart = this.$echarts.init(document.getElementById('crew'))
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        color: ['#4280DC', '#4CCB72'],
        title: {
          text: '数据对比'
        },
        legend: {
          data: ['计划提水量', '实际提水量']
        },
        grid: [
          {
            left: '2%',
            bottom: '2%',
            right: '0',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: [
              '一级站',
              '二级站',
              '三级站',
              '四级站',
              '五级站',
              '六级站',
              '七级站',
              '八级站',
              '九级站'
            ],
            axisLabel: {
              color: '#333'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '计划提水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} m³'
            }
          },
          {
            type: 'value',
            name: '实际提水量',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} m³'
            }
          }
        ],
        series: [
          {
            name: '计划提水量',
            type: 'bar',
            barWidth: '20',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [10,10,0,0]
              }
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
              3.3
            ]
          },
          {
            name: '实际提水量',
            type: 'bar',
            barWidth: '20',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [10,10,0,0]
              }
            },
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          }
        ]
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p,
  .el-select,
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
  #analysis,#crew {
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