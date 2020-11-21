<template>
    <div class="shop-search">
      <ul class="goodsList" >
        <li v-for="(item,index) in shopList" :key="index" @click="addGoods(item)">
          <div class="imgBox">
            <img :src="item.image" alt="">
          </div>
          <h3 class="til">{{item.storeName}}</h3>
          <p class="p1" v-for="(z,inx) in item.addtxt" :key="inx">{{z}}</p>
          <div class="price">
            <span>${{item.price}}</span><del v-show="item.price == item.otPrice?false:true">${{item.otPrice}} </del>
          </div>
          <div class="btn-box">
              <img src="../../assets/img/buynow.png" alt="">
          </div>
          <span v-show="item.price == item.otPrice ? false:true" class="off">{{GetOff(item)}}%&nbsp;OFF</span>
        </li>
      </ul>
      <p v-show="show" style="text-align: center">{{$t('views.shop.Search')}}</p>
    </div>
</template>

<script>
  import  {HomeSearch} from "@/api/home"
    export default {
        name: "Search",
      data(){
        return {
          shopList:[],
          keywords:"",
          loading:"",
          show:false
        }
      },
      methods:{
        addGoods(item){
          this.$router.push(`/shop/buy/${item.unitName}`)
        },
        GetOff(item){
          let val =  item.price / item.otPrice //市场价
          val = parseInt((1-val) *  100)
          return val
        },
        GetShopList(){
          var id = this.$route.params.id
          HomeSearch(id).then(res=>{
          if(res.data.length==0){
            this.show = true
            this.shopList = []
            this.loading.close()
          }else{
            this.show = false
            this.shopList = res.data;
            this.loading.close()
          }

          }).catch(error=>{
            console.log(error);
            this.loading.close()
          })
        }
      },
      watch:{
        "$route.params.id":"GetShopList"
      },
      created() {
    this.loading = this.$loading({
          lock: true,
          text: 'Searching',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.GetShopList()



      }

    }
</script>

<style scoped>
  .shop-search{
    background:#f1f1f1 ;
    padding: 50px 110px;
  }
.goodsList {
  width: 100%;
  display: flex;
  justify-content:start;
  flex-wrap: wrap;
}
.goodsList  li {
  position: relative;
  width: 400px;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
  box-sizing: border-box;
  background-color: #fff;
  padding-bottom:30px;
  color: rgb(128,128,128);
  text-align: center;
  cursor: pointer;
  transition: all .3s ease;
}
.goodsList li:hover{
  -webkit-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,.15) !important;
}
.goodsList li .imgBox {
  width: 100%;
  height: 400px;
  overflow: hidden;
}
.goodsList li .imgBox img {
  width: 100%;
}
.til {
  font-size: 24px;
  margin-top: 5px;
}
.p1{
  line-height: 20px;
  padding: 5px;
}
.list-title span{
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.price span{
  font-size: 30px;
  color: red;
}
.price del{
  font-size: 18px;
  margin-left: 5px;
}
.btn-box{
  padding-top: 10px;
}
.off{
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  /*width: 80px;*/
  /*height: 38px;*/
  background: red;
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 5px 5px;
}
@media screen and (max-width: 800px) and (min-width: 350px){
  .shop-search{
    background:#f1f1f1 ;
    padding: 10px
  }
  .goodsList{
    justify-content: center;
  }

  .til{
    font-size: 16px;
  }
  .p1{
    font-size: 12px;
    line-height: 15px;
  }
  .price{
    font-size: 18px;
  }

  .goodsList  li{
    width: 45%;
    margin: 5px;
  }
  .goodsList li .imgBox{
    height: auto;
  }

  .off{
    font-size: 12px;
  }
}




</style>
