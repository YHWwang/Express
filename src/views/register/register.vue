<template>
  <div class="register-big-box">
    <div class="register-box">
      <div  class="register">
        <h3>{{$t('views.refister.register.tit')}}</h3>
        <P class="txt" >{{$t('views.refister.register.msg')}}</P>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="register-form" >
          <el-form-item  prop="email">
            <el-input  v-model="ruleForm.email"  :placeholder="$t('views.refister.register.placeholder1')" autocomplete="off" class="register-item"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input type="password"  :placeholder="$t('views.refister.register.placeholder2')" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">
              <span v-if="!loading">{{$t('views.refister.register.btn1')}}</span>
              <span v-else>{{$t('views.refister.register.btn2')}}...</span>
             </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {register} from '@/api/login'
  import {GetReCAPTCHA} from '@/api/home' //谷歌机器人验证低于0.5分定性为机器人
  import {Message} from "element-ui";
    export default {
        name: "register",
      data(){
          return {
            loading: false,
            ruleForm:{
              email:"",
              password:''
            },
            rules:{
              email:[
                { required: true, message: this.$t('views.refister.register.email'), trigger: 'blu ' },
                { type: 'email', message: this.$t('views.refister.register.email_msg'), trigger: ['blur'] }
              ],
                password: [{ required: true, trigger: 'blur', message: this.$t('views.refister.register.password'),pattern: '[^ \x22]+'  }],
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
            var IsCaptcha  = await this.recaptcha()
            if(IsCaptcha){
                if (valid) {
                  this.loading = true
                  register(this.ruleForm.email,this.ruleForm.password).then(res=>{
                    this.loading = false
                    if(res.data.status == 200){
                      var param = res.data.data
                      this.$store.dispatch("saveActiveUrl",param);
                      this.$store.dispatch("chengActive","register");
                      this.$router.push(`/activateemail/${this.ruleForm.email}`)
                  }else{
                      this.loading  =false
                      Message({ message:res.data.message, type:'error' })
                    }
                  }).catch(error=>{
                    this.loading  = false
                    Message({ message:error.data.message, type:'error' })
                  })

            } else {
              console.log('error submit!!');
              return false;
            }
            }
          });
        }
      }
    }
</script>

<style scoped>

  @media screen  and (min-width: 1000px) {
    .register-big-box{
      width: 100%;
      height: 100%;
      background: #bad4f9;
    }
    .register-box{
      width: 1350px;
      min-height: 780px;
      background:url(../../assets/img/login.jpg) no-repeat center;
      margin: 0 auto;
      position: relative;
    }
    .register {
      position: absolute;
      top:55px;
      left: 82px;
      background: white;
      width: 420px;
      height: 550px;
    }

  }

    .register-box{
      height: 550px;
    }
  .register{
    text-align: center;
  color: rgb(128,128,128);
  }
  .register h3{
    color: #000;
    font-size: 24px;
    margin-top: 82px;
  }
.register .txt{
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 48px;
}
  /deep/ .el-input__inner {
    height: 50px;
    font-size: 16px;
    width: 320px;
  }
  /deep/ .el-button{
    font-size: 16px;
    height: 50px;
    width: 320px;
  }

  .register-form{
    width: 320px;
    margin: 0 auto;
  }

</style>
