<template>
  <div class="prologin-container">
    <div class="header">
      <img style="width: 263px;height: 82px;" src="https://supnuevoweb.com.ar/wp-content/uploads/2019/02/logo.png">
    </div>
    <div class="main-content">
      <div class="login-box">
        <div class="input-form">
          <div style="width: 100%;">
            <div style="position: relative;width: 100%;margin-top: 15px;">
              <input  autocomplete="new-password" v-model="loginForm.loginName" maxlength="20"  class="login-form-input" id="loginName" :placeholder="$t('mm.user')">
            </div>
            <div style="position: relative;width: 100%;margin-top: 30px;">
              <input v-if="isPasswordType" v-model="loginForm.password" maxlength="12" autocomplete="new-password"  :type="showPassword?'':'password'" class="login-form-input" id="password" :placeholder="$t('mm.pwd')">
              <el-button v-if="isPasswordType" type="text" @click="showPassword=!showPassword"
                         style="position: absolute;top:0;right: 0px;padding-top: 5px;">
              </el-button>
            </div>
          </div>

          <div style="width: 100%;">
            <el-button type="primary" style="width: 100%" @click="login" :loading="loading">登录</el-button>
            <div
              style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 100%;margin-top: 25px;">
              <el-checkbox v-model="checked" id=""><span style="font-size: 13px;color: gray !important;">记住账号密码</span>
<!--                <span style="font-size: 13px;color: #409EFF">《用户使用协议》</span>-->
              </el-checkbox>
<!--              <el-button type="text" style="padding: 0;" @click="toRegister">免费注册</el-button>-->
            </div>
          </div>
        </div>

      </div>
      <el-carousel indicator-position="none" class="bgflux">
        <el-carousel-item class="bgflux" style="background: url('https://supnuevoweb.com.ar/wp-content/uploads/2019/02/slider01.jpg') repeat-x; background-size: 100% 100%;" />
      </el-carousel>
    </div>

    <div class="login-bottom"><span >Copyright © 2019 - S.O.S. SRL. / Todos los derechos reservados  |  +54 11 4857 0183  |  info@supnuevo.com.ar</span>
      <span style="position: absolute;top: 2em;left:50%;transform: translateX(-50%)">Diseñado y Desarrollado por IntermediaSP</span></div>
  </div>
</template>

<script>
  const Base64 = require('js-base64').Base64
  import {login} from '@/api/api'

  export default {

    name: 'prelogin',
    data() {
      return {
        showPassword:false,
        loading:false,
        loginForm:{
          loginName:'',
          password:'',
          remember:''
        },
        checked:true,
        ydxy: true,
        isPasswordType: true
      }
    },
    mounted() {
      this.getCookie();
    },
    methods:{
      login:function() {
        this.loading=true;
        login({loginName: this.loginForm.loginName, password: this.loginForm.password}).then(response => {
          console.log(response)
          const self = this;
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          if (self.checked == true) {
            console.log("checked == true");
            //传入账号名，密码，和保存天数3个参数
            self.setCookie(self.loginForm.loginName, self.loginForm.password, 7);
          }else {
            console.log("清空Cookie");
            //清空Cookie
            self.clearCookie();
          }
          if (response.reCode == 0) {
            this.$router.push({ path: this.redirect || '/home/method4' })
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
      },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      getCookie: function() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; ');
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.loginForm.loginName = arr2[1];
            } else if (arr2[0] == 'userPwd') {
              this.loginForm.password = arr2[1];
            }
          }
        }
      },
      clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
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
  .tit {
    font-size: 30px;
    color: #42bded;
    line-height: 1.3em;
    font-weight: 700;
    letter-spacing: 0.4px;
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
      min-width:100%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-start;
      border-bottom: 1px solid gainsboro;
      box-shadow:  0px 0px 4px gainsboro;
      padding: 2vh 0 2vh 15%;
      margin-bottom: 2px;
      background: #FFFFFF;


    }



    .main-content {
      position: relative;
      min-height: 30vw;
      width: 100%;
      .bgflux{
        position: absolute;
        top: 0;
        left: 0;
        height: 33vw;
        width: 100vw;
      }
      .login-box {
        position: absolute;
        right: 10%;
        top: 5vh;
        z-index: 99;
        padding: 20px;
        width: 340px;
        height: 340px;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.14);
      }
      .loginBtn{
        height: 32px;
        /*line-height: 15px;*/
        vertical-align: middle;
        padding:  0px 0px !important;

      }
    }



    .login-bottom{
      color: white;
      font-size: 13px;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 8vh;
      background-color: #676767;
      text-align: center;
      line-height: 6vh;
    }
  }

</style>
