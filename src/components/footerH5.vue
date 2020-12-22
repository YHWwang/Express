<template>
  <div>
    <ul class="footer-nav">
      <li @click="handleClick(1)">
        <div class="nav-title">{{$t('myfooter.txt1')}}<i :class="[activeClass==1?'icon-h icon-active':'icon-h']"></i></div>
        <div class="nav-list" :style="activeClass==1?'display:block':'display:none'">
          <p v-for="item in productsList"><router-link :to="{path:'/products/item/'+item.unitName}" class="new-shop-link">{{item.storeName}}</router-link></p>
          <P><router-link to="/products/all" class="new-shop-link" >{{$t('myfooter.msg1')}}</router-link></P>
        </div>
      </li>

      <li @click="handleClick(2)">
        <div class="nav-title">{{$t('myfooter.txt2')}}<i :class="[activeClass==2?'icon-h icon-active':'icon-h']"></i></div>
        <div class="nav-list" :style="activeClass==2?'display:block':'display:none'">
          <P><router-link to="/vantaggi" class="new-shop-link">Vantaggi dello Store Italiano</router-link></P>
          <P><router-link to="/paymentmethods" class="new-shop-link">{{$t('myfooter.msg2_1')}}</router-link></P>
          <P><router-link to="/shipping-guide"class="new-shop-link">{{$t('myfooter.msg2_2')}}</router-link></P>
          <P><router-link to="/return" class="new-shop-link">{{$t('myfooter.msg2_3')}}</router-link></P>
          <P><router-link to="/warranty" class="new-shop-link">{{$t('myfooter.msg2_4')}}</router-link></P>
        </div>
      </li>
      <li @click="handleClick(3)">
        <div class="nav-title">{{$t('myfooter.txt3')}}<i :class="[activeClass == 3 ?'icon-h icon-active':'icon-h']"></i></div>
        <div class="nav-list" :style="activeClass == 3 ? 'display:block':'display:none'">
          <P><router-link to="/network" class="new-shop-link">{{$t('myfooter.msg3_1')}}</router-link></P>
          <P><a href="https://bbs.blackview.hk/index.php" target="_blank" class="new-shop-link">{{$t('myfooter.msg3_2')}}</a></P>
          <P><router-link to="/faq" class="new-shop-link">{{$t('myfooter.msg3_3')}}</router-link></P>
          <P><router-link to="/contact-us" class="new-shop-link">{{$t('myfooter.msg3_4')}}</router-link></P>
          <P><router-link to="/feedback" class="new-shop-link">{{$t('myfooter.msg3_5')}}</router-link></P>
          <P><router-link to="/ce" class="new-shop-link">{{$t('myfooter.msg3_6')}}</router-link></P>
        </div>
      </li>
      <li @click="handleClick(4)">
        <div class="nav-title">{{$t('myfooter.txt4')}}<i :class="[activeClass==4 ? 'icon-h icon-active':'icon-h']"></i></div>
        <div class="nav-list" :style="activeClass==4 ? 'display:block':'display:none'">
          <P><router-link to="/about-blackview" class="new-shop-link">{{$t('myfooter.msg4_1')}}</router-link></P>
          <P><router-link to="/news" class="new-shop-link">{{$t('myfooter.msg4_2')}}</router-link></P>
          <P><a href="https://bbs.blackview.hk/" class="new-shop-link" target="_blank">{{$t('myfooter.msg4_3')}}</a></P>
        </div>
      </li>
      <li @click="handleClick(5)">
        <div class="nav-title">{{$t('myfooter.txt5')}}<i :class="[activeClass==5?'icon-h icon-active':'icon-h']"></i></div>
        <div class="nav-list" :style="activeClass == 5 ? 'display:block':'display:none'">
          <P><router-link to="/experience" class="new-shop-link">{{$t('myfooter.msg5_1')}}</router-link></P>
          <P><router-link to="/giveaway" class="new-shop-link">{{$t('myfooter.msg5_2')}}</router-link></P>
        </div>
      </li>
    </ul>


  </div>


</template>

<script>
    export default {
        name: "footerH5",
      data(){
          return {
            activeClass:0,
            flag:0,
            productsList:"1"
          }
      },
      methods:{
        handleClick(inx){
          if( this.flag == inx){
            this.activeClass = 0
            this.flag = 0
          }else{
            this.flag = inx
            this.activeClass = inx
          }


        }
      }
    }
</script>

<style scoped>
  .footer-nav li{
    position: relative;
    /*margin:10px 0;*/
  }
  .nav-title{
   text-indent: 40px;
    font-size:20px;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid rgba(0,0,0,.2);
  }
  /*.nav-title:nth-child(1){*/
  /*  border-top:none;*/
  /*}*/
  .nav-list{
    padding-left:60px;
    transition: all 5s  ease;
  }
  .icon-h{
    display: inline-block;
    width: 16px;
    height: 2px;
    position: absolute;
    right: 20px;
    top: 25px;
    background: #000;
  }
  .icon-h:after{
    border-top: 1px solid rgba(0,0,0,.4);
    border-bottom: 1px solid rgba(0,0,0,.4);
    height: 0;
    width:16px;
    /*left: -2px;*/
    position: absolute;
    transform:rotate(90deg) ;
    content: "";
    display: block;
    background-color: rgba(0,0,0,.4);
    transition: .25s;
    box-sizing: border-box;
  }
  .icon-h.icon-active:after{
   transform: rotate(0deg);
  }
  .nav-list p{
    font-size: 18px;
    opacity: .8;
    height: 30px;
    line-height: 1;
    /*line-height: 1.5*/
  }


</style>
