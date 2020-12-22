<template>
    <div id="register">
      <header>{{$t('notUser.tit')}}</header>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item :label="$t('notUser.UserName')" prop="username" >
          <el-input v-model="ruleForm.username" autocomplete="off" class="register-item"></el-input>
        </el-form-item>
        <el-form-item :label="$t('notUser.email')" prop="email">
          <el-input  v-model="ruleForm.email" autocomplete="off" class="register-item"></el-input>
        </el-form-item>
        <el-form-item :label="$t('notUser.firstname')" prop="firstname">
          <el-input type="email" v-model="ruleForm.firstname" autocomplete="off" class="register-item"></el-input>
        </el-form-item>
        <el-form-item :label="$t('notUser.lastname')" prop="lastname">
          <el-input  v-model="ruleForm.lastname" autocomplete="off" class="register-item"></el-input>
        </el-form-item>
        <el-form-item :label="$t('notUser.pass')" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" class="register-item"></el-input>
        </el-form-item>
        <el-form-item :label="$t('notUser.checkPass')" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" class="register-item"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('notUser.submit')}}</el-button>
          <el-button @click="resetForm('ruleForm')">{{$t('notUser.reset')}}</el-button>
        </el-form-item>
      </el-form>
      <div class="go-login">
        <router-link to="/login" class="link">{{$t('notUser.login')}}</router-link>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Register",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('notUser.Error1')));
          } else {
            if(value.length<6){
              callback(new Error(this.$t('notUser.Error2')));
            }
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('notUser.Error3')));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error(this.$t('notUser.Error4')));
          } else {
            callback();
          }
        };
        var validateEmail = (rule, value, callback) => {
          const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          if (!value) {
            return callback(new Error(this.$t('notUser.Error5')))
          }

            if (mailReg.test(value)) {
              callback()
            } else {
              callback(new Error(this.$t('notUser.Error6')))
            }
        };
        return {
          ruleForm: {
            username: '111',
            email: '',
            firstname: '11',
            lastname: '11',
            pass: '123456',
            checkPass: '123456'
          },
          rules: {
            username: [
              {required: true, trigger: 'blur', message: this.$t('notUser.rules') }
            ],
            firstname: [
              {required: true, trigger: 'blur', message: this.$t('notUser.rules') }
            ],
            lastname: [
              {required: true, trigger: 'blur', message: this.$t('notUser.rules') }
            ],
            email: [
              {required: true, validator:validateEmail,trigger: 'blur' }
            ],
            pass: [
              {required: true,  validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              {required: true,  validator: validatePass2, trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  #register{
    margin-top: 50px;
    margin-bottom: 100px;
    width: 730px;
    height: 638px;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid #007bff;
    transform: translate(-50%,-50%);
    overflow: hidden;
    border-radius: 5px 5px;
  }
  header{
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    background: #007bff;
    color: white;
    margin-bottom: 50px;
  }
  .register-item{
    width: 500px;
  }
  .go-login{
    width: 80px;
    height: 50px;
    margin: 0 auto;
  }
  .link{
    color: #007bff;
  }
</style>
