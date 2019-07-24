<template>
  <div class="prologin-container">
    <div class="header">
      <img src="https://supnuevoweb.com.ar/wp-content/uploads/2019/02/logo.png" alt="SupNuevo" id="logo"
           data-height-percentage="54" data-actual-width="216" data-actual-height="60">

      <span
        style="margin-left:15px;padding-left:15px;border-left: 1px solid gainsboro;font-size: 16px;font-weight: bold;color: dimgray">用户登录</span>
    </div>

    <div class="main-content">
      <div class="login-box">
        <div class="input-form">
          <div style="width: 100%;">
            <div style="position: relative;width: 100%;margin-top: 15px;">
              <input placeholder="注册时填写的手机号" autocomplete="new-password" v-model="loginForm.telAccount" maxlength="11"  class="login-form-input">
            </div>

            <div style="position: relative;width: 100%;margin-top: 30px;">
              <input v-if="isPasswordType" v-model="loginForm.password" maxlength="12" autocomplete="new-password" placeholder="请输入密码" :type="showPassword?'':'password'" class="login-form-input">

              <el-button v-if="isPasswordType" type="text" @click="showPassword=!showPassword"
                         style="position: absolute;top:0;right: 0px;padding-top: 5px;">{{!showPassword?'显示密码':'隐藏密码'}}
              </el-button>
            </div>

          </div>

          <div style="width: 100%;">
            <el-button type="primary" style="width: 100%" @click="login" :loading="loading">登录</el-button>
            <div
              style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 100%;margin-top: 25px;">
              <el-checkbox v-model="ydxy"><span style="font-size: 13px;color: gray !important;">已阅读并同意</span><span
                style="font-size: 13px;color: #409EFF">《用户使用协议》</span></el-checkbox>
              <el-button type="text" style="padding: 0;" @click="toRegister">免费注册</el-button>
            </div>
          </div>
        </div>

      </div>

      <el-image style="width: 20vw" src="https://supnuevoweb.com.ar/wp-content/uploads/2019/02/slider01.jpg" fit="scale-down">
      </el-image>

    </div>

  </div>
</template>

<script>
  import {login} from '@/api/api'

  export default {

    name: 'prelogin',
    data() {
      return {
        showPassword:false,
        loading:false,
        loginForm:{
          telAccount:'',
          password:'',
          messageCode:''
        },
        ydxy: true,
        isPasswordType: true
      }
    },
    methods:{
      toRegister(){
       this.$message({
         type:"success",
         message:"跳转注册页"
       })
      },
      login:function() {
        this.loading=true;
        login(this.loginForm.telAccount, this.loginForm.password).then(response => {
          if (response.status) {
            this.$router.push({ path:'/dashboard' })
          } else {
            this.$message({
              type: 'error',
              message: response.message
            })
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $light_gray: #eee;

  .regsiterInputItem {
    font-size: 14px !important;
    background-color: white !important;
    margin-bottom: 15px !important;
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  .istype {
    font-weight: bold;
    color: black !important;
  }

  .input-form {
    min-height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .login-form-input {
    width: 100%;
    padding: 5px;
    border: 0 none;
    border-bottom: 2px solid gainsboro;
    font-size: 14px;

    &:focus {
      outline: none;
      border-bottom: 2px solid #409EFF;
    }
  }


  $topcicolor: #059E1F;
  .prologin-container {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      min-width: 60%;
      display: flex;
      flex-direction: row;
      align-items: center;

      justify-content: flex-start;
      border-bottom: 1px solid gainsboro;
      padding: 4vh 0 2vh 0;


    }

    .main-content {

      display: flex;
      flex-direction: row;
      justify-content: space-around;

      width: 60%;
      padding-top: 7vh;

      .rightimg {
        height: 40vh;
        width: 60vh;
      }

      .login-box {
        padding: 20px;
        position: relative;
        width: 370px;
        min-height: 340px;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.14);

        .type-login {
          padding: 0;
          color: gray;
          font-size: 16px;
          text-align: center;
        }


        .topcorner {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
          position: absolute;
          right: 10px;
          top: 10px;
          color: $topcicolor;

          img {
            height: 2.5em;
            width: 2.5em;
            border-radius: 3px;
          }

          .poptext {
            font-size: 12px;
            line-height: 12px;
            display: inline-block;
            background-color: rgba(51, 136, 255, .13);
            color: #38f;
            border: 1px solid #38f;
            padding: 5px 8px;
            white-space: nowrap;
            position: absolute;
            right: 100%;
            top: 0;
            margin-right: 6px;

            &:before {
              content: " ";
              display: block;
              position: absolute;
              left: 100%;
              top: 50%;
              margin-top: -6px;

              border: 6px solid transparent;
              border-left-color: #38f;
              z-index: 1;
            }

            &:after {
              border: 6px solid transparent;
              border-left-color: #e5f0ff;
              transform: translateX(.5px);
              margin-left: -2px;
              z-index: 2;

              content: " ";
              display: block;
              position: absolute;
              left: 100%;
              top: 50%;
              margin-top: -6px;
            }
          }
        }
      }


    }
  }

</style>
