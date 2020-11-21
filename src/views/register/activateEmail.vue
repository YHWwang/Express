<template>
  <div class="active-big-box">
    <div class="active-box">
      <div class="active">
<!--        <div @click="handleC">激活成功页面</div>-->
        <!--注册页跳转过来的-->
        <div class="register" v-if="isShow">
          <h3>{{$t('views.refister.h1')}}</h3>
          <p>{{$t('views.refister.p1')}}</p>
          <p>{{email}}</p>
          <p>{{$t('views.refister.p2')}}</p>
          <p class="btn-send"><el-button type="primary" :disabled="show" @click="send">{{$t('views.refister.btn1')}}</el-button></p>
        </div>
        <!--登录页跳转过来的-->
        <div class="login" v-else>
          <h3>{{$t('views.refister.h2')}}</h3>
          <p>{{$t('views.refister.p3')}}</p>
          <p>{{email}}</p>
          <p class="tips">{{$t('views.refister.p4')}}</p>
          <p class="btn-send"><el-button type="primary" :disabled="show" @click="send">{{$t('views.refister.btn2')}}</el-button> </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {SendEmail} from '@/api/login'
  import {Message} from "element-ui";
    export default {
        name: "activateEmail",
      data(){
          return {
            email:"",
            show:true,
            isShow:true
          }
      },
      methods:{
        send(){
          var _this = this
          this.show = true
          // setTimeout()
          SendEmail(this.email).then(res=>{
            setTimeout(function () {
              _this.show = false
            },60000)
          }).catch(error=>{
            Message({ message: error.data.message, type:'error'})
          })
        },
        handleC(){
          var param = this.$store.state.activeUrl
          this.$router.push(param)
        }
      },
      created() {
       var active  = this.$store.state.activateEmail

        if(active == "login"){
          this.isShow =false
        }else{
          this.isLogin = true
        }
        this.email = this.$route.params.email
          var _this = this
        setTimeout(function () {
          _this.show = false
        },60000)
      }
    }
</script>
<style lang="scss" scoped>
  @media screen  and (min-width: 1000px) {
    .active-big-box{
      width: 100%;
      height: 100%;
      background: #bad4f9;
    }
    .active-box{
      width: 1350px;
      min-height: 780px;
      background:url(../../assets/img/login.jpg) no-repeat center;
      margin: 0 auto;
      position: relative;
    }
    .active {
      position: absolute;
      top:55px;
      left: 82px;
      background: white;
      width: 420px;
    }

  }
.active{
  height: 550px;
  text-align: center;
  font-size: 16px;
  color: rgb(128,128,128);
  line-height: 30px;
}

.active h3{
  font-size: 24px;
  color: #000;
  margin-top: 82px;
  margin-bottom: 20px;
}


  /deep/ .el-button--medium{
    font-size: 16px;
    height: 50px;
  }
  .btn-send{
    margin-top: 20px;
  }
</style>
