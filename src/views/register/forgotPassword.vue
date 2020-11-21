<template>
    <div class="forgot-big-box">
      <div class="forgot-box">
        <div class="forgot">
          <h3 class="forgot-text">{{$t('views.refister.forgot.tit')}}</h3>
          <p >{{$t('views.refister.forgot.p1')}} <br> {{$t('views.refister.forgot.p2')}}</p>
          <!--      <p class="error-text">Incorrect email</p>-->
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="form">
            <el-form-item  prop="email">
              <el-input  v-model="ruleForm.email"  :placeholder="$t('views.refister.forgot.placeholder')" autocomplete="off" class="register-item"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native.prevent="submitForm('ruleForm')" :loading="loading">
                <span v-if="!loading">{{$t('views.refister.forgot.msg1')}}</span>
                <span v-else >{{$t('views.refister.forgot.msg1')}}...</span>
                </el-button>
            </el-form-item>
          </el-form>
          <router-link to="/login"><el-button type="primary">{{$t('views.refister.forgot.cancel')}}</el-button></router-link>
        </div>
      </div>
    </div>
</template>
<script>
  import {resetEmail} from "@/api/login"
  import {Message} from "element-ui";
  import {GetReCAPTCHA} from '@/api/home' //谷歌机器人验证低于0.5分定性为机器人
    export default {
        name: "forgotPassword",
      data(){
       return {
         loading: false,
         ruleForm:{
           email:""
         },
         rules:{
           email:[
             { required: true, message: this.$t('views.refister.forgot.email'), trigger: 'blur' },
             { type: 'email', message: this.$t('views.refister.forgot.email_msg'), trigger: ['blur'] }
           ]
         }
       }
      },
      methods:{
        async recaptcha() {
          const token = await this.$recaptcha()
          var result = await GetReCAPTCHA(token)
          return   result.data.success
        },
        submitForm(formName){
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              var IsCaptcha  = await this.recaptcha()
              if(IsCaptcha){
                  this.loading = true
                  resetEmail(this.ruleForm.email).then(res=>{
                    this.loading = false
                    if(res.data.status==200){
                      this.$router.push(`/sendlink/${this.ruleForm.email}`)
                    }else{
                      this.loading  =false
                      Message({ message: res.data.message, type:'error'})
                    }
                  }).catch(error=>{
                    this.loading  =false
                    Message({ message:error.response, type:'error' })
                  })
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>

<style lang="scss" scoped>

  @media screen  and (min-width: 1000px) {
    .forgot-big-box{
      width: 100%;
      height: 100%;
      background: #bad4f9;
    }
    .forgot-box{
      width: 1350px;
      min-height: 780px;
      background:url(../../assets/img/login.jpg) no-repeat center;
      margin: 0 auto;
      position: relative;
    }
    .forgot {
      position: absolute;
      top:55px;
      left: 82px;
      background: white;
      width: 420px;
    }
  }
  .forgot{
    width: 420px;
    height: 550px;
    margin: 0 auto;
    color: rgb(128,128,128);
    text-align: center;

    .error-text{
      height: 30px;
      line-height: 30px;
      color: red;
    }
  }
  .forgot-text{
    font-size: 24px ;
    color: #000;
    margin-top: 82px;
    margin-bottom: 30px;
  }
  /deep/ .el-button{
    font-size: 16px;
    height: 50px;
    width: 320px;
  }
  /deep/ .el-input__inner {
    height: 50px;
    font-size: 16px;
    width: 320px;
  }
  .form{
    /*margin-top: 30px;*/
    width: 320px;
    margin: 30px auto;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .forgot{
      width: 90%;
      height: auto;
    }
  }

</style>
