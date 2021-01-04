<template>
  <div class="nav-wrap">
    <header>
      <div class="nav-title">
        <p class="zh-title">灌区信息化基础平台</p>
        <p class="en-title">Irrigated Area Platform</p>
      </div>
      <cus-menu :menuList="menuList"></cus-menu>
      <div class="login-info">
        <!-- <div class="message">
          <i class="icon iconfont icon-iconfontnaoling"></i>
          <i class="icon iconfont icon-fengexian"></i>
        </div> -->
        <div class="use-info">
          <div>
            <img src="../../images/user.png" alt />
          </div>
          <span>欢迎你 {{ name }}</span>
        </div>
        <div class="login-out" @click="logout">
          <i class="icon iconfont icon-tuichu"></i>
          <span>退出登录</span>
        </div>
      </div>
    </header>
    <div class="com-wrap">
      <div class="subRouter">
        <!-- <div class="icon iconfont" :class="subTitle.icon">{{subTitle.text}}</div> -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item, index) in breadList"
            :key="index"
            :to="{ name: item.name }"
            >{{ item.text }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
import cusMenu from "./cusMenu"
import {mapState} from "vuex"
export default {
  name: "navBar",
  components:{
    cusMenu
  },
  props: {
    menuList: {
      type: Array,
    },
  },
  computed:{
    ...mapState(["breadList","name"])
  },
  methods: {
    // 退出
    logout() {
      localStorage.clear();
      var nowTime = new Date();
      nowTime.setTime(nowTime.getTime() + -1 * 24 * 60 * 60 * 1000);
      document.cookie = `token= '';expires=${nowTime.toUTCString()}`;
      this.$router.replace("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-wrap {
  header {
    display: flex;
    height: 70px;
    background: #0b0f2a;
    .nav-title {
      width: 17vw;
      padding: 13px 0 26px 26px;
      color: #fff;
      .zh-title {
        font-size: 1.14vw;
      }
      .en-title {
        font-size: 0.073vw;
      }
    }
    
    .login-info {
      display: flex;
      position: absolute;
      height: 70px;
      right: 0;
      font-size: 0.8vw;
      color: #fff;
      line-height: 70px;
      cursor: pointer;
      .message {
        display: flex;
        margin-right: 20px;
        .icon-iconfontnaoling {
          margin-right: 20px;
          font-size: 20px;
        }
      }
      .use-info {
        display: flex;
        margin-right: 30px;
        div {
          width: 30px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          margin-right: 6px;
          img {
            width: 100%;
            height: 30px;
          }
        }
      }
      .login-out {
        margin-right: 26px;
        .icon-tuichu {
          margin-right: 8px;
        }
      }
    }
  }
  .com-wrap {
    height: calc(100% - 70px);
    .subRouter {
      display: flex;
      padding-bottom: 17px;
      background-image: url("../../images/index-bg.png");
      background-repeat: no-repeat;
      background-size: cover;
      padding: 26px;
      // div {
      //   width: 125px;
      //   height: 47px;
      //   background-image: url("../../images/sub-bg.png");
      //   background-repeat: no-repeat;
      //   background-size: cover;
      //   text-align: center;
      //   line-height: 47px;
      //   font-size: 14px;
      //   color: #78a8d7;
      //   cursor: pointer;
      // }
    }
  }
}
</style>
<style>
.el-breadcrumb .el-breadcrumb__inner {
  color: #fff !important;
}
</style>