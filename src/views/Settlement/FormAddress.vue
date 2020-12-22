<template>
  <div class="address-box-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="190px"
             class="address" autocomplete="on">
      <el-form-item :label="$t('views.set.form.email')" prop='email'  v-show="signIn">
        <el-input name="email" v-model="ruleForm.email" v-show="signIn" :disabled="disabled" type="email"
                  autocomplete="email"></el-input>
	<p> {{$t('views.set.form.p1')}}</p>
        <p>{{$t('views.set.form.p2')}} <router-link to="/login">{{$t('views.set.form.router')}}</router-link> </p>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.firstname')" prop="firstname" >
        <el-input name="firstname" v-model="ruleForm.firstname" autocomplete="given-name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.lastname')" prop="lastname">
        <el-input name="lastname" v-model="ruleForm.lastname" autocomplete="family-name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.phone')" prop="phone">
        <el-input type="tel" name="tel" v-model="ruleForm.phone" autocomplete="tel"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.detail')" prop="detail" >
        <el-input ref="detail" name="street" v-model="ruleForm.detail" autocomplete="address-line1"></el-input>
      </el-form-item>

      <el-form-item :label="$t('views.set.form.city')" prop="city">
        <el-input name="city" v-model="ruleForm.city" autocomplete="on"></el-input>
      </el-form-item>

      <el-form-item :label="$t('views.set.form.country')" prop="country"  style="position:fixed;top:1000px;z-index: -9999" >
        <el-input name="shop country" v-model="ruleForm.country" autocomplete="shop country"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.de_country')" prop="country" >
        <el-select ref="selectCount"  class="bv-select"   v-model="ruleForm.country" name="shop country"   filterable :placeholder="$t('views.set.form.country_placeholder')"   autocomplete="shop country"
                  >
          <el-option
            style="width:98%"
            v-for="item in countryList"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.province1')" prop="province"  style="position:fixed;top:1000px;z-index: -9999"  >
        <el-input name="shop state" v-model="ruleForm.province" autocomplete="shop state"></el-input>
      </el-form-item>
      <el-form-item :label="$t('views.set.form.province')" prop="province" :style="display">
        <el-select name="shop state" v-model="ruleForm.province"  filterable :placeholder="$t('views.set.form.province_placeholder')"  class="bv-select"
	 autocomplete="shop state">
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
        <el-input name="post-code" v-model="ruleForm.postCode" autocomplete="postal-code"></el-input>
      </el-form-item>
      <el-form-item class="address-btn-save-box">
        <el-button class="address-btn-save" @click="submitForm('ruleForm')" :loading="loading">
             <span v-if="!loading">{{$t('views.set.form.btn1')}}</span>
              <span v-else>{{$t('views.set.form.btn2')}}</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {UserInfo} from '@/api/user' //和 个人信息
  import {Addaddress, ChangeAddress, Country, Province} from "@/api/user"
  // import {GetReCAPTCHA} from '@/api/home'
  import {Message} from 'element-ui'

  export default {
    name: "FormAddress",
    // props:["closeDialog","change","id","email"],
    props: ["closeDialog", "change", "id", "email", "signIn"],
    data() {
      return {
        // signIn:true,
        loading: false,
        display: "display:none",
        labelPosition: "left",
        disabled: false,
        countryList: [],
        countryId: '',
        ProvinceList: [],
        ProvinceId: '',
        ruleForm: {
          email: "",//
          id: "",//
          firstname: "",//
          lastname: "",//
          phone: "",//
          realName: "",//
          detail: "",  //detail  street_number 和 route
          detail1: '',
          city: "",//city /locality
          province: "",//province  /administrative_area_level_1
          country: "",//country / country
          postCode: "",//postCode / postal_code
          district: "",//
          uid: localStorage.getItem("uid"),
        },
        ruleForm_google: {
          email: "",//
          id: "",//
          firstname: "",//
          lastname: "",//
          phone: "",//
          realName: "",//
          street_number: "",  //detail  street_number 和 route
          locality: "",//city /locality
          administrative_area_level_1: "",//province  /administrative_area_level_1
          country: "",//country / country
          postal_code: "",//postCode / postal_code
          district: "",//
          uid: localStorage.getItem("uid"),
        },
        rules: {
          email: [
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
    mounted() {
      this.googleAuto()
    },
    methods:{
      googleAuto() {
        let _this = this
        const componentForm = {
          street_number: "short_name",
          route: "long_name",
          locality: "long_name",
          administrative_area_level_1: "long_name",
          country: "long_name",
          postal_code: "short_name",
        };

        var componentForm1 = {
          street_number: "short_name",
          route: "long_name",
          locality: "long_name",
          administrative_area_level_1: "long_name",
          country: "long_name",
          postal_code: "short_name",
        };
        for (var key in componentForm1) {
          componentForm1[key] = ''
        }
        const domInput = _this.$refs.detail.$el.children[0]
        var autocomplete = new google.maps.places.Autocomplete(domInput, {});
        autocomplete.setFields(["address_component"]);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {

          var place = autocomplete.getPlace();
          for (const component of place.address_components) {
            const addressType = component.types[0];

            if (componentForm[addressType]) {
              const val = component[componentForm[addressType]];
              componentForm1[addressType] = val
            }
          }

          for (var key in componentForm1) {
            _this.ruleForm_google[key] = componentForm1[key]
          }


          var IsCountry = false
          _this.countryList.forEach(function (v) {

            if (v.name == _this.ruleForm_google.country.toUpperCase()) {
              IsCountry = true
            }
          })

          if (IsCountry) _this.ruleForm.country = _this.ruleForm_google.country

          _this.ruleForm.detail = _this.ruleForm_google.street_number + '' + _this.ruleForm_google.route
          _this.ruleForm.city = _this.ruleForm_google.locality
          _this.ruleForm.province = _this.ruleForm_google.administrative_area_level_1
          _this.ruleForm.postCode = _this.ruleForm_google.postal_code

        });


      },
      // async recaptcha() {
      //   const token = await this.$recaptcha()
      //   var result = await GetReCAPTCHA(token)
      //   return   result.data.success
      // },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loading = true
            // var IsCaptcha  = await this.recaptcha()
            // if(IsCaptcha){
            this.ruleForm.realName = this.ruleForm.firstname + "  " + this.ruleForm.lastname
            var addressmethod = "";

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
            this.display = "display:block";
            // this.ruleForm.province = this.ruleForm_google.province
          } else {
            this.display = "display:none";
            this.ruleForm.province="-"
            this.$nextTick(()=>{
            })
          }

        }).catch(error=>{
          console.log(error);
          if(error.status ==500){
            this.ruleForm.country = ''
          }

        })
      },
      'ruleForm.province': function (val) {
        if (this.ruleForm.province == false) {
          this.ruleForm.province = this.ruleForm_google.administrative_area_level_1
          return
        }
        let ele = document.createElement('span')
        ele.innerHTML = this.ruleForm.province
        this.ruleForm.province = ele.textContent
      },
      'ruleForm.detail': 'googleAuto'
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
