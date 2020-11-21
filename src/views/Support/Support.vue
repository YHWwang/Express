<template>
  <div class="support-box">
   <h2>{{$t('views.Support.Support.tit')}}</h2>
   <p class="p1-txt">
    {{$t('views.Support.Support.msg_1')}}
   </p>
    <ul>
      <li>
        <router-link  class="support-link" to="network">
          <img src="../../assets/img/support/network.png" alt="">
          <h4>{{$t('views.Support.Support.tit_2')}}</h4>
          <p>{{$t('views.Support.Support.msg_2')}}</p>
        </router-link >
      </li>
      <li>
        <a class="support-link" href="http://bbs.blackview.hk/" target="_blank">
          <img src="../../assets/img/support/download.png" alt="">
          <h4>{{$t('views.Support.Support.tit_3')}}</h4>
          <p>{{$t('views.Support.Support.msg_3')}}</p>
        </a>
      </li>
      <li>
        <router-link class="support-link" to="/ce">
          <img src="../../assets/img/support/ce.png" alt="">
          <h4>{{$t('views.Support.Support.tit_4')}}</h4>
          <p>{{$t('views.Support.Support.msg_4')}}</p>
        </router-link >
      </li>
      <li>
      <router-link  class="support-link" to="/faq">
        <img src="../../assets/img/support/faq.png" alt="">
        <h4>{{$t('views.Support.Support.tit_5')}}</h4>
        <p>{{$t('views.Support.Support.msg_5')}}</p>
      </router-link >
    </li>
      <li>
        <router-link class="support-link" to="/contact-us">
          <img src="../../assets/img/support/contactus.png" alt="">
          <h4>{{$t('views.Support.Support.tit_6')}}</h4>
          <p>{{$t('views.Support.Support.msg_6')}}</p>
        </router-link>
      </li>
      <li>
        <router-link class="support-link" to="/feedback">
        <img src="../../assets/img/support/feedback.png" alt="">
        <h4>{{$t('views.Support.Support.tit_7')}}</h4>
        <p>{{$t('views.Support.Support.msg_7')}}</p>
        </router-link>
    </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Support",
    }
</script>

<style scoped>
  .support-box{
    background: #f1f1f1;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 200px;
    /*max-width: 1200px;*/
  }
  .support-box ul{
    /*max-width: 1200px;*/
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .support-box li{
    width: 400px;
    margin: 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 30px 10px;
    transition: all .3s ease;
  }
  .support-box li:hover{
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,.15) !important;
  }
  .support-link{
    display: inline-block;
    text-align: center;
  }
  .support-box li p{
    width: 100%;
    color: rgb(128,128,128);
  }
  h4{
    font-size: 24px;
    color: rgb(0,0,0);
    margin:20px 0;
  }
  h2{
    font-size:48px;
    font-weight: bold;
  }
  .p1-txt{
    font-size: 48px;
    padding:60px 0 60px 0;
  }
  @media screen and (max-width: 800px) and (min-width: 350px){
    .support-box li{
      width: 300px;
    }
    .support-box{
      padding: 5px;
    }
    h2{
      font-size: 24px;
    }
    h4{
      font-size: 14px;
    }
    .p1-txt{
      font-size: 24px;
      padding: 5px;
    }
  }

</style>
