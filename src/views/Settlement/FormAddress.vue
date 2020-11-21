<template>
  <div class="address-box-box">
    <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="190px"  class="address">
      <el-form-item :label="$t('views.set.form.email')" prop='email'  v-show="signIn">
        <el-input v-model="ruleForm.email" v-show="signIn" :disabled="disabled" ></el-input>
        <p> {{$t('views.set.form.p1')}}</p>
        <p>{{$t('views.set.form.p2')}} <router-link to="/login">{{$t('views.set.form.router')}}</router-link> </p>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.firstname')" prop="firstname" >
        <el-input v-model="ruleForm.firstname"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.lastname')" prop="lastname">
        <el-input v-model="ruleForm.lastname"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.phone')" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.detail')" prop="detail" >
        <el-input v-model="ruleForm.detail"></el-input>
      </el-form-item>

      <el-form-item :label="$t('views.set.form.city')" prop="city">
        <el-input v-model="ruleForm.city"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.country')" prop="country" >
        <el-select v-model="ruleForm.country"  filterable :placeholder="$t('views.set.form.country_placeholder')" ref="selectCount" class="bv-select">
          <el-option
             style="width:98%"
            v-for="item in countryList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.province')" prop="province" :style="display">
        <el-select v-model="ruleForm.province"  filterable :placeholder="$t('views.set.form.province_placeholder')"  class="bv-select">
          <el-option
            v-for="item in ProvinceList"
            :key="item.id"
            :value="item.name"
            v-html="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.postCode')" prop="postCode" >
        <el-input v-model="ruleForm.postCode"></el-input>
      </el-form-item>
      <el-form-item class="address-btn-save-box">
        <el-button class="address-btn-save"  @click="submitForm('ruleForm')"  :loading="loading">
             <span v-if="!loading">{{$t('views.set.form.btn1')}}</span>
              <span v-else>{{$t('views.set.form.btn2')}}</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {UserInfo} from '@/api/user' //和 个人信息
  import {Addaddress,ChangeAddress,Country,Province} from "@/api/user"
  // import {GetReCAPTCHA} from '@/api/home'
  import { Message } from 'element-ui'
  export default {
    name: "FormAddress",
    // props:["closeDialog","change","id","email"],
    props:["closeDialog","change","id","email","signIn"],
    data(){
      return {
        // signIn:true,
        loading: false,
        display:"display:none",
        labelPosition:"left",
        disabled:false,
        countryList: [],
        countryId:'',
        ProvinceList: [],
        ProvinceId:'',
        ruleForm:{
          email:"",
          id:"",
          firstname:"",
          lastname:"",
          phone:"",
          realName:"",
          detail:"",
          city:"",
          province:"",
          country:"",
          postCode:"",
          district:"",
          uid:localStorage.getItem("uid"),
        },
        rules:{
          email:[
          //   { required: true, message: 'email is required', trigger: 'blur' },
          //   { required: true, message: 'email is required', type:'email', trigger: 'blur'}
          ],
          type: [
            { type: 'email' , message: this.$t('views.set.form.rules.email'), trigger: 'blur'},
          ],
          firstname: [
            { required: true, message: this.$t('views.set.form.rules.firstname'), trigger: 'blur' }
          ],
          lastname: [
            { required: true, message: this.$t('views.set.form.rules.lastname'), trigger: 'blur' }
          ],
          phone: [
            { required: true, message: this.$t('views.set.form.rules.phone'), trigger: 'blur' }
          ],
          detail: [
            { required: true, message: this.$t('views.set.form.rules.detail'), trigger: 'blur' }
          ],
          city: [
            { required: true, message: this.$t('views.set.form.rules.city'), trigger: 'blur' }
          ],
          province:[
            { message: this.$t('views.set.form.rules.province'), trigger: 'blur' }
          ],
          country: [
            { required: true, message: this.$t('views.set.form.rules.country'), trigger: 'blur' }
          ],
          postCode: [
            { required: true, message: this.$t('views.set.form.rules.postCode'), trigger: 'blur' }
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
      // async recaptcha() {
      //   const token = await this.$recaptcha()
      //   var result = await GetReCAPTCHA(token)
      //   return   result.data.success
      // },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          // debugger
          if (valid) {
            this.loading = true
            // var IsCaptcha  = await this.recaptcha()
            // if(IsCaptcha){
                this.ruleForm.realName = this.ruleForm.firstname +"  "+ this.ruleForm.lastname
                var addressmethod="";

              if(  this.ruleForm.province=="-"){
                this.ruleForm.province=""//有些国家下面没城市
              }
              if(this.change == 'add'){
                 addressmethod = Addaddress
              }else if(this.change == 'shipping address'){
                addressmethod = ChangeAddress
              }else{
                this.loading = false
                this.$emit('closeDialog',this.ruleForm,this.change,this.id);
                return
              }
                this.ruleForm.id = this.id
                if(!this.signIn){
                  this.ruleForm.email = ""
                }
                addressmethod(this.ruleForm,this.signIn).then(res=>{
                  this.loading = false
                  if(res.data.status == 200  ) {

                    Message({ message: 'success', type: 'success' })
                    this.$emit('closeDialog',this.ruleForm,this.change,res.data.data.id);
                  }else{
                    Message({ message: res.data.message, type:'error'})
                  }
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }).catch(error =>{
                  // debugger
                  console.log(error);
                  Message({ message:error.data.message, type: 'error' })

                })
            // }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    watch:{
      'ruleForm.country':function () {
        Province(this.ruleForm.country).then(res=>{
          var len= res.data.data.length
          if(len>0){
            this.ProvinceList = res.data.data
            this.ruleForm.province=""
            this.display = "display:block";
          }else{
            this.display = "display:none";
            this.ruleForm.province="-"
            this.$nextTick(()=>{
            })
          }

        }).catch(error=>{
          console.log(error);
        })
      },
      'ruleForm.province':function () {
        let ele = document.createElement('span')
        ele.innerHTML = this.ruleForm.province
        this.ruleForm.province = ele.textContent
      }
    },
    created() {
      this.$nextTick()
      if(this.signIn){//未登录
        this.ruleForm.uid= ""
        if( this.change != 'add'){
              this.disabled = true
          this.ruleForm.email = this.email
        }
      }else{
        this.ruleForm.email= this.email
        this.disabled = false
      }
      Country().then(res=>{
        this.countryList = res.data.data
      }).catch(error=>{
        console.log(error);
      })
    }

  }
</script>

<style scoped>
  .address{
    width: 90%;
    padding: 10px;
  }
  .address-btn-save{
    background: #133084;
    color: white;
    margin-top: 10px;
  }
.address-box-box{
  padding-top: 30px;
  padding-bottom: 30px;
  /*padding: 50px;*/
}

.el-scrollbar > .el-scrollbar__bar {
    opacity: 1 !important;
  }

  .address-btn-save-box{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-left: -190px;
  }
  @media screen and (max-width:800px) and (min-width:200px){
   /deep/ .el-form-item__label{
      line-height: 20px;
     padding: 0;
    }
    /deep/ .el-form-item{
      margin-bottom:10px;
    }
    .address-box-box{
      margin-top: 0;
    }
    .address-btn-save{
      /*margin: 10px auto;*/
    }
    .address-btn-save-box{
      margin-top: 20px;
      display: flex;
      justify-content: center;
      margin-left: 0;
      /*margin-left: -180px;*/
    }

  }




</style>
