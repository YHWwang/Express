<template>
  <div class="goodscar-box">
    <div class="goodscar-main">

      <div class="icon-list sect1">
        <ul class="tips">
          <li>
            <div><img src="../../assets/img/shop/detail1.png" alt=""></div>
            <div class="p-txt">
              <p>{{$t('views.shop.shoppingCart.p1')}}</p>
              <p>{{$t('views.shop.shoppingCart.p2')}}</p>
            </div>
          </li>
          <li>
            <div><img src="../../assets/img/shop/detail2.png" alt=""></div>
            <div class="p-txt">
              <p>{{$t('views.shop.shoppingCart.p3')}}</p>
              <p>{{$t('views.shop.shoppingCart.p4')}}</p>
            </div>
          </li>
          <li>
            <div><img src="../../assets/img/shop/detail3.png" alt=""></div>
            <div class="p-txt">
              <p>{{$t('views.shop.shoppingCart.p5')}}</p>
              <p>{{$t('views.shop.shoppingCart.p6')}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="sect2 sect">
        <p class="title1">{{$t('views.shop.shoppingCart.tit1')}}</p>
        <ul>
          <li  v-for="(item,index) in goodsList" :key="index">
            <div class="goods-l">
              <router-link :to="{path:'/shop/buy/'+item.unitName}">
                <img :src="JSON.parse(item.image)[0]" alt="">
              </router-link>
            </div>
            <div class="goods-r">
              <div class="goods-r-item1">
                <p v-show="item.productName">{{item.productName}}</p>
                <p v-show="item.storeName">{{item.storeName}}</p>
                <p>SUK:{{item.suk}} </p>
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
              <div class="goods-r-item5" >
<!--                US${{item | FilterTotal}}-->
                {{item.totolMoney}}
              </div>
              <div class="goods-r-item6" @click="goodsDel(index,item.id)">
                X
              </div>
            </div>
          </li>
        </ul>
        <div class="settlement" >
          <div class="no-data" :style="show3">
             <p>{{$t('views.shop.shoppingCart.tit2')}}</p>
            <router-link to="/shop/all" class="shopping-now" >{{$t('views.shop.shoppingCart.router')}}</router-link>
          </div>
          <div class="settlement-l" :style="show2">
            <span>{{$t('views.shop.shoppingCart.tit3')}}  </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span @click="discount">   {{$t('views.shop.shoppingCart.Check')}} <i> > </i></span>
            <div v-show="show1" class="discount">
              <div>
                <input v-model="code" type="text" :placeholder="$t('views.shop.shoppingCart.placeholder')" ><el-button class="apply" @click="ApplyDiscount">{{$t('views.shop.shoppingCart.Apply')}}</el-button>
                <br><span v-show="errorShow" class="error-text">{{$t('views.shop.shoppingCart.errorShow')}} </span>
              </div>
            </div>
          </div>
          <div class="settlement-r">
            <p :class="discountShow?'show-class':'none-class'">{{$t('views.shop.shoppingCart.p7')}}: US$ {{carTotalPrice}}</p>
            <p :class="discountShow?'show-class':'none-class'">{{$t('views.shop.shoppingCart.p8')}}: US$ {{discountVal}}</p>
            <p :class="discountShow?'show-class':'none-class'">{{$t('views.shop.shoppingCart.p9')}}: US$   {{finalMoney}}</p>
            <p :class="discountShow?'none-class':'show-class'" :style="show2">{{$t('views.shop.shoppingCart.p9')}}: US$   {{finalMoney}}</p>
            <router-link :style="show2" :to="{path:'settlement/buy/'+ settlementCode}" v-if="show2"><el-button class="check-out" >{{$t('views.shop.shoppingCart.router2')}}</el-button></router-link>
          </div>
        </div>
      </div>
      <div class="sect3 sect">
        <p class="title2">
          {{$t('views.shop.shoppingCart.tit4')}}
        </p>
        <ul class="also-like">
         <li v-for="item in recommendList">
            <div class="img-box">
              <img :src="item.image" :alt="item.storeName">
            </div>
            <p>{{item.storeName}}</p>
            <p>US$ {{item.price}}</p>
            <el-button class="also-add">
              <router-link :to="{path:'/shop/buy/'+item.unitName}">{{$t('views.shop.shoppingCart.add')}}</router-link>
            </el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {UserInfo} from '@/api/user' //个人信息
  import { GetCardData,changeCardCount,DelCard,GetDiscount,recommanded,UnLoginGetDiscount} from '@/api/shop'
  export default {
    name: "GoodsCar",
    data(){
      return {
        show3:"display:none",
        show2:"display:block",
        code:"",//优惠码
        settlementCode:"buy",
        errorShow:false,
        show1:false,
        count:'',
        // count:this.$store.state.count,
        goodsList:'',
        // goodsList:this.$store.getters.carList,
        goodsListLogin:"",
        finalMoney:"",//总价
        carTotalPrice:"",//折扣后的总价
        carTotalPrice1:'',
        // carTotalPrice1:this.$store.state.totalPrice,
        isLogin:false,
        discountVal:"",//折扣值
        discountShow:false,
        // productIdArr:[],//所有产品id  用来请求推荐的商品
        recommendAjax:false,//true时避免更新购物车重复请求
        recommendList:[],
        IsLogin:false//登录
      }
    },
    filters:{
      FilterTotal(val){
        if(val.totolMoney== undefined){
          return   Math.ceil((val.price * val.cartNum) *100)/100
        }else{
          return val.totolMoney
        }
      }
      },
    methods:{
      goodsAdd(index,item){
        if(item.cartNum ==item.stock){
          alert("Can't be increased any more")
          return
        }
        if(this.isLogin){
          item.cartNum +=1
          changeCardCount(item).then(res=>{
            this.CardData()
          }).catch(error=>{
            console.log(error);
          })
        }else{

          if(  this.goodsList[index].cartNum ==   this.goodsList[index].stock){
            alert("Can't be increased any more")
            return
          }
          this.goodsList[index].cartNum+=1;
          this.$store.dispatch("addGoods",this.goodsList)
          // this.finalMoney = this.$store.state.totalPrice
          // this.discountShow = false
          // this.settlementCode = 'buy'
        }
      },
      goodsReduce(index,item){

        if(this.goodsList[index].cartNum == 1){
          alert("Can't be increased any more")
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

            //
            // // this.finalMoney = this.$store.state.totalPrice
            //
            // // this.errorShow = true
            // this.discountShow = false
            // this.settlementCode = 'buy'
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
          // this.finalMoney = this.$store.state.totalPrice
          // this.discountShow = false
          // this.settlementCode = 'buy'
          //
          // this.show2 =  this.finalMoney == 0 ?  "display:none" : "display:block"
          // this.show3 =  this.finalMoney == 0 ?  "display:flex" : "display:none"
        }
      },
      //获取购物车数据
      CardData(){
        var sum= 0 ;//购物车总数量
        var productIdArr = []

        if(this.IsLogin){
          GetCardData().then(res=>{
            this.discountShow = false;
            this.code = "";
            this.discountShow = false

            this.finalMoney = res.data.data.finalMoney
            this.goodsList = res.data.data.items//登录服务器数据
            this.show2 =   res.data.data.items.length == 0 ? "display:none" : "display:block"
            this.show3 =   res.data.data.items.length == 0 ?  "display:flex" : "display:none"
            res.data.data.items.forEach(function (val) {
              productIdArr.push(val.productId)
              sum += val.cartNum
            })
            this.$store.dispatch("LoginCartCount1",sum)
            this.carTotalPrice1  = res.data.data.sumTotalMoney
            this.carTotalPrice  = res.data.data.sumTotalMoney
            this.discountVal  = res.data.data.discount//折扣
            this.settlementCode = 'buy'
            this.isLogin = true // 登录了
            if(!this.recommendAjax){
              this.DoRecommend(productIdArr)//获取推荐的产品
            }
          }).catch(error=>{})
        }else{



        var list = this.$store.getters.carList//未登录走缓存
          this.UnLoginCart(list,"")



          this.$store.getters.carList.forEach(function (val) {
            productIdArr.push(val.productId)
          })
          if(!this.recommendAjax){
            this.DoRecommend(productIdArr)//获取推荐的产品
          }

        }

      },
      discount(){
        this.show1 = true
      },
      ApplyDiscount(){//折扣码

       if( this.IsLogin){
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
           this.errorShow = true
           this.discountShow = false
           this.settlementCode = 'buy'
           console.log(error);
         })
       }else{
         UnLoginGetDiscount(this.goodsList,this.code).then(res=>{
           this.settlementCode  = this.code
           this.discountVal = res.data.data.discount//折扣额
           this.finalMoney = res.data.data.finalMoney//总额
           this.carTotalPrice = res.data.data.sumTotalMoney//扣除优惠后的结算额
           this.errorShow = false
           this.discountShow = true

         }).catch(error=>{
           var list = this.$store.getters.carList//未登录走缓存
           this.UnLoginCart(list,"")
           this.errorShow = true
           this.discountShow = false
           this.settlementCode = 'buy'
         })

       }
      },
      UnLoginCart(List,code){
        UnLoginGetDiscount(List,code).then(res=>{
          this.goodsList = res.data.data.items
          this.$store.dispatch("addGoods",this.goodsList)
          this.show2 = res.data.data.items.length == 0 ? "display:none" : "display:block"
          this.show3 = res.data.data.items.length == 0 ? "display:flex" : "display:none"
          this.discountShow = false
          this.settlementCode = 'buy'
          this.code = ""
          this.$nextTick(()=>{
          })

          this.finalMoney = res.data.data.finalMoney//总额
          this.carTotalPrice = res.data.data.sumTotalMoney//扣除优惠后的结算额
        }).catch(error=>{
        })


      },
      DoRecommend(IdList){
        recommanded(IdList).then(res=>{//推荐
          this.recommendAjax = true
          this.recommendList = res.data.data
        }).catch(error=>{
          console.log(error);
        })
      }
    },
    watch:{
      totalP(val){
        this.carTotalPrice = val
      },
      '$store.state.count':function () {
        var list = this.$store.getters.carList//未登录走缓存
        this.UnLoginCart(list,"")
      }
    },
    computed:{
      totalP(){
        return this.$store.state.totalPrice
      }
    },
     created() {
      UserInfo().then(res=>{
        //获取购物车数据
        this.IsLogin = true
        this.$nextTick()
        this.CardData();



      }).catch(error=>{
        this.IsLogin = false
        this.$nextTick()
        this.CardData();
      })
    }
  }
</script>

<style scoped>
  .no-data{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .no-data p{
    padding: 20px;
    margin-bottom: 30px;
  }
  .shopping-now{
    padding: 10px 20px;
    border: 1px solid rgba(128,128,128,1);
    border-radius: 10px;
    margin-bottom: 30px;
  }
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
    opacity: 1;
  }
  .settlement .opacity{
    opacity: 0;
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
    font-size: 24px;
    margin-left: 20px;
  }
  .also-like {
    display: flex;
    justify-content: start;
    margin-left: 80px;
    padding-bottom: 30px;
    flex-wrap: wrap;
  }
  .also-like li{
    width: 149px;
    margin: 10px 25px;
    box-sizing: border-box;

  }
  .also-like .img-box{
    width: 149px;
    height: 149px;
    padding: 10px;
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
