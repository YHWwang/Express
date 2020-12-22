<template>
  <div class="address-box-box">
    <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="190px"  class="address"  autocomplete="on">
      <el-form-item label="Email Address" prop='email'  v-show="signIn">
        <el-input name="email" v-model="ruleForm.email" v-show="signIn" :disabled="disabled"  type="email"  autocomplete="email"></el-input>
        <p> You can create an account after checkout.</p>
        <p>Already have an account?  <router-link to="/login">Sign in</router-link> </p>
      </el-form-item>
      <el-form-item label="First Name" prop="firstname" >
        <el-input name="firstname" v-model="ruleForm.firstname" autocomplete="given-name"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastname">
        <el-input name="lastname" v-model="ruleForm.lastname" autocomplete="family-name"></el-input>
      </el-form-item>
      <el-form-item  label="Phone Number" prop="phone" >
        <el-input  type="tel" name="tel" v-model="ruleForm.phone" autocomplete="tel"></el-input>
      </el-form-item>
      <el-form-item label="Address" prop="detail" >
        <el-input name="street" v-model="ruleForm.detail"  autocomplete="address-line1"></el-input>
      </el-form-item>

      <el-form-item label="City" prop="city">
        <el-input name="city" v-model="ruleForm.city"  autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="Destination Country" prop="country"  >
        <el-select name="country" v-model="ruleForm.country"  filterable placeholder="--Country--" ref="selectCount" class="bv-select"  autocomplete="shipping country">
          <el-option
             style="width:98%"
            v-for="item in countryList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="State / Province / Region" prop="province" :style="display">
        <el-select v-model="ruleForm.province"  filterable placeholder="--Place Select--"  class="bv-select"  autocomplete="on">
          <el-option
            v-for="item in ProvinceList"
            :key="item.id"
            :value="item.name"
            v-html="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ZIP / Postal Code" prop="postCode" >
        <el-input name="postcode" v-model="ruleForm.postCode"  autocomplete="on" ></el-input>
      </el-form-item>
      <el-form-item class="address-btn-save-box">
        <el-button class="address-btn-save"  @click="submitForm('ruleForm')"  :loading="loading">
              <span v-if="!loading">Save and Ship to This Address</span>
              <span v-else>saving</span>
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
            { type: 'email' , message: 'email is required', trigger: 'blur'},
          ],
          firstname: [
            { required: true, message: 'First Name is required', trigger: 'blur' }
          ],
          lastname: [
            { required: true, message: 'Last Nameis required', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: 'Phone Number is required', trigger: 'blur' }
          ],
          detail: [
            { required: true, message: 'Address is required', trigger: 'blur' }
          ],
          city: [
            { required: true, message: 'City is required', trigger: 'blur' }
          ],
          province:[
            { message: 'State / Province / Region is required', trigger: 'blur' }
          ],
          country: [
            { required: true, message: 'Destination Country is required', trigger: 'blur' }
          ],
          postCode: [
            { required: true, message: 'Postal Code is required', trigger: 'blur' }
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
