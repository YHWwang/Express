<template>
  <div>
    <div class="card-box" :style="show">
      <h3>{{$t('views.home.card.tit')}}</h3>
      <hr>
      <ul >
        <li v-for="(item,index) in product" :key="index">
          <div class="card-item">
            <img :src=" JSON.parse(item.image)[0]" alt="">
          </div>
          <div class="card-item">
            <p v-if="IsLogin">{{item.productName}}</p>
            <p V-else>{{item.storeName}}</p>
            <p v-for="phone in item.productAttr">{{phone}}</p>
          </div>
          <div class="card-item">
            {{item.price}} X {{item.cartNum}}
          </div>
        </li>
      </ul>
      <hr>
      <p class="txt">{{$t('views.home.card.quantity')}}:{{Quantity}}&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  {{$t('views.home.card.p')}}:{{total}}</p>
      <div class="btn">
        <!--        <el-button class="bit-item"  type="info"  @click="toCart"  disabled >View Cart</el-button>-->
        <el-button class="bit-item"  type="info"  @click="toCart"> {{$t('views.home.card.btn')}}</el-button>
        <!--        <el-button class="bit-item"  type="info"  @click="toCart" :disabled="IsClick"> Check Out</el-button>-->
      </div>
    </div>
    <div class="card-box" :style="show1">
      <h3>{{$t('views.home.card.tit1')}}</h3>
      <p>{{$t('views.home.card.msg')}}</p>
    </div>
  </div>

</template>

<script>
  import { GetCardData} from '@/api/shop'
    export default {
        name: "MyCard",
      props:["IsLogin"],
      data(){
          return {
            show:"display:none",
            show1:"display:block",
            total:0,
            product:[],
            Quantity:0
          }
      },
      methods:{
          toCart(){
            this.$router.push("/shopping-cart")
          },
          //登录的数据
          GetData(){
            GetCardData().then(res=>{
              this.total = res.data.data.finalMoney
              this.product = res.data.data.items
              var sum = 0
              res.data.data.items.forEach(function (val) {
                sum+= val.cartNum
              })

              this.Quantity = sum

              this.$nextTick(()=>{
                // this.IsClick = this.Quantity == 0 ? true : false
                this.show = this.Quantity == 0 ?  "display:none" : "display:block"
                this.show1 = this.Quantity == 0 ? "display:block" : "display:none"
              })

            }).catch(error=>{
              console.log(error);
            })
          },
        //未登录的数据
        UnLoginData(){

          this.product = this.$store.getters.carList//未登录走缓存
          var sum = 0
          this.$store.getters.carList.forEach(function (val) {
            sum+= val.cartNum
          })
          this.Quantity = sum
          this.total = this.$store.state.totalPrice//总价
          this.$nextTick(()=>{
            // this.IsClick = this.Quantity == 0 ? true : false
            this.show = this.Quantity == 0 ?  "display:none" : "display:block"
            this.show1 = this.Quantity == 0 ? "display:block" : "display:none"
          })
        }
      },
      watch:{
        "IsLogin":function(){
          // console.log(123);
          if(this.IsLogin){
            this.GetData()
          }else{
            this.UnLoginData()
          }
        },
        carCount:function () {
          if(this.IsLogin){
            this.GetData()
          }else{
            this.UnLoginData()
          }

        }
      },
      computed:{
        carCount(){
          if(this.IsLogin){
            return  this.$store.state.loginCartCount
          }else{
            return  this.$store.state.count
          }
        }
      },
      created() {
          if(this.IsLogin){
            this.GetData()
          }else{
            this.UnLoginData()
          }
      }
    }
</script>

<style scoped>
  .bit-item{
    background: #133285;
    color: white;
    margin: 10px;
  }
  .card-box{
    width: 500px;
    padding:30px;
  }
h3{
  font-size: 24px;
}
 .card-box ul{
    width: 500px;

  }
  li{
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  img{
    width: 80px;
    height: 80px;
  }
  .card-item{
    padding: 10px 40px;
  }
  .btn{
    display: flex;
    justify-content: center;
  }
  .link{
    margin-left: 20px;
  }
  .txt{
    width: 100%;
    text-align: right;
    font-weight: bold;
    margin: 10px 0px;
  }

</style>
