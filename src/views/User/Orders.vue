<template>
  <div>
    <h3>{{$t('views.User.order.tit')}}</h3>
    <div class="order-box">
      <p v-if="show">{{$t('views.User.order.show')}}</p>
      <div class="order-item" v-for="item in productsList">
        <ul class="order-title order-nav">
          <li><span>{{$t('views.User.order.li_1')}} :</span><span class="span-item">{{item.orderId}}</span></li>
          <li><span>{{$t('views.User.order.li_2')}}:</span><span class="span-item"> {{item.addTime}}</span></li>
          <li><span>{{$t('views.User.order.li_3')}} :</span><span class="span-item"> {{item.payTypeName}}</span></li>
          <li><span>{{$t('views.User.order.li_4')}}:</span><span class="span-item"> {{orderAddress(item.userAddress)}}</span></li>
          <li><span>{{$t('views.User.order.li_5')}}:</span><span class="span-item"> {{orderAddress(item.billAddress,'bill')}}</span></li>
          <li><span>{{$t('views.User.order.li_6')}}:</span><span class="span-item"> {{item.payType == "oceanpayment"?'Credit card':'Paypal'}}</span></li>
          <li v-if="item.status == 1 && item.paid == 1"><span>{{$t('views.User.order.li_7')}}:</span><span class="span-item"> {{item.deliveryId}}</span></li>
        </ul>
        <el-table
          :data="item.cartInfoList"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="pic">
            <template slot-scope="scope">
              <img class="goods-img" :src="DoImg(scope.row.cartInfoMap.image)" alt="">
            </template>
          </el-table-column>
          <el-table-column
            label="Name and SKU">
            <template slot-scope="scope">
              <strong>{{scope.row.cartInfoMap.productName}}</strong><br>
              <span>{{scope.row.cartInfoMap.suk}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Qty.">
            <template slot-scope="scope">
              {{scope.row.cartInfoMap.cartNum}}
            </template>
          </el-table-column>
          <el-table-column
            label="USD">
            <template slot-scope="scope">
              {{scope.row.cartInfoMap.totolMoney}}
            </template>
          </el-table-column>
        </el-table>
        <p class="total"><span v-show="item.couponPrice !=0"><i>{{$t('views.User.order.p1')}}:</i>{{-item.couponPrice}};</span> <span
          v-show="item.payPostage !=0"><i>Freight:</i> USD  {{ item.payPostage }};</span><span><i>{{$t('views.User.order.p2')}}:</i> USD{{item.payPrice}}</span>
        </p>
        <div class="order-btn-box">
          <router-link to="/contact-us"><el-button  class="contact-us">{{$t('views.User.order.router')}}</el-button></router-link>  <el-button v-if="item.payTypeName == 'pending'" class="pay-now" @click="PayMethods(item)">{{$t('views.User.order.Pay')}}</el-button>
        </div>
        <div>
        </div>
      </div>
    </div>
    <el-dialog
      title="Payment Method"
      :visible.sync="dialogVisible"
      :width="dialogWidth">
      <div>
        <div class="set-item-content" >
          <div>
            <el-radio v-model="PaymentMethod" :label="$t('views.User.order.oceanPayment')"  class="pay-box"> <span class="pay-txt">{{$t('views.User.order.msg1')}}</span> <img class="pay-img" src="@/assets/img/visa_icon.png" alt=""><span class="span-txt">{{$t('views.User.order.msg2')}} <br>{{$t('views.User.order.msg3')}}</span>
            </el-radio><!--Pay with your credit card (VISA or Master Card) Directly.-->
          </div>
          <div class="paypal">
            <el-radio class="pay-box" v-model="PaymentMethod" label="paypal" ><span class="pay-txt">PayPal</span> <img class="pay-img" src="@/assets/img/paypal-logo.png" alt="">&nbsp;&nbsp;&nbsp;{{$t('views.User.order.msg5')}}</el-radio>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false" class="cancel">Cancel</el-button>-->
    <el-button  class="pay-now" @click="DoPay()">{{$t('views.User.order.btn')}}</el-button>
  </span>
    </el-dialog>
    <div>
      <form id="submitForm" :action="requestUrl" method="post" style="display:none;">
        <input type="text" v-for="(value,key,index) in myForm" :name="key" :value="value">
        <!--    <input type="submit" name="submit" v-model="Submit" id="submitBtn" v-trigger>-->
        <input style="display: block" type="button" :value="$t('views.User.order.button')" @click="handleC">
      </form>
      <form id="submitForm2" :action="requestUrl" method="post" style="display:none;">
        <input style="display: block" type="button" :value="$t('views.User.order.button')" @click="handleC">
      </form>
    </div>
  </div>
</template>

<script>
  import {GetOrder,PayAgain} from '@/api/user'
  import {Pay} from '@/api/shop'

  export default {
    name: "Orders",
    data() {
      return {
        myForm:"",//自执行 函数form参数
        requestUrl:"",
        productsList: '',
        PaymentMethod: '',//支付方式
        dialogVisible:false,
        dialogWidth:"600px",
        OrderItem:"",
        id:"",//订单id
        show:false
      }
    },

    methods: {
      DoPay(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var _this = this
        var OrderId = this.OrderItem.orderId
        var id = this.OrderItem.id
        var payType =  this.PaymentMethod
        PayAgain(OrderId,payType).then(res=>{

          if(res.data.data == 200){
            Pay(id,payType).then(result=>{
              _this.JumpPay(result)
            }).catch(error=>{
              console.log(error);
            })
          }

        }).catch(error=>{
          console.log(error);
        })
      },
      PayMethods(item){
        this.OrderItem = item
        this.$nextTick()
        this.PaymentMethod =item.payType
        this.dialogVisible = true
      },
      DoImg(val) {
        if (val != '') {
          return JSON.parse(val)[0]
        } else {

        }
      },
      orderAddress(val,bill){
        if(val !=''){
          var res =  JSON.parse(val)
          if(bill == 'bill'){
            return res.address  +' ' + res.city +' ' + res.state +' ' + res.country + ' ' + res.zip
          }else{
            return res.detail +' ' + res.city  +' '+ res.province  +' '+ res.country + ' ' + res.postCode
          }
        }
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
      //自执行
      handleC(){
        if(this.PaymentMethod  == 'paypal'){
          document.getElementById('submitForm2').submit();//自执行
        }else{
          document.getElementById('submitForm').submit();//自执行
        }
      },
    },
    created() {
      if(document.body.clientWidth>=800){
        this.dialogWidth = '700px'
      }else{
        this.dialogWidth = '99%'
      }
      GetOrder().then(res => {
         var len = res.data.data.content.length
this.show = !len
        console.log(len);
        this.productsList = res.data.data.content
      }).catch(error => {
        console.log(error);
      })
    }
  }
</script>

<style scoped lang="scss">

  .contact-us,.pay-now{
    background:#17a2b8;
    color: #fff;
    font-size: 18px;
  }
  .pay-now{
    background: #dc3545;
  }


  .order-box {
    background: white;
    padding: 20px;
  }

  .span-item {
    color: gray;
    font-size: 14px;
  }

  h3 {
    margin-bottom: 20px;
    color: rgb(128, 128, 128);
    background: white;
    padding: 20px;
  }

  .order-item {
    border: 1px solid #000;
    border-bottom: none;
    padding: 20px;
  }

  .order-item:last-child {
    border-bottom: 1px solid #000;
  }

  .order-nav, {
    border-bottom: 1px dashed rgb(128, 128, 128);
  }

  .order-detail {
    padding: 20px;
  }

  .total {
    text-align: right;
  }

  .total span {
    color: rgb(128, 128, 128);
  }
  .total i {
    color: #000;
  }
  .goods-img {
    width: 70px;
  }
  .set-item-content{
    margin: 0 auto;
  }
  .pay-box{
    /*margin: 0 auto;*/
    padding: 20px 10px;
    margin-top: 30px;
    border: 1px solid rgba(128,128,128,.8);
    width: 96%;
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
  @media screen and (max-width: 800px) and (min-width: 350px) {
    .order-box {
      font-size: 12px;
    }
    h3 {
      font-size: 14px;
      padding: 10px;
      margin-bottom: 10px;
    }
    .order-box {
      padding: 2px;
    }
    .order-nav span {

    }
    /deep/ .el-table {
      font-size: 12px;
    }
    .pay-box{
      /*padding: 10px 5px 10px 0;*/
      width: 94%;
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
  }
</style>
