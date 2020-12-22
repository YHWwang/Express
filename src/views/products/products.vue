<template>
  <div class="product-box">
    <div class="pro-nav">
      <router-link to="/"><span>{{$t('views.products.tit3')}}</span></router-link>  &nbsp;&nbsp;<span> > </span>&nbsp;&nbsp;&nbsp;<router-link to="all"><span>{{$t('views.products.msg2')}}</span></router-link><span v-show="isShow"> > {{name}}</span>
    </div>
    <div class="goodsList" v-for="(item,index) in  productsList"  :key="index">
      <p :key="item.index" class="list-title">
        <svg :class="item.check?' ':'rotate-svg'" @click="listUp(index)" t="1606364919017" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2015" width="24" height="24"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 938.667c-234.667 0-426.667-192-426.667-426.667S277.333 85.333 512 85.333s426.667 192 426.667 426.667-192 426.667-426.667 426.667z" p-id="2016" fill="#8b8b8b"></path><path d="M793.6 396.8c-17.067-17.067-42.667-17.067-59.733 0L512 618.667 290.133 396.8c-17.066-17.067-42.666-17.067-59.733 0s-17.067 42.667 0 59.733l251.733 251.734c17.067 17.066 42.667 17.066 59.734 0L793.6 456.533c17.067-12.8 17.067-42.666 0-59.733z" p-id="2017" fill="#8b8b8b"></path></svg>
       <span>
         {{item.cateName}}({{item.productSum}})
       </span> </p>
        <PItem :id="item.id" :inx="index" :key="item.index" v-show="item.check"></PItem>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
  import { GetPcategories } from "@/api/home"//获取所有产品的id
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
  svg{
    margin-right: 5px;
  }
  .rotate-svg{
    transform: rotate(-90deg);
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
display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 5px;
}
  .goodsList i{
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
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
