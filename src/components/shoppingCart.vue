<template>
  <div class="goodscar-box">
    <div class="goodscar-main">

      <div class="icon-list sect1">
        <ul class="tips">
          <li>
            <div><img src="../assets/img/shop/detail1.png" alt=""></div>
            <div class="p-txt">
              <p>{{$t('shoppingCart.tit1')}}}</p>
              <p>{{$t('shoppingCart.tit2')}}}</p>
            </div>
          </li>
          <li>
            <div><img src="../assets/img/shop/detail2.png" alt=""></div>
            <div class="p-txt">
              <p>{{$t('shoppingCart.tit3')}}}</p>
              <p>{{$t('shoppingCart.tit4')}}}</p>
            </div>
          </li>
          <li>
            <div><img src="../assets/img/shop/detail3.png" alt=""></div>
            <div class="p-txt">
              <p>{{$t('shoppingCart.tit5')}}}</p>
              <p>{{$t('shoppingCart.tit6')}}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="sect2 sect">
        <p class="title1">{{$t('shoppingCart.title1')}}}</p>
        <ul>
          <li  v-for="(item,index) in goodsList" :key="index">
            <div class="goods-l">

              <router-link :to="{path:'/shop/buy/'+item.productId}">
                <img :src="item.image" alt="">
              </router-link>

            </div>
            <div class="goods-r">
               <div class="goods-r-item1">
                 <p>{{item.productName}}</p>
                 <p>{{$t('shoppingCart.suk')}}: {{item.suk}}</p>
               </div>
               <div class="goods-r-item2" >
                   <span v-for="k in item.productAttr">{{k}}</span>
               </div>
               <div class="goods-r-item3">
                 US${{item.price}}
               </div>
               <div class="goods-r-item4">
                 <span @click="goodsReduce(index,item)"> - </span>
                 <span>{{item.cartNum}}</span>
                 <span @click="goodsAdd(index,item)"> + </span>
               </div>
               <div class="goods-r-item5">
                 US${{item.totolMoney}}
               </div>
               <div class="goods-r-item6" @click="goodsDel(index,item.id)">
                 X
               </div>
            </div>
          </li>
        </ul>
        <div class="settlement">
          <div class="settlement-l">
            <span>{{$t('shoppingCart.msg1')}}   </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span @click="discount">   {{$t('shoppingCart.msg2')}}  <i> > </i></span>
            <div v-show="show1" class="discount">
              <div>
                <input v-model="code" type="text" :placeholder="$t('shoppingCart.placeholder')" ><el-button class="apply" @click="ApplyDiscount">{{$t('shoppingCart.msg3')}} </el-button>
                <br><span v-show="errorShow" class="error-text">{{$t('shoppingCart.msg4')}} </span>
              </div>
            </div>
          </div>
          <div class="settlement-r">
                         <p :class="discountShow?'show-class':'none-class'">{{$t('shoppingCart.p1')}} : US$ {{finalMoney}}</p>
                         <p :class="discountShow?'show-class':'none-class'">{{$t('shoppingCart.p2')}}: US$ {{discountVal}}</p>
                         <p :class="discountShow?'show-class':'none-class'">{{$t('shoppingCart.p3')}}: US$   {{carTotalPrice1}}</p>
                        <p :class="discountShow?'none-class':'show-class'">{{$t('shoppingCart.p4')}}: US$   {{carTotalPrice}}</p>
            <router-link :to="{path:'settlement/'+ settlementCode}"><el-button class="check-out" >{{$t('shoppingCart.p5')}}</el-button></router-link>
           </div>
        </div>
      </div>
      <div class="sect3 sect">
        <p class="title2">
         {{$t('shoppingCart.title2')}}
        </p>
        <ul class="also-like">
          <li v-for="item in recommendList">
            <div class="img-box">
              <img :src="item.image" :alt="item.storeName">
            </div>
            <p>{{item.storeName}}</p>
            <p>US$ {{item.price}}</p>
            <el-button class="also-add">
              <router-link :to="{path:'/shop/buy/'+item.id}">   {{$t('shoppingCart.add')}}</router-link>
            </el-button>
          </li>
<!--          <li>-->
<!--            <div class="img-box">-->
<!--              <img src="https://www.blackview.hk/uploads/2019/12/052024271295.jpg" alt="">-->
<!--            </div>-->
<!--            <p>BV-SW02 SmartWatch</p>-->
<!--            <p>US$ 23.5</p>-->
<!--            <el-button class="also-add">Add to cart</el-button>-->
<!--          </li>-->

        </ul>
      </div>
    </div>
  </div>
</template>

<script>


  import { GetCardData,changeCardCount,DelCard,GetDiscount,recommanded} from '@/api/shop'
  export default {
    name: "GoodsCar",
    data(){
      return {
        code:"",//优惠码
        settlementCode:"buy",
        errorShow:false,
        show1:false,
        count:this.$store.state.count,
        goodsList:this.$store.getters.carList,
        goodsListLogin:"",
        finalMoney:"",//总价
        carTotalPrice:"",//折扣后的总价
        carTotalPrice1:this.$store.state.totalPrice,
        isLogin:false,
        discountVal:"",//折扣值
        discountShow:false,
        productIdArr:[],//所有产品id  用来请求推荐的商品
        recommendAjax:false,//true时避免更新购物车重复请求
        recommendList:[]
      }
    },
    methods:{
      goodsAdd(index,item){
        if(this.isLogin){
        item.cartNum +=1
          changeCardCount(item).then(res=>{
            this.CardData()
          }).catch(error=>{
            console.log(error);
          })
        }else{
          this.goodsList[index].cartNum+=1;
          this.$store.dispatch("addGoods",this.goodsList)
        }
      },
      goodsReduce(index,item){
        if(this.goodsList[index].cartNum == 1){
          alert("Больше не могу это уменьшить")
        }else{
          if(this.isLogin){
            item.cartNum -=1
            changeCardCount(item).then(res=>{
              this.CardData()
            }).catch(error=>{
              console.log(error);
            })
          }else{
            this.goodsList[index].cartNum-=1;
            this.$store.dispatch("addGoods",this.goodsList)
          }

        }
      },
      goodsDel(index,id){
        if(this.isLogin){
          DelCard(id).then(res=>{
            this.CardData()

          }).catch(error=>{
            console.log(error);
          })
        }else{
          this.goodsList.splice(index,1);
          this.$store.dispatch("addGoods",this.goodsList)
        }
      },
      //获取购物车数据
      CardData(){
        var sum= 0 ;//购物车总数量
        GetCardData().then(res=>{
          this.discountShow = false;//这里存在bug 20200511 已经解决
          this.code = "";
          this.discountShow = false
          var productIdArr = []

          this.goodsList = res.data.data.items//登录服务器数据
          res.data.data.items.forEach(function (val) {
            productIdArr.push(val.productId)
              sum+=val.cartNum
          })
         this.productIdArr = productIdArr
          this.$store.dispatch("LoginCartCount1",sum)
          this.carTotalPrice1  = res.data.data.sumTotalMoney
          this.carTotalPrice  = res.data.data.sumTotalMoney
          this.discountVal  = res.data.data.discount//折扣
          this.isLogin = true // 登录了

          if(!this.recommendAjax){
            recommanded(this.productIdArr).then(res=>{//推荐
              this.recommendAjax = true

              this.recommendList = res.data.data

            }).catch(error=>{
              console.log(error);
            })
          }


        }).catch(error=>{
          this.goodsList = this.$store.getters.carList//未登录走缓存
          this.carTotalPrice = this.$store.state.totalPrice//总价
          this.isLogin = false //未登录
        })
      },
      discount(){
        this.show1 = true
      },
      ApplyDiscount(){//折扣码
        GetDiscount(this.code).then(res=>{
          if(res.data.status == '200'){

            this.settlementCode  = this.code
            this.discountVal = res.data.data.discount//折扣额
            this.finalMoney = res.data.data.finalMoney//总额
            this.carTotalPrice = res.data.data.sumTotalMoney//扣除优惠后的结算额
            this.errorShow = false
            this.discountShow = true

          }else{
            this.errorShow = true
            this.discountShow = false
          }
        }).catch(error=>{
          console.log(error);
        })
    },
    },
    watch:{
      totalP(val){
        this.carTotalPrice = val
      },
      // discountShow:function () {
      //   console.log(123);
      // }
    },
    computed:{
      totalP(){
        return this.$store.state.totalPrice
      }
    },
    created() {
    //获取购物车数据
      this.CardData()
    },
    beforeMount() {


    }
  }
</script>

<style scoped>


  .show-class{
    display: block;
  }
  .none-class{
    display: none;
  }
  .goodscar-box{
    width: 100%;
    background: #f1f1f1;
    padding-top: 90px;
  }

  .goodscar-main{
    max-width: 1027px;
    margin: 0 auto;
    padding-bottom: 56px;
  }

  .tips{
    display: flex;
    justify-content: space-around;
    height: 72px;
    background: white;
  }

  .icon-list .tips li{
    display: flex;
    margin-right: 20px;
  }
  .icon-list .tips .p-txt{
    margin-left: 10px;
    height: 70px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    line-height: 24px;
  }
  .icon-list .tips p{
    font-size:14px;
    color: rgba(0,0,0,.8);
    text-align: left;
    white-space: nowrap;
  }

  /*sect2*/
  .sect2{
    background: white;
     margin-top: 62px;
    padding-right: 50px;
    padding-bottom: 20px;
  }
  .sect2 .title1{
    height: 74px;
    line-height: 74px;
    border-bottom: 1px solid #ccc;
    font-size: 24px;
    margin-left: 20px;
  }
  .sect2 ul{
    margin-top: 50px;
  }
  .sect2 ul li{
    display: flex;
    height: 90px;
  }
  .goods-l{
    width: 66px;
    height: 85px;
    margin-left: 50px;
  }
  .goods-l img{
    width: 100%;
    height: 100%;
  }
  .goods-r{
    flex: 1;
    height: 100%;
    border-bottom: 1px  dashed #ccc;
    display: flex;
    justify-content: space-around;
  }


.goods-r div{
  height: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.goods-r-item1{
    height: 70px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    line-height: 30px;
  padding-left: 20px;
  }
.goods-r-item1 p{
  width: 100%;
  text-align: left;
}
.goods-r-item2{
  display: flex;
  width: 250px;
  align-items: center;
}
.goods-r-item2 div{
  height: 20px;
  border: 1px solid #000;
}
.goods-r-item2 span{
  display: inline-block;
  padding:2px;
  border: 1px solid #dfdfdf;
  margin-left: 10px;
  color: rgba(0,0,0,.8);
}
.goods-r-item3{
  width: 100px;
}
.goods-r-item4{
  width: 180px;
}
.goods-r-item4 span{
  display: inline-block;
  width: 40px;
  height: 38px;
  border: 1px solid #dfdfdf;
  margin-right: 15px;
  text-align: center;
  line-height: 38px;
}
  .goods-r-item4 span:nth-child(1),.goods-r-item4 span:nth-child(3){
    cursor: pointer;
  }
  .goods-r-item4 span:nth-child(2){
    height: 30px;
    line-height: 30px;
  }
  .goods-r-item5{
    width: 100px;
  }
  .goods-r .goods-r-item6 {
    cursor: pointer;
    width: 30px;
    font-size: 30px;
  }

.settlement{
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.settlement .settlement-l{
  margin-left: 50px;
}
/*优惠码*/
  .settlement-l .discount{
    margin-top: 10px;
    width: 405px;
    height: 144px;
  }
.discount p {
  height: 30px;
  font-size: 16px;
  border-bottom: 1px dashed #000;
}
  .discount input{
    width: 219px;
    height: 30px;
  }
.discount .apply{
  margin-left: 10px;
  /*height: 30px;*/
  background: #133084;
  color: #fff;
  font-size: 16px;
  /*line-height: 30px;*/
}


  .settlement-l span{
    font-size: 16px;
  }
  .settlement i{
    font-style: normal;
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;

    border: 1px solid #000;
    border-radius:20px;
  }
  .settlement-r p{
    text-align: right;
    height: 30px;
    line-height: 30px;
    padding-right:90px;
  }
  .check-out{
    margin-top: 20px;
    width: 194px;
    height: 56px;
    background: #f1f1f1;
    color: #000;
  }

/*sect3*/
  .sect3{
    margin-top: 52px;
    background: white;
  }


  .sect3 .title2{
    height: 74px;
    line-height: 74px;
    /*border-bottom: 1px solid #ccc;*/
    font-size: 24px;
    margin-left: 20px;
  }
  .also-like {
    display: flex;
    justify-content: space-between;
    margin-left: 80px;
    padding-bottom: 30px;
  }
  .also-like li{
    width: 149px;
    margin-right: 100px;


  }
  .also-like .img-box{
    width: 149px;
    height: 149px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dfdfdf;
  }
  .also-like .img-box img{
    height: 100%;
    width: auto;

  }
  .also-like li p{
    width: 100%;
    text-align: center;
    font-size: 16px;
    padding-top: 15px;
  }
  .also-add{
    width: 139px;
    height: 40px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 15px;
    font-size: 16px;
    color: #000;
  }
.error-text{
  color: red;
}

</style>
