<template>
  <div class="thermal-main">
    <h2 class="theme">
      {{$t('views.indust.ThermalImaging.tit')}}
    </h2>
    <div class="overview-box">
      <img src="../../assets/img/solutions/thermal_imaging/1.jpg" alt="">
      <div class="overview-txt">
        <h3 class="title">
          {{$t('views.indust.ThermalImaging.tit_2')}}
        </h3>
        <p>
 	  {{$t('views.indust.ThermalImaging.msg')}}        
	</p>
        <p>
          {{$t('views.indust.ThermalImaging.msg_2')}} <a href="https://store.blackview.hk/en/buy/bv9900pro" target="_blank">BV9900 Pro</a>, <a href="https://store.blackview.hk/en/buy/thermal-imaging-camera-rugged-phone-bv9800pro" target="_blank">BV9800 Pro </a>  {{$t('views.indust.ThermalImaging.msg_3')}}<sup>®</sup>  {{$t('views.indust.ThermalImaging.msg_4')}}<sup>®</sup>  {{$t('views.indust.ThermalImaging.msg_5')}}
        </p>
      </div>
    </div>
    <div class="thermal-list">
      <div class="thermal-item">
        <div class="left">
          <h3 class="title">
             {{$t('views.indust.ThermalImaging.tit_3')}}   
          </h3>
          <div class="tex-content">
 		{{$t('views.indust.ThermalImaging.msg_6')}}   
           </div>
        </div>
        <div class="right">
          <img src="../../assets/img/solutions/thermal_imaging/2.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="thermal-list">
      <div class="thermal-item">
        <div class="right">
          <img src="../../assets/img/solutions/thermal_imaging/3.jpg" alt="">
        </div>
        <div class="left">
          <h3 class="title">
            HVAC
          </h3>
          <div class="tex-content">
            <p>
               {{$t('views.indust.ThermalImaging.msg_7')}}   
            </p>
       </div>
        </div>
      </div>
    </div>
    <div class="thermal-list thermal-list2">
      <div class="left">
        <h3 class="title">
           {{$t('views.indust.ThermalImaging.tit_5')}}   
        </h3>
        <div class="tex-content">
           {{$t('views.indust.ThermalImaging.msg_8')}}   
        </div>
        <img src="../../assets/img/solutions/thermal_imaging/4.jpg" alt="">
    </div>
  </div>
    <div class="thermal-list thermal-list2">
      <div class="left">
        <h3 class="title">
           {{$t('views.indust.ThermalImaging.tit_6')}}   
        </h3>
        <div class="tex-content">
           {{$t('views.indust.ThermalImaging.msg_9')}}   
       </div>
        <img src="../../assets/img/solutions/thermal_imaging/5.jpg" alt="">
      </div>
    </div>
    <div class="thermal-list">
      <div class="thermal-item">
        <div class="left">
          <h3 class="title">
             {{$t('views.indust.ThermalImaging.tit_9')}}   
          </h3>
          <div class="tex-content">
            <p>  {{$t('views.indust.ThermalImaging.msg_10')}}   </p>
            <p>  {{$t('views.indust.ThermalImaging.msg_11')}}   </p>
          </div>
        </div>
        <div class="right">
          <img src="../../assets/img/solutions/thermal_imaging/6.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="thermal-list">
      <div class="thermal-item">
        <div class="right">
          <img src="../../assets/img/solutions/thermal_imaging/7.jpg" alt="">
        </div>
        <div class="left">
          <h3 class="title">
              {{$t('views.indust.ThermalImaging.tit_10')}}   
          </h3>
          <div class="tex-content">
            <p>  {{$t('views.indust.ThermalImaging.msg_12')}}   </p>
            <p>  {{$t('views.indust.ThermalImaging.msg_13')}}   </p>
            </div>
        </div>

      </div>

    </div>
    <contact-us></contact-us>
  </div>
</template>

<script>
  import ContactUs from "./ContactUs"

    export default {
        name: "ThermalImaging",
      components:{
        ContactUs,
      },
      data(){
          return{

          }
      },
    }
</script>

<style scoped>
.thermal-main{
  max-width: 1366px;
  margin: 0 auto;
}
.theme {
  max-width: 1366px;
  font-size: 40px;
  margin: 50px auto;
}
.overview-box{
  position: relative;
}
  .overview-box img{
    width: 100%;
  }
  .overview-txt{
    /*position: absolute;*/
    position: absolute;
    top: 50%;
    bottom: auto;
    left: 50%;
    right: auto;
    z-index: 1;
    transform: translate(-50%,-50%);
    margin: 0 auto;
    background: rgba(255,255,255,.8);
    padding: 30px 20px;
    border: 4px solid #fff;
    width: 85%;
  }

.title{
  font-size: 30px;
  margin-bottom: 1em;
  font-weight: bold;

}
  .thermal-main p{
    font-size: 20px;
    margin-bottom: 0.5rem;
  }
  .thermal-main a{
    color: #007bff;
  }
.thermal-main a:hover{
  text-decoration: underline;
}
  .thermal-list{
    max-width: 1200px;
    margin: 0 auto;

  }
  .thermal-list2{
    padding-top: 20px;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .thermal-list2 img{
    width: 100%;
  }
  .thermal-item{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 50px;


  }/*align-items: center;*/
  .thermal-item>div{
    flex: 1;
    padding-left: 30px;
    min-width: 300px;
  }
.tex-content{
  font-size: 20px;
  line-height: 1.5;
}
.right img{
  width: 100%;
  height: auto;
}

@media screen and (max-width:800px) and (min-width:200px){
  .theme{
    font-size: 24px;
    margin: 5px;
  }
  .title{
    font-size: 24px;
    margin-bottom: 5px;
  }
  .thermal-item>div{
    padding: 0 5px;
  }
  .thermal-list2{
    padding: 5px;
  }
  .overview-txt{
    position: relative;
    top: 0;
    transform: none;
    left: 0;
    padding: 0px;
    margin: 0;
    width: 100%;
  }
  .thermal-main p{
    padding: 5px;
  }
  .thermal-item{
    margin: 5px;
  }
}

</style>
