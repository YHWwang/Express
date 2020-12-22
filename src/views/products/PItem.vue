<template>
<ul class="goodsList" >
  <li v-for="(item,index) in productsList" :key="index">
    <div class="imgBox">
<!--        <img :data-src="item.image"  class="lazyload" :alt="item.storeName"  @click="jump(item)">-->
        <img  :src="item.image"  :alt="item.storeName"  @click="jump(item)">
    </div>
    <p class="price">{{item.storeName}}</p>
    <p class="price">US${{item.price}}</p>
    <div class="btn-box">
     <el-button type="info" class="btn-item" @click="jump(item)">{{ $t("views.products.PItem.btn") }}</el-button>
      <router-link :to="{path:'/shop/buy/'+item.unitName}"  v-if="item.isShow==1"  target="_blank"><el-button type="info" class="btn-item">{{ $t("views.products.PItem.router") }}</el-button></router-link>
    </div>
  </li>
  </ul>

</template>
<script>
  import { products } from "@/api/products"//获取id对应下的商品
    export default {
        name: "Item",
       // props:["id","GetSum","inx"],
       props:["id","inx"],
      data(){
          return {
          productsList:[],
            Pid:this.id
          }
      },
      methods:{
        jump(item){//跳转
       if(   item.productUrl == null || item.productUrl == ''){
         this.$router.push(`/products/item/${item.unitName}`)
       }else{
         window.open(item.productUrl)
        }
        },
        GetList(id){//获取当前页面数据
            products(this.id).then(res=>{//循环查询所有的产品
              this.productsList = res.data.data;
            }).catch(error=>{
              console.log(error);
            })
        },
      },
      watch:{
        id:{
          handler(newValue,oldValue){
            this.GetList(this.id)
          }
        }
      },
      created() {
      this.GetList(this.id)
      },
      destroyed(){

      }
    }
</script>

<style scoped>
  .goodsList {
    width: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .goodsList  li {
    position: relative;
    width: 22.5%;
    min-width: 224px;
    /*height:421px;*/
    border-radius: 5px;
    overflow: hidden;
    margin: 16px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    background-color: #fff;
    padding-bottom: 40px;
    transition: all .5s ease;
  }
  .goodsList li:hover{
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,.15) !important;
  }
  .goodsList li .imgBox {
    width: 100%;
    /*height: 225px;*/
    overflow: hidden;
    text-align: center;
    padding-top: 30px;
    cursor: pointer;
  }
  .goodsList li .imgBox img {
    height: 224px;
    width: auto;
    margin-bottom: 10px;
    /*width: 224px;*/
  }
  .list-title span{
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }


  .btn-box{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    display: inline-flex;
    justify-content: center;
  }
  .price{
    /*margin-top: 10px;*/
    /*margin: 10 auto 0 auto;*/
    width: 100%;
    line-height: 30px;
    text-align: center;
    font-size: 24px;
    color: rgba(0,0,0,.8);

  }
  .btn-item{
    background: white;
    color: rgba(0,0,0,.8);
    font-size: 18px;
    font-family: MyriadPro Regular;
    margin-left: 5px;
  }
  @media screen and (max-width: 1400px) and (min-width: 1100px){
    .goodsList  li{
      width: 24%;
      margin: 5px;
    }

    /deep/.el-button{
  padding: 12px 10px;
}
  }
  @media screen and (max-width: 1100px) and (min-width: 350px){

    .goodsList{
      justify-content: center;
    }
      .btn-box{
        margin-top: 5px;
      }
    .goodsList  li{
      width: 45%;
      min-width: 100px;
      margin: 5px;
      padding-bottom: 20px;

    }
    .goodsList li .imgBox{
      height: auto;
      padding-top: 10px;
    }
    .goodsList li .imgBox img{
      width: 95%;
      height: auto;
    }

    .price{
      font-size: 20px;
    }
    .btn-item{
      font-size: 12px;
    }
    /deep/ .el-button{
      padding: 5px;
    }
    /deep/.el-button+.el-button{
      margin: 0;
    }

  }
</style>
