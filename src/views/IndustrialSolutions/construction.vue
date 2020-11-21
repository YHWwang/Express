<template>
    <div class="construction-box">
      <div class="construction-item">
        <h3>{{$t('views.indust.construction.h1')}}</h3>
        <p class="p1">{{$t('views.indust.construction.p1')}}</p>
        <img class="img" src="../../assets/img/solutions/construction/1.jpg" alt="">
      </div>
      <div class="construction-item">
        <h3>{{$t('views.indust.construction.h2')}}</h3>
        <p class="p1">{{$t('views.indust.construction.p2')}}</p>
        <img class="img" src="../../assets/img/solutions/construction/2.jpg" alt="">
      </div>
      <div class="construction-item">
        <h3>{{$t('views.indust.construction.h3')}} <router-link to="/products/all" class="more">{{$t('views.indust.construction.more')}} >></router-link></h3>
        <div>
          <ul>
            <li>
              <img src="../../assets/img/product/bv9500pro_black.jpg" alt="">
              <h4 class="product-name">BV9500 Pro</h4>
              <p>{{$t('views.indust.construction.msg1')}}</p>
              <p>Helio P23</p>
              <p>6GB + 128GB</p>
              <router-link to="/shop/buy/bv9500pro" class="construction-link" ></router-link>
            </li>
          </ul>

        </div>
      </div>
      <contact-us></contact-us>
    </div>
</template>

<script>
  import ContactUs from "./ContactUs"
    export default {
        name: "construction",
        components:{
           ContactUs,
        },
    }
</script>

<style scoped>
  .construction-box{
    max-width: 1200px;
    margin: 0 auto;
  }
  .construction-item .img{
    width: 100%;
    height: auto;
  }
  .construction-item h3{
    font-size: 30px;
    margin: 20px 0;
    position: relative;
  }
  .construction-item h3 .more{
    position: absolute;
    top: 0;
    right: 0;
    color: #9a9a9a;
    font-size: 16px;
  }
  .construction-item  .p1 {
    font-size:24px;
    margin-bottom: 2em;
    line-height: 1.5em;
  }
  .construction-box{
    padding-top: 30px;
  }
  .construction-item li{
    max-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

  }
  .construction-link{
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .construction-item ul h4{
    font-size: 20px;
    color: #000;
  }
  .construction-item ul p{
    font-size: 14px;
    line-height: 1.4em;
    color: #9a9a9a;
    margin: 0;
  }

  @media screen and (max-width:800px) and (min-width:200px){
    .construction-box{
      width: 100%;
      padding: 10px;
    }
    .construction-item h3{
      font-size: 24px;
      margin:5px 0;
    }

     .construction-item .p1 {
    font-size: 14px;
  }
    .construction-box{
      padding-top: 5px;
    }
  }

</style>
