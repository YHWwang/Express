<template>
  <div id="Settlement">
    <div class="title">
      <router-link class="link-home"  to="/"><img class="logo" src="@/assets/img/logo.png" alt=""></router-link>
         <span>{{$t('views.set.generate.tit')}}</span>
      <button v-if="signIn" class="sign-in"> <router-link to="/login">{{$t('views.set.generate.btn1')}}</router-link>   </button>
    </div>
    <div class="settlement-box">
      <div class="settlement-nav">
        <ul>
          <li><span  :class="{'add-bg1':paymentShow == false}">{{$t('views.set.generate.msg1')}}</span></li>
          <li><span  :class="{'add-bg2':paymentShow == true}">{{$t('views.set.generate.msg2')}}</span></li>
          <li> <span>{{$t('views.set.generate.msg3')}}</span></li>
        </ul>
      </div>
      <div class="set-item set-item1">
        <div class="set-item-head">
          {{$t('views.set.generate.tit2')}}
        </div>
        <table class="table set-item-content">
          <thead>
          <th>{{$t('views.set.generate.th1')}}</th>
          <th>{{$t('views.set.generate.th2')}}</th>
          <th>{{$t('views.set.generate.th3')}}</th>
          </thead>
          <tbody>
          <tr>
            <td ><a href="#" v-for="item in imgarr"><img  :src="JSON.parse(item)[0]" alt=""></a> <br> <router-link class="link" to="/shopping-cart">{{$t('views.set.generate.a')}}</router-link></td>
            <td>{{goodsCount}}</td>
            <td>{{sumTotalMoney}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="set-item set-item2">
        <div class="set-item-head">
          {{$t('views.set.generate.tit3')}}
        </div>
        <div class="set-item-content">
          <div  v-if="isShow == true" class="address-box">
            <span>{{address.realName}}</span>({{address.detail+',&nbsp;&nbsp;'+address.city+',&nbsp;&nbsp;'+address.province+',&nbsp;&nbsp;'+address.postCode+'&nbsp;&nbsp;'+address.country}} &nbsp;&nbsp;{{$t('views.set.generate.phone')}}:{{address.phone}} ) <span class="btn-change" @click="addAddress('shipping address')">{{$t('views.set.generate.change')}}</span>
          </div>
          <div v-else-if="isShow == false">
            <FormAddress ref="ruleForm" @closeDialog="closeDialog" :change="change" :key="change" :email="email" :signIn="signIn"></FormAddress>
          </div>
        </div>
      </div>
      <div class="set-item set-item3">
        <div class="set-item-head">{{$t('views.set.generate.tit4')}}</div>
        <div class="set-item-content address-box"  v-show="bilingShow && bilingShow1">
          <span>{{baddress.realName}}</span>({{baddress.detail+',&nbsp;&nbsp;'+baddress.city+',&nbsp;&nbsp;'+baddress.province+',&nbsp;&nbsp;'+ baddress.postCode +'&nbsp;&nbsp;'+baddress.country}} &nbsp; {{$t('views.set.generate.phone')}}:{{baddress.phone}}) <span @click="addAddress('billing address')" class="btn-change">{{$t('views.set.generate.change')}}</span>
        </div>
        <div class="set-item-content address-box"  v-show="bilingShow && !bilingShow1">
         <span>{{baddress}}</span> <span @click="addAddress('billing address')" class="btn-change">{{$t('views.set.generate.change')}}</span>
        </div>
      </div>
      <div class="set-item set-item4">
        <div class="set-item-head">{{$t('views.set.generate.tit5')}}</div>
        <div class="set-item-content shop-method" v-show="shippingShow">
          <shop-method :shopmethodArr="shopmethodArr" :postPrice="postPrice" @shopMethod="shopMethod" v-if="isShow2"></shop-method>
          <div class="" v-else> <span class="span1">{{ShippingMethod == 'standard'?$t('views.set.generate.standard_2'):'DHL US$'+freight}} <i style="color: red;"> {{ ShippingMethod == 'standard'?"":$t('views.set.generate.standard_3') }}</i></span><span class="btn-change" @click="shopChange">{{$t('views.set.generate.change')}}</span></div>
        </div>
      </div>
      <div class="set-item set-item5">
        <div class="set-item-head">
          {{$t('views.set.generate.tit6')}}
        </div>
        <div class="set-item-content" v-show="paymentShow" >
          <div>
            <el-radio v-model="PaymentMethod" label="oceanPayment"  class="pay-box"> <span class="pay-txt">{{$t('views.set.generate.msg4')}}</span> <img class="pay-img" src="@/assets/img/visa_icon.png" alt=""><span class="span-txt">{{$t('views.set.generate.msg5')}} <br>{{$t('views.set.generate.msg6')}}</span>
              </el-radio><!--Pay with your credit card (VISA or Master Card) Directly.-->
          </div>
          <div class="paypal">
            <el-radio class="pay-box" v-model="PaymentMethod" label="paypal" ><span class="pay-txt">{{$t('views.set.generate.msg7')}}</span> <img class="pay-img" src="@/assets/img/paypal-logo.png" alt="">&nbsp;&nbsp;&nbsp;{{$t('views.set.generate.msg8')}}</el-radio>
          </div>
        </div>
      </div>
      <div class="set-total">
        <p>{{$t('views.set.generate.p1')}}({{goodsCount}}items ):   US${{sumTotalMoney}}</p><!--finalMoney-->
        <p v-show="coupon">{{$t('views.set.generate.p2')}}:  - US$ {{discount}}</p>
        <p>{{$t('views.set.generate.p3')}} :    US${{freight}}</p>
      </div>
      <div class="total-mark">
        <p>{{$t('views.set.generate.p4')}}: US$ {{GrandTotal}}</p>
        <div class="mark-box">
          <div><span>{{$t('views.set.generate.p5')}}</span>&nbsp;&nbsp;<span class="check-me" @click="markShow=true">{{$t('views.set.generate.p6')}}</span></div>
          <div v-show="markShow">
            <el-input
              type="textarea"
              :rows="2"
              placeholder=""
              v-model="mark">
            </el-input>
          </div>
        </div>
        <!--提交按钮-->
        <el-button type="info" :class="[{'btn-order':btnBol!=1},'btn-button']" @click="PayOrder" :disabled="btnBol==1?true:false" >{{$t('views.set.generate.btn2')}}</el-button>
      </div>
      <div>
        <!--地址栏的弹框-->
        <el-dialog
          :title="change"
          :visible.sync="dialogVisible"
          :width="dialogWidth"
        >
          <FormAddress @closeDialog="closeDialog" :change="change" :key="change" :id="id"  :email="address.email" :signIn="signIn"></FormAddress>
        </el-dialog>

        <!--运费弹框-->
        <el-dialog
          :visible.sync="dialogVisible1"
          :width="dialogWidth"
        >
          <shop-method :shopmethodArr="shopmethodArr" :postPrice="postPrice" @shopMethod="shopMethod" ></shop-method>
        </el-dialog>
      </div>
    </div>
    <div class="clear"></div>
    <div>
      <form id="submitForm" :action="requestUrl" method="post" style="display:none;">
        <input type="text" v-for="(value,key,index) in myForm" :name="key" :value="value">
        <!--    <input type="submit" name="submit" v-model="Submit" id="submitBtn" v-trigger>-->
        <input style="display: block" type="button" :value="$t('views.set.generate.btn3')" @click="handleC">
      </form>
      <form id="submitForm2" :action="requestUrl" method="post" style="display:none;">
        <input style="display: block" type="button" :value="$t('views.set.generate.btn3')" @click="handleC">
      </form>
    </div>

    <div>
    </div>
  </div>
</template>
<script>
  import {UserInfo,GetFreight} from '@/api/user' //和 个人信息
  import {checkProdust,PlaceOrder,Pay,PlaceOrderNotSignIn,UnsignInPay,UnLoginGetDiscount} from '@/api/shop'
  import FormAddress from "./FormAddress"
  import ShopMethod from "./ShopMethod"
  import {Message} from "element-ui";
  export default {
    name: "GenerateOrder",
    components:{
      FormAddress,
      ShopMethod
    },
    data(){
      return {
        shopmethodArr:"",//支持物流方式的数组 传给shopMethod组件
        dialogWidth:"",
        signIn:false,//登陆与否
        btnBol:1,//提交订单按钮是否可点
        email:"",
        id:0,
        Bid:0,
        isShow:false,//收货地址
        isShow2:true,//shopmethod
        address:"",//收货地址
        baddress:"",//账单地址
        dialogVisible: false,//地址栏弹框
        dialogVisible1: false,//运输方式弹框
        fullscreenLoading:false,//正在加载
        change:"add",//区分账单地址和收货地址
        ShippingMethod:"standard",//运送方式
        PaymentMethod:"oceanPayment",//支付方式方式
        // PaymentMethod:"paypal",//支付方式方式
        finalMoney:"",//总价
        discount:"",//折扣
        sumTotalMoney:"",//优惠后价格
        imgarr:[],//商品图
        goodsCount:"",
        postPrice:0,//后台请求的邮费
        bilingShow:false,//账单地址
        bilingShow1:false,//7-16改文案 same as
        shippingShow:false,//运输方式
        paymentShow:false,//支付方式
        mark:"",//附言
        markShow:false,
        myForm:"",//自执行 函数form参数
        requestUrl:"",//请求的地址url
        disCountCode:"buy",//折扣码
        coupon:false,
      }
    },
    methods:{
      handleC(){
        if(this.PaymentMethod  == 'paypal'){
          document.getElementById('submitForm2').submit();//自执行
        }else{
          document.getElementById('submitForm').submit();//自执行
        }
      },
      shopChange(){
        this.dialogVisible1 = true
      },
      shopMethod(val){//子组件通信
        this.ShippingMethod = val//邮费
        this.isShow2 = false
        this.btnBol = 0
        this.dialogVisible1 = false
        this.paymentShow = true//payment
      },
      addAddress(value){//增加地址的弹框
        this.dialogVisible = true
        this.change = value
      },
      closeDialog(value,change,id){//弹框关闭
        this.id = id

        this.dialogVisible = false
        this.isShow = true
        if(change === 'billing address'){
          this.baddress = value
          this.bilingShow1 = true
        }else if(change === 'shipping address'){
          this.address = value
        }else{
          this.address = value
          this.baddress = this.$t('views.set.generate.baddress')

        }

        this.bilingShow = true//账单地址show
        this.shippingShow = true//运输方式show
      },
      JumpPay(result){
        if(this.PaymentMethod  == 'oceanPayment'){
          this.requestUrl = result.data.data.requestUrl
          this.myForm = result.data.data.params
          this.$nextTick(() => this.handleC())
        }else{
          this.requestUrl = result.data.data.requestUrl
          this.$nextTick(() => this.handleC())
        }
      },
      PayOrder(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var address="";
        if(this.baddress ==this.$t('views.set.generate.baddress')){
          address = this.address
        }else{
          address = this.baddress
        }

        if(this.signIn){//未登录提交订单
          var code = this.$route.params.code == 'buy' ? "" :this.$route.params.code
          var goodsList = this.$store.getters.carList
          PlaceOrderNotSignIn(goodsList,address,this.ShippingMethod,this.PaymentMethod,this.mark, this.address.email,code).then(res=>{
            UnsignInPay(res.data.data.id,this.PaymentMethod,this.address.email).then(result=>{
              this.JumpPay(result)
            }).catch(error=>{
              alert(error.data.message)
              console.log(error);
            })
          }).catch(error=>{
            loading.close();
            alert(error.data.message)
            console.log(error);
          })
        }else{//登录后提交订单
          PlaceOrder(address,this.ShippingMethod,this.PaymentMethod,this.email,this.mark,this.disCountCode).then(res=>{
            Pay(res.data.data.id,this.PaymentMethod).then(result=>{
              this.JumpPay(result)
            }).catch(error=>{
              Message({ message: res.data.message, type:'error'})
              // alert(error.data.message)
              console.log(error);
            })

          }).catch(error=>{
            loading.close();
            Message({ message: error.data.message, type:'error'})
            alert(error.data.message)
            console.log(error);
          })
        }

      },
      GetGoodsData(){//登录状态下购物车数据
        var code = this.$route.params.code == 'buy' ? "" :this.$route.params.code
        this.coupon = this.$route.params.code == 'buy' ? false : true
        this.disCountCode = this.$route.params.code == 'buy' ? "" :this.$route.params.code
        checkProdust(code).then(res=>{

          if( res.data.data.cart.items.length ==0){
            this.$router.push("/")
          }
          this.baddress = this.$t('views.set.generate.baddress')
          if(res.data.data.address == null){
            this.isShow = false
          }else{
            this.isShow = true
            this.address = res.data.data.address
            this.id = res.data.data.address.id
            this.Bid = res.data.data.address.id
            this.bilingShow = true//账单地址
            this.shippingShow= true//运输方式
          }
          this.finalMoney = res.data.data.cart.finalMoney
          this.discount = res.data.data.cart.discount
          this.sumTotalMoney = res.data.data.cart.sumTotalMoney
          var image =[];//商品图片
          var goodsCount = 0//商品数量
          image = res.data.data.cart.items.map(function (val,inx) {
            goodsCount+= val.cartNum
            return val.image
          })
          this.imgarr = image
          this.goodsCount = goodsCount
          this.sumTotalMoney = res.data.data.cart.sumTotalMoney
        }).catch(error=>{
         alert(error);
        })
      },
      GetNotSigin(){//未登录的购物车数据
        var code = this.$route.params.code == 'buy' ? "" :this.$route.params.code
             this.coupon = this.$route.params.code == 'buy' ? false : true
        var list = this.$store.getters.carList//未登录走缓存 购物车数据

        if( list.length==0){
          this.$router.push("/")
        }
        UnLoginGetDiscount(list,code).then(res=>{

          var imgArr = []//图片
          var count=0//数量
          res.data.data.items.forEach((val)=>{
            imgArr.push(val.image)
            count+=val.cartNum//总数量

          })
          this.imgarr = imgArr
          this.goodsCount = count
          this.sumTotalMoney = res.data.data.sumTotalMoney
             this.discount = res.data.data.discount;
              this.finalMoney = res.data.data.finalMoney
        }).catch(error=>{
          this.$router.push("/")
        })
      }
    },
    computed:{
      freight:function () {//邮费
        return  this.ShippingMethod == 'standard' ? 0 : this.postPrice
      },
      GrandTotal:function () {//总价
        var sum =  Math.ceil((this.finalMoney + this.freight) *100)
        return  sum/100
      }
    },
    watch:{
      'address.country':function () {

        GetFreight(this.address.country,this.goodsCount).then(res=>{

          this.shopmethodArr = res.data.data
          this.postPrice = res.data.data.price
          if(this.ShippingMethod == 'expedited' && res.data.data.dhl!=1){
            this.ShippingMethod = 'standard'
          }else{
            this.ShippingMethod = 'expedited'
          }

        }).catch(error=>{
          console.log(error);
        })
      }
    },
    created() {
      if(document.body.clientWidth>=800){
        this.dialogWidth = '30%'
      }else{
        this.dialogWidth = '98%'
      }
      //获取个人信息
      UserInfo().then(res=>{
      this.$refs.ruleForm.rules.email = [

        ]
        this.signIn = false
        this.email = res.data.data.email
        this.GetGoodsData()
      }).catch(error=>{

        this.$refs.ruleForm.rules.email = [
            { required: true, message: this.$t('views.set.generate.message1'), trigger: ['blur','change'] },
            { required: true, type:'email', message: this.$t('views.set.generate.message2'), trigger: ['blur','change']}
          ]
        this.signIn = true
        this.GetNotSigin()//未登录的购物车数据
      })
    }
  }
</script>

<style scoped>
  #Settlement{
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
  .title span{
    display: inline-block;
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
  .settlement-nav ul li{
    background: white;
  }
  .settlement-nav ul .add-bg1{
    background:url(../../assets/img/set2.png)no-repeat center;
    color: white;
  }
  /**/
  .settlement-nav ul .add-bg2{
    background:url(../../assets/img/set1.png)no-repeat center;
    color: white;
  }

  table{
    width:892px !important;
    text-align: center;
    color: rgba(0,0,0,.6);
    border-collapse: collapse;
    text-align: center;
    margin: 0 auto;
  }
  .table img{
    width: 52px;
    /*height: 62px;*/
  }
  thead th{
    height: 30px;
    border-bottom: 1px solid rgba(0,0,0,.6);
  }
  td{
    padding:10px 20px;
  }
  .link{
    text-decoration: underline;
  }
  .set-item{
    background: white;
    margin-top: 36px;
    width: 100%;
  }
  .set-item .set-item-content{
    background: white;
    width: 100%;
    color: rgba(0,0,0,.6);
    text-indent: 2em;
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
    /*padding: 30px 0;*/
  }
  .btn-change{
    display: inline-block;
    height: 73px;
    line-height: 73px;
    position: absolute;
    top: 0;
    right: 50px;
    cursor: pointer;
    text-decoration: underline;
  }
  .address-box {
    height: 73px;
    line-height: 73px;
  }
  .set-item .span1{
    display: inline-block;
    height: 73px;
    line-height: 73px;
    text-indent: 0em;
  }
  .set-item-head{
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-indent: 2em;
    background: #133285;
    border-radius: 8px 8px 0px 0px;
    font-size: 14px;
    color: #fff;
  }
  .link{
    color: rgba(0,0,0,.6);
  }

  .btn-order{
    background: #133285;
  }
  .set-total{
    width: 100%;
    background: white;
    position: relative;
    padding-top: 10px;
  }
  .set-total p{
    width: 100%;
    text-align: right;
    padding-right: 50px;
    box-sizing: border-box;
    font-size: 16px;
    color: rgba(0,0,0,.6);
    height: 30px;
    line-height: 30px;
  }

  .total-mark{
    height: 200px;
    background: white;
    position: relative;

  }
  .set-item5 p{
    /*height: 30px;*/
  }
  .set-item5 .paypal{
    /*margin-top: 20px;*/
  }
  .mark-box{
    position: absolute;
    top: 10px;
    left: 20px;
    background: white;
  }
  .total-mark p{
    border-top: 1px solid rgba(0,0,0,.6);
    padding-top: 30px;
    width: 95%;
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
    color: rgba(0,0,0,.6);
    margin: 0 auto;
    font-size: 16px;
  }
  .mark-box span{
    color: rgba(0,0,0,.8);
    font-size: 16px;
  }
  .btn-button{
    float: right;
    margin-right:50px;
    margin-top: 50px;
  }
  .clear{
    width: 100%;
    height: 180px;
    margin-top: 50px;
  }
  .mark-box .check-me{
    color: rgba(0,0,0,.6);
  }
  .pay-box{
    padding: 20px 5px;
    margin-top: 30px;
    border: 1px solid rgba(128,128,128,.8);
    width: 60%;
  }
  .pay-txt{
    display: inline-block;
    width: 120px;
  }
  .pay-img{
    height: 50px;
  }
  .span-txt{
    display: inline-block;
    width: 100px;
    word-wrap: break-word;
  }
/deep/ .el-form-item__error{
  top: 39px;
}
  @media screen and (max-width:800px) and (min-width:200px){
    /deep/ .el-dialog__body{
      padding: 30px 0;
    }
    .title{
      font-size: 14px;
      text-align: center;
    }
    .title span{
      display: none;
    }
    .link-home{
      left: 50%;
      transform: translateX(-50%);
    }
    .logo{
      /*height: 15px;*/
    }
    .sign-in{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      right: 5px;
    }
    .settlement-nav{
      margin: 10px ;
    }
    .settlement-nav span{
      font-size: 12px;
      padding:0 10px;
    }

    .settlement-nav ul .add-bg1{
      background:url(../../assets/img/set2.png) no-repeat;
      background-size:100% 100%;
      color: white;
    }
    /**/
    .settlement-nav ul .add-bg2{
      background:url(../../assets/img/set1.png)no-repeat center;
      color: white;
    }

    .settlement-box{
      width: 100%;
      font-size: 12px;
    }

    table{
      width:100%!important;
    }
    .set-item .set-item-content{
      padding-left: 10px;
      font-size: 12px;
      text-indent: 2px;
      width: 95%;
      word-wrap: break-word;
      /*line-height: 30px;*/
    }
    .address-box{
      line-height: 30px;
    }
    .btn-change{
      right: -5px;
    }
    td{
      padding: 10px;
    }
      .address{
        width: 100%;
      }

    .shop-method{
      width: 100%;
    }
    .pay-box{
      /*padding: 10px 5px 10px 0;*/
      width: 100%;
    }
    .pay-img{
      height: 15px;
    }
    .pay-txt{
      width: 70px;
    }
    /deep/ .el-radio__label{
      font-size: 12px;
      display: inline-block;
      width: 80%;

    }
    .total-mark{
      height: 250px;
    }
    .mark-box{
      position: relative;
      width: 95%;
      top: 10px;
      left:10px;
    }
.clear{
  height: 10px;
}
/deep/ .el-textarea{
  width: 90%;
}
  }
</style>
