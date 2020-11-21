<template>
<div class="contact-us-box">
  <h2>{{$t('views.indust.ContactUs.tit')}}</h2>
  <p class="contact-title">{{$t('views.indust.ContactUs.p')}}</p>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="150px" :label-position="position"  >
  <div class="form-item-box">
    <div class="pad-20">
      <ul>
        <li >
          <el-form-item :label="$t('views.indust.ContactUs.lastName')" prop="lastName" class="form-item input-box">
          <el-input type="text" v-model="ruleForm.lastName" ></el-input>
        </el-form-item>
        </li>
        <li  class="pad-20">
          <el-form-item :label="$t('views.indust.ContactUs.firstName')" prop="firstName" class="input-box">
            <el-input v-model="ruleForm.firstName"></el-input>
          </el-form-item>
        </li>
      </ul>
      <el-form-item :label="$t('views.indust.ContactUs.companyName')" prop="companyName">
        <el-input v-model="ruleForm.companyName"  class="input-item"></el-input>
      </el-form-item>
      <el-form-item :label=" $t('views.indust.ContactUs.terminalsNum')" prop="terminalsNum">
        <el-select v-model="ruleForm.terminalsNum"  class="input-item">
          <el-option :label="$t('views.indust.ContactUs.less')" value="less than 20"></el-option>
          <el-option :label="$t('views.indust.ContactUs.Between')" value="Between 20 and 200"></el-option>
          <el-option :label="$t('views.indust.ContactUs.More')" value="More than 200"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('views.indust.ContactUs.productType')" prop="productType">
        <el-select v-model="ruleForm.productType" class="input-item" >
          <el-option
            v-for="(item,index) in product"
            :key="index"
            :label="item.cateName"
            :value="item.cateName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('views.indust.ContactUs.country')" prop="country">
        <el-select v-model="ruleForm.country"  filterable class="input-item">
          <el-option
            v-for="item in countryList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>

    </div>
    <div  class="pad-20 input-box">
      <el-form-item :label="$t('views.indust.ContactUs.emailAddress')" prop="emailAddress">
        <el-input v-model="ruleForm.emailAddress" class="input-item"></el-input >
      </el-form-item>
      <el-form-item :label="$t('views.indust.ContactUs.telephoneNum')" prop="telephoneNum">
        <el-input v-model="ruleForm.telephoneNum" class="input-item"></el-input>
      </el-form-item>
      <el-form-item label="" prop="content" class="textarea-box">
        <p> {{$t('views.indust.ContactUs.msg')}}</p>
        <el-input class="input-item" v-model="ruleForm.content" type="textarea"  :rows="6"></el-input>
      </el-form-item>

    </div>
  </div>
    <el-form-item class="btn-submit">
      <el-button  @click="submitForm('ruleForm')"  class="btn-submit-save">{{$t('views.indust.ContactUs.submit')}}</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import {Country} from "@/api/user"
  import {ContactUs} from "@/api/IndustrialSolutions"
  import { GetPcategories,GetReCAPTCHA} from "@/api/home"
  import {Message} from "element-ui";
    export default {
        name: "ContactUs",
      data(){
          return {
            position:"left",
            product:"",
            countryList:"",
            ruleForm: {
              lastName:"",
              firstName:"",
              companyName:"",
              terminalsNum:"",
              productType:"",
              country:"",
              emailAddress: '',
              telephoneNum:"",
              content: '',
            },
            rules: {
              lastName: [
                {  required: true, message: this.$t('views.indust.ContactUs.rules.lastName'),trigger: 'blur' }
              ],
              firstName: [
                {  required: true, message: this.$t('views.indust.ContactUs.rules.firstName'),trigger: 'blur' }
              ],
              companyName: [
                {  required: true, message:  this.$t('views.indust.ContactUs.rules.companyName'),trigger: 'blur' }
              ],
              terminalsNum: [
                {  required: true, message:  this.$t('views.indust.ContactUs.rules.terminalsNum'),trigger: 'blur' }
              ],
              productType: [
                {  required: true, message:  this.$t('views.indust.ContactUs.rules.productType'),trigger: 'blur' }
              ],
              country: [
                {  required: true, message: this.$t('views.indust.ContactUs.rules.country'),trigger: 'blur' }
              ],
              emailAddress: [
                {  required: true, message:  this.$t('views.indust.ContactUs.rules.emailAddress_1'),trigger: 'blur' },
                { type:"email", message:  this.$t('views.indust.ContactUs.rules.emailAddress_2'),trigger: 'blur' }
              ],

              telephoneNum: [
                {  required: true, message:  this.$t('views.indust.ContactUs.rules.telephoneNum'),trigger: 'blur' }
              ],
              content: [
                {  required: true, message:  this.$t('views.indust.ContactUs.rules.content'),trigger: 'blur' }
              ],

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
            if(valid){
              var IsCaptcha  = await this.recaptcha()
              if(IsCaptcha) {
                ContactUs(this.ruleForm).then(res => {
                  this.$refs[formName].resetFields();
                  Message({ message: res.data.message, type: 'success' ,offset:200})

                }).catch(error => {
                  console.log(error);
                })
              }
            }else {

            }
          })
        }
      },
      created() {

        if(document.body.clientWidth*946/1920>800){
          this.position= "left"

        }else{
          this.position= "top"
        }


        Country().then(res=>{//获取国家
          this.countryList = res.data.data
        }).catch(error=>{
          console.log(error);
        })
        GetPcategories().then(res=>{
          // console.log(res.data.data.content);
          this.product = res.data.data.content
        }).catch(error=>{

          console.log(error);
        })
      }
    }
</script>

<style scoped>
.contact-us-box h2{
  font-size: 24px;
  text-align: center;
  line-height: 50px;
}
  .contact-us-box{
    max-width: 1180px;
    margin: 50px auto;
  }
  .form-item-box{
    display: flex;
    padding: 20px;
  }
.contact-title{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
  .form-item-box ul{
    display: flex;
  }
  .input-item{
    width:400px;
  }

  .textarea-box{
    position: relative;
    padding-bottom: 30px;
  }
  .textarea-box .input-item{
    width: 550px;
    position: absolute;
    top:30px;
    left:-150px;
  }
  .textarea-box p{
    position: absolute;
    top: 0;
    left: -150px;
    color: rgba(0,0,0,.9);
  }
  .pad-20{
    padding-left: 20px;
  }
  .btn-submit{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    margin-left: -150px;
  }
  .btn-submit .btn-submit-save{
    background: #133084;
    color: white;
  }
@media screen and (max-width:800px) and (min-width:200px){
  .form-item-box{
    flex-wrap: wrap;
  }
  .form-item-box ul{
    flex-wrap: wrap;
  }
  .form-item-box ul li{
    width: 100%;
  }

  .input-item{
    width: 100%;
  }
  .pad-20{
    padding-left: 0px;
  }
  .textarea-box .input-item{
    width: 100%;
    left:0px;
  }
  .textarea-box p{
    left: 0;
  }
  .input-box{
    width: 100%;
  }
  .contact-us-box{
    padding-bottom: 210px;
  }
  .btn-submit{
    position: absolute;
    bottom: 0;
    left:50%;
    transform: translateX(-50%);
    margin-left: 0;
    /*margin-top: 50px;*/
  }
/deep/ .el-form-item{
  margin-bottom: 5px;
}
/deep/ .el-form--label-top .el-form-item__label{
  padding: 0;
}

}
</style>
