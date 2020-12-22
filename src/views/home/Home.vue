<template>
  <div id="Home">
    <!-- 订阅   -->
    <el-dialog class="sub-dialog"
      :visible.sync="dialogVisible1"
          :width="subW"
      :before-close="handleClose">
    <img class="sub-close" @click="dialogVisible1=false" src="https://www.blackview.hk/uploads/page/shop/close.jpg" alt="">
<!--      <Subscribe v-if="subShow" class="subscribe"></Subscribe>-->
      <BL6000ProSub  class="subscribe"></BL6000ProSub>
    </el-dialog>

<!--    <Subscribe v-if="subShow" class="subscribe"></Subscribe>-->
      <!--写死的数据-->
<!--    <HomeBanner></HomeBanner>-->
   <!--前后端交互数据-->
    <BanerData style="min-height: 900px"></BanerData>
    <div class="explore">
      <div id="video" ref="video">
        <div  class="more">
          <router-link to="/video" class="link">
            <span class="more-word">{{$t('views.home.home.tit')}}</span> >
          </router-link>
        </div>
        <ul :class="'video-box  ' +videoFadeIn">
          <li @mouseover="DoMouse(true,item)" @mouseout="DoMouse(false,item)" :class="item.status?'video-item-pc':'hover video-item-pc'" v-for=" (item,index) in videoList" @click="videoOpan(item)">
            <div class="video-bg">
              <img class="lazyload" :data-src="item.pic" alt="">
            </div>
            <div class="video-word">
              <p class="video-p1">{{item.name}}</p>
              <p class="video-p2">{{item.wxapp_url}}</p>
              <img :src="playIcon" alt="">
            </div>
          </li>
          <li v-for=" item in videoList" class="video-item-app">
          <iframe class="lazyload"  :height="iframeHeight" :width="iframeWidth" :data-src="item.ipStatus ? item.url:item.youKu" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </li>
        </ul>
      </div>
      <div id="News"  ref="news">
        <div  class="more">
          <router-link to="/news" class="link"><span class="more-word">{{$t('views.home.home.tit')}}</span> ></router-link>
        </div>
        <ul :class="'bv-news ' + newsFadeIn" ref="news">
          <li v-for="(item,index) in newsList" @mouseover="DoNewsMouse(true,item)" :key="index" @mouseout="DoNewsMouse(false,item)"  :class="item.hide?'':'hover'">
            <router-link :to="{path:'/newsdetail/'+item.id}">
              <div class="news-bg">
                <img :data-src="item.imageInput" class="lazyload" alt="">
              </div>
              <div class="news-word">
                <p class="p1">{{item.synopsis}}</p>
                <span class="p2">{{$t('views.home.home.tit')}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <HomeSubscribe></HomeSubscribe>
    </div>
    <div class="clear"></div>
    <el-dialog
      title="Video"
      :visible.sync="dialogVisible"
      width="850px"
      :before-close="handleClose">
      <iframe class="video-iframe lazyload" width="800" height="400" :data-src="videoBigUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <span slot="footer" class="dialog-footer">
  </span>
    </el-dialog>
  </div>
</template>

<script>
  // import Subscribe from "./Subscribe"
  import BL6000ProSub from "./BL6000ProSub"
  // import HomeBanner from  "./HomeBanner"
  import BanerData from "./BanerData"
  import HomeSubscribe from  "./HomeSubscribe"
  import {GetVideo,GetNews} from "@/api/home"
  // import Cookies from "js-cookie";
  export default {
    name: "Home",
    data() {
      return {
        subW:"",
        IframeH:"",
        bannerUrl:"",
        videoFadeIn:"",//视频hover class
        newsFadeIn:"",//新闻hover class
        playIcon:require("@/assets/img/play.png"),
        videoHoverClass:true,
        videoBigUrl:"",
        iframeHeight:"",
        iframeWidth:"",
        imgHeight:"",
        imgListy :[],
        videoList:[],
        newsList1:"",
        newsList:'',
        dialogVisible: false,
        dialogVisible1: true,//订阅
        subShow:true,
      };
    },
    components:{
      // Subscribe,//暂时不用弹框订阅
      BL6000ProSub,//弹框订阅
      // HomeBanner,//banner
      BanerData,
      HomeSubscribe//footer订阅
    },
    beforeMount:function(){
      if(document.body.clientWidth>800){
        this.subW = '740px'
        this.imgHeight =document.body.clientWidth*940/1920
        this.iframeWidth= 400
        this.iframeHeight = 400*0.5625
      }else{
        this.imgHeight = document.body.clientWidth*652/600;//banner img
        this.iframeWidth = document.body.clientWidth -40//video
        this.subW  = document.body.clientWidth -40 +'px'//订阅
        this.iframeHeight=(document.body.clientWidth -40)*0.5625
      }
    },
    mounted: function () {
      window.addEventListener('scroll', this.handleScroll,true);  // 监听（绑定）滚轮滚动事件
    },
    methods: {
      handleScroll(){
        var scroll = document.documentElement.scrollTop || document.body.scrollTop;
        var videoTop = this.$refs.video.offsetTop-500
        var newsTop = this.$refs.news.offsetTop-500
        this.videoFadeIn = scroll>videoTop ?  "video-fade-in" : ""
        this.newsFadeIn = scroll>newsTop ?  "news-fade-in" : ""
      },
      /*video鼠标移入移出效果*/
      DoMouse(flag,item){
        this.playIcon= flag ? require("@/assets/img/playhover.png") :  require("@/assets/img/play.png")
        item.status = flag ? 0 : 1
        this.$nextTick()
      },
      /*新闻鼠标移入移出效果*/
      DoNewsMouse(flag,item){
        item.hide = !flag
        this.$nextTick()
      },
      ToNews(item){
        this.$router.push(`/newsdetail/${item.id}`)
      },
      videoOpan(item){
        // console.log(item);
        this.videoBigUrl = item.ipStatus?item.url:item.youKu
        // this.videoBigUrl =item.url
        this.dialogVisible = true
      },
      cookie(){
        var key = 'sub-5g'//订阅的
        var cooke  =  localStorage.getItem(key)
        // var cooke =  Cookies.get("sub")//订阅
        if(cooke){
          this.dialogVisible1 = false
        }else{
          // Cookies.set('sub',true, { expires: 31536000000})
          this.dialogVisible1 = true
          localStorage.setItem( key, true)
        }
      },
      handleClose(done){
        this.dialogVisible = false
        this.dialogVisible1 = false
      },
    },
     async created() {
       this.cookie()
      var videoData = await GetVideo()//视频
         if(videoData.status == 200) {
           var _this = this
           var item = "";
           videoData.data.data.forEach(function(val,index) {
             item = JSON.parse(val.value)
             item.ipStatus = videoData.data.data[index].ipStatus
             _this.videoList.push(item)
           })
         }else{
           console.log(videoData);
         }
       var GetNewsData = await GetNews()//新闻
       if(GetNewsData.status == 200) {
         this.newsList = GetNewsData.data.data
       }else {
         console.log(GetNewsData);
       }
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll,true);   // 离开页面清除（移除）滚轮滚动事件
    }
  }
</script>

<style  lang="scss" scoped>
.sub-dialog{
  /*position: relative;*/
  top: 50%;
  transform: translateY(-50%);
  height: 100%;

}
/deep/ .sub-dialog .el-dialog__body{
  padding: 0;
  background: url("https://www.blackview.hk//uploads/page/shop/sub-bg.jpg") no-repeat 100% 100%;
  border-radius: 20px;
}

/deep/ .sub-dialog .el-dialog {
  border-radius: 20px;
}

  .sub-close{
  position: absolute;
  top: -20px;
  right: -20px;
  z-index: 30003;
  color: red;
}
.sub-close{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
/deep/ .sub-dialog .el-dialog__header{
  display: none;
}
  /deep/ .el-carousel__button{
    width: 20px;
    height: 20px;
    border-radius: 20px;
  }
  .banner img{
    width: 100%;
  }
  @media screen and (max-width:800px) and (min-width:300px){
    .clear{
      height: 10px;
    }
    /deep/ .sub-dialog .el-dialog__body{
      background: none;
    }
  }
  #Home{
    position: relative;

  }
  @media screen and (min-width:1200px) {
    #home{
      min-width: 1200px;
    }
  }
  .banner{
    width: 100%;
    position: relative;
  }

  .star-product{
    background: #f1eff4;
  }
  .explore{
    background: #f1eff4;
    width: 100%;
  }
  #video{
    width: 100%;
    background: white;
  }
  .explore .video-box{
    width: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;

    box-sizing: border-box;
    padding: 20px
  }
  .explore .video-box .video-item-pc{
    position: relative;
    display: list-item;
    width: calc(50% - 10px);
    /*height: 500px;*/
    height:calc(50% - 10px);
    margin-bottom: 20px;
    overflow: hidden;
    background-color: #f2f2f2;
    cursor: pointer;
    max-height: 500px;
  }
  .explore .video-box .video-item-pc:nth-child(even){
    margin-left: 20px;
  }
  .video-box .video-bg{
    width: 100%;
    opacity:1;
    overflow: hidden;
    height: 100%;
  }
  .video-box .video-bg:before{
    transition: all .5s ease;
    transition-delay: .1s;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
  }

  .video-box .hover .video-bg:before {
    opacity:0.2;
    z-index: 99;
  }
  .video-bg img{
    opacity: 0;
    width: 100%;
    height: 100%;
    transform: scale(1.06);
    transition: all .5s ease;
  }

 .video-fade-in .video-bg img{
    transform: scale(1);
    opacity: 1;
  }
  .video-box .hover .video-bg img{
    transform: scale(1.06);
  }
  .video-box .video-word{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    padding-top: 40px;
  }
  .video-word p{
    font-size: 36px;
    color: rgba(0,0,0,.8);
    opacity: 0;
    transition: all .5s ease;
    transform: translateY(50px);

  }
  .video-word .video-p1{
    transition-delay:.1s;
  }
  .video-word .video-p2{
    transition-delay:.3s;
  }
  .video-fade-in .video-word p{
    opacity: 1;
    transform: translateY(0);
  }
  .video-word img{
    margin-top:26px ;
    opacity: 0;
    transform: translateY(50px);
    transition: all .5s ease;
    transition-delay:.5s;
  }
  .video-fade-in .video-word img{
    opacity: 1;
    transform: translateY(0);
  }
  .video-item-app{
    display: none;
  }
  .more{
    position: relative;
    height: 20px;

    font-size: 18px;
  }
  .more .link{
    position: absolute;
    transition: all .3s ease;
    display: inline-block;
    width:80px;
    top: 0;
    right:20px;
    text-align: left;

  }
  .more .more-word{
    transition: all .3s ease;
  }
  .more .link:hover .more-word{
    text-decoration: underline;
    color: #133285;
    margin-right: 5px;
  }


  @media screen and (max-width:800px) and (min-width:200px){
    .sub-close{
      right: -10px;
    }
    .video-item-app{
      display: block;
    }
    .explore .video-box  {
           flex-wrap: wrap;
      }

    .explore .video-box .video-item-pc{
      display: none;
    }
  }

  #News{
    width: 100%;
    background: white;
  }
  .bv-news{
    width: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;

    box-sizing: border-box;
    padding:  10px 20px 20px;
  }
  .bv-news li{
    position: relative;
    display: list-item;
    width: calc(50% - 10px);
    /*height: 500px;*/
    height:calc(50% - 10px);
    margin-bottom: 20px;
    overflow: hidden;
    background-color: #f2f2f2;
    cursor: pointer;
    max-height: 500px;
  }
  .bv-news li:nth-child(even){
    margin-left: 20px;
  }
  .bv-news .news-bg{

  }

  .bv-news .news-bg{
    width: 100%;
    opacity:1;
    overflow: hidden;
    height: 100%;
  }
  .bv-news .news-bg:before{
    transition: all .5s ease;
    transition-delay: .1s;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
  }

  .bv-news .hover .news-bg:before {
    opacity:0.5;
    z-index: 99;
  }
  .news-bg img{
    width: 100%;
    height: 100%;
    opacity:0;
    transform: scale(1.06);
    transition: all .5s ease;
  }
  .news-fade-in   .news-bg img{
    opacity:1;
    transform: scale(1);
  }
  .bv-news .hover .news-bg img{
    transform: scale(1.06);

  }
  .bv-news .news-word{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    padding-top: 40px;
    z-index: 100;
  }
  .news-word p{
    transition: all .5s ease;
  }
  .news-word .p1{
    color: white;
    text-align: center;
    margin-bottom: 10px;
    font-size: 36px;
    transition-delay:.1s;
    opacity: 0;
  }
  .news-word .p2{
    position: relative;
    transition-delay:.3s;
    font-size: 18px;
    color: #fff;
    opacity: 0;

  }
 .hover .news-word .p2{
   text-decoration: underline;
   opacity: .7;
 }

  .news-word .p2:after{
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    right: -20px;
    content: ">";
    transition: all .5s ease;
  }
  .bv-news .hover .p2:after{
    right: -25px;
  }
  .news-word p,.news-word .p2{
    transform: translateY(50px);
  }
  .news-fade-in .news-word p,  .news-fade-in .news-word .p2{
    opacity: 1;
    transform: translateY(0);
  }
  @media screen and (max-width:800px) and (min-width:200px){
 .bv-news{
    flex-wrap: wrap;
  }

    .bv-news li{
      width: 100%;
      /*height: 200px;*/
      height:calc(50% - 10px);
      margin-left: 0 !important;
    }
    .news-word .p1{
      font-size: 20px;
    }

  }




</style>
