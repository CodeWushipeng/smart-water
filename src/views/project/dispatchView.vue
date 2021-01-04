<template>
  <div class="overview">
    <div class="select-pump">
      <!-- <p>时间区间</p>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search">查询</el-button> -->
      <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
      <el-tag
        :effect="nowIndex == index ? 'dark' : 'plain'"
        @click="selectDate(item, index)"
        v-for="(item, index) in dateTags"
        :key="index"
        >{{ item }}</el-tag
      >
    </div>
    <div class="table-wrap">
      <div
        class="dispatch-wrap"
        v-for="(item, index) in dispatchData"
        :key="index"
      >
        <div class="dispatch-item">
          <div class="dis-top">
            <p>提水量(m³)</p>
            <div>{{ item.plan_water_use }}</div>
          </div>
          <div class="dis-bottom">
            <p>{{ item.pump_station_name }}</p>
          </div>
        </div>
        <div class="command">
          <el-button
            type="primary"
            icon="el-icon-top-right"
            :disabled="btnStatu"
            @click="generateCommander(item)"
            >生成调度命令</el-button
          >
        </div>
      </div>
    </div>
    <!-- <div class="command">
      <el-button
        type="primary"
        icon="el-icon-top-right"
        :disabled="btnStatu"
        @click="generateCommander"
        >生成调度命令</el-button
      >
    </div> -->

    <el-dialog
      title="生成调度命令"
      :visible.sync="commandVisible"
      width="800px"
      class="cusDialog"
    >
      <div class="main">
        <div class="commandItem">
          <div class="pump">
            <div class="small-mark"></div>
            <span>{{ pump }}</span>
          </div>
          <div class="info-item">
            <span>提水量(m³)</span>
            <el-input v-model="water" readonly></el-input>
          </div>
          <div class="info-item">
            <span>流量</span>
            <el-input v-model="flow" readonly></el-input>
          </div>
          <div class="info-item">
            <span>开机方案</span>
            <el-select v-model="witchPump">
              <el-option
                v-for="(item, index) in programme"
                :key="index"
                :label="item.pump_name | programmeHandel"
                :value="item.pump_id | programmeHandel"
              ></el-option>
            </el-select>
          </div>
          <div class="info-item">
            <span>开机时间</span>
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="请选择开机时间"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="sendCommand">
        <el-button
          icon="el-icon-s-promotion"
          type="primary"
          @click="postProgramme"
          >确认发送</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      nowIndex: 0,
      dateTags: ["今天", "明天", "后天"],
      btnStatu: false,
      interId: null,
      dispatchData: [],
      headerStyle: {
        background: "#f0f0f0",
      },
      pump: "",
      pumpId:null,
      currentPage: 1,
      commandVisible: false,
      water: "",
      flow: "",
      witchPump: "",
      startTime: "",
      programme: [],
    };
  },
  // created() {
  //   if (new Date().getHours() > 10) {
  //     this.btnStatu = true;
  //   } else {
  //     this.interId = setInterval(() => {
  //       if (new Date().getHours() > 10) {
  //         this.btnStatu = true;
  //         clearInterval(this.interId);
  //       } else {
  //         this.btnStatu = false;
  //       }
  //     }, 1000);
  //   }
  // },
  filters: {
    programmeHandel: function (value) {
      if (Array.isArray(value)) {
        return value.toString();
      } else {
        return value;
      }
    },
  },
  mounted() {
    let originDate = new Date();
    originDate.setTime(originDate.getTime());
    let today =
      originDate.getFullYear() +
      "-" +
      (originDate.getMonth() + 1) +
      "-" +
      originDate.getDate();
    this.date = today;
    this.getDispatchLists();
  },
  destroyed() {
    if (this.interId) {
      clearInterval(this.interId);
    }
  },
  methods: {
    // 获取调度概览列表
    getDispatchLists() {
      let data = {
        date: this.date,
      };
      this.axios
        .post("/dispatch_index", data)
        .then((res) => {
          if (res.code == 0) {
            this.dispatchData = res.data.list;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 时间选择
    selectDate(date, index) {
      this.nowIndex = index;
      if (date == "今天") {
        let originDate = new Date();
        originDate.setTime(originDate.getTime());
        let today =
          originDate.getFullYear() +
          "-" +
          (originDate.getMonth() + 1) +
          "-" +
          originDate.getDate();
        this.date = today;
      } else if (date == "后天") {
        let originDate = new Date();
        originDate.setTime(originDate.getTime() + 2 * 24 * 60 * 60 * 1000);
        let afterTomorrow =
          originDate.getFullYear() +
          "-" +
          (originDate.getMonth() + 1) +
          "-" +
          originDate.getDate();
        this.date = afterTomorrow;
      } else if (date == "明天") {
        let originDate = new Date();
        originDate.setTime(originDate.getTime() + 24 * 60 * 60 * 1000);
        let tomorrow =
          originDate.getFullYear() +
          "-" +
          (originDate.getMonth() + 1) +
          "-" +
          originDate.getDate();
        this.date = tomorrow;
      }
      this.getDispatchLists();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 查看调度命令
    generateCommander(data) {
      this.water = "";
      this.flow = "";
      this.witchPump = "";
      this.programme = [];
      this.startTime = "";
      this.pump = "";
      this.commandVisible = true;
      this.pumpId = data.pump_station_id
      let postData = {
        pump_station_id: data.pump_station_id,
      };
      this.axios
        .post("/dispatch_record", postData)
        .then((res) => {
          if (res.code == 0) {
            this.water = res.data.plan_water_use;
            this.flow = res.data.water_flow;
            this.witchPump =
              res.data.scheme.length > 0
                ? res.data.scheme[0].pump_id.toString()
                : "";
            this.programme = res.data.scheme;
            this.startTime = res.data.date;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 发送调度方案
    postProgramme() {
      let postData={
        pump_station_id: this.pumpId,
        start_time: this.startTime+" "+"08:00:00"
      }
      this.axios
        .post("/dispatch_add", postData)
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type:"success",
              message:"调度方案发送成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"调度方案发送失败"
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.commandVisible = false
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  padding: 0 26px;
}
.el-tag {
  cursor: pointer;
  margin-right: 20px;
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 40px 0;
  height: 40px;
  align-items: center;
  p,
  .el-date-editor,
  .el-button {
    margin-right: 30px;
  }
}
.table-wrap {
  display: flex;
  flex-wrap: wrap;
  // .dispatch-item:first-child {
  //   .dis-bottom {
  //     background-image: url("../../images/dis-total.png");
  //   }
  // }
  .dispatch-wrap {
    width: 320px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .dispatch-wrap:nth-child(5n + 5) {
    margin-right: 0;
  }
  .dispatch-item {
    width: 100%;
    height: 284px;
    border-radius: 10px;
    border: 1px solid #d0d0d0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .dis-top {
      text-align: center;
      > p {
        font-size: 24px;
        color: #171819;
        margin-bottom: 10px;
      }
      > div {
        color: #4280dc;
        font-size: 30px;
      }
    }
    .dis-bottom {
      width: 285px;
      height: 155px;
      font-size: 22px;
      color: #fff;
      background-image: url("../../images/dis.png");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 0 0;
      position: relative;
      > p {
        position: absolute;
        bottom: 50%;
        left: 50%;
        transform: translate(-60%, 100%);
      }
    }
  }
}
.command {
  display: flex;
  width: 100%;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  margin: 20px auto 0;
  cursor: pointer;
  > i {
    margin-right: 10px;
  }
}
.cusDialog {
  padding: 73px 32px;
  .main {
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 16px;
    display: flex;
    justify-content: center;
    .commandItem {
      width: 538px;
      border-radius: 10px;
      border: 1px solid #91b7f1;
      padding: 20px;
      margin: 0 15px 15px 0;
      background-color: #fff;
      .pump {
        font-size: 20px;
        color: #4280dc;
        margin-bottom: 24px;
        .small-mark {
          width: 4px;
          height: 20px;
          background-color: #4280dc;
          margin-right: 10px;
          display: inline-block;
        }
      }
      .info-item {
        margin-bottom: 24px;
        span {
          margin-right: 30px;
          text-align: right;
          display: inline-block;
          width: 100px;
        }
        .el-input,
        .el-select,
        .el-date-editor {
          width: 367px;
        }
      }
    }
  }
  .sendCommand {
    margin: 20px 0 0;
    display: flex;
    justify-content: center;
    .button {
      padding: 8px 15px;
      background-color: #4280dc;
      border-radius: 5px;
      font-size: 18px;
      display: inline-block;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>