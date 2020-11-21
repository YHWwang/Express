<template>
  <div class="login-big-box">
    <div class="login-box">
      <div class="login">
        <h3 class="login-text login-word"> {{$t('login.Login')}}</h3>
        <p class="login-text">{{$t('login.login_text')}}</p>
        <p class="login-text">
          <el-alert v-if="errorTips"
                    :title="errorMsg"
                    type="error">
          </el-alert>
        </p>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left"  class="login-form">
          <el-form-item prop="username" >
              <el-input v-model="loginForm.username" type="text" auto-complete="off" :placeholder="$t('login.placeholder')" @focus="errorTips=false" size="medium">
              <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="pass-box" >
            <el-input class="login-item" v-model="loginForm.password" type="password" auto-complete="off" :placeholder="$t('login.placeholder2')" @keyup.enter.native="handleLogin" @focus="errorTips=false">
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
            <router-link to="/forgotpassword" class="forgot">{{$t('login.forgot')}}</router-link>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
            {{$t('login.Sign')}}
          </el-checkbox>
          <el-form-item style="width:100%;">
            <el-button class="bv-btn-bg" :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              <span v-if="!loading" >{{$t('login.Sign')}}</span>
              <span v-else>{{$t('login.Logging')}}...</span>
            </el-button>
          </el-form-item>
        </el-form>

        <p class="txt">{{$t('login.txt')}} <router-link to='/register' class="register">{{$t('login.register')}}</router-link>
          <br></p>
        <!--      <a href="javascript:;" @click="activeEmail">激活邮箱</a>-->
        <!--      <p><router-link to='/resetpass'>重置密码</router-link></p>-->
        <!--      <p><router-link to='/register'>注册</router-link></p>-->
      </div>
    </div>
  </div>


</template>

<script>
  import { UserInfo} from "@/api/user"
  import { setToken } from '@/utils/auth'
  // import { encrypt } from '@/utils/rsaEncrypt'
  import { login } from '@/api/login' //登录的请求
  // import {GetReCAPTCHA} from '@/api/home'
  import Cookies from 'js-cookie'
  import {Message} from "element-ui";
    export default {
        name: "login",
      data(){
          return {
            cookiePass:"",
            loginForm: {
              username: this.$store.state.user.username,
              password: this.$store.state.user.password,
              rememberMe: this.$store.state.user.rememberMe,
            },
            loginRules: {
              username: [{ required: true, trigger: 'blur', message: this.$t('login.username') }],
              password: [{ required: true, trigger: 'blur', message: this.$t('login.password'),pattern: '[^ \x22]+'  }],
            },
            loading: false,
            errorTips:false,
            errorMsg :"",
          }
      },
      methods:{
        // async recaptcha() {
        //   const token = await this.$recaptcha()
        //   var result = await GetReCAPTCHA(token)
        //   return   result.data.success
        // },
        getCookie() {
          const username = Cookies.get('username')
          let password = Cookies.get('password')
          const rememberMe = Cookies.get('rememberMe')
          // 保存cookie里面的加密后的密码
          this.cookiePass = password === undefined ? '' : password
          password = password === undefined ? this.loginForm.password : password
          this.loginForm = {
            username: username === undefined ? this.loginForm.username : username,
            password: password,
            rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
          }
        },
        handleLogin(){
          this.$refs.loginForm.validate(async (valid)  => {
            const user = {
              username: this.loginForm.username,
              password: this.loginForm.password,
              rememberMe: this.loginForm.rememberMe,
            }
            if (user.password !== this.cookiePass) {
              // user.password = encrypt(user.password)//加密
            }
            if (valid) {
              // var IsCaptcha  = await this.recaptcha()
              // if(IsCaptcha){
              this.loading = true
              login(this.loginForm.username,this.loginForm.password).then(res=>{
                if(res.data.status == 200){
                  this.loading = false
                  if (user.rememberMe) {
                    Cookies.set('username', user.username, { expires: 1200000000})
                    Cookies.set('password', user.password, { expires: 1200000000})
                    Cookies.set('rememberMe', user.rememberMe, { expires:1200000000 })
                  } else {
                    Cookies.remove('username')
                    Cookies.remove('password')
                    Cookies.remove('rememberMe')
                  }
                  setToken(res.data.data.token,this.loginForm.rememberMe)
                  this.$store.dispatch("saveUser",this.loginForm)
                  this.$store.dispatch("saveToken",res.data.data.token)
                  this.$router.push(`/`)
                }else{
                  this.loading = false
                  Message({ message: res.data.message, type:'error'})
                }
              }).catch(error=>{
                console.log(error);
                this.loading = false
                Message({ message: error.data.message, type:'error'})
              })
              // }
            } else {
              console.log('error submit!!')
              return false
            }
          })
          },
        activeEmail(){
          // console.log(this.loginForm.username);
          this.$store.dispatch("chengActive","login");
          this.$router.push(`/activateemail/${this.loginForm.username}`)
        }
      },
      created() {
        UserInfo().then(res=>{
          this.$router.push(`/user/orders`)
          // console.log(res);
        }).catch(error=>{
          console.log(error);
        })
        this.getCookie()
      }
    }
</script>

<style lang="scss" scoped>


  @media screen  and (min-width: 1000px) {
    .login-big-box{
      width: 100%;
      height: 100%;
      background: #bad4f9;
    }
    .login-box{
      width: 1350px;
      min-height: 780px;
      background:url(../assets/img/login.jpg) no-repeat center;
      margin: 0 auto;
      position: relative;
    }
    .login {
      position: absolute;
      top:55px;
      left: 82px;
      background: white;
      width: 420px;
      height: 550px;
    }

  }
  @media screen  and (max-width: 800px) and (min-width: 350px){

    .login-big-box{
      margin-bottom: 70px;
    }
  }
.login{
  font-size: 16px;
  max-width: 400px;
  margin: 0 auto;
  padding: 50px 10px 10px ;
  color: rgb(128,128,128);
  .login-text{
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .login-a{
    text-decoration: underline;
  }
}

  .login-form {
    width: 320px;
    margin: 0 auto;
  }
  /deep/ .el-input__inner {
       height: 50px;
       font-size: 16px;
     }
  /deep/ .el-button--medium{
    font-size: 16px;
    height: 50px;
  }


  .login-item input{
    height: 50px;
  }
  .pass-box{
    width: 180px;
    position: relative;
  }
  .forgot{
    display: inline-block;
    position: absolute;
    top: 0;
    right:-140px;
    width: 135px;
    height: 50px;
    background:rgb(178,178,178);
    color: white;
    text-align: center;
    line-height: 50px;
  }
  .register{
    text-decoration: underline;
    color: rgb(128,128,128);
  }
  .txt{
    text-align: center;
  }
  .login-word{
    color: #000;
    font-size: 24px;
  }


</style>
