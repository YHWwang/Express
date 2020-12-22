<template>
  <div>
    <p class="title">
      {{catalog.name }} <span class="sum"> ({{catalog.sum}})</span>
    </p>
    <ul class="goodsList" >
      <li v-for="(item,index) in shopList" :key="index" >
        <div class="imgBox">
<!--          <img :data-src="item.image" class="lazyload" :alt="item.storeName">-->
          <img :src="item.image"  :alt="item.storeName">
        </div>
        <h3 class="til">{{item.storeName}}</h3>
        <p class="p1" v-for="(z,inx) in item.addtxt" :key="inx"  v-if="inx<3">{{z}}</p>

        <div class="btn-box">
          <div class="price">
            <span>${{item.price}}</span><del v-show="item.price == item.otPrice?false:true">${{item.otPrice}} </del>
          </div>
          <img src="../../assets/img/buynow.png" alt="">
        </div>
        <span v-show="item.price == item.otPrice ? false:true" class="off">{{GetOff(item)}}%&nbsp;OFF</span>
        <router-link  :to="'/shop/buy/'+item.unitName" class="shop-buy-now" target="_blank"></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import {shopList} from '@/api/shop'
  export default {
    name: "Item",
    props:["keywords"],
    data(){
      return{
        catalog:{
          name:"",
          sum:""
        },
        show:false,
        shopList:[],
      }
    },
    methods:{
      GetOff(item){
       let val =  item.price / item.otPrice //市场价
        val = parseInt((1-val) *  100)
        return val
      },

      GetShopList(){
        var word = this.keywords.keyword
        shopList(word).then(res=>{
          let arr = res.data.data
          this.catalog.name = word
          this.catalog.sum = arr.length
          arr.forEach(function (val,inx) {
              arr[inx].addtxt = val.storeInfo.split(",")
          })
          this.shopList = arr;

        }).catch(error=>{
          console.log(error);
        })
      }
    },
    watch:{
      "keywords":"GetShopList"
    },
    created() {

      this.GetShopList()
    }
  }
</script>

<style scoped>
  .title{
    color: rgb(128,128,128);
    font-size: 48px;
    margin: 20px;
  }
  .goodsList {
    width: 100%;
    display: flex;
    justify-content:start;
    flex-wrap: wrap;

  }

  .goodsList  li {
    position: relative;
    /*width: 400px;*/
    width: 23.5%;
    border-radius: 5px;
    overflow: hidden;
    margin: 10px;
    box-sizing: border-box;
    background-color: #fff;
    /*padding-bottom:30px;*/
    padding-top: 20px;
    color: rgb(128,128,128);
    text-align: center;
    cursor: pointer;
    transition: all .3s ease;
    padding-bottom:100px;
  }
  .goodsList li .shop-buy-now{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .goodsList li:hover{
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,.15) !important;
  }
  .goodsList li .imgBox {
    /*width: 100%;*/
    /*height: 400px;*/
    overflow: hidden;
  }
  .goodsList li .imgBox img {
    width: 100%;
    /*height: 400px;*/
    /*width: auto;*/
    /*width: 100%;*/
  }
  .price{
    padding-bottom: 5px;
  }
.sum{
  font-size: 24px;
}
  @media screen  and (min-width: 1580px) {
    .goodsList{
      min-width: 1200px;
    }
    .goodsList li .imgBox img {
      /*width: 100%;*/
      height: 330px;
      width: auto;
      /*width: 100%;*/
    }


  }

  @media screen and (max-width: 1580px) and (min-width: 1250px){
    .goodsList  li{
      width: 23%;
      /*min-width: 230px;*/
    }
  }



  @media screen and (max-width: 1250px) and (min-width: 800px){
    .goodsList  li{
      width: 22.5%;
      /*min-width: 230px;*/
    }
  }


  .til {
    font-size: 24px;
   margin-top: 5px;
  }
 .p1{
   line-height: 20px;
   padding: 5px;
 }
  .list-title span{
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .price span{
    font-size: 30px;
    color: red;
  }
  .price del{
    font-size: 18px;
    margin-left: 5px;
  }
  .btn-box{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    /*padding-top: 10px;*/
  }
  .off{
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    /*width: 80px;*/
    /*height: 38px;*/
    background: red;
    color: white;
    font-size: 16px;
    text-align: center;
    padding: 5px 5px;
  }
  @media screen and (max-width: 800px) and (min-width: 200px){
    .goodsList{
      justify-content: center;
    }
    .title{
      padding-top: 10px;
      font-size: 24px;
      margin: 0;
      padding-left: 5px;
    }
    .til{
      font-size: 16px;
    }
    .p1{
      font-size: 12px;
      line-height: 15px;
    }
    .price{
      font-size: 18px;
    }

    .goodsList  li{
      width: 45%;
      margin: 5px;
    }
    .goodsList li .imgBox{
      height: auto;
    }

    .off{
     font-size: 12px;
    }
    .goodsList li .imgBox img{
      width: 95%;
      height: auto;
    }
  }




</style>
