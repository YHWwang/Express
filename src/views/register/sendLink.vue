<template>
  <div class="send-big-box">
    <div class="send-box">
      <div class="send">
        <h3>{{$t('views.refister.send.tit')}}</h3>
        <p>{{$t('views.refister.send.msg1')}} {{email}}. <br> {{$t('views.refister.send.msg2')}}</p>
        <router-link to="/"><el-button type="primary">{{$t('views.refister.send.btn')}}</el-button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "sendLink",
      data(){
          return {
            email:""
          }
      },
      created() {
        this.email = this.$route.params.email
      }
    }
</script>

<style lang="scss" scoped>
  @media screen  and (min-width: 1000px) {
    .send-big-box{
      width: 100%;
      height: 100%;
      background: #bad4f9;
    }
    .send-box{
      width: 1350px;
      min-height: 780px;
      background:url(../../assets/img/login.jpg) no-repeat center;
      margin: 0 auto;
      position: relative;
    }
    .send{
      position: absolute;
      top:55px;
      left: 82px;
      background: white;
      width: 420px;
    }
  }
  .send{
    width: 420px;
    height: 550px;
    margin: 0 auto;
    color: rgb(128,128,128);
    text-align: center;
  }
  .send h3{
    font-size: 24px ;
    color: #000;
    margin-top: 82px;
    margin-bottom: 30px;
  }

  /deep/ .el-button{
    font-size: 16px;
    height: 50px;
    width: 320px;
    margin-top: 30px;
  }
</style>
