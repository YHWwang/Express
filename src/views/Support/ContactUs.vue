<template>
<div class="contact-us-box">

  <div class="contact-us-main">

    <div class="contact-us-tips" v-if="show" v-html="tipsData">

<!--      <p>Hi friends,</p>-->
<!--      <p style="text-indent: 2em;line-height: 1.5em">We would like to let you know that we'll be on vacation from-->
<!--        October 1st to October 5th( National Day.) -->
<!--        Please leave us messages should you have any questions during this period. -->
<!--        We'll respond to your requests as soon as possible upon our return on October 6th..</p>-->
<!--      <p style="text-indent: 2em;line-height: 1.5em">-->
<!--        Please accept our apology for the inconvenience that may be caused. We are thankful for your understanding.-->
<!--    </p>-->
<!--     <p>We wish you all the best!</p>-->
<!--      <p style="text-align: right">Yours sincerely,</p>-->
<!--    <p style="text-align: right">Blackview Team</p>-->



    </div>
         <h3>{{$t('views.Support.ContactUs.tit')}}</h3>
    <div class="contact-content">
      <div class="contact-left">
        <p class="p1">{{$t('views.Support.ContactUs.p1')}}</p>
        <div class="chat-item">
          <p class="chat-item-name">{{$t('views.Support.ContactUs.tit_1')}}</p>
          <ul>
            <li><a class="sale" href="skype:melinda72720" title="Melinda" target="_blank">{{$t('views.Support.ContactUs.Melinda')}}</a></li>
            <li><a class="sale" href="skype:lichen2011" title="Lily" target="_blank">{{$t('views.Support.ContactUs.Lily')}}</a></li>
            <li><a class="sale" href="skype:nancy.xiao7" title="Nancy" target="_blank">{{$t('views.Support.ContactUs.Nancy')}}</a></li>
            <li><a class="sale" href="skype:tommy@blackview.hk" title="Tommy" target="_blank">{{$t('views.Support.ContactUs.Tommy')}}</a></li>
            <li><a class="sale" href="skype:akonlee51" title="Akon" target="_blank">{{$t('views.Support.ContactUs.Akon')}}</a></li>
            <li><a class="sale" href="skype:helena.yanghuang" title="Helena" target="_blank">{{$t('views.Support.ContactUs.Helena')}}</a></li>
            <li><a class="sale" href="skype: lilylee.forever" title="Amanda Lee" target="_blank">{{$t('views.Support.ContactUs.AmandaLee')}}</a></li>
          </ul>
        </div>
        <div class="chat-item chat-item-box">
          <div class="left">
            <p class="chat-item-name">{{$t('views.Support.ContactUs.tit_2')}}</p>
            <ul>
              <li><a class="sale" href="skype:live:3403902729?chat" title="Julia" target="_blank">{{$t('views.Support.ContactUs.Julia')}}</a></li>
            </ul>
          </div>
          <div class="right">
            <p class="chat-item-name">{{$t('views.Support.ContactUs.tit_3')}}</p>
            <ul>
<!--              <li><a class="sale" href="skype:donna@blackview.hk?chat" title="Donna" target="_blank">Donna</a></li>-->
              <li><a class="sale" href="skype:live:.cid.2b4611d3ae4a8339?chat" title="Donna" target="_blank">{{$t('views.Support.ContactUs.Donna')}}</a></li>

            </ul>
          </div>
        </div>
        <div class="chat-item">
          <p class="chat-item-name">{{$t('views.Support.ContactUs.tit_4')}} </p>
          <ul class="marketing">
            <li><a class="sale" href="skype:live:1484684467@qq.com?chat" title="Alston(Partner)" target="_blank">{{$t('views.Support.ContactUs.Alston')}}</a></li>
            <li>
              <a class="sale" href="skype:live:476672581@qq.com?chat" title="Лида(Русский)" target="_blank">Лида(Русский)</a></li>
          </ul>
        </div>
        <div class="chat-item">
          <p class="chat-item-name">{{$t('views.Support.ContactUs.Email')}}</p>
              <el-tabs type="border-card">
                <el-tab-pane :label="$t('views.Support.ContactUs.tit_5')">
                  <p>
                 {{$t('views.Support.ContactUs.r_sale')}}
                    <a href="mailto:Joanna@blackview.hk" target="_blank">Joanna@blackview.hk</a>
                    <br>
                  {{$t('views.Support.ContactUs.w_sale')}}
                    <a href="mailto:melinda@blackview.hk" target="_blank" >melinda@blackview.hk</a>
                  </p>
                </el-tab-pane>
                <el-tab-pane :label="$t('views.Support.ContactUs.Support')"><a href="mailto:support02@blackview.hk">support02@blackview.hk</a></el-tab-pane>
                <el-tab-pane :label="$t('views.Support.ContactUs.Marketing')">
                  <a href="mailto:marketing@blackview.hk"> marketing@blackview.hk  </a>
                </el-tab-pane>
              </el-tabs>
        </div>
      </div>
      <div class="contact-right">
        <p class="p1"> {{$t('views.Support.ContactUs.p2')}}</p>
        <p> {{$t('views.Support.ContactUs.msg1')}}</p>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm"  label-position="top" >
          <el-form-item :label="$t('views.Support.ContactUs.email')" prop="email" class="form-item">
            <el-input type="text" v-model="ruleForm.email" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.Support.ContactUs.contractName')" prop="contractName">
            <el-input v-model="ruleForm.contractName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.Support.ContactUs.category')" prop="category">
            <el-select v-model="ruleForm.category" :placeholder="$t('views.Support.ContactUs.placeholder')">
              <el-option :label="$t('views.Support.ContactUs.option_1')" :value="$t('views.Support.ContactUs.option_1')"></el-option>
              <el-option :label="$t('views.Support.ContactUs.option_2')" :value="$t('views.Support.ContactUs.option_2')"></el-option>
              <el-option :label="$t('views.Support.ContactUs.option_3')" :value="$t('views.Support.ContactUs.option_3')"></el-option>
              <el-option :label="$t('views.Support.ContactUs.option_4')" :value="$t('views.Support.ContactUs.option_4')"></el-option>
              <el-option :label="$t('views.Support.ContactUs.option_5')" :value="$t('views.Support.ContactUs.option_5')"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('views.Support.ContactUs.orderId')" >
            <el-input v-model="ruleForm.orderId"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.Support.ContactUs.subject')" prop="subject">
            <el-input v-model="ruleForm.subject"></el-input>
          </el-form-item>
          <el-form-item :label="$t('views.Support.ContactUs.content')" prop="content">
            <el-input v-model="ruleForm.content" type="textarea"></el-input>
          </el-form-item>
          <el-form-item class="btn-submit">
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading" > {{$t('views.Support.ContactUs.btn')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import {ContactUs,GetTips } from '@/api/support'
  import {GetReCAPTCHA} from '@/api/home'
  import {Message} from "element-ui";
    export default {
        name: "ContaactUs",
      data(){
          return {
            tipsData:"",//放假通知的文字
            show:false,
            loading: false,
            ruleForm: {
              email: '',
              contractName:"",
              content: '',
              category:"",
              subject:"",
              orderId:"",
            },
            rules: {
              email: [
                {  required: true, message: this.$t('views.Support.ContactUs.rules.email_1'),trigger: 'blur' },
                { type:"email", message: this.$t('views.Support.ContactUs.rules.email_2'),trigger: 'blur' }
              ],
              content: [
                {  required: true, message:this.$t('views.Support.ContactUs.rules.content'),trigger: 'blur' }
              ],
              contractName: [
                {  required: true, message:this.$t('views.Support.ContactUs.rules.contractName'),trigger: 'blur' }
              ],
              category: [
                {  required: true, message: this.$t('views.Support.ContactUs.rules.category'),trigger: 'blur' }
              ],
              subject: [
                {  required: true, message:this.$t('views.Support.ContactUs.rules.subject'),trigger: 'blur' }
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
              if(IsCaptcha){
                this.loading =true
                ContactUs(this.ruleForm).then(res=>{
                this.loading =false
                this.show = true
                this.$refs[formName].resetFields();
                Message({ message: res.data.message, type: 'success' ,offset:200})
              }).catch(error=>{
                console.log(error);
              })
              }
            }else {

            }
          })
        }
      },
      created() {
        GetTips().then(res=>{
        if(res.data.content.length > 0){
          this.tipsData = res.data.content[0].map.info;
          this.show= true
        }else{
          this.show= false
        }
        })
      }
    }
</script>

<style scoped>
  .contact-us-box{
    background: #f1f1f1;
    padding: 50px;
    position: relative;
  }
  .contact-us-main{

    max-width: 1052px;
    margin: 0 auto;
    background: white;
    box-sizing: border-box;
  }
  .contact-us-box .contact-us-tips{
    box-sizing: border-box;
    margin: 0 auto;
    width: 100%;
    padding: 30px;
    /*max-width: 1052px;*/
    /*height: 60px;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
    background: #fff3cd;
  }
  .contact-content{
    display: flex;
    justify-content: center;
    flex: 1;
  }
  .contact-content .p1{
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    text-align: center;
  }
  .contact-us-main h3{
    font-size: 36px;
    text-align: center;
    padding: 20px;
  }
  .contact-left,.contact-right{
    width: 40%;
    margin: 10px;
    padding: 0 20px;
  }
  .contact-left {
    /*border-right: 1px solid #000;*/
  }
  .chat-item{
    margin: 20px 0px;
  }
  .chat-item:nth-child(3){
    border-bottom: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
    padding: 10px 0px;
  }
  .chat-item:nth-child(4){
    border-bottom: 1px solid #DCDFE6;
    /*padding: 30px 0px;*/
  }
  .chat-item ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }
  .chat-item li{
    width: 150px;
    display: flex;
    line-height:32px;
    text-align:left;
    background:url(../../assets/img/footer/online_bj_2.jpg) no-repeat 8px 6px;padding-left:36px;
  }
  .email-box li{
    background: none;
    padding-left: 0;
  }
  .email-box svg{
    margin-right: 5px;
  }
.chat-item .chat-item-name{
  line-height: 30px;
  padding: 5px;
}
  .btn-submit{
    /*margin: 0 auto;*/
    text-align: center;
  }
  /deep/   .el-form-item__label
  {
    line-height: 30px;
  }
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
  .sale:hover{
    text-decoration: underline;
  }

  /deep/ .el-tabs--border-card>.el-tabs__header{
    background: none;
    border-bottom:1px solid rgba(0,0,0,0);
  }

/deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  color: white;
  background-color: #2d77db;
  border-right-color: white;
  border-left-color: white
}
  /deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  background: #96bbed;
    margin-left: 5px;
    color: white;
    font-size: 18px;
    padding: 0 10px
}
  /deep/.el-tabs--bottom .el-tabs--left>.el-tabs__header .el-tabs__item:last-child, .el-tabs--bottom .el-tabs--right>.el-tabs__header .el-tabs__item:last-child, .el-tabs--bottom.el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child, .el-tabs--bottom.el-tabs--card>.el-tabs__header .el-tabs__item:last-child, .el-tabs--top .el-tabs--left>.el-tabs__header .el-tabs__item:last-child, .el-tabs--top .el-tabs--right>.el-tabs__header .el-tabs__item:last-child, .el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child, .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child{
    padding-right: 0;
  }
  /deep/.el-tabs--border-card{
border: 1px solid rgba(0,0,0,0);
    box-shadow:none;
   }
.marketing{
  padding-bottom: 20px;
}

.chat-item-box{
  display: flex;
  flex-wrap: wrap;
}
 a:hover{
  text-decoration: underline;
}
  @media screen and (max-width:800px) and (min-width:200px){
    /deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item{
      font-size: 13px;
    }
    .contact-us-box{
      padding: 10px;
    }
    .contact-content{
      display: block;
    }
    .contact-left,.contact-right{
      width: 90%;
      margin: 0px auto;
    }
    .chat-item li{
      width: 120px;
    }
    /deep/ .el-form-item{
      margin-bottom: 5px;
    }
    .demo-ruleForm{
      padding-bottom: 20px;
    }
  }
</style>
