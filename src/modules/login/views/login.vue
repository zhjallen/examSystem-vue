<template>
  <div class="main">
    <canvas v-show="false" id="loginAni"></canvas>
    <div class="logo">
      <!-- <img src="../../../../../assets/logo.png" alt="">-->
      <span>考试系统</span>
    </div>
    <div class="main-login">
      <img class="img-login" src="../../../assets/images/login.jpg">
      <div class="login-wrapper">
        <div class="login-block">
          <div class="sys-logo">密码登录</div>
          <span v-show="loginFail" class="login-fail-message">{{loginFailMessage}}</span>
          <el-form
            class="login-form"
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            size="medium"
          >
            <el-form-item prop="username">
              <el-input
                class="login-input"
                type="text"
                @keyup.enter.native="login('loginForm')"
                v-model="loginForm.username"
                placeholder="用户名"
                clearable
              >
                <i slot="prefix" class="fa fa-user"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                class="login-input"
                type="password"
                v-model="loginForm.password"
                @keyup.enter.native="login('loginForm')"
                placeholder="密码"
                clearable
              >
                <i slot="prefix" class="fa fa-key"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="type">
              <el-select  v-model="loginForm.type">
                <el-option :key="'1'" :value="'1'" :label="'学生'"></el-option>
                 <el-option :key="'2'" :value="'2'" :label="'管理员'"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item class="formItem imageCode" prop="imageCode">
            <el-input
              class="login-input"
              type="password"
              v-model="loginForm.imageCode"
              placeholder="验证码"
              clearable
            >
            </el-input>
             <img src="http://192.168.0.122:2183/passport/verifycode/image?time=1496912614360"/>
           
            </el-form-item>-->
            <el-form-item>
              <div style="margin-top:8px;">
                <el-button
                  class="login-button"
                  type="primary"
                  :loading="isLoginning"
                  :disabled="isLoginning"
                  @click="login('loginForm')"
                >登录</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { startAnimation } from "./loginAni";
import "../styles/login.scss";
import actions from "../store/actions.js";
// todo 验证码需要处理
export default {
  name: "Login",
  data() {
    return {
      isLoginning: false,
      loginFail: false,
      loginFailMessage: "",
      loginForm: {
        username: "",
        password: "",
        type: "1"
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        imageCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    // location.reload()
    startAnimation("loginAni");
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoginning = true;
          this.loginFail = false;
          this.$store
            .dispatch("userLogin", {
              ...this.loginForm
            })
            .then(successData => {
              const getData = successData.data;
              this.isLoginning = false;
              console.log(getData.code, "succ");
              if (getData.code === 200) {
                // 登录成功
                this.isLoginning = false;
                this.$router.replace("/home");
              } else {
                this.loginFail = true;
                this.loginFailMessage = getData.message;
              }
            })
            .catch(error => {
              this.isLoginning = false;
              this.loginFail = true;
              if (error.status === 504) {
                this.loginFailMessage = "服务出现异常";
              }
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>