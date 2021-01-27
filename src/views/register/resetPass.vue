<template>
  <div class="reset-big-box">
    <div class="reset-box">
      <div class="reset">
        <h3>{{$t('views.refister.reset.tit')}}</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" :placeholder="$t('views.refister.reset.placeholder1')"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  :placeholder="$t('views.refister.reset.placeholder2')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{$t('views.refister.reset.btn')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>
<script>
  import { resetPass } from "@/api/login"
    export default {
        name: "resetPass",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('views.refister.reset.error')));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('views.refister.reset.error')));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error(this.$t('views.refister.reset.err')));
          } else {
            callback();
          }
        };
          return {
            ruleForm: {
              pass: '',
              checkPass: ''
            },
            rules: {
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
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {

              var str = this.$route.params.id.split("&")

              // debugger
              // console.log(this.$route.params.id);
              resetPass(str[0],this.ruleForm.pass,str[1]).then(res=>{
                this.$router.push('/login')
                // console.log(res);
              }).catch(error=>{
                console.log(error);
                this.$router.push('/settlement/pay/error')
              })


            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      created() {
          // this.$router.push('settlement/pay/error')

      }
      }
</script>

<style lang="scss" scoped>
  @media screen  and (min-width: 1000px) {
    .reset-big-box{
      width: 100%;
      height: 100%;
      background: #bad4f9;
    }
    .reset-box{
      width: 1350px;
      min-height: 780px;
      background:url(../../assets/img/login.jpg) no-repeat center;
      margin: 0 auto;
      position: relative;
    }
    .reset {
      position: absolute;
      top:55px;
      left: 82px;
      background: white;
      width: 420px;
    }
  }
  .reset{
    width: 420px;
    height: 550px;
    margin: 0 auto;
    color: rgb(128,128,128);
    text-align: center;
  }
  .reset h3{
    font-size: 24px ;
    color: #000;
    margin-top: 82px;
    margin-bottom: 30px;
  }
  .demo-ruleForm{
    width: 320px;
    margin: 0 auto;
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

</style>
