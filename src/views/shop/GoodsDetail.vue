<template>
  <div class="products-view" id="Products">
    <div class="top-nav">
      <div class="top-nav-box">
        <div class="left"> Blackview {{phone.storeName}}</div>
        <div class="right">
          <span>{{$t('views.shop.GoodsDetail.msg_1')}}</span>
          <span>{{$t('views.shop.GoodsDetail.msg_2')}}</span>
        </div>
      </div>
    </div>
    <div class="shop-big-box">
      <div class="part-top shop-width">
        <div class="part-top-lef">
          <div class="zoom-box">
            <VueImgZoom
              :url="phone.image"
              :scale="2"
              :width="500"
              :height="572"
              v-if="zoomShow"
            ></VueImgZoom>
            <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
              <img :src="phone.image" alt=""   v-show="flag"  class="circle" >
<!--              <p class="circle" v-show="flag"> </p>-->
            </transition>
            <img :src="phone.image" alt=""  v-if="!zoomShow">
          </div>
          <ul class="small-img">
            <li  v-for="(item,index) in imgarr"><img :class='{bg1:isBg == index}'  :src="item" alt="" @click="imgClick(item,index)" :key="index"></li>
          </ul>
        </div>
        <div class="part-top-right">
          <h3 class="title">{{phone.storeName}}</h3>
          <div >
            <div class="txt-item">
              <div class="txt-box">
                <span class="describe">{{phone.storeInfo}}</span> <span v-if="phone.isPostage" class="more" @click="jump(phone)">{{$t('views.shop.GoodsDetail.msg_3')}}</span><br>
                <span class="word-red describe" v-if="phone.isBenefit">{{phone.isBenefit}}</span>
              </div>
              <el-rate class="star"
                       v-model="value"
                       disabled
                       show-score
                       text-color="#ff9900"
                       score-template="{value}">
              </el-rate>
              <span class="orders">{{phone.ficti + phone.sales}} {{$t('views.shop.GoodsDetail.msg_5')}} </span>
            </div>
            <div>

              <div class="top-item " v-for="(item,index) in phoneList">
                <span class="text-name">{{item.name}} :</span>
                <span  v-for="(k,inx) in item.fl1" :class="' text-value '+ (k.check == true?'bg':'')" @click="mySuk(item,inx)">{{k.name}}</span>
              </div>
              <div class="top-item">
<!--                <span class="text-name">Price :</span><span class="price1 price">US${{phone.price}}</span><del v-show="show1" class="price2 price">US${{phone.otPrice}}</del><span v-show="show1"  class="price3 price">{{discount}}% OFF</span>-->
                <span class="text-name">{{$t('views.shop.GoodsDetail.Price')}}:</span><span class="price1 price">US${{phone.price}}</span><del v-if="phone.price !=phone.otPrice" class="price2 price">US${{phone.otPrice}}</del><span v-if="phone.price !=phone.otPrice"  class="price3 price">{{GetPercent}}% OFF</span>
              </div>
              <div class="top-item quantity" >
                <span class="text-name">{{$t('views.shop.GoodsDetail.Quantity')}}:</span>
                <span class="span-qu"><i  @click="quantityClick(-1)"> - </i><i>{{guantity}}</i><i @click="quantityClick(1)"> + </i></span>
              </div>
            </div>
          </div>
          <div class="btn-box">
            <el-button type="info" disabled v-if="!phone.stock ">{{$t('views.shop.GoodsDetail.btn_1')}}</el-button>
            <el-button type="info" v-if="phone.stock "  class="btn btn-buy" @click="BuyNow()" :loading="loading" >{{$t('views.shop.GoodsDetail.btn_2')}}</el-button>
            <el-button type="info" v-if="phone.stock " class="btn btn-add" @click="addCar(1)" >{{$t('views.shop.GoodsDetail.btn_3')}}</el-button>
<!--            <span  class="btn btn-buy" @click="BuyNow()" v-if="phone.stock" :loading="loading">Buy Now</span>-->
<!--            <span class="btn btn-add" @click="addCar(1)" v-if="phone.stock">Add to Cart</span>-->
          </div>
          <ul class="tips">
            <li>
              <div><img src="../../assets/img/shop/detail1.png" alt=""></div>
              <div class="p-txt">
                <p>{{$t('views.shop.GoodsDetail.p1')}}</p>
                <p>{{$t('views.shop.GoodsDetail.p2')}}</p>
              </div>
            </li>
            <li> <div><img src="../../assets/img/shop/detail2.png" alt=""></div>
              <div class="p-txt">
                <p>{{$t('views.shop.GoodsDetail.p3')}}</p>
                <p>{{$t('views.shop.GoodsDetail.p4')}}</p>
              </div>
            </li>
            <li>
              <div><img src="../../assets/img/shop/detail3.png" alt=""></div>
              <div class="p-txt">
                <p>{{$t('views.shop.GoodsDetail.p5')}}</p>
                <p>{{$t('views.shop.GoodsDetail.p6')}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="recom sect">
        <p class="recom-title">{{$t('views.shop.GoodsDetail.p7')}}</p>
        <ul class="shop-width">
          <li  v-for="item in recommond">
            <img class="lazyload" :data-src="item.image" :alt="item.storeName">
            <p class="name"> {{item.storeName}}</p>
            <p class="price5">${{item.price}} <del v-show="item.price != item.otPrice">${{item.otPrice}}</del></p>
            <router-link :to="{path:'/shop/buy/' + item.unitName }" class="link-recom" target="_blank"></router-link>
          </li>
        </ul>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tabs-box shop-width">
        <el-tab-pane :label="$t('views.shop.GoodsDetail.first')" name="first" class="tabs-item">
       <div v-html="phone.productDescription">
<!--         <tab-item :shopData="phone.description"></tab-item>-->
       </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('views.shop.GoodsDetail.second')" name="second" class="tabs-item">
         <div v-html="phone.specification">
<!--           <tab-item :shopData="phone.specification"></tab-item>-->
         </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('views.shop.GoodsDetail.third')" name="third" class="tabs-item">
          <div class="reviews">
            <p class="reviews-title">{{$t('views.shop.GoodsDetail.third')}}</p>
            <div class="reviews-content">
              <div class="reviews-content-l">
                <div class="text-item">{{$t('views.shop.GoodsDetail.msg_6')}}</div>
                <div class="reviews-item star">
                  <p v-if="reviews.length" >
                    <el-rate
                      v-model="value"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </p>
                </div>
                <div class="text-item">({{Mytotal}} {{$t('views.shop.GoodsDetail.Mytotal')}})</div>
              </div>
              <div class="reviews-content-r">
                <span v-show="WriteIsShow" class="write" @click="dialogVisible=true">{{$t('views.shop.GoodsDetail.WriteIsShow')}}</span>
              </div>
            </div>
            <div class="reviews-box">
              <div class="reviews-box-item" v-for="item in reviews">
                <div class="reviews-box-item-box">
                  <div class="txt-star">
                    <p>{{handleUserName(item.username)}}</p>
                    <!--                  <p>{{item.username.subscribe(3)}}</p>-->
                    <el-rate
                      v-model="item.serviceScore"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </div>
                  <div class="reviews-box-item-l">
                    <div class="face" >
                      <img :src="z" alt="" v-for="(z,inx) in item.pics" :key="inx"  @click="dialogImageUrl = z,reviewsImgShow =true">
                    </div>
                  </div>
                  <div class="reviews-box-item-r" :data-time="item.addTime ">
                    <p> {{$t('views.shop.GoodsDetail.addTime')}} : {{DateTime(item.addTime) }}</p>
                    <p class="content">{{item.comment}}</p>
                  </div>
                </div>
                <div class="bv-Reply" v-if="item.merchantReplyContent">
                  <span class="bv-red">{{$t('views.shop.GoodsDetail.merchantReplyContent')}}:</span>{{item.merchantReplyContent}}
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
                width="30%">
                <Review @CloseDialog="CloseDialog" :productId="phone.id" v-if="dialogVisible"></Review>
              </el-dialog>
              <el-dialog :visible.sync="reviewsImgShow" class="">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import { GetGoods,Getrecommond,Getreplay,addCarData} from '@/api/shop'
  import { DateTime } from '@/utils/auth'
  import { UserInfo} from "@/api/user" //登陆与否
  import VueImgZoom from "./ImgZoom"
  import Review from "./Review"
  // import TabItem from "./TabItem"
  // import {Message} from "element-ui";
  export default {
    name: "Products",
    components:{
      VueImgZoom,
      Review,
      // TabItem//详情和规格
    },
    data(){
      return {

        size:10,
        number:0,
        loading: false,
        flag: false,
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
          description:"",//产品描述
          productDescription:"",//新加商品描述
          ficti:"",//产品虚拟销量
          sales:"",//产品真实销量
          isBenefit:"",//预售
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
        value:5,
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
        // console.log(this.number);
      },
      beforeEnter(el){
        el.style.transform = "translate(0, 0)"
      },
      enter(el, done){
        // el.offsetWidth 强制html渲染动画
        el.offsetWidth //这句话如何不写就不会有动画效果直接渲染的
        var scroll = document.documentElement.scrollTop || document.body.scrollTop;//获取卷曲的高度
        var x = document.body.clientWidth - el.clientWidth - el.offsetLeft
        var y = el.offsetTop + 60 + 25+180-scroll
        el.style.transform = `translate(${x}px,-${y}px)`
        el.style.transition = "all 2s ease";
        done()
      },
      afterEnter(el){
        this.flag = !this.flag
      },
      handleUserName(val){
       return val.substring(0,3) +"****"+val.substring(val.length-3,val.length)
      },
      handleClick(tab, event) {
     if(tab.label == 'Reviews'){
       this.GetMyReplay(this.number)
     }
      },
      DateTime,//时间处理
      jump(item){//跳转
        if(   item.productUrl == null || item.productUrl == ''){
          this.$router.push(`/products/item/${item.unitName}`)
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
          // debugger
          this.imgarr =  JSON.parse(tem[0].image)
          this.$nextTick(()=>{

          })
          this.phone.image = this.imgarr[0]
          this.phone.stock = tem[0].stock // 库存
          this.guantity = 1
          this.phone.price = tem[0].price//价格
          this.phone.otPrice = tem[0].cost//价格
         // this.discount =  this.GetPercent(tem[0].cost,tem[0].price)
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
      },
      /*数量*/
      quantityClick(step){
        if(this.guantity == 1 && step == -1){
          Message({ message:this.$t('views.shop.GoodsDetail.guantity_msg1'), type:'error'})
          return
        }
        if(this.guantity >= this.phone.stock && step == 1){
          Message({ message:this.$t('views.shop.GoodsDetail.guantity_msg2'), type:'error'})
          return
        }
        this.guantity = this.guantity + step
      },
      BuyNow(){//buynow
        this.loading = true
        this.addCar()
        setTimeout(() => {
          if( this.MYbuyNow == true){
            this.loading = false
            this.$router.push("/shopping-cart")
          }
        },2000)

      },
      /*加入购物车*/
      addCar(flag){
        if(flag){
          this.flag=!this.flag
        }
        if(this.phone.suk.length<1){
          Message({ message:this.$t('views.shop.GoodsDetail.error'), type:'error'})
          return
        }
        this.MYbuyNow = true
        var carlist = this.addcarList
        carlist.addtime =  Date.now();

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
          this.phone.ficti = res.data.data.ficti//产品虚拟销量
          this.phone.sales = res.data.data.sales//产品真实销量
          // this.phone.isBenefit = res.data.data.isBenefit//预售
          this.phone.isBenefit = res.data.data.isBenefit == 0 ? false : res.data.data.isBenefit //预售
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
          this.phone.productDescription = res.data.data.productDescription//产品描述
          this.phone.specification = res.data.data.specification//产品规格
          this.phone.repalyScore = res.data.data.repalyScore//评分
          this.value = res.data.data.repalyScore//评分
          res.data.data.attr.forEach(function (value,index) {
            var obj = {}
            obj.name = value.attrName
            obj.id = res.data.data.id
            var fl = value.attrValues.split(",")
            fl.forEach(function (val,inx) {
              var myObj = {}
              myObj.name = val
              myObj.check = inx == 0 ? true : false//默认不选择
              MyArr.push(myObj)
            })

            obj.fl1 = MyArr
            arr.push(obj)
            MyArr = []
          })
          this.phoneList = arr
          this.GetRed();
          var url = res.data.data.hotImg//详情页的js
          if(url){
            var jsArr = url.split(",")
            jsArr.forEach(jsItem => {
              const s = document.createElement('script');
              s.type = 'text/javascript';
              s.src = jsItem
              s.className = 'bv-yang'
              document.body.appendChild(s);
            })

          }
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

            if(this.Mytotal>0){
              var arr  = res.data.data.content
              res.data.data.content.forEach(function (val,index) {
                arr[index].pics =JSON.parse(val.pics)
              })
              this.reviews = arr
            }else{
              this.reviews = []
            }
          this.$nextTick(()=>{
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
    },
    destroyed(){
      var target = document.getElementsByClassName('bv-yang')
      if(target != null){
        var len  = target.length
        for(var i = 0 ;i<len ; i++){
          document.body.removeChild(target[0])
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .products-view{
    width: 100%;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    background: #f1f1f1;
  }

  /*头部*/
  .top-nav{
    width: 100%;
    height: 56px;
    background: #e6e6e6;
    margin-bottom: 30px;
  }
  .top-nav-box{
    max-width: 1430px;
    width: 100%;
    height: 56px;

    margin: 0 auto;
  }
  .top-nav-box .left{
    float: left;
    color: #133285;
    font-size: 24px;
    height: 100%;
    line-height: 56px;
    font-family:MyriadPro Bold ;
  }
  .top-nav-box .right{
    float: right;
  }
  .top-nav-box .right span{
    font-size: 18px;
    display: inline-block;
    margin-left: 47px;
    height: 56px;
    line-height: 56px;
  }

  .shop-big-box{
    max-width: 1480px ;
    margin:10px auto;
  }
  .part-top-right {
    margin-left: 80px;
  }

  .part-top{
    height: 806px;
    background: white;
    padding: 50px;

  }
  .shop-width{
    width: 1380px;
    margin: 0 auto;
  }
  .part-top{
    width:1380px;
    display: flex;
    justify-content: left;
    .part-top-left{
      position: relative;
      width: 500px ;
      height: 100%;

    }
    .tabs-box{

      height: 100%;

      .top-item {

        height: 85px;
        line-height: 85px;
      }
    }

  }
  .top-item{
    margin: 10px;
  }
  .bg{
    border: 1px solid #00c3f5 !important;
  }
  .bg1{
    border: 1px solid #dfdfdf;
  }
  .zoom-box {
    width:500px;
    height:572px;
    border: 1px solid #dfdfdf;
    position: relative;

  }
  .small-img{
    margin-top: 50px;
    width: 500px;

    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .small-img li{
    position: relative;
    width: 20%;
    text-align: center;
    margin-top: 20px;
    box-sizing: border-box;

  }
  .small-img li img{
    width: 80%;
  }

  .part-top-right .title{
    font-family:MyriadPro Bold ;
    font-size: 48px;
  }
  .txt-item{
    height: 120px;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    /*line-height: 100px;*/
  }
  .txt-box{
    height: 70px;
    /*line-height: 70px;*/
  }
  .txt-item .describe{
    font-size: 18px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
  .txt-item .more{
    position: absolute;
    display: inline-block;
    /*height: 80px;*/
    /*line-height: 40px;*/
    color: rgba(0,0,0,.5);
    font-size: 18px;
    float: right;
    cursor: pointer;
    bottom:15px;
    right: 0;
  }
  .txt-item .more:hover{
    text-decoration: underline;
  }
  .txt-item .star{
    font-size: 30px;
  }
  /*规格部分*/
  .top-item .text-name{
    display: inline-block;
    font-size: 24px;
    width: 100px;
    color:rgba(0,0,0,.8);
  }
  .top-item .text-value{
    display: inline-block;
    height: 53px;
    line-height: 53px;
    border: 1px solid #dfdfdf;
    font-size: 18px;
    margin-left: 30px;
    padding:0px  20px;
  }
  .part-top-right .tips{
    display: block;
  }
  .price{
    font-size: 33px;
    display: inline-block;
    height: 53px;
    line-height: 53px;
    padding: 0 20px;
  }
  .price1{
    font-family:MyriadPro Bold;
    color:#ff3d1a;
  }
  .price2{
    color: rgba(0,0,0,.8);
  }
  .price3{
    color: #ffffff;
    background: #ff3d1a;
    font-size: 18px;
    position: relative;
    height: 40px;
    line-height: 40px;
  }
  .price3:before{
    content: "";
    background: #ff3d1a;
    position: absolute;
    left: -14px;
    width: 20px;
    height: 20px;
    transform: rotate(45deg) translateY(-50%) ;
    top: 50%;
  }
  .quantity i {
    display: inline-block;
    width: 61px;
    height: 47px;
    border: 1px solid #dfdfdf;
    line-height: 47px;
    text-align: center;
    font-style: normal;
    margin-left: 20px;
    cursor: pointer ;
  }
  .span-qu{
    margin-left: 10px;
  }
  .btn-box {
    margin-top: 30px;
  }
  .btn-box .btn{
    cursor: pointer;
    display: inline-block;
    // width: 129px;
    height: 53px;
    /*line-height: 53px;*/
    font-size: 18px;
    text-align: center;
    border-radius: 10px;
  }
  .btn-box .btn-buy{
    background: #133285;
    color: #ffffff;
    margin-right: 20px;
  }
  .btn-box .btn-add{
    border: 1px solid #dfdfdf;
    background: white;
    color:black;
  }
  .tips{
    display: flex;
    justify-content: start;
    margin-top: 50px;
    height: 70px;
  }

  .tips li{
    display: flex;
    margin-right: 20px;
  }
  .tips .p-txt{
    margin-left: 10px;
    height: 70px;
    display: flex;
    flex-direction:column;
    /*align-items:center;*/
    justify-content: center;
    line-height: 24px;
  }
  .tips p{
    font-size: 18px;
    color: rgba(0,0,0,.8);
    text-align: left;
    white-space: nowrap;
  }
  .recom ul{
    background: white;
    /*width: 1380px;*/
    padding: 50px;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }
  .recom ul li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 210px;
    /*padding: 30px 0px 10px 10px;*/
    border: 1px solid #dfdfdf;
    height: 307px;
    box-sizing: border-box;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .recom ul li img{
    height: 200px;
    width: auto;
  }
  .recom ul li p {
    font-size: 18px;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .recom ul li .link-recom{
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

  }
  .recom  .name{
    color: rgb(128,128,128);
    font-family:MyriadPro Bold;
    font-size: 24px;
    margin-top: 10px;
  }
  .recom .price5 {
    color: #fd022b;
    font-size: 24px;
  }
  .price5 del{
    color: rgba(128,128,128,.8);
    font-size: 20px;
  }
  .recom  .recom-title{
    height: 70px;
    line-height: 70px;
    text-indent: 2em;
    font-size: 24px;
  }
  .sect {
    margin-top: 50px;
  }
  /*评论部分*/
  .reviews{
    /*margin:80px  0px;*/
    background: white;
    padding: 0px 50px 50px;
  }
  .reviews .reviews-title{
    height: 70px;
    line-height: 70px;
    font-size: 24px;
  }

  .reviews-content{
    background: #f1f1f1;
    display: flex;
    justify-content: space-between;
  }
  .reviews-content-l{
    margin-left: 30px;
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
  }
  .reviews-content-l .text-item{
    font-size: 18px;
  }
  .reviews-content-l .star{
    height: 44px;
    position: relative;
    width: 150px;
    margin: 0 5px;

  }
  .reviews-content-l .star>p{
    width: 100%;
    position: absolute;
    height: 20px;
    line-height: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .reviews-content-r{
    height: 44px;
    position: relative;
    display: flex;
    width: 150px;
  }

  .reviews-content-r .write{
    display: inline-block;
    height: 30px;
    width: 120px;
    border-radius: 10px;
    border: 1px solid #dfdfdf;
    text-align: center;
    line-height: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: rgba(0,0,0,.8);
  }
  .reviews-box-item-box{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dfdfdf;
    padding: 20px 0px;
  }
  .reviews-box-item-l{
    max-width:350px ;
    display: flex;
    justify-content: left;
  }
  .reviews-box-item-r p{
    /*padding-bottom: 5px;*/
  }


  /*头像*/
  .face{
    display: flex;
    justify-content: center;
  }
  .face img{
    width: 103px;
    height: 103px;
    margin-left: 10px;
  }
  .txt-star{
    display: flex;
    flex-direction:column;
    justify-content: center;
    line-height: 24px;
    margin-left: 20px;
  }
  .reviews-box-item-r{
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    line-height: 24px;
  }
  .reviews-box-item-r{
    text-align: right;
  }
  /*分页*/
  .reviews-page{
    text-align: center;
    margin-top: 30px;
  }
  .tabs-box{
    background: white;
    margin-top: 50px !important;
    /*margin: 50px 0px;*/
    padding: 50px;
    /*padding-top: 20px;*/
  }
  /deep/ .el-tabs--card>.el-tabs__header{
        border: none;
  }
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav{
  margin-left: 20px;
  border:1px solid #409EFF;
}
  /deep/ .el-tabs__item{
    font-size: 24px;
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
  .tr-item{
    font-width: bold;
    color: red;
  }
  .reviews-box-item-r .content{
    max-width: 600px;
    word-wrap: break-word;
  }

  .circle{
    position: absolute;
    width: 50px;
    height: 50px;
    top:50%;
    left: 50%;
    z-index: 10;
  }
  .orders{
    display: inline-block;
    padding: 10px 0;
  }
  .word-red{
    color: red;
    font-size: 18px;
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
    font-size: 20px;
    color: rgba(199,1,1,.9);
  }


  @media screen and (max-width: 1500px) and (min-width: 800px){
    .shop-width{
      width: 90%;
    }
    .part-top-right {
      margin-left: 40px;
      width: 53%;
    }
    .tips p{
      font-size: 14px;
    }
    .top-nav-box .right{
      padding-right: 10px;
    }
  }


</style>
