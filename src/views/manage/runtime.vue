<template>
  <div class="manage">
    <div class="overview">
      <div class="select-pump">
        <div class="left">
          <div class="form-item">
            <p>泵站名称</p>
            <el-select :value="area"></el-select>
          </div>
          <el-button-group class="form-item">
            <el-button
              v-for="(item, index) in btnGroup"
              :key="index"
              :type="activeBtn == index ? 'primary' : ''"
              >{{ item }}</el-button
            >
          </el-button-group>
          <div class="form-item">
            <p>时间区间</p>
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="model"
            ></el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>

        <div class="change-chart">
          <div class="icon iconfont icon-shuju1" @click="lineCharts"></div>
          <div class="icon iconfont icon-shuju" @click="barCharts"></div>
        </div>
      </div>
      <div class="charts-wrap">
        <div class="mark"></div>
        <div id="analysis"></div>
      </div>
    </div>
    <div class="overview">
      <div class="select-pump">
        <div class="left">
          <div class="form-item">
            <p>泵站名称</p>
            <el-select :value="area"></el-select>
          </div>
          <el-button-group class="form-item">
            <el-button
              v-for="(item, index) in btnGroup"
              :key="index"
              :type="activeBtn == index ? 'primary' : ''"
              >{{ item }}</el-button
            >
          </el-button-group>
          <div class="form-item">
            <p>时间区间</p>
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="model"
            ></el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>

        <div class="change-chart">
          <div class="icon iconfont icon-shuju1"></div>
          <div class="icon iconfont icon-shuju"></div>
        </div>
      </div>
      <div class="charts-wrap">
        <div class="mark"></div>
        <div id="electricity"></div>
      </div>
    </div>
    <div class="overview">
      <div class="select-pump">
        <div class="left">
          <div class="form-item">
            <p>泵站名称</p>
            <el-select :value="area"></el-select>
          </div>
          <el-button-group class="form-item">
            <el-button
              v-for="(item, index) in btnGroup"
              :key="index"
              :type="activeBtn == index ? 'primary' : ''"
              >{{ item }}</el-button
            >
          </el-button-group>
          <div class="form-item">
            <p>时间区间</p>
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="model"
            ></el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>

        <div class="change-chart">
          <div class="icon iconfont icon-shuju1"></div>
          <div class="icon iconfont icon-shuju"></div>
        </div>
      </div>
      <div class="charts-wrap">
        <div class="mark"></div>
        <div id="powerTimely"></div>
      </div>
    </div>
    <div class="overview">
      <div class="select-pump">
        <div class="left">
          <div class="form-item">
            <p>泵站名称</p>
            <el-select :value="area"></el-select>
          </div>
          <el-button-group class="form-item">
            <el-button
              v-for="(item, index) in btnGroup"
              :key="index"
              :type="activeBtn == index ? 'primary' : ''"
              >{{ item }}</el-button
            >
          </el-button-group>
          <div class="form-item">
            <p>时间区间</p>
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="model"
            ></el-date-picker>
          </div>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>

        <div class="change-chart">
          <div class="icon iconfont icon-shuju1"></div>
          <div class="icon iconfont icon-shuju"></div>
        </div>
      </div>
      <div class="charts-wrap">
        <div class="mark"></div>
        <div id="safe"></div>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      area: '',
      model: '',
      point: '',
      activeBtn: 0,
      btnGroup: ['年', '月', '日'],
      waterOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        color: ['#4280DC'],
        title: {
          text: '提水量统计'
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
              '一灌区',
              '二灌区',
              '三灌区',
              '四灌区',
              '五灌区',
              '六灌区',
              '七灌区',
              '八灌区',
              '九灌区'
            ],
            axisLabel: {
              color: '#333'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}(元)'
            }
          }
        ],
        series: [
          {
            name: '水费统计',
            type: 'bar',
            barWidth: '20',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [10, 10, 0, 0]
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
          }
        ]
      }
    }
  },
  mounted() {
    this.initCharts(this.waterOptions)
    this.initElectricityCharts()
    this.initPowerTimelyCharts()
    this.initSafe()
  },
  methods: {
    // 导出excel
    exportExcel() {
      let xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      / generate workbook object from table /;
      /* 从表生成工作簿对象 */
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#projectTab"),  //elementui 表格的id
        xlsxParam
      );

      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    lineCharts() {
      this.waterOptions.series[0].type = 'line'
      this.waterOptions.series[0].smooth = true
      this.waterOptions.series[0].areaStyle = {
        color: 'rgba(66, 128, 220, 0.3)'
      }
      this.initCharts(this.waterOptions)
    },
    barCharts(){
      this.waterOptions.series[0].type = 'bar'
      this.initCharts(this.waterOptions)
    },
    initCharts(options) {
      var myChart = this.$echarts.init(document.getElementById('analysis'))
      myChart.setOption(options)
    },
    initElectricityCharts() {
      var myChart = this.$echarts.init(document.getElementById('electricity'))
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
        color: ['#4280DC'],
        title: {
          text: '提水量统计'
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
              '一灌区',
              '二灌区',
              '三灌区',
              '四灌区',
              '五灌区',
              '六灌区',
              '七灌区',
              '八灌区',
              '九灌区'
            ],
            axisLabel: {
              color: '#333'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}(元)'
            }
          }
        ],
        series: [
          {
            name: '水费统计',
            type: 'line',
            barWidth: '20',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            smooth: true,
            areaStyle: {
              color: 'rgba(66, 128, 220, 0.3)'
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
          }
        ]
      })
    },
    initPowerTimelyCharts() {
      var myChart = this.$echarts.init(document.getElementById('powerTimely'))
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
        color: ['#4280DC'],
        title: {
          text: '提水量统计'
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
              '一灌区',
              '二灌区',
              '三灌区',
              '四灌区',
              '五灌区',
              '六灌区',
              '七灌区',
              '八灌区',
              '九灌区'
            ],
            axisLabel: {
              color: '#333'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}(元)'
            }
          }
        ],
        series: [
          {
            name: '水费统计',
            type: 'bar',
            barWidth: '20',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [10, 10, 0, 0]
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
          }
        ]
      })
    },
    initSafe() {
      var myChart = this.$echarts.init(document.getElementById('safe'))
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
        color: ['#4280DC'],
        title: {
          text: '提水量统计'
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
              '一灌区',
              '二灌区',
              '三灌区',
              '四灌区',
              '五灌区',
              '六灌区',
              '七灌区',
              '八灌区',
              '九灌区'
            ],
            axisLabel: {
              color: '#333'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}(元)'
            }
          }
        ],
        series: [
          {
            name: '水费统计',
            type: 'line',
            barWidth: '20',
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            smooth: true,
            areaStyle: {
              color: 'rgba(66, 128, 220, 0.3)'
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
          }
        ]
      })
    }
  }
}
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
  display: flex;
  padding-bottom: 40px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  .left,
  .change-chart {
    display: flex;
  }
  .change-chart {
    color: #4280dc;
    cursor: pointer;
    width: 80px;
    justify-content: space-between;
    align-items: center;
    .iconfont {
      font-size: 20px;
    }
    .icon-shuju {
      font-size: 26px;
    }
  }
  .form-item {
    display: flex;
    margin-right: 30px;
    align-items: center;
    p {
      margin-right: 30px;
    }
  }
  > .el-button {
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
  #analysis,
  #electricity,
  #safe,
  #powerTimely {
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