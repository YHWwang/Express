<template>
  <div class="reset">
    <h3>
      {{$t('views.User.password.tit')}}
    </h3>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" :label-position="labelPosition">
      <el-form-item :label="$t('views.User.password.currentpass')" prop="currentpass" class="pass-item" required>
        <el-input type="password" v-model="ruleForm.currentpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.User.password.pass')" prop="pass"  class="pass-item" required>
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.User.password.checkPass')" prop="checkPass"  class="pass-item" required>
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  class="pass-item">
        <el-button type="primary" @click="submitForm('ruleForm')" class="sub-btn" :loading="loading">{{$t('views.User.password.Submit')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import  {changePass,Logout} from "@/api/user"
  import {Message} from "element-ui";
  import { setToken } from '@/utils/auth'//退出更新token
  import {GetReCAPTCHA} from '@/api/home'
  export default {
    name: "PasswordChange",
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('views.User.password.err_1')));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('views.User.password.err_2')));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('error!'));
        } else {
          callback();
        }
      };
      var validcurrent= (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('views.User.password.err_3')));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        labelPosition:"left",
        ruleForm: {
          currentpass:"",
          pass: '',
          checkPass:''
        },
        rules: {
          currentpass:[
            { validator: validcurrent, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }

      }
    },
    methods: {
      async recaptcha() {
        const token = await this.$recaptcha()
        var result = await GetReCAPTCHA(token)
        return   result.data.success
      },
     submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            var IsCaptcha  = await this.recaptcha()
            if(IsCaptcha){
                this.loading =true
                changePass(this.ruleForm.currentpass,this.ruleForm.pass).then(res=>{
                  this.loading = false
                  if(res.status == "200"){
                    Message({ message: this.$t('views.User.password.success'), type: 'success',offset:200})
                    Logout().then(res=>{
                      setToken("blackView",true);
                      this.$router.push('/login')
                      this.$router.go(0)
                    }).catch(error=>{
                      console.log(error);
                    })

                  }else{
                    Message({ message: res.data.message, type: 'error' ,offset:200})
                  }

                }).catch(error=>{
                  console.log(error);
                  Message({ message: 'error', type: 'error' ,offset:200})
                })
            }
          } else {
            Message({ message: 'error', type: 'error' ,offset:200})
            console.log('error submit!!');
            return false;
          }
        });
      },

    },
    mounted() {
      if(document.body.clientWidth>=800){
        this.labelPosition = 'left'
      }else{
        this.labelPosition = 'top'
      }
    }
  }
</script>

<style lang="scss" scoped>
  h3{
    /*width: 100%;*/
    margin-bottom: 20px;
    color: rgb(128,128,128);
    background: white;
    padding: 20px;
  }
  .sub-btn{
    margin-left: 50%;
    transform: translateX(-50%);
  }
.demo-ruleForm{
  /*width: 100%;*/
  background:white;
  padding: 20px;
}
  .pass-item{
    max-width: 500px;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    h3{
      font-size: 14px;
      padding: 10px;
      margin-bottom: 10px;
    }
    /deep/ .el-form-item__label{
      line-height: 20px;
    }
    /deep/ .el-form-item{
      margin-bottom: 10px;
    }
  }
</style>
