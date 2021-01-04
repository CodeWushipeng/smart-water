<template>
  <div class="home">
    <div class="type-wrap">
      <div class="header">
        <div class="title">
          <p>行业供水水量统计</p>
        </div>
        <div class="data-img">
          <img src="../images/data-img.png" alt />
        </div>
      </div>
      <div class="use-type">
        <div class="type">
          <p>累计供水总量</p>
          <div>
            <p class="used-water">
              {{ typeWater.total }}
              <span>万方</span>
            </p>
          </div>
        </div>
        <div class="type">
          <p>农业供水总量</p>
          <div>
            <p class="used-water">
              {{ typeWater.nongye }}
              <span>万方</span>
            </p>
          </div>
        </div>
        <div class="type">
          <p>工业供水总量</p>
          <div>
            <p class="used-water">
              {{ typeWater.gongye }}
              <span>万方</span>
            </p>
          </div>
        </div>
        <div class="type">
          <p>生态供水总量</p>
          <div>
            <p class="used-water">
              {{ typeWater.shengtai }}
              <span>万方</span>
            </p>
          </div>
        </div>
        <div class="type">
          <p>城市供水总量</p>
          <div>
            <p class="used-water">
              {{ typeWater.chengshi }}
              <span>万方</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="percentage-wrap">
      <div class="header">
        <div class="title">
          <p>灌溉完成比统计</p>
        </div>
        <div class="data-img">
          <img src="../images/data-img.png" alt />
        </div>
      </div>
      <div class="prop-wrap">
        <div class="percentage">
          <div id="irrigated-water"></div>
          <p>灌溉水量</p>
        </div>
        <div class="percentage">
          <div id="irrigated-area"></div>
          <p>灌溉面积</p>
        </div>
        <div class="percentage">
          <div id="spring-water"></div>
          <p>春浇水量</p>
        </div>
        <div class="percentage">
          <div id="summer-water"></div>
          <p>夏浇水量</p>
        </div>
      </div>
    </div>
    <div class="allTotal">
      <div class="header">
        <div class="title">
          <p>灌区累积配水量总览</p>
          <div>
            <p>所示数据更新于{{ date }}</p>
            <div>
              更多
              <i class="icon iconfont icon-gengduo"></i>
            </div>
          </div>
        </div>
        <div class="data-img">
          <img src="../images/data-img.png" alt />
        </div>
      </div>
      <div class="data-wrap">
        <div class="data-list" v-for="(item, index) in areaWater" :key="index">
          <p class="data-title">{{ item.name }}</p>
          <p class="data-number">{{ item.number }}</p>
          <p class="compare">{{ item.compare }}</p>
        </div>
      </div>
    </div>
    <div class="charts-wrap">
      <div class="pump-wrap">
        <div class="pump-panel">
          <div class="pump-title">
            <span class="name">泵站提水量统计</span>
            <div class="pump-select">
              <!-- <p class="pump-info">一级站</p>
            <div class="icon iconfont icon-xiala"></div>
            <ul class="options">
              <li>一级站</li>
            </ul>-->
              <el-select v-model="pump">
                <el-option
                  v-for="(item, index) in pumpList"
                  :key="index"
                  :label="item.pump_station_name"
                  :value="item.pump_station_code"
                ></el-option>
              </el-select>
            </div>
            <div class="date-group">
              <button
                v-for="(item, index) in dateGroup"
                :key="index"
                :class="searchIndex === index ? 'active' : ''"
                @click="changeBtn(index, item)"
              >
                {{ item }}
              </button>
            </div>
            <div class="date-range">
              <el-date-picker
                v-model="pumpRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <!-- <div class="handel-group">
            <i class="icon iconfont icon-xiazai"></i>
            <i class="icon iconfont icon-shuju1" @click="barEcharts"></i>
            <i class="icon iconfont icon-shuju" @click="lineEcharts"></i>
            <div>
              <img src="../images/data-img.png" alt />
            </div>
          </div> -->
          </div>
          <div id="pump-charts"></div>
          <p>1-9级站本月提水量之和：1635.48</p>
        </div>
        <div class="pump-panel">
          <div class="pump-title">
            <span class="name">灌区配水统计</span>
            <div class="pump-select">
              <!-- <p class="pump-info">一级站</p>
            <div class="icon iconfont icon-xiala"></div>
            <ul class="options">
              <li>一级站</li>
            </ul>-->
              <!-- <el-select v-model="area">
                <el-option
                  v-for="(item, index) in areaList"
                  :key="index"
                  :label="item.canal_name"
                  :value="item.canal_code"
                ></el-option>
              </el-select> -->
              <el-cascader
                v-model="area"
                :options="areaTree"
                :props="props"
                :show-all-levels="false"
                placeholder="请选择灌区"
              ></el-cascader>
            </div>
            <div class="date-group">
              <button
                v-for="(item, index) in dateGroup"
                :key="index"
                :class="areaIndex === index ? 'active' : ''"
                @click="areaChange(index, item)"
              >
                {{ item }}
              </button>
            </div>
            <div class="date-range">
              <el-date-picker
                v-model="areaRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <!-- <div class="handel-group">
            <i class="icon iconfont icon-xiazai"></i>
            <i class="icon iconfont icon-shuju1"></i>
            <i class="icon iconfont icon-shuju"></i>
            <div>
              <img src="../images/data-img.png" alt />
            </div>
          </div> -->
          </div>
          <div id="irrigated-charts"></div>
        </div>
      </div>
    </div>

    <!-- <div class="report-form">
      <div class="header">
        <div class="title">
          <p>尊村灌区干渠利用率日报表</p>
          <div>
            <p>填表日期{{ date }}</p>
            <div>
              夏浇第
              <span class="total-date">57</span> 天
            </div>
          </div>
          <div class="search-form">
            <el-date-picker
              v-model="formDate"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
            <el-button type="primary" icon="el-icon-search" class="search-btn"
              >查询</el-button
            >
          </div>
        </div>
        <div class="data-img">
          <img src="../images/data-img.png" alt />
        </div>
      </div>
      <div class="used-table">
        <el-table
          :data="utilization"
          style="width: 100%"
          stripe
          show-summary
          fit
          :header-cell-style="headerStyle"
          :cell-style="cellStyle"
        >
          <el-table-column
            prop="name"
            label="干渠名称"
            :align="'center'"
          ></el-table-column>
          <el-table-column
            prop="people"
            label="责任人"
            :align="'center'"
          ></el-table-column>
          <el-table-column label="渠首供水量（m³）" :align="'center'">
            <el-table-column
              prop="sourceToday"
              label="当日"
              :align="'center'"
            ></el-table-column>
            <el-table-column
              prop="sourceTotal"
              label="累计"
              :align="'center'"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="区间输水量（m³）" :align="'center'">
            <el-table-column
              prop="areaToday"
              label="当日"
              :align="'center'"
            ></el-table-column>
            <el-table-column
              prop="areaTotal"
              label="累计"
              :align="'center'"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="配水量（m³）" :align="'center'">
            <el-table-column
              prop="supplyToday"
              label="当日"
              :align="'center'"
            ></el-table-column>
            <el-table-column
              prop="supplyTotal"
              label="累计"
              :align="'center'"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="退水量（m³）" :align="'center'">
            <el-table-column
              prop="backToday"
              label="当日"
              :align="'center'"
            ></el-table-column>
            <el-table-column
              prop="backTotal"
              label="累计"
              :align="'center'"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="输配水总量（m³）" :align="'center'">
            <el-table-column
              prop="transportToady"
              label="当日"
              :align="'center'"
            ></el-table-column>
            <el-table-column
              prop="transportTotal"
              label="累计"
              :align="'center'"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="渠道利用率（m³）" :align="'center'">
            <el-table-column
              prop="channelToday"
              label="当日"
              :align="'center'"
            ></el-table-column>
            <el-table-column
              prop="channelAverage"
              label="平均"
              :align="'center'"
            ></el-table-column>
          </el-table-column>
          <el-table-column
            prop="assessment"
            label="考核利用率（m³）"
            :align="'center'"
          >
          </el-table-column>
          <el-table-column label="利用率增减（m³）" :align="'center'">
            <el-table-column
              prop="difToday"
              label="当日"
              :align="'center'"
            ></el-table-column>
            <el-table-column
              prop="difTotal"
              label="平均"
              :align="'center'"
            ></el-table-column>
          </el-table-column>
          <el-table-column prop="spare" label="备用" :align="'center'">
          </el-table-column>
        </el-table>
        <p class="remarks">备注：报表起止时间为前一日早八时至当日早八时</p>
        <p>
          说明：1、渠首供水量系指灌区各级站提水总量；2、区间输水量系指下一级泵站的提水量；3、配水量指各级干渠供给下一级支、斗渠的水量之和；分干渠首供水量计入二干渠配水量；七灌区渠首供水量计入六七八干渠配水量。
          4、渠道利用率指输配总量与渠首供水量的比值。
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      date: new Date().toLocaleDateString(),
      typeWater: {
        total: "16533.68",
        nongye: "1533.68",
        gongye: "653.68",
        shengtai: "1663.68",
        chengshi: "8623.68",
      },
      areaWater: [
        {
          name: "一灌区",
          number: 25.65,
          compare: "去年同期62.315万方",
        },
        {
          name: "二灌区",
          number: 2.65,
          compare: "去年同期62.315万方",
        },
        {
          name: "三灌区",
          number: 263.65,
          compare: "去年同期62.315万方",
        },
        {
          name: "五灌区",
          number: 25.65,
          compare: "去年同期62.315万方",
        },
        {
          name: "六灌区",
          number: 1.65,
          compare: "去年同期62.315万方",
        },
        {
          name: "九干渠",
          number: 61.65,
          compare: "去年同期62.315万方",
        },
        {
          name: "四十里岗分干灌区",
          number: 89.65,
          compare: "去年同期62.315万方",
        },
        {
          name: "东下灌区",
          number: 0,
          compare: "去年同期62.315万方",
        },
        {
          name: "七灌区",
          number: 3.65,
          compare: "去年同期62.315万方",
        },
      ],
      pump: "",
      area: "",
      dateGroup: ["年", "月", "日"],
      searchIndex: 0,
      areaIndex: 0,
      pumpRange: "",
      areaRange: "",
      utilization: [],
      headerStyle: {
        background: "rgba(66,128,220,.7)",
        color: "#fff",
      },
      cellStyle: {
        background: "transparent",
        color: "#fff",
      },
      echartsType: "line",
      pumpX: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      pumpPlan: [820, 932, 901, 934, 1290, 1330, 1320],
      pumpActual: [700, 821, 600, 765, 633, 154, 666],
      props: {
        value: "canal_code",
        label: "canal_name",
        children: "child",
        emitPath: false,
      },
    };
  },
  computed: {
    ...mapState(["areaTree", "pumpList", "areaList"]),
  },
  mounted() {
    this.initPumpChart();
    this.initIrrigatedChart();
    this.initWaterProp();
    this.initAreaProp();
    this.initSpring();
    this.initSummer();
  },
  methods: {
    // 切换按钮
    changeBtn(index, name) {
      this.searchIndex = index;
    },
    areaChange(index, name) {
      this.areaIndex = index;
    },
    initPumpChart() {
      var myChart = this.$echarts.init(document.getElementById("pump-charts"));
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      // 绘制图表
      myChart.setOption({
        color: ["#4280dc", "#975FE4"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
          formatter: {},
          backgroundColor: "rgba(11,17,37,1)",
          borderWidth: "1",
          borderColor: "#4280DC",
          extraCssText: "border-radius: 0;",
        },
        legend: {
          data: ["计划", "实际"],
          y: " 10%",
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          show: true,
          itemGap: 20,
          itemSize: 20,
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            saveAsImage: { show: true },
          },
          iconStyle: {
            borderColor: "#4280dc",
            borderWidth: "1",
          },
          right: "10",
          tooltip: {
            show: true,
            textStyle: {
              color: "#4280DC",
            },
          },
        },
        grid: [
          {
            left: "0",
            bottom: "0",
            right: "1%",
            containLabel: true,
          },
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.pumpX,
          axisLabel: {
            color: "#4280dc",
          },
          axisLine: {
            onZero: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          name: "单位（万方）",
          nameTextStyle: {
            color: "#4280dc",
          },
          axisLabel: {
            color: "#4280dc",
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "计划",
            data: this.pumpPlan,
            type: "line",
            smooth: true,
            areaStyle: {
              color: "rgba(66, 128, 220, 0.3)",
            },
          },
          {
            name: "实际",
            data: this.pumpActual,
            type: "line",
            smooth: true,
            areaStyle: {
              color: "rgba(66, 128, 220, 0.3)",
            },
          },
        ],
      });
    },
    initIrrigatedChart() {
      var myChart = this.$echarts.init(
        document.getElementById("irrigated-charts")
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      // 绘制图表
      myChart.setOption({
        color: ["#4280dc", "#975FE4"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
          formatter: {},
          backgroundColor: "rgba(11,17,37,1)",
          borderWidth: "1",
          borderColor: "#4280DC",
          extraCssText: "border-radius: 0;",
        },
        legend: {
          data: ["计划", "实际"],
          y: " 10%",
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          show: true,
          itemGap: 20,
          itemSize: 20,
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            saveAsImage: { show: true },
          },
          iconStyle: {
            borderColor: "#4280dc",
            borderWidth: "1",
          },
          right: "10",
          tooltip: {
            show: true,
            textStyle: {
              color: "#4280DC",
            },
          },
        },
        grid: [
          {
            left: "0",
            bottom: "0",
            right: "1%",
            containLabel: true,
          },
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            color: "#4280dc",
          },
          axisLine: {
            onZero: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          name: "单位（万方）",
          nameTextStyle: {
            color: "#4280dc",
          },
          axisLabel: {
            color: "#4280dc",
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "计划",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            areaStyle: {
              color: "rgba(66, 128, 220, 0.3)",
            },
          },
          {
            name: "实际",
            data: [80, 93, 90, 93, 120, 133, 130],
            type: "line",
            smooth: true,
            areaStyle: {
              color: "rgba(66, 128, 220, 0.3)",
            },
          },
        ],
      });
    },
    initWaterProp() {
      var myChart = this.$echarts.init(
        document.getElementById("irrigated-water")
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)",
        // },
        color: ["#F3637C", "#333"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["65%", "85%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false,
              position: "center",
            },
            grid: [
              {
                left: "0",
                bottom: "0",
                right: "0",
                containLabel: true,
              },
            ],
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: function (argument) {
                  var html;
                  html = "30%";
                  return html;
                },
                textStyle: {
                  fontSize: 30,
                  color: "#00c0ef",
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
            ],
          },
        ],
      });
    },
    initAreaProp() {
      var myChart = this.$echarts.init(
        document.getElementById("irrigated-area")
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)",
        // },
        color: ["#37CBCB", "#333"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["65%", "85%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false,
              position: "center",
            },
            grid: [
              {
                left: "0",
                bottom: "0",
                right: "0",
                containLabel: true,
              },
            ],
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: function (argument) {
                  var html;
                  html = "30%";
                  return html;
                },
                textStyle: {
                  fontSize: 30,
                  color: "#00c0ef",
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
            ],
          },
        ],
      });
    },
    // 春浇水
    initSpring() {
      var myChart = this.$echarts.init(document.getElementById("spring-water"));
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)",
        // },
        color: ["#37CBCB", "#333"],
        series: [
          {
            name: "春浇水量",
            type: "pie",
            radius: ["65%", "85%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false,
              position: "center",
            },
            grid: [
              {
                left: "0",
                bottom: "0",
                right: "0",
                containLabel: true,
              },
            ],
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: function (argument) {
                  var html;
                  html = "30%";
                  return html;
                },
                textStyle: {
                  fontSize: 30,
                  color: "#00c0ef",
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
            ],
          },
        ],
      });
    },
    // 夏浇水
    initSummer() {
      var myChart = this.$echarts.init(document.getElementById("summer-water"));
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)",
        // },
        color: ["#37CBCB", "#333"],
        series: [
          {
            name: "夏浇水量",
            type: "pie",
            radius: ["65%", "85%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false,
              position: "center",
            },
            grid: [
              {
                left: "0",
                bottom: "0",
                right: "0",
                containLabel: true,
              },
            ],
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: function (argument) {
                  var html;
                  html = "30%";
                  return html;
                },
                textStyle: {
                  fontSize: 30,
                  color: "#00c0ef",
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
            ],
          },
        ],
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  padding: 0 26px 20px;
  background-image: url("../images/index-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  .allTotal {
    padding: 26px 30px 0;
    margin: 26px 0;
    background-image: url("../images/allTotal-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // height: 430px;
    .header {
      display: flex;
      justify-content: space-between;

      .title {
        display: flex;
        line-height: 42px;
        > p {
          color: #fff;
          font-size: 1.14vw;
          margin-right: 30px;
          background-image: url("../images/total-title.png");
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: left bottom;
        }
        > div {
          font-size: 18px;
          color: #4280dc;
          display: flex;
          p {
            margin-right: 45px;
          }
          div {
            cursor: pointer;
          }
        }
      }
      .data-img {
        width: 218px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .data-wrap {
      margin-top: 28px;
      display: flex;
      flex-wrap: wrap;
      padding: 0 20px;
      .data-list {
        width: 312px;
        height: 140px;
        text-align: center;
        color: #fff;
        background-image: url("../images/list-water.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: left bottom;
        margin-right: 45px;
        margin-bottom: 30px;
        line-height: 1.7;
        flex-shrink: 0;
        .data.title {
          font-size: 24px;
        }
        .data-number {
          font-size: 34px;
        }
        .compare {
          font-size: 16px;
        }
      }
      // .data-list:first-child {
      //   background-image: url("../images/all-water.png");
      // }
      .data-list:nth-child(5n + 5) {
        margin-right: 0;
      }
    }
  }
  .charts-wrap {
    margin-bottom: 23px;
    .pump-panel {
      width: 100%;
      padding: 26px 30px;
      margin-bottom: 24px;
      background-image: url("../images/allTotal-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
      #pump-charts,
      #irrigated-charts {
        height: 300px;
      }
      > p {
        font-size: 16px;
        color: #4280dc;
        margin-top: 16px;
      }
      .pump-title {
        display: flex;
        height: 40px;
        .name {
          color: #fff;
          font-size: 1.14vw;
          margin-right: 30px;
          background-image: url("../images/total-title.png");
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: left bottom;
        }
        .pump-select {
          width: 10vw;
          border: 1px solid #4280dc;
          border-radius: 4px;
          position: relative;
          cursor: pointer;
          margin-right: 32px;
          .el-select {
            width: 100%;
          }
          .pump-info {
            padding: 0 26px;
            font-size: 16px;
            color: #fff;
            border-right: 1px solid #fff;
          }
          .icon-xiala {
            color: #fff;
            font-size: 16px;
            flex: 1;
            text-align: center;
            line-height: 24px;
          }
          .options {
            position: absolute;
            width: 100%;
            left: 0;
            max-height: 96px;
            bottom: -40px;
            font-size: 16px;
            color: #000;
            background: #fff;
            li {
              padding: 4px 26px;
            }
          }
        }
        .date-group {
          border: 1px solid #4280dc;
          border-radius: 4px;
          margin-right: 32px;
          button {
            width: 2.8vw;
            height: 100%;
            line-height: 38px;
            text-align: center;
            background-color: transparent;
            font-size: 16px;
            color: #fff;
            border-right: 1px solid #4280dc;
            cursor: pointer;
          }
          button:last-child {
            border-right: none;
          }
          button.active {
            background-color: #4280dc;
          }
        }
        .date-range {
          background: #070917;
          width: 18.2vw;
          .el-date-editor {
            width: 100%;
          }
        }
        .handel-group {
          display: flex;
          margin-left: 32px;
          padding: 10px 0;
          cursor: pointer;
          i {
            width: 20px;
            height: 20px;
            font-size: 20px;
            color: #4280dc;
            margin-right: 20px;
          }
          div {
            width: 11vw;
            img {
              width: 100%;
              height: 16px;
            }
          }
        }
      }
    }
  }
  .type-wrap {
    // height: 243px;
    background-image: url("../images/allTotal-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 27px;
      .title {
        display: flex;
        line-height: 42px;
        > p {
          color: #fff;
          font-size: 1.14vw;
          margin-right: 30px;
        }
      }
      .data-img {
        width: 218px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .use-type {
      display: flex;
      // width: 100vw;
      flex-wrap: wrap;
      justify-content: space-between;
      .type:first-child {
        background-image: url("../images/total.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .type:nth-child(2) {
        background-image: url("../images/nonye.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .type:nth-child(3) {
        background-image: url("../images/gongye.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .type:nth-child(4) {
        background-image: url("../images/shengtai.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .type:nth-child(5) {
        background-image: url("../images/chengshi.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .type {
        width: 340px;
        height: 130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > p {
          font-size: 18px;
          color: #fff;
          text-align: center;
        }
        > div {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .img-wrap {
            width: 148px;
            height: 116px;
            margin-bottom: 20px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .used-water {
            font-size: 28px;
            color: #fff;
            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .percentage-wrap {
    background-image: url("../images/allTotal-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 20px 30px 0;
    margin-top: 26px;
    box-sizing: border-box;
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 27px;
      .title {
        display: flex;
        line-height: 42px;
        > p {
          color: #fff;
          font-size: 1.14vw;
          margin-right: 30px;
        }
      }
      .data-img {
        width: 218px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    > .prop-wrap {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      > .percentage {
        margin-bottom: 30px;
        > div {
          width: 180px;
          height: 180px;
        }
      }
      > .percentage > p {
        font-size: 24px;
        color: #fff;
        margin-top: 20px;
        text-align: center;
      }
    }
  }
  .proportion {
    width: 300px;
    padding: 20px;
    background-image: url("../images/allTotal-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    > p {
      font-size: 18px;
      width: 150px;
      height: 40px;
      color: #fff;
      background-image: url("../images/total-title.png");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: left bottom;
    }
  }
  .report-form {
    padding: 26px 0;
    background-image: url("../images/allTotal-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    .header {
      display: flex;
      justify-content: space-between;

      .title {
        display: flex;
        line-height: 42px;
        > p {
          color: #fff;
          font-size: 1.14vw;
          margin-right: 30px;
          background-image: url("../images/total-title.png");
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: left bottom;
        }
        > div {
          font-size: 18px;
          color: #4280dc;
          display: flex;
          p {
            margin-right: 45px;
          }
          div {
            cursor: pointer;
          }
        }
        .total-date {
          color: #fff;
        }
      }
      .search-form {
        margin-left: 98px;
        .search-btn {
          margin-left: 10px;
        }
      }
      .data-img {
        width: 218px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .used-table {
      margin-top: 44px;
      .el-table thead.is-group th {
        background: #4280dc;
      }
      p {
        color: #4280dc;
        font-size: 18px;
      }
      .remarks {
        margin: 26px 0 15px;
      }
    }
  }
}
</style>
