<template>
    <div>
      <div >
        <div ref="tab8" :class="['banner-item','banner-item-1',show?'active':''] " @click="DoBuy('tab8')">
          <img class="banner-item-img banner-opacity-0 banner-opacity-1 delay-1 banner-pc" src="@/assets/img/banner/tab8.png" alt="">
          <img class="banner-item-img banner-opacity-0 banner-opacity-1 delay-1 banner-h5" src="@/assets/img/banner/tab8_phone.png" alt="">
          <div class="banner-word">
            <h3 class="h3  banner-opacity-0 banner-opacity-1 delay-1">{{$t('views.home.banner.tit')}}<br> {{$t('views.home.banner.tit_2')}}</h3>
            <div class="margin-empty-line"></div>
            <div class="banner-word-box1  banner-opacity-0 banner-opacity-1 delay-2">
              <p>{{$t('views.home.banner.msg')}} <br>
                {{$t('views.home.banner.msg_2')}}
              </p>
            </div>
            <div class="margin-empty-line-1"></div>
            <div class="banner-word-link banner-link  banner-opacity-0 banner-opacity-1 delay-3">
              <a @click.stop href="http://yshop.blackview.hk/shop/buy/Tab8" class="buy-now">{{$t('views.home.banner.buy')}}</a>
            </div>
            <div class="banner-word-link banner-link-1  banner-opacity-0 banner-opacity-1 delay-4">
              <a @click.stop href="http://yshop.blackview.hk/products/item/Tab8" class="learn-more">
                <span >{{$t('views.home.banner.lear')}}</span> >
              </a>
            </div>
          </div>
        </div>
        <div ref="bv5100"  :class="['banner-item','banner-item-3'] " @click="DoBuy('bv5100')">
          <img class="banner-item-img banner-opacity-0 banner-opacity-1 delay-1 banner-pc" src="@/assets/img/banner/BV5100.png" alt="">
          <img class="banner-item-img banner-opacity-0 banner-opacity-1 delay-1 banner-h5" src="@/assets/img/banner/bv5100_phone.png" alt="">
          <div class="banner-word">
            <h3 class="h3  banner-opacity-0 banner-opacity-1 delay-1">{{$t('views.home.banner.msg_3')}} <br> {{$t('views.home.banner.msg_4')}}</h3>
            <div class="margin-empty-line"></div>
            <div class="banner-word-box1  banner-opacity-0 banner-opacity-1 delay-2">
              <p>
              {{$t('views.home.banner.p1')}}
                <br>{{$t('views.home.banner.p2')}}
              </p>
            </div>
            <div class="margin-empty-line-1"></div>
            <div class="banner-word-link banner-link  banner-opacity-0 banner-opacity-1 delay-3">
                <a href="http://yshop.blackview.hk/shop/buy/bv5100" class="buy-now">{{$t('views.home.banner.buy')}}</a>
          </div>
            <div class="banner-word-link banner-link-1  banner-opacity-0 banner-opacity-1 delay-4">
              <a href="http://yshop.blackview.hk/products/item/bv5100" class="learn-more">
                <span >{{$t('views.home.banner.lear')}}</span> >
              </a>
            </div>
        </div>
      </div>
        <div ref="a80" class="banner-item banner-item-2"  @click="DoBuy('a80')">
          <img class="banner-item-img banner-opacity-0 banner-opacity-1 delay-1 banner-pc" src="@/assets/img/banner/A80.png" alt="">
          <img class="banner-item-img banner-opacity-0 banner-opacity-1 delay-1 banner-h5" src="@/assets/img/banner/a80_phone.png" alt="">
          <div class="banner-word">
            <h3 class="h3  banner-opacity-0 banner-opacity-1 delay-1">Sony 13MP Quad Camerar</h3>
            <div class="margin-empty-line"></div>
            <div class="banner-word-box1  banner-opacity-0 banner-opacity-1 delay-2">
              <p>{{$t('views.home.banner.msg_5')}}
                <br>{{$t('views.home.banner.msg_6')}}
              </p>
            </div>
            <div class="margin-empty-line-1"></div>
            <div class="banner-word-link banner-link  banner-opacity-0 banner-opacity-1 delay-3">
              <a @click.stop href="http://yshop.blackview.hk/shop/buy/a80" class="buy-now">{{$t('views.home.banner.buy')}}</a>
            </div>
            <div class="banner-word-link banner-link-1  banner-opacity-0 banner-opacity-1 delay-4">
              <a @click.stop   href="http://yshop.blackview.hk/products/item/a80" class="learn-more">
                <span >{{$t('views.home.banner.lear')}}</span> >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HomeBanner",
      data(){
          return{
            show:false,
            link:""
          }
      },
      methods:{
        handleScroll(){
          var scroll = document.documentElement.scrollTop || document.body.scrollTop;
          var tab8 = this.$refs.tab8.offsetTop
          var a80 = this.$refs.a80.offsetTop
          var bv5100 = this.$refs.bv5100.offsetTop
          var a80  = this.$refs.a80.offsetTop
          var no1,no2=0
          if(document.body.clientWidth>800){
            no1 = 100;
            no2 = 700;
          }else{
            no1 = 0;
            no2 = 420
          }

          this.$refs.bv5100.className  = scroll>no1?  'banner-item banner-item-3 active' : 'banner-item banner-item-3'
          this.$refs.a80.className  = scroll>no2 ?  'banner-item banner-item-2 active' : 'banner-item banner-item-2'
        },
        DoBuy(url,e){
          e = e || window.event;
          e.stopPropagation()
          this.$router.push(`shop/buy/${url}`)
        }
      },
      mounted: function () {
          var _this = this
          setTimeout(()=>{
            this.show = true
          })

        window.addEventListener('scroll', this.handleScroll,true);  // 监听（绑定）滚轮滚动事件
      },

      created() {
          this.link = '<link rel="stylesheet" href="http://192.168.0.196:8082/file/other/HomeBanner-2020081903375836.css">'
      },
      destroyed: function () {
        window.removeEventListener('scroll', this.handleScroll,true);   //  离开页面清除（移除）滚轮滚动事件
      }

    }
</script>

<style scoped>
  .banner-item{
    position: relative;
    margin-bottom: 16px;

    overflow: hidden;
    background: 50% no-repeat;
    height:679px;
    font-family: MyriadPro Regular ;
    cursor: pointer;
    /*background: #4E6682;*/

  }

  .banner-item .banner-word{
    position: absolute;
    left:13%;
    top: 50%;
    transform: translateY(-50%);
  }
  .banner-item-1 .banner-word{
    left:61%;
  }
  .banner-item-2 .banner-word{
    left:50%;
  }
  .active .delay-1{
    transition-delay: .2s
  }
  .active .delay-2{
    transition-delay: .25s
  }
  .active .delay-3{
    transition-delay: .3s
  }
  .active .delay-4{
    transition-delay: .35s
  }
  .banner-opacity-0 {
    opacity: 0;
    transform: translateY(50px);
    transition: all .5s ease;
  }
  .active .banner-opacity-1{
    opacity: 1;
    transform: translateY(0);
  }
  .margin-empty-line{
    height: 20px;
  }
  .margin-empty-line-1{
    height: 25px;
  }

  .h3{
    font-weight: normal;
    font-size: 48px;
    line-height: 1.2;
  }
  .banner-word-box1 p{
    font-size: 20px;
    color: rgba(0,0,0,.8);
  }

  .buy-now{

   display: inline-block;
    height: 40px;
    padding: 1px 20px;
    color: #000;
    border: 2px solid #000;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }

  .buy-now:hover{
    border-width: 3px;
    padding: 0px 19px;
    background-color: hsla(0,0%,100%,.2);
  }
  .banner-link-1{
    margin-top:20px;
  }
  .learn-more span{
    transition: all ease .3s;
  }
  .learn-more span:hover{
   text-decoration: underline;
    margin-right: 5px;
  }
  .banner-item-1{
    height: 680px;
  }
  .banner-item-2{
    height: 680px;
  }

  @media screen and (min-width:801px){
    .banner-item .banner-item-img{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;

    }
    .banner-h5{
      display: none;
    }
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .banner-item .banner-item-img{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
     .banner-pc{
      display: none;
      height: auto !important;
       width: 100%;
    }
    .banner-word{
      width: 100%;
      height: 100%;
      left: 0!important;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: 53% !important;
    }
    .banner-item-2 .banner-word{
      top: 55%;
    }
  .h3{
    font-size: 24px ;
    text-align: center;
    margin-bottom: 10px;
  }
    .banner-word-box1 p{
      font-size: 14px;
      text-align: center;

    }
    .margin-empty-line{
      height: 5px;
    }
    .margin-empty-line-1{
      height: 10px;
    }
    .banner-item,.banner-item-1{
      height: 425px;
    }
    .banner-item{

    }
    .banner-link-1{
      margin-top:10px;
    }
  }
</style>
