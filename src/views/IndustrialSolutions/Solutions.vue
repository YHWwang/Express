<template>
  <div>
    <div class="therm-top">
      <img class="top-img" src="../../assets/img/solutions/sect1_1.jpg" alt="">
      <div class="therm-txt">
        <div class="box">
          <h2><span>{{$t('views.indust.Solutions.tit')}}</span></h2>
          <p>
            {{$t('views.indust.Solutions.p')}}
          </p>
        </div>
      </div>
    </div>
    <ul class="therm-item">
      <li><img src="../../assets/img/solutions/sect2_icon1.png" alt=""><p>{{$t('views.indust.Solutions.li1')}}</p></li>
      <li><img src="../../assets/img/solutions/sect2_icon2.png" alt=""><p>{{$t('views.indust.Solutions.li2')}}</p></li>
      <li><img src="../../assets/img/solutions/sect2_icon3.png" alt=""><p>{{$t('views.indust.Solutions.li3')}}</p></li>
      <li><img src="../../assets/img/solutions/sect2_icon4.png" alt=""><p>{{$t('views.indust.Solutions.li4')}}</p></li>
      <li><img src="../../assets/img/solutions/sect2_icon5.png" alt=""><p>{{$t('views.indust.Solutions.li5')}}</p></li>
      <li><img src="../../assets/img/solutions/sect2_icon6.png" alt=""><p>{{$t('views.indust.Solutions.li6')}}</p></li>
    </ul>
    <div class="solutions-box">
      <h2>{{$t('views.indust.Solutions.tit_2')}}</h2>
      <ul class="solutions-list">
        <li><router-link to="/solutions/thermal-imaging"><img src="../../assets/img/solutions/thermal_imaging/2.jpg" alt=""><p>{{$t('views.indust.Solutions.p1')}}</p></router-link></li>
        <li><router-link to="/solutions/Construction"><img src="../../assets/img/solutions/construction/thumbnail.jpg" alt=""><p>{{$t('views.indust.Solutions.p2')}}</p></router-link></li>
        <li><router-link to="/solutions/transportation"><img src="../../assets/img/solutions/transportation/thumbnail.jpg" alt=""><p>{{$t('views.indust.Solutions.p3')}}</p></router-link></li>
        <li><router-link to="/solutions/manufacturing"><img src="../../assets/img/solutions/manufacturing/thumbnail.jpg" alt=""><p>{{$t('views.indust.Solutions.p4')}}</p></router-link></li>
      </ul>
    </div>
    <div class="solutions-video">
      <h2 class="title">{{$t('views.indust.Solutions.msg')}}</h2>
      <iframe :width="iframeWidth" :height="iframeHeight" src="https://www.youtube.com/embed/5p34ttcWCTY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <contact-us></contact-us>
  </div>
</template>

<script>
  import ContactUs from "./ContactUs"

  export default {
    name: "Solutions",
    components:{
      ContactUs,
      // Reviews
    },
    data(){
      return{
        iframeWidth:"",
        iframeHeight:""
      }
    },
    beforeMount:function(){
      if(document.body.clientWidth*946/1920>800){
        this.iframeWidth= 800
        this.iframeHeight = 450
      }else{
        this.iframeWidth = document.body.clientWidth -20
        this.iframeHeight="auto"
      }
    },
  }
</script>

<style scoped>
  .therm-top{
    position: relative;
  }
  .top-img{
    width: 100%;
  }
  .therm-top .therm-txt{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0 ;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

  }



  .therm-txt .box{
    width: 60%;
    color:#fff;
    text-align: center;
  }

  .therm-txt .box h2 {
    margin-bottom: .4em;
    font-size: 60px;
  }
  .therm-txt .box h2 span {
    display: inline-block;
    padding: .2em 0;
    border-bottom: .15em #fff solid;
  }
  .therm-txt .box p{
    font-size: 30px;
    line-height:1.3em;
  }

  .therm-item{
    background: #133285;
    color: #fff;
    display: flex;
    justify-content: center;
    padding: 50px 0;
  }
  .therm-item li{
    width: 320px;
    border-left: 2px solid #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  .therm-item li P{
    font-size: 24px;
    margin-top: 30px;
  }

  .therm-item li:nth-child(1){
    border-left:none;
  }
  .solutions-list{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .solutions-box{
    width: 100%;
    margin: 60px auto 30px;
  }
.solutions-box h2{
  font-size: 62px;
  margin-left: 200px;
}
.solutions-box li{
  width: 350px;
  margin: 20px;
}
.solutions-box li img{
  width: 100%;
  height: auto;
  border-radius: 20px;
}
  .solutions-list p{
    text-align: center;
    font-size: 25px;
    margin-top: 10px;
  }
  .solutions-video h2{
    font-size: 2rem;
    text-align: center;
  }
  .solutions-video {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
.title{
  padding: 20px;
}

  @media screen and (max-width:800px) and (min-width:200px){
    .therm-top .therm-txt{
      flex-wrap: wrap;
    }
    .therm-item{
      flex-wrap: wrap;
    }
    .therm-item li{
      flex-wrap: wrap;
      border-left: none;
    }

    .solutions-list{
      flex-wrap: wrap;
    }
    .solutions-box h2{
      margin-left: 5px;
      font-size: 24px;
    }
    .therm-txt .box h2{
      font-size: 24px;
    }
    .therm-txt .box p{
      font-size: 14px;
    }
    .therm-txt .box{
      width: 90%;
    }
    .therm-item li P{
      margin: 30px 0;
    }

    .solutions-video h2{
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
</style>
