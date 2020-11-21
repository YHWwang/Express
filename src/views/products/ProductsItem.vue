<template>
 <div style="position: relative">
   <div class="nav" id="Products">
     <div class="item">
       <div class="left">{{name}}</div>
       <div class="right">
         <span>{{$t('views.products.tit4')}}</span>
         <span @click="openParam" style="cursor: pointer" >{{$t('views.products.msg3')}}</span>
         <router-link :to="{path:`/shop/buy/${id}`}" v-if="isShow">
              <span class="buy">{{$t('views.products.buy')}}</span>
         </router-link>
       </div>
     </div>
   </div>
      <div class="content" v-html="description">
      </div>
   <el-dialog
     title="Parameters"
     :visible.sync="dialogVisible"
     :width="width">
    <tab-item :shopData="specification"></tab-item>
   </el-dialog>
  </div>
</template>
<script>
  import TabItem from "../shop/TabItem"
  import {productsItem} from "@/api/products"
  export default {
    name: "ProductsItem",
    components:{
      TabItem
    },
    data(){
      return{
        dialogVisible:false,
        name:"",
        description:"",
        id:"",
        isShow:false,
        specification:""
      }
    },
    beforeMount:function(){
      if(document.body.clientWidth>800){
        this.width = "50%"
      }else{
        this.width = "90%"
      }
    },
    methods:{
      openParam(){
        this.dialogVisible = true
      },
      // escape2Html(str) {//对数据转译
      //       var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      //       return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
      // },
      // replaceHtml(str,key){
      //   var reg = new RegExp( key , "g" )
      //   return  str.replace( reg , '' );
      // },
      GetData(){
        this.id = this.$route.params.id;
        productsItem(this.$route.params.id).then(res=>{
          this.name = res.data.data.storeName
          this.specification = res.data.data.specification
          this.isShow = res.data.data.isShow
          this.description = res.data.data.description
          var url =res.data.data.hotImg
         if(url==false){

         }else{
           const s = document.createElement('script');
           s.type = 'text/javascript';
           s.src = url
           s.async = 'true';
           document.body.appendChild(s);
         }


        }).catch(error=>{
          console.log(error);
        })
      }
    },
    watch:{
      "$route.params.id":"GetData"
    },
    created() {
    this.GetData()
    }
  }
</script>

<style scoped>
  /*@import "src/assets/css/bootstrap.min.css"*/
.content{
  overflow: hidden;
  width: 100%;
  text-align: center;

}
.content img{
  width: 100%;
  height: auto;
}

.nav{
  position: fixed;
  top:159px;
  left: 0;
  background: #fff;
  width: 100%;
  height: 50px;
  line-height: 50px;
  /*background-color:#fff;*/
  opacity: .8;
  z-index: 3;
}
  .nav .item{
    max-width: 1000px;
    margin: 0 auto;
    height: 100%;
  }
 .nav .item .left{
   float: left;
 }
.nav .item .right{
  float: right;
}
.item span{
  display: inline-block;
  padding: 0 10px;
  line-height: 30px;
}
  .buy{
    background: #c22e32;
    color: white;
    cursor: pointer;
  }
  @media screen and (max-width: 960px) and (min-width: 350px){
    .nav{
      top: 104px;
    }
  }

</style>
