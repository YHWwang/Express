<template>
  <div class="feed-box">
    <div class="feed-back" id="Feed">
      <h4 class="title">{{$t('views.Support.FeedBack.title')}}</h4>
      <p class="feed-txt">{{$t('views.Support.FeedBack.msg_1')}} <br> {{$t('views.Support.FeedBack.thank')}}</p>
      <div class="my-form">
        <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm">
          <el-form-item label="" prop="Category">
            <el-select v-model="ruleForm.Category" :placeholder="$t('views.Support.FeedBack.placeholder')">
              <el-option :label="$t('views.Support.FeedBack.option_1')" :value="$t('views.Support.FeedBack.option_1')"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_2')" :value="$t('views.Support.FeedBack.option_2')"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_3')" :value="$t('views.Support.FeedBack.option_3')"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_4')" value="shanghai"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_5')" :value="$t('views.Support.FeedBack.option_5')"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_6')" :value="$t('views.Support.FeedBack.option_6')"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_7')" :value="$t('views.Support.FeedBack.option_7')"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_8')" :value="$t('views.Support.FeedBack.option_8')"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_9')" :value="$t('views.Support.FeedBack.option_9')"></el-option>
              <el-option :label="$t('views.Support.FeedBack.option_10')" :value="$t('views.Support.FeedBack.option_10')"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('views.Support.FeedBack.email')" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.Support.FeedBack.where')" prop="where">
            <el-input v-model.trim="ruleForm.where"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.Support.FeedBack.storeName')" prop="storeName">
            <el-input v-model.trim="ruleForm.storeName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.Support.FeedBack.orderNumber')" prop="orderNumber">
            <el-input  v-model="ruleForm.orderNumber"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.Support.FeedBack.PhoneModel')" prop="PhoneModel">
            <el-input  v-model="ruleForm.PhoneModel"></el-input>
          </el-form-item>
          <el-form-item class="label-h" :label="$t('views.Support.FeedBack.IMEI')" prop="IMEI" style="line-height: 30px">
            <P>{{$t('views.Support.FeedBack.msg_2')}} "<i class="tip_y">*#06#</i>" {{$t('views.Support.FeedBack.msg_3')}}</P>
            <el-input  v-model="ruleForm.IMEI"></el-input>
          </el-form-item>

          <el-form-item :label="$t('views.Support.FeedBack.Version')" prop="Version">
            <p>{{$t('views.Support.FeedBack.msg_4')}} <i class="tip_y">{{$t('views.Support.FeedBack.msg_5')}}</i> {{$t('views.Support.FeedBack.msg_6')}}</p>
            <el-input  v-model="ruleForm.Version"></el-input>
          </el-form-item>
          <el-select v-model="ruleForm.language" :placeholder="$t('views.Support.FeedBack.language')">
            <el-option value="English" label="English"></el-option>
            <el-option value="Spanish" label="Español"></el-option>
            <el-option value="Russian" label="Русский"></el-option>
            <el-option value="Japanese" label="日本語"></el-option>
            <el-option value="French" label="Français"></el-option>
            <el-option value="Other" label="Other"></el-option>
          </el-select>
          <el-form-item :label="$t('views.Support.FeedBack.Country')" prop="Country">
            <el-input  v-model="ruleForm.Country"></el-input>
          </el-form-item>

          <el-form-item :label="$t('views.Support.FeedBack.detail')" prop="detail" :placeholder="$t('views.Support.FeedBack.detail_p')">
            <el-input type="textarea" v-model="ruleForm.detail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{$t('views.Support.FeedBack.Submit')}}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="step-content">
        <h3>
          {{$t('views.Support.FeedBack.word')}}
        </h3>
        <ul>
          <li>
            <p>{{$t('views.Support.FeedBack.Step_1')}}</p>
            <img src="../../assets/img/feedback/1.jpg" alt="">
          </li>
          <li>
            <p>{{$t('views.Support.FeedBack.Step_2')}}</p>
            <img src="../../assets/img/feedback/2.jpg" alt="">
          </li>
          <li>
            <p>{{$t('views.Support.FeedBack.Step_3')}}</p>
            <img src="../../assets/img/feedback/3.jpg" alt="">
          </li>
          <li>
            <p>{{$t('views.Support.FeedBack.Step_4')}}</p>
            <img src="../../assets/img/feedback/4.jpg" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import {feedback} from '@/api/support'
    export default {
        name: "FeedBack",
      data(){
          return {
            ruleForm: {
              email:'',
              Category:"",
              where: '',
              storeName: '',
              orderNumber:"",
              PhoneModel:'',
              detail:"",
              IMEI:"",
              Version:"",
              language:"",
              Country:'',
            },
            rules: {
              Category: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.Category'), trigger: 'blur' }
              ],
              email:[
                { required: true, message:this.$t('views.Support.FeedBack.rules.email_1'), trigger: 'blur' },
                { type: 'email', message: this.$t('views.Support.FeedBack.rules.email_2'), trigger: ['blur', 'change'] }
              ],
              where: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.where'), trigger: 'blur' }
              ],
              storeName: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.storeName'), trigger: 'blur' }
              ],
              orderNumber: [
                { required: true, message:this.$t('views.Support.FeedBack.rules.orderNumber'), trigger: 'blur' }
              ],
              PhoneModel: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.PhoneModel'), trigger: 'blur' }
              ],
              IMEI: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.IMEI'), trigger: 'nlur' }
              ],
              Version: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.Version'), trigger: 'blur' }
              ],
              language: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.language'), trigger: ["change","blur"] }
              ],
              Country: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.Country'), trigger: 'blur' }
              ],
              detail: [
                { required: true, message: this.$t('views.Support.FeedBack.rules.detail'), trigger: 'blur' }
              ]
            }

          }
      },
      methods:{
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              feedback(this.ruleForm).then(res=>{
                // console.log(res);
                alert('success!')
                this.$refs[formName].resetFields();
              }).catch(error=>{
                console.log(error);
              })
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
  .feed-box{
    background: #f1f1f1;
    padding: 50px 0px;
  }
  #Feed{
    width: 800px;
    margin: 0 auto;
    padding: 50px 15px;
    color: #424242;
    background: white;
  }
  #Feed .title{
    line-height: 1.5em;
    margin-bottom: .5em;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .my-form{
    max-width: 500px;
    margin:30px auto;
  }
 .feed-back h4{
    text-align: center;
  }
.feed-txt{
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
  padding: 20px;
}
  .el-select{
    width: 100%;
  }
  .step-content{
    border-top: 1px dashed #000;
    padding-top: 30px;
  }
  .step-content ul{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .step-content ul li{
    width: 350px;
    margin: 20px;
  }
  .step-content ul li img{
    width: 100%;
    height: auto;
  }
  .step-content h3{
    font-weight: bold;
    padding-left:30px;
  }
  .step-content ul li p{
    font-weight: bold;
    margin-bottom: 30px;
  }
  .my-form p{
    font-size: 12px;
    color: rgba(0,0,0,.6);
    /*height: 25px;*/
    line-height: 25px;
  }
  .my-form .label-h label{
    line-height: 30px !important;
  }
  .my-form .tip_y{
    color: orangered;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    #Feed{
      width: 90%;
    }
  }

</style>
