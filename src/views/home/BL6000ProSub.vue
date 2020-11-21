<template>
<div class="sub-5g-box">
 <div class="sub-content">
   <h3>
     BL6000 Pro 5G
   </h3>
   <p class="sub-p1 sub-p1-pc">{{$t('views.home.p1')}} </p>
   <p class="sub-p1 sub-p1-phone">{{$t('views.home.p2')}}</p>
   <p class="sub-p1 sub-p1-pc">{{$t('views.home.p3')}}</p>
   <p class="sub-p1 sub-p2 ">{{$t('views.home.p4')}}</p>
   <el-form :model="Form" ref="Form" class="sub-form">
     <el-form-item
       prop="email"
       :rules="[
                        { required: true, message: this.$t('views.home.rules_1'), trigger: 'blur' },
                        { type: 'email', message: this.$t('views.home.rules_2'), trigger: ['blur'] }
                        ]">
       <div   class="sub-input">
         <el-input class="input" v-model="Form.email" :placeholder='this.$t("views.home.placeholder")'></el-input>
         <el-button class="btn-sub" @click="submitForm('Form')">{{$t('views.home.btn')}}</el-button>
       </div>
     </el-form-item>
   </el-form>
   <p class="sub-p3"> {{$t('views.home.p5')}}</p>
   <img class="sub-phone" src="https://www.blackview.hk//uploads/page/shop/sub_phone.jpg" alt="">
 </div>


</div>
</template>

<script>


  import {proSubscribe,GetReCAPTCHA} from '@/api/home'
  import {Message} from "element-ui";
    export default {
        name: "BL6000ProSub",
      data(){
          return {
            Form:{
              email:"",
            },
          }
      },
      methods:{
        submitForm(formName){


          var _this = this
          this.$refs[formName].validate((valid) => {
            if (valid) {

              proSubscribe(this.Form.email,'BL6000Pro').then(res=>{
                Message({ message: this.$t('views.home.msg'), type: 'success',offset:200})


                _this.$parent.dialogVisible1 = false
                this.$nextTick()

                _this.$parent.handleClose()
              }).catch(error=>{
                console.log(error);
                _this.$parent.dialogVisible1 = false
                this.$nextTick()

                _this.$parent.handleClose()
              })
              // alert('submit!');
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
.sub-5g-box{
  height: 500px;

}
/deep/ .el-input{
  width: 200px;
}
.sub-phone{
  display: none;
}
.sub-content{
  padding: 20px 30px;
  width:350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
/deep/ .el-form-item{
  margin-bottom: 5px;
}

.sub-content h3{
  font-family:BQ;
  font-size: 28px;
  color: #000;
  margin-bottom: 30px;
}


.sub-p1{
  font-family:BQ;
  font-size: 22px;
  color: #000;
    font-weight:600;
}
  .sub-p2{
    font-size: 18px;
    margin-top: 10px;
  }
.btn-sub{
  background: #bd2a2a;
  color: white;
  font-size: 14px;
}
  .sub-form{
    margin-top: 50px;
  }
.sub-p3{
  font-size: 16px;
  padding-left: 5px;
}
.sub-p1-phone{
  display: none;
}
@media screen and (max-width:800px) and (min-width:200px){
  .sub-content h3{
    font-size: 26px;
    margin-bottom: 0;
  }

  .sub-p1{
    font-size: 18px;
  }
  .sub-p2{
    font-size: 13px;
  }
  .sub-content{
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    /*display: block;*/
  }
  .sub-close{
    right: -15px;
  }
  .sub-5g-box{
    height: auto;
    padding: 5px 0;
  }

  .sub-form{
    margin-top: 10px;
  }
  .sub-phone{
    display: inline-block;
    width: 100%;
    margin-top: 10px;
  }
  .sub-p1-phone{
    display: block;
    font-size: 14px;
    margin-top: 10px;
  }
  .sub-p1-pc{
    display: none;

  }
  .sub-p3{
    font-size: 13px;
  }
}
</style>
