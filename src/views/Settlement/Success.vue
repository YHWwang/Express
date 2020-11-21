<template>
    <div id="Complete">
      <div class="title">
        <router-link class="link-home"  to="/"><img class="logo" src="@/assets/img/logo.png" alt=""></router-link>
      <span>  {{$t('views.set.Success.title')}}</span>
<!--        <button v-if="signIn"> <router-link to="/login">SIGN IN</router-link>   </button>-->
      </div>
      <div class="settlement-box">
        <div class="settlement-nav">
          <ul>
            <li><span>{{$t('views.set.Success.li_1')}}</span></li>
            <li><span>{{$t('views.set.Success.li_2')}}</span></li>
            <li><span class="complete-order">{{$t('views.set.Success.li_3')}}</span></li>
          </ul>
        </div>
        <div class="item">
          <div class="item-head">{{$t('views.set.Success.tit_1')}}</div>
          <div class="item-content">
            <div class="img-box">
              <img src="../../assets/img/set5.png" alt="">
            </div>
            <div class="item-content-box" v-if="show">
              <p class="p1">  {{$t('views.set.Success.tit_1_p1')}}</p>
              <p>{{$t('views.set.Success.tit_1_p5')}} <span class="order">{{username}}</span></p>
              <p>{{$t('views.set.Success.tit_1_p2')}} <span class="price">{{price}}</span> {{$t('views.set.Success.tit_1_p3')}}{{order}}</p>
            </div>	
            <div class="item-content-box" v-else>
              <p class="p1">  {{$t('views.set.Success.tit_1_p1')}}</p>
              <p> Вы{{$t('views.set.Success.tit_1_p2')}} <span class="price">{{price}}</span> {{$t('views.set.Success.tit_1_p3')}} <span class="order">{{order}}</span></p>
              <p>{{$t('views.set.Success.tit_1_p4')}}</p>
            </div>
          </div>
          <un-login :username="username" v-if="show"></un-login>
          <div class="complete-btn-box">
            <router-link to="/shop/all"><el-button type="info" class="btn-complete" v-show="!show" >{{$t('views.set.Success.router1')}}</el-button></router-link>
            <router-link to="/user/orders"><el-button type="info" class="btn-complete" v-show="!show" >{{$t('views.set.Success.router2')}}</el-button></router-link>
          </div>


        </div>
      </div>
      <div style="background: white;">
        <div class="clear"></div>
        <Footer></Footer>
      </div>

    </div>
</template>

<script>
  import { UserInfo , Orders } from '@/api/user' //是否登录和订单
  import  Footer from '@/components/Myfooter'
  import  UnLogin from './UnLogin'
    export default {
        name: "Success",
      components:{
        Footer,UnLogin
      },
      data(){
    return {
      order:'',
      price:'',
      username:'',
      show:false
      }
      },
      methods:{
          showData(){
            var str =this.$route.params.code
            Orders(str).then(res=>{
              this.show = res.data.data.storeId == 0?true:false
              this.order = str
              this.price = res.data.data.payPrice
              this.username =res.data.data.userEmail
            this.track(res.data.data)
            }).catch(error=>{
              console.log(error);
            })
          },
        track (res) {
          var items = []
          var obj = {}
          res.cartInfoList.forEach((val,inx)=>{
           obj.id = val.cartInfoMap.id
           obj.name = val.cartInfoMap.productName
           obj.color = val.cartInfoMap.suk
           obj.quantity = val.cartInfoMap.cartNum
           obj.price = val.cartInfoMap.price
           obj.sku = val.cartInfoMap.skuName
           items.push(obj)
           obj = {}
          })
          var key = 'orderId'
          var orderId =this.$route.params.code
      if(window.location.host == 'www.blackview.hk'){
        if(localStorage.getItem(key) == null ||localStorage.getItem(key)!= orderId){
          localStorage.setItem(key,orderId)
          this.$gtag.purchase({
            "transaction_id":res.orderId,//交易的唯一 ID。
            "value":res.payPrice,//	与事件相关的价值（即收入）
            "checkout_option":res.payType,//	结帐选项（即选定的付款方式）
            "items": items
          })
          this.$gtag.event( 'conversion',{
            'send_to':'AW-797702063/8yHrCPeFiKcBEK_vr_wC',
            'currency':'USD',
            'value':res.payPrice,
            'transaction_id':res.orderId,
          })

        }
      }
        }
      },
      created() {
        UserInfo().then(res=>{
          this.showData()
          this.show=false
        }).catch(error=>{

          this.$store.dispatch("addGoods",[])

          // this.show=true
          this.showData()
          console.log(error);
        })
      }
    }
</script>

<style scoped>

  #Complete{
    width: 100%;
    margin: 0 auto;
    background: #f1f1f1;
  }
  .title{
    background: white;
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: relative;
    font-size: 30px;
    color: rgba(0,0,0,.8);
  }
  .link-home{
    position: absolute;
    top: 0;
    left:50px;

  }
  .logo{
    height: 20px;
  }
  .settlement-box{
    width: 1027px;
    margin: 0 auto;
  }
  .settlement-nav{
    margin-left: 50px;
    margin-top: 143px;
  }
  .settlement-nav ul{
    display: flex;
    justify-content: center;

  }
  .settlement-nav span{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 10px 45px;
    font-size: 18px;
    color:rgba( 0,0,0,.8);

  }
  .settlement-nav .complete-order{
    padding: 10px 60px;
    background: url("../../assets/img/set4.png");

    color: white;
  }
  .settlement-nav ul li{
    background: white;
  }

.item{
  background: white;
  margin-top: 36px;
  width: 100%;
  padding-bottom: 50px;
}
  .item-head{
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-indent: 2em;
    background: #133285;
    border-radius: 8px 8px 0px 0px;
    font-size: 14px;
    color: #fff;
  }

.item-content{
  width: 608px;
  margin: 100px auto 20px auto;
  background: #133285;
  color: white;
  padding: 30px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

}
.item-content p{
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}
.item-content .p1{
  font-size: 18px;
}
.item-content .price{
  color: yellow;
}
.complete-btn-box{
  text-align: center;
}
  .btn-complete{
    /*padding: 15px 30px;*/
    /*transform: translateX(-50%);*/
    background: #133285;
    /*color: white;*/
    /*font-size: 16px;*/
    /*margin:0px 50% 100px 50%;*/
  }
  .item-content .img-box{
    margin-right: 20px;
  }
  .clear{
    height:50px;
    background: #f1f1f1;
  }
  .order{
    background: white;
    color: rgba(0,0,0,.6);
    display: inline-block;
    padding: 2px 5px;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .link-home{
      left: 50%;
      transform: translateX(-50%);
    }
    .title span{
      display: none;
    }
    .settlement-nav{
      margin: 20px 5px;
    }
    .settlement-nav ul{
      justify-content: start;
    }

    .settlement-box{
      width: 100%;
    }
    .settlement-nav span{
      font-size: 12px;
      padding:5px ;
      /*line-height: normal;*/
    }
    .settlement-nav .complete-order{
      padding:5px 20px 5px 30px;
      background-size:100% 100%;
    }

    .item-content{
      width: 90%;
      margin-top: 20px;
    }

    .item-content .p1{
      font-size: 14px;
    }
    .item-content p
    {
      font-size: 12px;
      height: auto;
    }

  }

</style>
