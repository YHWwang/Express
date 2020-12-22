<template>
  <div>
    <PC ref="productsList" v-if="show"></PC>
    <H5 ref="productsList" v-else></H5>
    <div class="language-box ">

      <div class="language-right">

        <div class="social-box">
        <a  href="https://www.facebook.com/www.blackview.hk" target="_blank" title="Facebook EN"></a>
        <a  href="https://www.facebook.com/blackview.hk/" target="_blank" title="Facebook ES"></a>
        <a  href="https://www.facebook.com/BlackviewGermany" target="_blank" title="Facebook DE"></a>
        <a  href="https://twitter.com/Blackview_HK" target="_blank" title="Twitter"></a>
        <a  href="https://www.youtube.com/channel/UCpTSGhsypaabQ8Mp2rRIRng" target="_blank" title="Youtube"></a>
        <a  href="https://www.instagram.com/blackview_smartphones/" target="_blank" title="Instagram"></a>
        <a  href="https://www.facebook.com/Blackview-Amazon-148692022544470/" target="_blank" title="Amazon"></a>
        <a  href="https://vk.com/blackview_official" target="_blank" title="VK"></a>
        <a  href="https://www.tiktok.com/@blackviewofficial" target="_blank" title="Tiktok"></a>
        <a  href="https://t.me/Blackviewsupport" target="_blank" title="Telegram"></a>
      </div>
      </div>
    </div>

    <div class="footer-pay">
      <img src="../assets/img/paypal-logo.png" alt="">
      <img src="../assets/img/visa_icon.png" alt="">
    </div>
    <div class="line" style="text-align: center">
      <router-link to="/privacy"><span>{{$t('myfooter.privacy')}} &nbsp; &nbsp;</span></router-link>
      <router-link to="/terms-of-use"><span>{{$t('myfooter.terms_of_use')}} &nbsp; &nbsp;</span></router-link>
      <router-link to="/legal-statement"><span>{{$t('myfooter.legal_statement')}} &nbsp; &nbsp;</span></router-link>
      <router-link to="/intellectual-property-rights"><span> {{$t('myfooter.intellectual_property_rights')}}&nbsp; &nbsp; </span></router-link>
    </div>
    <p class="foot">{{$t('myfooter.foot')}}</p>
  </div>
</template>

<script>
  // import {subscribe,footerRecommend,GetReCAPTCHA} from '@/api/home'
  import {footerRecommend} from '@/api/home'
  import H5 from './footerH5'
  import PC from './footerPC'
  export default {
    name: "Myfooter",
    components:{
      H5,
      PC
    },
    data(){
      return {

        show:true
      }
    },
    async created() {
      const footerData = await  footerRecommend()
      if(footerData.status == 200) {
        this.$refs.productsList.productsList = footerData.data
      }else{
        console.log(footerData);
      }
    },
    beforeMount() {

      var width = document.body.clientWidth

      this.show  = width > 800


    }
  }
</script>

<style lang="scss"   scoped>
  .foot{
    text-align: center;
  }

  .language-box{
    /*margin-top: 20px;*/
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #CECECE;
    margin-bottom: 50px;
  }
/*.flag{*/
/*  !*display: inline-block;*!*/
/*  !*-webkit-transform: scale(.8);*!*/
/*  transform: scale(.8);*/
/*  width: 30px;*/
/*  height: 20px;*/
/*  display: inline-block;*/
/*  vertical-align: middle;*/
/*  margin-right: 6px;*/
/*  margin-top: -.2em;*/
/*  background-image: url(../assets/img/flag.png);*/
/*  background-position: -31px -63px;*/
/*  width: 31px;*/
/*  height: 21px*/
/*}*/
  .social-box {
    text-align: center;
    margin: 20px 0 0 0;
    vertical-align: middle;
  }
  .social-box a {
    display: inline-block;
    color: #8b8b8b;
    margin: 0 0px 10px;
    width: 46px;
    height: 45px;
    background: url("../assets/img/social_icon.png") 0 0 no-repeat;
    border: 1px solid #eee;
  }
  .social-box a:hover {
    border: 1px solid #ff0036;
  }
  .social-box a:nth-child(4) {
    width: 45px;
    background-position: -45px 0;
  }
  .social-box a:nth-child(5) {
    background-position: -90px 0;
  }
  .social-box a:nth-child(6) {
    background-position: -135px 0;
  }
  .social-box a:nth-child(7) {
    width: 45px;
    background-position: -180px 0;
  }
  .social-box a:nth-child(8) {
    background-position: -225px 0;
  }
  .social-box a:nth-child(9) {
    background-position: -270px 0;
  }
  .social-box a:nth-child(10) {
    background-position: -315px 0;
  }
  .social-box a:nth-child(9) {
    background:url(../assets/img/tiktok.png)no-repeat center;
  }

  .social-box a:nth-child(10) {
    background:url(../assets/img/telegram.jpg)no-repeat center;
  }


  .foot-list .first-txt{
    font-size: 20px;
    color:#000000;
    font-size: 24px;
    margin-bottom: 10px;
    opacity: 1;
  }
.footer-pay{
  height: 50px;
}
.footer-pay{
  text-align: center;
}
  .footer-pay img{
    width: auto;
    max-height:50px ;
  }

  .line{
    span{
      margin-top: 30px;
      display: inline-block;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      opacity: .8;
    }
  }
  .foot{
    height: 30px;
    line-height: 30px;
    margin-bottom: 60px;
    opacity: .8;
    font-size: 16px;
  }
.btn-sub{
  width: 105px;
  background: white;
  color: #000;
  border: 1px solid #eee;
  margin-left:10px;
}

  .sub-news{
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .foot-list .new-shop-link{
    color: rgba(0,0,0,1);
  }
  .foot-list .new-shop-link:hover{
    color: rgba(0,0,0,.6);
    /*background: #000;*/
  }
  @media screen and (max-width:800px) and (min-width:350px){
    .foot-list{
      flex-wrap: wrap;
      padding-left: 5px;
      margin-top: 10px;
      justify-content: space-around;
    }
    .foot-list p{
      font-size: 16px;
    }
    .foot-list .first-txt{
      font-size: 20px;
    }
    .foot-list li{
      margin: 10px;
    }
  }


</style>

