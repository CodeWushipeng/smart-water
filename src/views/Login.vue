<template>
  <div class="login-wrap">
    <div class="login-top">
      <p class="title">灌区信息化基础平台</p>
      <div class="registry">
        <span>没有账号？</span>
        <div class="login-up">注册</div>
      </div>
    </div>
    <div class="login-panel">
      <div class="login-bg">
        <img src="../images/login-lbg.png" alt />
      </div>
      <div class="login-form">
        <p class="sub-title">登录</p>
        <div class="form-item">
          <input type="text" id="account" v-model="account" />
          <label :class="account ? 'active' : ''" for="account">账号</label>
        </div>
        <div class="form-item">
          <input
            type="password"
            @keyup.enter="login"
            id="password"
            v-model="password"
          />
          <label :class="password ? 'active' : ''" for="password">密码</label>
          <!-- <p>忘记密码？</p> -->
        </div>
        <!-- <div class="form-item">
          <input type="text" id="verification" v-model="verification" />
          <label :class="verification?'active':''" for="verification">验证码</label>
          <div class="verifi-img">
            <img src alt />
          </div>
        </div> -->
        <!-- <div class="auto-login">
          <input type="checkbox" v-model="autoLogin" id="autoCheck" />
          <label for="autoCheck">自动登录</label>
        </div> -->
        <button class="to-login" @click="login">登录</button>
      </div>
      <div class="login-bottom"></div>
    </div>
  </div>
</template>

      
<script>
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_API;
export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: "",
      verification: "",
      autoLogin: "",
    };
  },
  methods: {
    login() {
      if (!this.account || !this.password) {
        this.$message({
          type: "error",
          message: "请输入账户名和密码",
        });
        return;
      } else {
        const loading = this.$loading({
          lock: true,
          text: "登录中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let loginData = {
          user_name: this.account,
          password: this.password,
          // verification: this.verification,
          // autoLogin: this.autoLogin
        };
        axios
          .post("/login", loginData)
          .then((res) => {
            console.log(res);
            loading.close();
            if (res.data.code == 0) {
              this.$notify({
                title: "提示",
                message: "登录成功",
                type: "success",
                duration: 1000,
              });
              var nowTime = new Date();
              nowTime.setTime(nowTime.getTime() + 1 * 24 * 60 * 60 * 1000);
              document.cookie = `token= ${
                res.data.data.token
              };expires=${nowTime.toUTCString()}`;
              console.log(document.cookie);
              this.$store.commit("setToken", res.data.data.token);
              localStorage.setItem(
                "user_name",
                res.data.data.user_info.real_name
              );
              localStorage.setItem(
                "originMenus",
                JSON.stringify(res.data.data.menu)
              );
              this.$router.replace("/home");
            } else {
              this.$notify({
                title: "提示",
                message: "登录失败",
                type: "error",
                duration: 1000,
              });
            }
          })
          .catch((error) => {
            loading.close();
          });
      }
    },
  },
};
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #fff;
  padding-top: 200px;
  box-sizing: border-box;
}
.login-top {
  background: transparent;
}
.login-panel {
  display: flex;
  padding: 0 70px;
}
.login-bg {
  width: 40vw;
  height: 575px;
  margin-right: 9.3vw;
  margin-left: 10.4vw;
}
.login-bg img {
  width: 100%;
  height: 100%;
}
.title {
  font-size: 36px;
  color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 30px;
  padding-left: 60px;
  height: 430px;
  width: 840px;
  background-image: url("../images/login-top.png");
  background-size: 70% 60%;
  background-repeat: no-repeat;
}
.registry {
  position: absolute;
  right: 70px;
  top: 60px;
  height: 43px;
  display: flex;
  line-height: 43px;
}
.registry > span {
  font-size: 22px;
  color: #bababa;
}
.login-up {
  color: #3f3f40;
  width: 105px;
  height: 43px;
  font-size: 24px;
  border: 1px solid #131415;
  margin-left: 27px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
.login-form {
  width: 528px;
  background-color: #fff;
}
.login-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 610px;
  height: 303px;
  background-image: url("../images/login-bottom.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: right bottom;
}
.sub-title {
  font-size: 38px;
  color: #131415;
  margin-bottom: 47px;
}
.form-item {
  position: relative;
  height: 60px;
  font-size: 26px;
  margin-bottom: 30px;
  padding-bottom: 10px;
}
#account,
#verification,
#password {
  display: inline-block;
  height: 100%;
  width: 100%;
  font-size: 26px;
  border-bottom: 1px solid #707070;
}
.form-item > label {
  position: absolute;
  left: 0;
  bottom: 20px;
  transition: all 0.2s;
  color: #bababa;
  cursor: text;
}
.form-item > p {
  color: #66b1ff;
  font-size: 22px;
  position: absolute;
  right: 0;
  bottom: 20px;
  cursor: pointer;
}
#account:focus,
#verification:focus,
#password:focus {
  outline: none;
  border-bottom: 1px solid #66b1ff;
}
#account:focus + label,
#verification:focus + label,
#password:focus + label {
  transform: translateY(-40px);
  font-size: 18px;
}
.active {
  transform: translateY(-40px);
  font-size: 18px;
}
.auto-login {
  font-size: 22px;
  color: #bababa;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
}
.auto-login > label {
  margin-left: 38px;
  cursor: pointer;
  user-select: none;
}
#autoCheck {
  display: inline-block;
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: #bababa;
  margin-top: 5px;
  border-radius: 3px;
}
.to-login {
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 26px;
  color: #fff;
  background-color: #66b1ff;
  margin-top: 40px;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
}
</style>