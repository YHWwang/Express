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
              <el-input name="email" v-model="loginForm.username" type="email" auto-complete="email" :placeholder="$t('login.placeholder')" @focus="errorTips=false" size="medium">
              <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="pass-box" >
            <el-input class="login-item" name="Password" v-model="loginForm.password" type="password" auto-complete="password" :placeholder="$t('login.placeholder2')" @keyup.enter.native="handleLogin" @focus="errorTips=false">
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
            <router-link to="/forgotpassword" class="forgot">{{$t('login.forgot')}}</router-link>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
            {{$t('login.rememberMe')}}
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
          <div style="width:320px;margin:0 auto;padding:30px">
                <g-signin-button
                  class="google-signin-button"
                  :params="googleSignInParams"
                  @success="onSignInSuccess"
                  @error="onSignInError">  
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="position:relative; top:7px;" width="24px" height="24px" viewBox="0 0 48 48" class="abcRioButtonSvg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>                  
                    &nbsp;&nbsp;Google
                </g-signin-button>
                 <!-- <fb-signin-button
                 class="facebook-signin-button"
                  :params="fbSignInParams"
                  @success="fb_onSignInSuccess"
                  @error="fb_onSignInError">
                    <img class="img" src="https://www.facebook.com/rsrc.php/v3/yN/r/szGrb_tkxMW.png" alt="" width="24" height="24">
                    &nbsp;&nbsp;Facebook
                </fb-signin-button> -->
          </div>
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
    import { google_login } from '@/api/login' //登录的请求

  // import {GetReCAPTCHA} from '@/api/home'
  import Cookies from 'js-cookie'
  import {Message} from "element-ui";
    export default {
        name: "login",
      data(){
          return {
            cookiePass:"",
            googleSignInParams: {
                client_id: '539767237567-tkud7vkbq3500ir6nggln6ak7rcj7pdo.apps.googleusercontent.com',
                // client_id: '532608812963-pr86tgqmsj5ph5rf1tp81ao1ap7rck78.apps.googleusercontent.com',
              },
            // fbSignInParams: {
            //     scope: 'email,user_likes',
            //     return_scopes: true
            //   },
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
      //  signOut(url) {
          // FB.getLoginStatus(function (response){
          //   if (response.status === 'connected') {
          //      var uid = response.authResponse.userID;
          //       var accessToken = response.authResponse.accessToken;
          //       FB.logout(function (response) {
          //          console.log('User signed out.');
          //       });
          //       FB.getAuthResponse()//解决facebook无法注销问题
          //   }
          // })

        //   var auth2 = gapi.auth2.getAuthInstance();
        //     auth2.signOut().then(function () {
        //       console.log('User signed out.');
        //     })
        //     auth2.disconnect();
        // },
        // fb_onSignInSuccess (response) { //facebook登录
        //   if (response.status === 'connected') {
        //       var accessToken = response.authResponse.accessToken; //取得 accessToken
        //       FB.api('/me?fields=name,first_name,last_name,email',function(response){
        //           console.log(response)
        //           if(response.email != null){
        //               console.log(response.id)
        //               FB.api(
        //                 response.id+'/picture',
        //                 'GET',
        //                 {"redirect":"false"},
        //                 function(pic){
        //                   // console.log(pic)
        //                     getBase64(pic.data.url)
        //                     .then(function(base64){
        //                       console.log(base64);
        //                       //将base64转换成文件
        //                       // this.postImg();//这个方法看更改用户头像那篇
        //                     },function(err){
        //                       console.log(err);//打印异常信息
        //                     });
        //                   //传入图片路径，返回base64
        //                     function getBase64(img){
        //                       function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        //                         var canvas = document.createElement("canvas");
        //                         canvas.width = width ? width : img.width;
        //                         canvas.height = height ? height : img.height;
        //                         var ctx = canvas.getContext("2d");
        //                         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        //                         var dataURL = canvas.toDataURL();
        //                         return dataURL;
        //                       }
        //                         var image = new Image();
        //                         image.crossOrigin = '';
        //                         image.src = img;
        //                         var deferred=$.Deferred();
        //                         if(img){
        //                           image.onload =function (){
        //                             deferred.resolve(getBase64Image(image));//将base64传给done上传处理
        //                           }
        //                           return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
        //                         }

        //                     }
        //                 }
        //               )
        //           }
        //       })
        //   }
        //   // console.log(response) //返回第三方的登录信息 tolen等
        // },
        // fb_onSignInError (error) {
        //     console.log('OH NOES', error)
        // },
        onSignInSuccess (googleUser) { //谷歌登录
                const profile = googleUser.getBasicProfile()
                console.log("ID: " + profile.getId())
                console.log("Full Name: " + profile.getName())
                console.log("Given Name: " + profile.getGivenName());
                console.log("Family Name: " + profile.getFamilyName());
                console.log("Image URL: " + profile.getImageUrl());
                console.log("Email: " + profile.getEmail());
                var id_token = googleUser.getAuthResponse().id_token;
                console.log("ID Token: " + id_token);
                google_login(id_token)
              //   //将id_token发送给后台进行验证
              //  var xhr = new XMLHttpRequest();
              // xhr.open('POST', 'https://activity.blackview.hk/googleVerify');
              // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              // xhr.onload = function() {
              //   console.log('Signed in as: ' + xhr.responseText);
              // };
              // xhr.send('idtoken=' + JSON.stringify(id_token));

        },
        onSignInError (error) {
          console.log('OH NOES', error)
        },
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
      height: 600px;
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
  .google-signin-button {
       color: black;
      background-color: white;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      cursor: pointer;
      text-align: center;
      font-weight: bold;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 10px 20px 10px 20px;
      margin-top: 10px;
    }
    .google-signin-button:hover{
       border: 1px solid #c6e2ff;
    }
  .g-signin-button_style{
    display: inline;
    margin-left: 10px;
  }
  .facebook-signin-button{
      color: white;
      background-color: #3C5A99;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      cursor: pointer;
      text-align: center;
      font-weight: bold;
      border-radius: 4px;
      padding: 10px 20px 10px 20px;
      margin-top: 10px;
  }

</style>
