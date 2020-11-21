<template>
    <div class="sub-box">
      <img class="footer-sub-img" src="../../assets/img/sub.png" alt="">
      <div class="footer-sub-word">
        <div class="footer-content">
          <P class="first-txt sub-title">{{$t('views.home.sub.tit')}}</P>
          <P class="sub-news">{{$t('views.home.sub.tit_2')}}</P>
          <div>
            <el-form :model="Form" ref="Form" class="sub-form">
              <el-form-item
                :error="errorMsg"
                prop="email"
                :rules="[
                        { required: true, message: this.$t('views.home.sub.message1'), trigger: 'blur' },
                        { type: 'email', message:  this.$t('views.home.sub.message2'), trigger: ['blur'] }
                        ]">
                <div   class="sub-input">
                  <el-input class="input" v-model="Form.email" :placeholder="$t('views.home.sub.placeholder')"></el-input>
                  <el-button class="btn-sub" type="primary" @click="submitForm('Form')">{{$t('views.home.sub.btn')}}</el-button>
                </div>
              </el-form-item>
            </el-form>

          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import {subscribe,GetReCAPTCHA} from '@/api/home'
  import {Message} from "element-ui";
    export default {
        name: "HomeSubscribe",
      data(){
          return {
            Form:{
              email:"",
            },
            errorMsg:"",
          }
      },
      methods:{
        async recaptcha() {
          const token = await this.$recaptcha()
          var result = await GetReCAPTCHA(token)
          return   result.data.success
        },
        submitForm(formName){
          var _this = this
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              var IsCaptcha  = await  this.recaptcha()
              if(IsCaptcha){
                subscribe(this.Form.email).then(res=>{
                  if(res.data.status == 500){
                    this.errorMsg = res.data.message;
                    this.show = true
                    // Message({ message: res.data.message, type: 'error',offset:200})
                  }else if(res.data.status == 201){
                    Message({ message: res.data.message, type: 'success',offset:200})
                  }
                }).catch(error=>{
                  Message({ message:error.data.message, type: 'error',offset:200})
                })
              }else{
                Message({ message:"You're a robot!", type: 'error',offset:200})
              }

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      }
    }
</script>

<style scoped>
  .sub-box{
    height: 450px;
    background:white;
    /*padding: 20px;*/
    position: relative;
    overflow: hidden;
    background: 50% no-repeat;
  }
.footer-sub-img{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
  .footer-sub-word{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items:center;
  }

  .sub-input{
    display: flex;
    /*margin-right: 20px;*/
  }
  .sub-title{
    font-size: 30px;
    padding: 20px 0;
  }
  .sub-news{
    font-size: 20px;
    opacity: .8;
    padding-bottom:30px;
  }
/deep/ .el-input{
  width: 300px;
  margin-right: 10px;
}
  .btn-sub{
    width: 135px;
    background: white;
    color: #000;
    border: 1px solid #eee;
    /*margin-left:10px;*/
  }
  @media screen and (max-width:800px) and (min-width:350px){
    .sub-box{
      padding: 0 20px;
      height: 350px;
    }
    .sub-title{
      font-size: 20px;
    }
    .sub-news{
      font-size: 16px;
    }
    .footer-sub-img{
      display: none;
    }
    /deep/ .el-input{
      width: 200px;
      margin-right: 10px;
    }
.btn-sub{
  background: #133285;
  color: white;
  font-size: 16px;
}

  }


</style>
