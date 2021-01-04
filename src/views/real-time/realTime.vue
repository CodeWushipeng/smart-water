<template>
  <div class="real">
    <div class="select-pump">
      <p>泵站名称</p>
      <el-select v-model="pump">
        <el-option
          v-for="(item, index) in pumpList"
          :key="index"
          :label="item.pump_station_name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <div class="pump-info">
      <div class="info" v-for="(item, index) in pumpInfo" :key="index">
        <div class="info-name">{{ item.name }}</div>
        <div class="info-describe">
          <span>{{ item.number }}</span>
          {{ item.unit }}
        </div>
      </div>
    </div>
    <div class="chart-wrap">
      <div class="pump-title">
        <span class="name">泵站名称</span>
        <div class="pump-select">
          <el-select v-model="pumpTwo">
            <el-option
              v-for="(item, index) in pumpList"
              :key="index"
              :label="item.pump_station_name"
              :value="item.id"
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
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
      </div>
      <div class="title-wrap">
        <div class="title">
          <div class="mark"></div>
          <h6>生产耗电量统计</h6>
        </div>
        <div class="unit">单位（kw.h）</div>
      </div>
      <div id="station-charts"></div>
    </div>
    <div class="now-pump">
      <div class="describe">
        <p class="pump-name">一级站</p>
        <p class="flow">流量单位：m³/s</p>
      </div>
      <div class="pump-stations">
        <div class="station" v-for="(item, index) in stations" :key="index">
          <img :src="item.imgSrc" alt="" srcset="" />
          <p class="flowNumber">{{ item.value }}</p>
          <div class="first-flow">1#</div>
          <div class="second-flow">2#</div>
        </div>
      </div>
      <div class="pump-bg"></div>
      <p>取水池</p>
    </div>
    <div class="station-lists">
      <div class="station" v-for="(item, index) in stationFlow" :key="index">
        <p>{{ item.name }}</p>
        <div class="desc">
          <div>
            <img src="../../images/flow.png" alt />
          </div>
          <p>当前流量</p>
        </div>
        <div class="station-flow">{{ item.flow }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pump: "",
      pumpTwo: "",
      searchIndex: 0,
      waterGif: require("../../images/undo.png"),
      pumpRange: "",
      dateGroup: ["年", "月", "日"],
      pumpInfo: [
        {
          name: "开机台数",
          number: 5,
          unit: "台",
        },
        {
          name: "开机流量",
          number: 5,
          unit: "m³/s",
        },
        {
          name: "总提水量",
          number: 5,
          unit: "m³",
        },
        {
          name: "进水池水位",
          number: 5,
          unit: "m",
        },
        {
          name: "出水池水位",
          number: 55,
          unit: "m",
        },
        {
          name: "地形扬程",
          number: 5,
          unit: "m",
        },
        {
          name: "进水池水深",
          number: 5,
          unit: "m",
        },
        {
          name: "出水池水深",
          number: 5,
          unit: "m",
        },
        {
          name: "设计扬程",
          number: 5,
          unit: "m",
        },
      ],
      // stations: [10, 20, 30, 40, 50, 60],
      stations: [
        {
          value: 10,
          imgSrc: require("../../images/water-left.gif"),
        },
        {
          value: 20,
          imgSrc: require("../../images/undo.png"),
        },
        {
          value: 30,
          imgSrc: require("../../images/undo.png"),
        },
        {
          value: 40,
          imgSrc: require("../../images/undo.png"),
        },
        {
          value: 50,
          imgSrc: require("../../images/undo.png"),
        },
        {
          value: 60,
          imgSrc: require("../../images/undo.png"),
        },
      ],
      stationFlow: [
        {
          name: "一级站",
          flow: "5455.45 m³/s",
        },
        {
          name: "二级站",
          flow: "5455.45 m³/s",
        },
        {
          name: "三级站",
          flow: "5455.45 m³/s",
        },
        {
          name: "四级站",
          flow: "5455.45 m³/s",
        },
        {
          name: "五级站",
          flow: "5455.45 m³/s",
        },
        {
          name: "六级站",
          flow: "5455.45 m³/s",
        },
        {
          name: "七级站",
          flow: "5455.45 m³/s",
        },
        {
          name: "八级站",
          flow: "5455.45 m³/s",
        },
        {
          name: "九级站",
          flow: "5455.45 m³/s",
        },
      ],
    };
  },
  computed: {
    pumpList() {
      return this.$store.state.pumpList;
    },
    areaList() {
      return this.$store.state.areaList;
    },
  },
  mounted() {
    // this.stations.splice(0,1,{
    //   value:10,
    //   imgSrc:require("../../images/water-right.gif")
    // })
    this.initStationCharts();
  },
  methods: {
    // 切换按钮
    changeBtn(index,name){
      this.searchIndex = index
    },
    initStationCharts() {
      var myChart = this.$echarts.init(
        document.getElementById("station-charts")
      );
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      // 绘制图表
      myChart.setOption({
        color: ["#4280dc"],
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
            // show: true,
            textStyle: {
              color: "#4280DC",
            },
          },
        },
        grid: [
          {
            left: "0",
            bottom: "0",
            right: "10px",
            containLabel: true,
          },
        ],
        xAxis: {
          type: "category",
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: "dashed",
            },
          },
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          // axisLabel: {
          //   color: "#4280dc",
          // },
          axisLine: {
            onZero: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: "solid",
            },
          },
          // axisLabel: {
          //   color: "#4280dc",
          // },
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#4280dc",
                },
              },
            },
            smooth: true,
            areaStyle: {
              color: "rgba(66, 128, 220, 0.3)",
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-wrap {
  width: 100%;
  margin-bottom: 24px;
  #station-charts {
    height: 300px;
  }
  .title-wrap{
    display: flex;
    height: 30px;
    margin-top: 20px;
    .title{
      margin-right: 20px;
      display: flex;
      height: 100%;
      .mark{
        width: 5px;
        height: 100%;
        background-color: #4280dc;
        margin-right: 10px;
      }
      h6{
        font-size: 26px;
        line-height: 30px;
      }
    }
    .unit{
      font-size: 16px;
      color: #666;
      line-height: 40px;
    }
  }
  .pump-title {
    display: flex;
    height: 40px;
    .name{
      margin-right: 30px;
      line-height: 40px;
    }
    .pump-select {
      width: 7.7vw;
      // border: 1px solid #4280dc;
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
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      margin-right: 32px;
      button {
        width: 2.8vw;
        line-height: 38px;
        text-align: center;
        background-color: transparent;
        font-size: 16px;
        color: #000;
        border-right: 1px solid #DCDFE6;
        cursor: pointer;
      }
      button:last-child {
        border-right: none;
      }
      button.active {
        background-color: #4280dc;
        color: #fff;
      }
    }
    .date-range {
      width: 18.2vw;
      margin-right: 30px;
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
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p,
  .el-select {
    margin-right: 30px;
  }
}
.pump-info {
  padding: 36px;
  margin-bottom: 36px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .info {
    width: 560px;
    height: 50px;
    border: 1px solid #4280dc;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    margin-bottom: 17px;
    display: flex;
    .info-name {
      width: 225px;
      background-color: #4280dc;
      color: #fff;
    }
    .info-describe {
      color: #171819;
      flex: 1;
      span {
        color: #4280dc;
      }
    }
  }
}
.now-pump {
  background-color: #f0f0f0;
  perspective: 150px;
  perspective-origin: center;
  position: relative;
  padding: 0 35px;
  width: 100%;
  height: 400px;
  display: flex;
  box-sizing: border-box;
  margin-bottom: 36px;
  .describe {
    padding-top: 40px;
    margin-right: 80px;
    .pump-name {
      font-size: 24px;
      color: #171819;
    }
    .flow {
      font-size: 20px;
      color: #4280dc;
    }
  }
  .pump-stations {
    display: flex;
    justify-content: space-between;
    width: 1388px;
    .station {
      width: 166px;
      height: 357px;
      // background-image: url('../../images/water-right.gif');
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
      .flowNumber {
        position: absolute;
        top: 24px;
        left: 40px;
        width: 85px;
        height: 32px;
        border-radius: 16px;
        background-color: #fff;
        font-size: 24px;
        color: #4280dc;
        text-align: center;
        line-height: 1.3;
      }
      > div {
        width: 54px;
        height: 24px;
        border-radius: 12px;
        background-color: #fff;
        font-size: 18px;
        color: #4280dc;
        position: absolute;
        bottom: 26px;
        text-align: center;
        line-height: 1.4;
      }
      .first-flow {
        left: 14px;
      }
      .second-flow {
        right: 14px;
      }
    }
  }
  .pump-bg {
    position: absolute;
    left: 80px;
    bottom: 18px;
    z-index: -1;
    width: 91%;
    height: 100px;
    background-color: #4280dc;
    transform: rotateX(15deg);
  }
  > p {
    position: absolute;
    left: 108px;
    bottom: 30px;
    font-size: 24px;
    color: #fff;
  }
}
.station-lists {
  display: flex;
  width: 100%;
  justify-content: space-between;
  .station {
    width: 186px;
    height: 126px;
    border-radius: 5px;
    border: 1px solid #4280dc;
    background: rgba($color: #4280dc, $alpha: 0.1);
    padding: 22px 0;
    text-align: center;
    > p {
      font-size: 26px;
      color: #4280dc;
      margin-bottom: 10px;
    }
    .desc {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;
      > div {
        width: 16px;
        height: 22px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      > p {
        font-size: 20px;
        color: #171819;
        margin-left: 6px;
      }
    }
    .station-flow {
      font-size: 22px;
      color: #171819;
    }
  }
}
</style>