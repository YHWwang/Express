<template>
  <div style="margin-top: 60px;">
    <router-link to="/"><span>{{$t('productList.tit')}}</span></router-link>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{$t('productList.msg')}}</span>
     <div class="goodsList" v-for="(item,index) in  productsList" >
      <p class="list-title"><span><i :class="'fa '+(check?' fa-chevron-down':'fa-chevron-right')" aria-hidden="true" @click="listUp(index)"></i></span>{{item.name}}</p>
      <ul >
<!--        <li v-for="(item,index) in tillistin.goodsList" :key="index">-->
<!--&lt;!&ndash;          <router-link :to="/buy/+item.til">&ndash;&gt;-->
<!--            <div class="imgBox">-->
<!--              <img :src="item.image" alt="">-->
<!--            </div>-->
<!--            <h3 class="til">{{item.storeName}}</h3>-->
<!--            <p class="price">${{item.otPrice}}</p>-->
<!--            <div class="btn-box">-->
<!--              <el-button type="info" class="btn-item">Find Out More</el-button>-->
<!--              <el-button type="info" class="btn-item" @click="addGoods(item)">Shop Now</el-button>-->
<!--            </div>-->
<!--&lt;!&ndash;          </router-link>&ndash;&gt;-->
<!--        </li>-->
      </ul>
    </div>
  </div>
</template>
<script>

  import Cookies from 'js-cookie'
  import { GetPcategories } from "@/api/home"//获取所有产品的id


    export default {
        name: "index",
      data(){
          return {
            check:true,
            productsList:[],
            // productsList:[
            //   {
            //     name:"Accessories",
            //     check:true,
            //     goodsList:[
            //       {
            //         "til":"bv9900pro",
            //         "id":30,
            //         "desc":"bv9900pro",
            //         "price":699.99,
            //         "img":"https://store.blackview.hk/uploads/products/bv9900pro/thumbnail/1.jpg"
            //       }]}
            // ],

            totalPrice:this.$store.state.totalPrice,
            isshow:true,
            tag:0,
            iconclass:"fa fa-chevron-down"
          }
      },
      methods:{

        handleC(){

          console.log(this.productsList);
        },
          //加入购物车
        addGoods(carlist){
          var list = this.$store.getters.carList;
          let bol = list.some(function (item) {
              if(item.id == carlist.id){//判断购物车里是否又该商品
                 item.count += 1
                return true
              }
            })
          if(!bol){
            carlist.count = 1;
            this.$store.dispatch("addGoods", this.$store.getters.carList.push(carlist))
          }
          this.$store.dispatch("addGoods",list)

        },
        listUp(index){
          this.productsList[index].check = !this.productsList[index].check
          if( this.productsList[index].check ){
            this.iconclass = "fa fa-chevron-down"
          }else{
            this.iconclass = "fa fa-chevron-right"
          }


        },
        GetList(){//获取产品列表


    if(this.$route.params.id == "all"){
    //
    // function GetID(){
    //  return  GetPcategories()
    //   }
    //
    //   async function getResult(){
    //     // console.log("我是getResult函数")
    //     let code = await GetID();
    //     // console.log(code.data.data.content);
    //     // if(code.data.code == 0){
    //     //   var params = {
    //     //     code:code.data.code
    //     //   }
    //
    //     let list = []
    //
    //     var val = code.data.data.content;
    //     var len = val.length;
    //     for(var i = 0; i<len;i++){
    //
    //       list[i] =  await GetProducts(val[i].id).data.data
    //
    //     }
    //
    //
    //     // this.productsList = list
    //     console.log( list);
    //     //   console.log(list.data.list);
    //     // }
    //   }
    //   getResult();
    // function GetProducts(id){
    //      return  GetPcategories(id)
    //   }
      // var _this = this
      // var productsList = [];
      GetPcategories().then(res=>{
        this.productsList = res.data.data.content

        // console.log(res.data.data.content);
        // res.data.data.content.forEach(function (val,index) {
          // console.log(val);

          // productsList[index]= {
          //   name:val.cateName,
          //   check:true,
          //   // goodsList:result.data.data.content
          // }
          // products(val.id).then(result=>{//循环查询所有的产品
          //   productsList[index]= {
          //     name:val.cateName,
          //     check:true,
          //     goodsList:result.data.data.content
          //   }
          // }).catch(error=>{
          //   console.log(error);
          // })

        // })
      }).catch(error=>{
        console.log(error);
      })

// this.productsList =  JSON.parse(JSON.stringify(productsList))

      // console.log(productsList);
      // this.productsList = productsList
      //
      // this.productsList =   JSON.parse(JSON.stringify(this.productsList))
      // console.log(this.productsList);

    }else{
      products(this.$route.params.id).then(res=>{//循环查询所有的产品
        // console.log(res);
      }).catch(error=>{
        console.log(error);
      })
      }

/*
// *  {
                name:"Accessories",
                check:true,
                goodsList:[
                  {
                    "til":"bv9900pro",
                    "id":30,
                    "desc":"bv9900pro",
                    "price":699.99,
                    "img":"https://store.blackview.hk/uploads/products/bv9900pro/thumbnail/1.jpg"
                  }]}
*
*
*
*
* */

        }
      },
      computed:{
         totalP(){//监听总价
           return this.$store.state.totalPrice

         }
      },
      watch:{
          "$route.params.id":"GetList",
        totalP(val){
          this.totalPrice = val
        }
      },
      created() {
          this.GetList();


      },
      mounted(){


      }
    }
</script>

<style scoped>

  .goodsList {
   min-width: 1200px;
    /*width: 1000px;*/
    box-sizing: border-box;
    /*margin-top: 60px;*/
  }
  .goodsList ul{
    width: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .goodsList ul li {
    position: relative;
    /*float: left;*/
    width: 400px;
    height:400px;
    border-radius: 5px;
    overflow: hidden;
    margin: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    background-color: #fff;

  }
  .goodsList ul li:hover{
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,.15) !important;


  }
  .goodsList ul li .imgBox {
    width: 100%;
    height: 215px;
    overflow: hidden;
  }
  .goodsList ul li .imgBox img {
    width: 100%;
  }
  .goodsList ul li .til {
    /*padding: 10px;*/
    text-align: center;
    /*margin: 10px;*/
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
  }


  .price{
    margin: 0 auto;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: red;

  }


</style>
