<template>
  <div id="subscribe" v-if="subShow">
    <div class="subscribe">
      <span class="close" @click="subShow=false">x</span>
      <div class="sbu-top">
        <img class="top-img" src="@/assets/img/subscribe.jpg" alt="">
    <div class="txt-box">
      <p>{{$t('views.home.Subscribe.p1')}}</p>
      <p>{{$t('views.home.Subscribe.p2')}}</p>
    </div>
      </div>
      <div class="sub-main">
        <el-form :model="Form" ref="Form">
          <el-form-item
            class="sub-item"
             prop="email"
            :rules="[
                        { required: true, message: this.$t('views.home.Subscribe.message1'), trigger: 'blur' },
                        { type: 'email', message: this.$t('views.home.Subscribe.message2') , trigger: ['blur', 'change'] }
                        ]">
            <el-input  class="sub-item sub-input" :placeholder="$t('views.home.Subscribe.placeholder')"  v-model="Form.email"></el-input>
          </el-form-item >
          <el-alert v-if="show" class="sub-item"
                                :closable="false"
                                :title="errorText"
                                type="error">
                      </el-alert>
          <el-button class="sub-item"  type="primary" @click="submitForm('Form')">{{$t('views.home.Subscribe.btn')}}</el-button>
        </el-form>
        <div class="check">
          {{$t('views.home.Subscribe.check')}}
        </div>
        <div class="social-box">
            <a href="https://www.facebook.com/www.blackview.hk" target="_blank" title="Facebook EN"></a>
            <a href="https://www.facebook.com/blackview.hk/" target="_blank" title="Facebook ES"></a>
            <a href="https://www.facebook.com/BlackviewGermany" target="_blank" title="Facebook DE"></a>
            <a href="https://twitter.com/Blackview_HK" target="_blank" title="Twitter"></a>
            <a href="https://www.youtube.com/channel/UCpTSGhsypaabQ8Mp2rRIRng" target="_blank" title="Youtube"></a>
            <a href="https://www.instagram.com/blackview_smartphones/" target="_blank" title="Instagram"></a>
            <a href="https://www.facebook.com/Blackview-Amazon-148692022544470/" target="_blank" title="Amazon"></a>
            <a href="https://vk.com/blackview_official" target="_blank" title="VK"></a>
            <a href="https://www.tiktok.com/@blackviewofficial" target="_blank" title="VK"></a>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import {subscribe,GetReCAPTCHA} from '@/api/home'

  // import Cookies from 'js-cookie'
    export default {
        name: "Subscribe",
      data(){
          return {
            Form:{
              email:"",
            },
            checked:false,
            errorText:"",
            show:false,
            closable:false,
            subShow:true//订阅的
          }
      },
      methods: {
        async recaptcha() {
          const token = await this.$recaptcha()
          var result = await GetReCAPTCHA(token)
          return   result.data.success
        },
        submitForm(formName){
          var _this = this
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              var IsCaptcha  = await this.recaptcha()
              if(IsCaptcha){
              subscribe(this.Form.email).then(res=>{
                  if(res.data.status == 500){
                    this.errorText = res.data.message;
                    this.show = true
                  }
                  setTimeout(function () {
                    _this.subShow = false
                  },1000)
                }).catch(error=>{
                  this.errorText =  this.$t('views.home.Subscribe.err_msg1');
                  this.show = true
                  setTimeout(function () {
                    _this.subShow = false
                  },1000)
                })
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        subscribe(Form) {//订阅的按钮
          var _this = this
          this.validateEmail(this.email)
          subscribe(this.email).then(res=>{
            setTimeout(function () {
              _this.subShow = false
            },1000)
          }).catch(error=>{
            this.errorText = this.$t('views.home.Subscribe.err_msg1');
            this.show = true
            setTimeout(function () {
              _this.subShow = false
            },1000)
          })
        }
      }
    }
</script>

<style  lang="scss" scoped>
  .top-img{
    width: 100%;
  }
  .txt-box{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    text-align: center;
    text-indent:3em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;


  }
  .txt-box p{
    padding: 5px;
  }

  @media screen and (min-width: 900px) {
    #subscribe .subscribe{
      width: 700px;
      height: 500px;

    }
    .tips{
      width: 50%;
    }
  }
  #subscribe{
    width: 100%;
    height: 100%;

    .subscribe{
      position: relative;
      background: white;
      border: 1px solid #000;
      margin: 0 auto;
      .close{
        position: absolute;
        top: 5px;
        right:5px;
        z-index: 2;
      }
      .sbu-top{
        /*height: 100px;*/
        position: relative;
        border-bottom: 1px solid black;
        /*background: #f2f2f2;*/
        /*background: url("./src/assets/img/subscribe.jpg");*/
        h3{
          /*margin-top: 30px;*/
          /*margin-left: 30px;*/
        }
        p{
          /*margin-top: 30px;*/
          /*margin-left: 30px;*/
        }
      }

    }



    .sub-main{
      text-align: center;
      .sub-item{
        width:320px;
        margin: 0 auto;
        margin-top: 30px;
      }
      .sub-input{
        margin-top: 30px;
      }
      .check{
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .tips{
      position: relative;
      /*width:90%;*/
      height: 35px;
      margin: 30px auto;
      padding: 20px;
      border: 1px solid #000;
      background: white;
      .close{
        position: absolute;
        top: 1px;
        right: 5px;
      }
    }
  }


  .social-box {
    text-align: center;
    margin: 20px 0;
    vertical-align: middle;

  }
  .social-box a {
    display: inline-block;
    color: #8b8b8b;
    margin: 0 5px 10px;
    width: 44px;
    height: 45px;
    background: url("../../assets/img/social_icon.png") 0 0 no-repeat;
    border: 1px solid #eee;
  }
  .social-box a:hover {
    border: 1px solid #ff0036;
  }
  .social-box a:nth-child(4) {
    background-position: -45px 0;
  }
  .social-box a:nth-child(5) {
    background-position: -90px 0;
  }
  .social-box a:nth-child(6) {
    background-position: -135px 0;
  }
  .social-box a:nth-child(7) {
    background-position: -180px 0;
  }
  .social-box a:nth-child(8) {
    background-position: -225px 0;
  }
  .social-box a:nth-child(9) {
    background-position: -270px 0;
  }
  .social-box a:nth-child(10) {
    background-position: -315px 0;
  }
  .social-box a:nth-child(9) {
    background:url(../../assets/img/tiktok.png)no-repeat center;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    #subscribe{
      width: 90%;
      margin: 0 auto;
    }
    .txt-box{
      font-size: 12px;
    }
  }

</style>
