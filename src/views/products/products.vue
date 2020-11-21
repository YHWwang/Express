<template>
  <div class="product-box">
    <div class="pro-nav">
      <router-link to="/"><span>{{$t('views.products.tit3')}}</span></router-link>  &nbsp;&nbsp;<span> > </span>&nbsp;&nbsp;&nbsp;<router-link to="all"><span>{{$t('views.products.msg2')}}</span></router-link><span v-show="isShow"> > {{name}}</span>
    </div>
    <div class="goodsList" v-for="(item,index) in  productsList"  :key="index">
      <p :key="item.index" class="list-title"><span><i :class="'fa '+(item.check?' fa-chevron-down':'fa-chevron-right')" aria-hidden="true" @click="listUp(index)"></i></span>{{item.cateName}}({{item.productSum}})</p>
<!--        <PItem :id="item.id" :inx="index" :key="item.index" v-show="item.check" @GetSum="GetSum"></PItem>-->
        <PItem :id="item.id" :inx="index" :key="item.index" v-show="item.check"></PItem>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
  // import Cookies from 'js-cookie'
  import { GetPcategories } from "@/api/home"//获取所有产品的id
  import { products } from "@/api/products"//获取id对应下的商品
  import PItem from "@/views/products/PItem"
  export default {
    name: "index",
    components:{
      PItem
    },
    data(){
      return {
        // sum:"",
        productsList:[],
        isShow:false,
        name:"",
        totalPrice:this.$store.state.totalPrice,
        iconclass:"fa fa-chevron-down"
      }
    },
    methods:{
      listUp(index){
        this.productsList[index].check = !this.productsList[index].check
      },
      GetList(){//获取产品列表

        let arr= []
        const Pid =  this.$route.params.id
        GetPcategories().then(res=>{
            arr = res.data.data.content
            if(Pid !="all"){//请求单个产品
              arr =  arr.filter(function (val) {
                return  val.id == Pid
              })
              arr[0].check = true
            }else{//请求多个列表
              arr.forEach(function (val) {
                val.check = true
                // val.sum = ""
              })
            }

          this.productsList  = arr
          this.name =  this.productsList[0].cateName
          this.isShow = Pid == "all" ?  false : true

          }).catch(error=>{
            console.log(error);
          })
      },
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
      },

    },
    created() {
      this.GetList();//获取产品id
    },

  }
</script>

<style scoped>
  .product-box{
    background: #f1f1f1;
  }
  @media screen and (min-width: 1700px) {
    .product-box{
      padding: 90px 100px 50px 150px;
    }
  }
  @media screen and (min-width:1400px) and (max-width: 1700px) {
    .product-box{
      padding: 70px 30px;
    }

  }

  @media screen and (min-width:960px) and (max-width: 1399px) {
    .product-box{
      padding:20px;
    }
  }

  .pro-nav{
    margin-bottom: 30px;
    padding-left: 10px;
  }
  .pro-nav span{
    font-family: MyriadPro Bold;
    font-size: 18px;
   color:  rgba(0,0,0,0.8);
  }

  .goodsList {
    padding: 10px;
    box-sizing: border-box;
    /*margin-bottom: 90px;*/
  }
  @media screen and (min-width:1400px) {
    .goodsList{
      min-width: 1200px;
    }
  }
.list-title{
  margin-bottom: 25px;
  font-size: 18px;
  color:  rgba(0,0,0,0.8);
}
  .goodsList i{
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    /*color:  rgba(0,0,0,0.8);*/
    /*background: red;*/
    /*color: rgba(0,0,0,0.8);*/
    color:#a4a4a4;
    border: 1px solid #a4a4a4;
    border-radius:25px ;
    margin-right: 5px;
  }
  @media screen and (max-width: 960px) and (min-width: 350px){
    .pro-nav{
      padding: 20px;
    }
    .goodsList{
      margin-bottom: 10px;
      padding: 0;
    }
    .product-box{
      background:#f1f1f1;
    }
    .list-title{
      margin-bottom: 10px;
    }
  }

</style>
