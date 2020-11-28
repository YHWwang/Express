<template>
    <div>
      <div class="goods-img-box">
        <img class="big-img" :src="phone.image" alt="">
        <ul class="small-img">
          <li v-for="(item,index) in imgarr"><img :class='{bg1:isBg == index}'  :src="item" alt="" @click="imgClick(item,index)" :key="index"></li>
        </ul>
      </div>
      <div class="describe-box">
        <h3 class="store-name">Blackview {{phone.storeName}}</h3>
        <div class="txt-box">
          <span class="describe">{{phone.storeInfo}}</span> <router-link class="more" style="text-decoration: underline" :to="{path:'/products/item/'+ phone.id }">{{$t('views.shopH5.more')}}>> </router-link>
        </div>
        <span  class="word-red" v-if="phone.isBenefit == 1 ">{{$t('views.shopH5.msg_1')}}</span>
        <el-rate class="star"
                 v-model="value"
                 disabled
                 show-score
                 text-color="#ff9900"
                 score-template="{value}">
        </el-rate>
        <span class="orders">{{phone.ficti +  phone.sales}} {{$t('views.shopH5.orders')}} </span>
        <div class="top-item" v-for="(item,index) in phoneList">
          <span class="text-name">{{item.name}} :</span>
          <span  v-for="(k,inx) in item.fl1" :class="' text-value '+ (k.check == true?'bg':'')" @click="mySuk(item,inx)">{{k.name}}</span>
        </div>

        <div class="top-item quantity" >
          <span class="text-name">{{$t('views.shopH5.quantity')}} :</span>
          <span class="span-qu"><i  @click="quantityClick(-1)"> - </i><i>{{guantity}}</i><i @click="quantityClick(1)"> + </i></span>
        </div>
        <div class="top-item">
          <span class="text-name">{{$t('views.shopH5.price')}} :</span><span class="price1 price">US${{phone.price}}</span><del v-if="phone.price !=phone.otPrice"  class="price2 price">US${{phone.otPrice}}</del><span v-if="phone.price !=phone.otPrice"   class="price3 price">{{GetPercent}}% OFF</span>
        </div>
        <div class="btn-box">
          <el-button class="btn-item btn-item-out" type="info" disabled v-if="!phone.stock ">{{$t('views.shopH5.btn_1')}}</el-button>
          <br>
          <el-button class="btn-item btn-item-buy" type="info"  @click="BuyNow()" v-if="phone.stock" :loading="loading">{{$t('views.shopH5.btn_2')}}</el-button>
          <br>
          <el-button class="btn-item btn-item-add" type="info" @click="addCar()" v-if="phone.stock">{{$t('views.shopH5.btn_3')}}</el-button>
        </div>
      </div>
      <ul class="tips">
        <li>
            <img src="../../assets/img/shop/h5-1.png" alt="">
            <p>{{$t('views.shopH5.tip1')}}</p>
            <p>{{$t('views.shopH5.tip2')}}</p>
        </li>
        <li>
          <img src="../../assets/img/shop/h5-2.png" alt="">
          <p>{{$t('views.shopH5.tip3')}}</p>
          <p>{{$t('views.shopH5.tip4')}}</p>
        </li>
        <li>
         <img src="../../assets/img/shop/h5-3.png" alt="">
            <p>{{$t('views.shopH5.tip5')}}</p>
            <p>{{$t('views.shopH5.tip6')}}</p>
        </li>
      </ul>
      <div class="recom sect">
        <p class="recom-title">{{$t('views.shopH5.tit')}}</p>
        <ul>
          <li  v-for="item in recommond">
            <img :src="item.image" alt="">
            <p class="name"> {{item.storeName}}</p>
            <p class="price5">${{item.price}} <del v-show="item.price != item.otPrice">${{item.otPrice}}</del></p>
            <router-link :to="{path:'/shop/buy/' + item.unitName }" class="link-recom" target="_blank"></router-link>
          </li>
        </ul>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tabs-box">
        <el-tab-pane :label="$t('views.shopH5.first')" name="first" class="tabs-item">
          <div>
            <tab-item :shopData="phone.description"></tab-item>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('views.shopH5.second')" name="second" class="tabs-item">
          <div>
            <tab-item :shopData="phone.specification"></tab-item>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('views.shopH5.third')" name="third" class="tabs-item">
          <div class="reviews">
            <p class="reviews-title">$t('views.shopH5.third')</p>
            <div class="reviews-content">
              <div class="reviews-content-l">
                <div class="text-item">{{$t('views.shopH5.msg_2')}} </div>
                <div class="reviews-item star">
                    <el-rate
                      v-model="value"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate><span> &nbsp; &nbsp; &nbsp; &nbsp;({{Mytotal}} {{$t('views.shopH5.msg_3')}})</span>
                </div>
              </div>
              <div class="reviews-content-r">
                <span v-show="WriteIsShow" class="write" @click="dialogVisible=true">{{$t('views.shopH5.WriteIsShow')}}</span>
              </div>
            </div>
            <div class="reviews-box">
              <div class="reviews-box-item" v-for="item in reviews">
                <div class="txt-star">
                  <p>{{handleUserName(item.username)}}</p>
                  <el-rate
                    v-model="item.serviceScore"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                  <p class="data-time"> {{DateTime(item.addTime) }}</p>
                </div>
                <div class="reviews-box-item-r" :data-time="item.addTime ">
                  <p>{{item.comment}}</p>
                  <div class="face" >
                    <img :src="z" alt="" v-for="(z,inx) in item.pics" :key="inx"  @click="dialogImageUrl = z,reviewsImgShow =true">
                  </div>
                  <div class="bv-Reply" v-if="item.merchantReplyContent">
                    <span class="bv-red">{{$t('views.shopH5.msg_4')}}:</span>{{item.merchantReplyContent}}
                  </div>
                </div>
              </div>
              <div class="reviews-page" v-show="show2">
                <el-pagination
                  small
                  layout="prev, pager, next"
                  :total="Mytotal"
                  :page-size="size"
                  :current-page="number + 1"
                  @size-change="sizeChange"
                  @current-change="sizeChange"
                >
                </el-pagination>
              </div>
              <!--写评论-->
              <el-dialog
                title="White a Review"
                :visible.sync="dialogVisible"
                width="90%">
                <Review @CloseDialog="CloseDialog" :productId="phone.id" v-if="dialogVisible"></Review>
              </el-dialog>
              <el-dialog :visible.sync="reviewsImgShow" class="">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

<!--      我是商品详情页h5-->
    </div>
</template>

<script>
  import { GetGoods,Getrecommond,Getreplay,addCarData} from '@/api/shop'
  import { DateTime } from '@/utils/auth'
  import { UserInfo} from "@/api/user" //登陆与否
  import Review from "../shop/Review"
  import TabItem from "../shop/TabItem"
  // import {Message} from "element-ui";
  export default {
    name: "Products",
    components:{
      Review,
      TabItem//详情和规格
    },
    data(){
      return {
        size:10,
        number:0,
        loading: false,
        activeName:"first",//切换
        dialogImageUrl:"",//放大的图片
        reviewsImgShow:false,//评论图片的查看
        show1:false,//折扣价显示与否
        show2:false,//page显示与否
        discount:"",//折扣百分比
        stock:0,//库存
        productId:"",//产品id
        phone:{
          unitName:"",
          ficti:"",//虚拟orders
          sales:"",//真实orders
          id:"",
          storeName:"",//产品名称
          otPrice:"",//原价 市场价
          image:"",//图片
          price:"",//折后价
          storeInfo:"",//简介
          repalyScore:"",//评分
          suk:"",
          productUrl:'',//产品详情页跳转
          specification:"",//产品规格
          description:""//产品描述
        },
        attrvalue:[],//对应的suk数组
        phoneList: [],//参数列表
        recommond:[],//推荐
        reviews:[],
        count:this.$store.state.count,
        isBg:0,
        istrue:"详情",
        imgarr:"",
        guantity:1,
        value:3.5,
        Mytotal:0,
        addcarList:[],
        MYbuyNow:false,//buynow加入购物车
        zoomShow:true,
        dialogVisible:false,
        WriteIsShow:false,//写评论的按钮
      }
    },
    beforeMount:function(){
      this.zoomShow =  document.body.clientWidth < 800 ? false : true
    },
    methods:{
      sizeChange(val){
        this.GetMyReplay(val-1)
      },
      handleUserName(val){
        return val.substring(0,3) +"****"+val.substring(val.length-3,val.length)
      },
      handleClick(tab, event) {
        if(tab.label == 'Reviews'){
          this.GetMyReplay(this.number)
        }
      },
      escape2Html(str) {//对数据转译
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        var res =  str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        var reg = /<pre.+?>(.+)<\/pre>/g;
        var result = res.match(reg);
        return RegExp.$1;
      },
      replaceHtml(str,key){
        var reg = new RegExp( key , "g" )
        return  str.replace( reg , '' );
      },
      DateTime,//时间处理
      jump(item){//跳转
        if( item.productUrl == null || item.productUrl == ''){
          this.$router.push(`/products/item/${item.id}`)
        }else{
          window.open(item.productUrl)
        }
      },
      mySuk(item,inx){//规格切换
        // debugger
        item.fl1.forEach(function (value) {
          value.check = false
        })
        item.fl1[inx].check = true
        var BackArr = []
        this.phoneList.forEach(function (val){
          val.fl1.forEach(function (ele) {
            if(ele.check == true){
              BackArr.push(ele.name)
            }
          })
        })
        var record = "";//记录值
        var _this = this
        var tem =  this.attrvalue.filter(ele=>{
          record = ele.suk.split(",");
          return _this.arrayEquals(record, BackArr)
        })

        if( tem.length != 0){
          tem[0].storeName = this.phone.storeName
          this.imgarr =  JSON.parse(tem[0].image)
          this.$nextTick(()=>{

          })

          this.phone.image = this.imgarr[0]
          this.phone.stock = tem[0].stock // 库存
          this.guantity = 1
          this.phone.price = tem[0].price//价格
          this.phone.otPrice = tem[0].cost
          // this.phone.suk = tem[0].unique
          this.phone.suk = tem[0].onlyUnique
          this.show1 = false;
          this.addcarList = tem[0];
        }
      },
      // //判断两个数组是否相等
      arrayEquals(array1, array2) {
        return  array1.sort().toString() == array2.sort().toString()
      },
      imgClick(url,index){
        this.isBg = index;
        this.phone.image =url
        this.$nextTick()
      },
      /*数量*/
      quantityClick(step){
        if(this.guantity == 1 && step == -1){
          Message({ message:this.$t('views.shopH5.message1'), type:'error'})
          return
        }
        if(this.guantity >= this.phone.stock && step == 1){
          Message({ message:this.$t('views.shopH5.message2'), type:'error'})
          return
        }
        this.guantity = this.guantity + step
      },
      BuyNow(){//buynow
        this.loading = true
        this.addCar()
        setTimeout(() => {
          if( this.MYbuyNow == true){
            this.$router.push("/shopping-cart")
            this.loading = false
          }
        },2000)
      },
      /*加入购物车*/
      addCar(){
        if(this.phone.suk.length<1){
          Message({ message:this.$t('views.shopH5.message3'), type:'error'})
          return
        }
        // debugger
        this.MYbuyNow = true
        var carlist = this.addcarList
        var guantity = this.guantity //商品数量

        addCarData(guantity,carlist).then( res =>{
          this.$store.dispatch('saveloginCardCount',guantity)
        }).catch(error=>{
          //错误表示没登录
          var list = this.$store.getters.carList;
          let bol = list.some(function (item) {
            if(item.id == carlist.id){//判断购物车里是否有该商品
              item.cartNum += guantity
              return true
            }
          })
          if(!bol){
            carlist.cartNum = guantity;
            this.$store.dispatch("addGoods", this.$store.getters.carList.push(carlist))
          }
          this.$store.dispatch("addGoods",list)
        })
      },
      //获取商品参数
      Getlist(){
        let _this = this;
        var arr = []
        var MyArr = []
        this.productId = this.$route.params.id
        const id = this.$route.params.id
        GetGoods(id).then(res=>{
          this.attrvalue = res.data.data.attrvalue
          this.phone.id = res.data.data.id//id
          this.phone.ficti = res.data.data.ficti//虚拟orders
          this.phone.sales = res.data.data.sales//真实orders
          this.phone.isBenefit = res.data.data.isBenefit//预售
          this.phone.unitName = res.data.data.unitName//unitName7-16开会改路由加的查询字段
          this.phone.productUrl = res.data.data.productUrl//跳转的url
          this.phone.isPostage = res.data.data.isPostage//商品在官网是否上架
          this.phone.price = res.data.data.price//折扣价
          this.phone.otPrice = res.data.data.otPrice//市场价 原价
          if(res.data.data.otPrice == 0 || res.data.data.price == 0 || res.data.data.otPrice == res.data.data.price){
            this.show1 = false;//折扣价显示与否
            this.phone.price = res.data.data.otPrice//折扣价
          }else{
            // this.discount =  this.GetPercent(res.data.data.otPrice ,res.data.data.price)
            this.show1 = true;//折扣价显示与否
          }
          this.phone.storeName = res.data.data.storeName
          this.phone.image = res.data.data.image
          this.phone.storeInfo = res.data.data.storeInfo//产品简
          this.phone.description = res.data.data.description//产品描述
          this.phone.specification = res.data.data.specification//产品规格
          this.phone.repalyScore = res.data.data.repalyScore//评分
          this.value = res.data.data.repalyScore//评分
          res.data.data.attr.forEach(function (value,index) {
            var obj = {}
            obj.name = value.attrName
            obj.id = res.data.data.id
            var fl = value.attrValues.split(",")

            // var flag = false
            fl.forEach(function (val,inx) {
              var myObj = {}
              myObj.name = val
              myObj.check = inx == 0 ? true : false//默认不选择
              // console.log(myObj);
              MyArr.push(myObj)
            })

            obj.fl1 = MyArr
            arr.push(obj)
            MyArr = []
          })
          this.phoneList = arr
          this.GetRed();
        }).catch(error=>{
          console.log(error);
        })
      },
      //获取推荐
      GetRed(){
        const id = this.$route.params.id
        Getrecommond(id).then(res=>{
          this.recommond = res.data.data
        })
      },
      /*获取评论*/
      GetMyReplay(number){
        const id = this.$route.params.id
        Getreplay(id,number).then(res=>{
          this.Mytotal = res.data.data.totalElements
          this.$nextTick(()=>{
            if(this.Mytotal>0){
              var arr  = res.data.data.content
              res.data.data.content.forEach(function (val,index) {
                arr[index].pics =JSON.parse(val.pics)
              })
              this.reviews = arr
            }else{
              this.reviews = []
            }
          })
          this.show2 = this.Mytotal == 0 ? false : true
        }).catch(error=>{
          console.log(error);
        })
      },
      CloseDialog(val){
        this.GetMyReplay(this.number)
        this.dialogVisible = false
      }
    },
    computed:{
      /*求百分比*/
      GetPercent() {
        var discount =  this.phone.price/this.phone.otPrice
        discount = parseInt((1-discount)* 100)
        return discount
      },
    },
    watch:{
      "$route.params.id":"Getlist",
      "show1":function () {
      },
      'phoneList':function () {
        var _this = this
        this.phoneList.forEach(function (val,inx) {
          _this.mySuk(val,0)
        })
      }
    },
    mounted() {
    },
    created() {
      UserInfo().then(res=>{//登陆与否
        this.WriteIsShow = true
      }).catch(error=>{
        this.WriteIsShow = false
        console.log(error);
      })
      this.Getlist();
    }
  }
</script>

<style scoped>
.tabs-box{
  padding: 0 10px;
}
  .goods-img-box{
    margin: 20px;
    /*width: 100%;*/
  }
.big-img{
  width: 100%;
  border: 1px solid rgba(128,128,128,.8);
  height: auto;
}
  .small-img{
    width: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .small-img li{
    width: 20%;
    margin: 0 5px;
  }
  .small-img img{
    width: 100%;
  }
  .star{
    margin-top: 10px;
    display: flex;
    justify-content: start;
  }
  .bg{
    border: 1px solid #00c3f5 !important;
  }
  .bg1{
    border: 1px solid #dfdfdf;
  }
  .tips{
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    height: 70px;
  }

  .tips li{
    /*width: 33%;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .tips img{
    margin-bottom: 15px;
  }
  .tips p{
    font-size:10px;
    color: rgba(0,0,0,.8);
    text-align: left;
    white-space: nowrap;
  }
  .describe-box{
    padding:0 20px;
  }
  .store-name{
    font-size: 18px;
    font-family:MyriadPro Bold ;
    margin-bottom: 10px;
  }
  .recom{
    margin:30px 20px;
  }
  .recom-title{
    text-align: center;
    font-family:MyriadPro Bold ;
    margin-bottom: 18px;
  }
  .recom ul{
    width: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

  }
  .recom ul li{
    position: relative;
    width: 43%;
    border: 1px solid rgba(128,128,128,.6);
    margin:5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 5px;

  }
  .recom ul li img{
    width:80%;
  }

  .recom ul li p {
    font-size: 12px;
    text-align: center;
    height: 20px;
    /*line-height: 20px;*/
  }
  .recom ul li .link-recom{
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .recom .name{
    font-size: 14px;
    color: rgba(128,128,128,.8);
    font-family:MyriadPro Bold ;
  }
  .recom .price5 {
    color: #fd022b;
  }
  .recom del {
    color:rgba(128,128,128,.8);
  }
  .describe{
    font-size: 14px;
  }
  .more{
    font-size: 14px;
    padding: 5px;
  }
  .top-item{
    margin-top: 10px;
  }
  .text-name{
    display: inline-block;
    width:70px;
  }
  .text-value{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    padding: 5px;
    font-size: 12px;
    border: 1px solid #dfdfdf;
    margin:5px 10px 0px 10px;
  }
  .quantity i {
    display: inline-block;
    width: 61px;
    height: 30px;
    border: 1px solid #dfdfdf;
    line-height:30px;
    text-align: center;
    font-style: normal;
    margin-left:10px;
    cursor: pointer ;
  }
  .price{
    font-size: 14px;
    display: inline-block;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
  }
  .price1{
    font-family:MyriadPro Bold;
    color:#ff3d1a;
    padding: 0 5px;
  }
  .price2{
    color: rgba(0,0,0,.8);
    padding: 0 10px;
  }
  .price3{
    color: #ffffff;
    background: #ff3d1a;
    font-size: 14px;
    position: relative;
    height: 30px;
    line-height: 30px;
  }
  .price3:before{
    content: "";
    background: #ff3d1a;
    position: absolute;
    left: -11px;
    width: 15px;
    height: 15px;
    transform: rotate(45deg) translateY(-50%) ;
    top: 50%;
  }
  .btn-box{
    text-align: center;
  }
.btn-item{
  width:80%;
  margin: 10px auto;
}
  .btn-item-buy{
    background: #133285;
    color: #ffffff;
  }
  .btn-item-add{
    background: white;
    color: #000;
  }

  .face{
    width: 100%;
  }
  .face img{
    width: 40%;
    margin: 5px;
  }

  .reviews{
    padding: 10px;
  }
  .reviews-title{
    font-family:MyriadPro Bold;
    text-align: center;
    margin-bottom: 10px;
  }

  .reviews-content-r .write{
    display: inline-block;
    height: 30px;
    width: 120px;
    border-radius: 10px;
    border: 1px solid #dfdfdf;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    color: rgba(0,0,0,.8);
    margin: 10px 0;
  }
.txt-star{
  display: flex;
  justify-content: space-between;
  margin:15px 0;
}
  .data-time{
    font-size: 12px;
    color: rgba(128,128,128,.8);
  }
  .reviews-box-item-r p{
    padding-left: 5px;
    padding-bottom: 5px;
  }
  /deep/.el-pagination{
    text-align: center;
    margin-top: 20px;
  }
  .word-red{
    color: red;
  }
.bv-Reply{
  width: 100%;
  /*height: 60px;*/
  background:#f1f1f1;
  padding: 10px;
  box-sizing: border-box;
  /*font-size: 16px;*/
}

.bv-red{
  font-size: 16px;
  color: rgba(199,1,1,.9);
}
.reviews-box-item{
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 5px;
}



/deep/ .el-tabs--card>.el-tabs__header{
  border: none;
}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav{
  /*margin-left: 20px;*/
  border:1px solid #409EFF;
}
/deep/ .el-tabs__item{
  /*font-size: 24px;*/
}

/deep/ .el-tabs__item.is-active{
  background: #409EFF;
  color: white;
}

/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item{
  border-left: 1px solid #409EFF;
  border-bottom: none;
}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__item:first-child{
  border-left: none;
}

</style>
