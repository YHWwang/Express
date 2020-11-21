<template>
  <div class="construction-box">
    <div class="construction-item">
      <h3>{{$t('views.indust.manufacturing.h1')}}</h3>
      <p class="p1">
        {{$t('views.indust.manufacturing.msg1')}}
      </p>
      <img class="img" src="../../assets/img/solutions/manufacturing/1.jpg" alt="">
    </div>
    <div class="construction-item">
      <h3>{{$t('views.indust.manufacturing.h2')}}</h3>
      <p class="p1">
        {{$t('views.indust.manufacturing.msg2')}}
        </p>
      <img class="img" src="../../assets/img/solutions/manufacturing/2.jpg" alt="">
    </div>
    <div class="construction-item">
      <h3>{{$t('views.indust.manufacturing.h3')}}</h3>
      <p class="p1">
        {{$t('views.indust.manufacturing.msg3')}}
      </p>
      <img class="img" src="../../assets/img/solutions/manufacturing/3.jpg" alt="">
    </div>
    <div class="construction-item">
      <h3>{{$t('views.indust.manufacturing.h4')}}</h3>
      <p class="p1">
        {{$t('views.indust.manufacturing.msg4')}}
      </p>
      <img class="img" src="../../assets/img/solutions/manufacturing/4.jpg" alt="">
    </div>
    <div class="construction-item">
      <h3>{{$t('views.indust.manufacturing.h5')}}<router-link to="/products/all" class="more">{{$t('views.indust.manufacturing.more')}} >></router-link></h3>
      <div>
        <ul class="products-box">
          <li  v-for="item in productsList">
            <img  style="width: 100%" :src="item.image" alt="">
            <h4 class="product-name">
              {{item.storeName}}
            </h4>
            <p v-for="(z,index) in item.addtxt" v-if="index<3">
              {{z}}
            </p>
            <router-link :to="'/shop/buy/'+item.unitName" class="construction-link"></router-link>
          </li>
<!--          <li>-->
<!--            <img src="../../assets/img/product/bv6100.jpg" alt="">-->
<!--            <h4 class="product-name">-->
<!--              BV6100-->
<!--            </h4>-->
<!--            <p>-->
<!--              IP68 &amp; IP69-->
<!--            </p>-->
<!--            <p>-->
<!--              MIL-STD-810G-->
<!--            </p>-->
<!--            <p>-->
<!--              6.88 Inch-->
<!--            </p>-->
<!--            <p>-->
<!--              5580 mAh-->
<!--            </p>-->
<!--            <router-link to="" class="construction-link"></router-link>-->
<!--          </li>-->
<!--          <li>-->
<!--            <img src="../../assets/img/product/bv9600pro_300x300.jpg" alt="">-->
<!--            <h4 class="product-name">-->
<!--              BV9600 Pro-->
<!--            </h4>-->
<!--            <p>-->
<!--              Amoled Display-->
<!--            </p>-->
<!--            <p>-->
<!--              6GB RAM 128GB ROM-->
<!--            </p>-->
<!--            <p>-->
<!--              Samsung® Dual Rear Camera-->
<!--            </p>-->
<!--            <p>-->
<!--              5580mAh Battery-->
<!--            </p>-->
<!--            <router-link to="" class="construction-link"></router-link>-->
<!--          </li>-->
<!--          <li>-->
<!--            <img src="../../assets/img/product/bv9100_300x300.jpg" alt="">-->
<!--            <h4 class="product-name">-->
<!--              BV9100-->
<!--            </h4>-->
<!--            <p>-->
<!--              13000mAh Battery-->
<!--            </p>-->
<!--            <p>-->
<!--              30W Fast Charging-->
<!--            </p>-->
<!--            <p>-->
<!--              4GB RAM 64GB ROM-->
<!--            </p>-->
<!--            <p>-->
<!--              Sony® 16MP Dual Rear Camera-->
<!--            </p>-->
<!--            <router-link to="" class="construction-link"></router-link>-->
<!--          </li>-->

        </ul>

      </div>
    </div>
    <contact-us></contact-us>
  </div>
</template>

<script>
  import ContactUs from "./ContactUs"
  import {  GetProductHot } from "@/api/home"
  export default {
    name: "manufacturing",
    components:{
      ContactUs,
    },
    data(){
      return {
        imgHeight:"",
        iframeHeight:"",
        iframeWidth:"",
        productsList:""//推荐产品
      }
    },
    beforeMount:function(){
      if(document.body.clientWidth*946/1920>800){
        this.iframeWidth= 1200
        this.iframeHeight = 650
      }else{
        this.iframeWidth = document.body.clientWidth -20
        this.iframeHeight=this.iframeWidth * 0.425
      }
    },
    created() {

      GetProductHot().then(res=>{

        this.productsList = res.data.data
        let arr = res.data.data
        arr.forEach(function (val,inx) {
          arr[inx].addtxt = val.storeInfo.split(",")
        })
        this.productsList = arr;
      })
    }
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
  .img-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .img-box img{
    margin-bottom: 30px;
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
  .construction-item ul{
    display: flex;
    flex-wrap: wrap;
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
  .construction-item li{
    max-width: 280px;
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
    .img-box img{
      width: 100%;
    }

  }

</style>
