<template>
  <div class="shop-list">
    <div v-for="(item,index) in keywords">
      <Item :keywords="item" :key="index"></Item>
    </div>

  </div>
</template>

<script>

  import { shopCatalog} from "@/api/home" //获取所以商品目录
  import Item from "./Item"
  export default {
    name: "index",
    components:{
      Item
    },
    data(){
      return {
        shopList:[],
        keywords:[],
      }
    },
    methods:{
      GetShopList(){
        this.keywords = [];
        const word = this.$route.params.word
        if(word == "all"){
          var allArr = [];
          var list = []
          var productSum = []
          /*获取全部的*/
          shopCatalog().then(res=>{
            allArr = res.data.data.content
            var obj = {}//数量和关键字存入对象
            allArr.forEach(function (val) {
              obj.keyword  = val.keyword
              obj.sum  = val.productSum
              list.push(obj)
              obj = {}
            })
            this.keywords = list;

          }).catch(error=>{

          })

        }else{
          this.keywords = [];
          var obj  = {
            keyword :word,
            sum : ''
          }
          this.keywords[0] =  obj

        }
      }

    },
    watch:{
      "$route.params.word":"GetShopList",
    },
    created() {
      this.GetShopList()
    }
  }
</script>

<style scoped>
  .shop-list{
    background: #f1f1f1;
    padding:50px 60px 50px 110px;
  }
  @media screen and (max-width: 800px) and (min-width: 200px){
    .shop-list{
      padding: 0;
    }
  }

  @media screen and (max-width: 1580px) and (min-width: 1250px){
    .shop-list {
      padding:50px 20px 50px 60px;
    }
  }
  @media screen and (max-width: 1250px) and (min-width: 800px){
    .shop-list {
      padding:30px ;
    }
  }
</style>
