<template>
  <div class="reset">
    <h3>{{$t('views.set.unlogin.tit')}}</h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" :label-position="labelPosition"  class="demo-ruleForm">
      <el-form-item  prop="email" :label="$t('views.set.unlogin.email')" class="input">
        <el-input disabled v-model="username"  :placeholder="$t('views.set.unlogin.placeholder')" autocomplete="off" class="register-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.unlogin.pass')" prop="pass" class="input">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.unlogin.checkPass')" prop="checkPass" class="input">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="" prop="check" class="check-box">
        <el-checkbox-group v-model="ruleForm.check">
          <el-checkbox class="label-txt" label="" name="type"><span>{{$t('views.set.unlogin.msg1')}}<br>  {{$t('views.set.unlogin.msg2')}}.</span></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="btn-submit-box">
        <el-button type="primary" @click.native.prevent="submitForm('ruleForm')" class="btn-submit" :loading="loading">
          <span v-if="!loading">{{$t('views.set.unlogin.btn1')}}</span>
          <span v-else >{{$t('views.set.unlogin.btn2')}}...</span>
         </el-button>
      </el-form-item>
    </el-form>
    <p class="p1">
     {{$t('views.set.unlogin.p1')}}
      <br>
     {{$t('views.set.unlogin.p2')}}
    </p>
    <router-link to="/privacy" target="_blank" class="policy">{{$t('views.set.unlogin.router')}} >></router-link>
  </div>
</template>
<script>
  import {register} from '@/api/login'
  import {GetReCAPTCHA} from '@/api/home'
  import {Message} from "element-ui";
  export default {
    name: "UnLogin",
    props:["username"],
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('views.set.unlogin.Error1')));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('views.set.unlogin.Error2')));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error(this.$t('views.set.unlogin.Error3')));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        labelPosition:"left",
        ruleForm: {
          check:[],
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur',required: true, }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur',required: true, }
          ],
          check:[
            { required: true, message: this.$t('views.set.unlogin.check_msg'), trigger: 'change' }
          ]
        }

      }
    },
    beforeMount() {
      if(document.body.clientWidth>=800){
        this.labelPosition = 'left'
      }else{
        this.labelPosition = 'top'
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
                register(this.username,this.ruleForm.pass).then(res=>{
                  this.loading = false
                  if(res.data.status == 200){
                    var param = res.data.data
                    this.$store.dispatch("saveActiveUrl",param);
                    this.$store.dispatch("chengActive","register");
                    this.$router.push(`/activateemail/${this.username}`)
                  }else{
                    Message({ message: res.data.message, type:'error'})
                  }
                }).catch(error=>{
                  Message({ message:error.response, type:'error' })
                })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {


    }
  }
</script>

<style lang="scss" scoped>
  h3{
    line-height:60px;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .reset{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .input{
    width: 500px;
  }
  .input-check{
    width: auto;
  }
  .policy{
    text-decoration: underline;
    font-size: 16px;
    color: rgb(128,128,128);
  }
  .btn-submit-box{
    margin-top: 30px;
  }
  .btn-submit{
    background: #133285;
  }
.p1{
  font-size: 16px;
  color: rgb(128,128,128);
  line-height: 20px;
  width: 100%;
  text-align: center;
}
  .check-box{
    margin: 0;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .demo-ruleForm{
      width: 100%;
      /*padding: 10px 20px;*/
    }
    h3{
      font-size: 24px;
    }
    .check-box{
      width: 90%;
      margin: 0 auto;
    }
    .input{
      width: 90%;
      margin: 0 auto;
    }
  /deep/ .el-form-item{
    margin-bottom:10px;
    /*margin: 0 auto;*/
  }
    /deep/ .el-checkbox__inner{
      margin: 0 10px;
    }
    .btn-submit{
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .p1{
      font-size: 12px;
      width: 95%;
      word-wrap: break-word;
    }
    /deep/ .el-form-item__label{
      line-height: 20px;
    }
  }

</style>
