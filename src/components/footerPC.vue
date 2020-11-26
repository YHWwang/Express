<template>
  <ul class="foot-list">
    <li>
      <P class="first-txt">{{$t('myfooter.txt1')}}</P>
      <p v-for="(item,index) in productsList" :key="index">
        <router-link :to="{path:'/products/item/'+item.unitName}" class="new-shop-link">{{item.storeName}}</router-link>
      </p>
      <P><router-link to="/products/all" class="new-shop-link" >{{$t('myfooter.msg1')}}</router-link></P>
    </li>
    <li>
      <P class="first-txt">{{$t('myfooter.txt2')}}</P>
      <P><router-link to="/paymentmethods" class="new-shop-link">{{$t('myfooter.msg2_1')}}</router-link></P>
      <P><router-link to="/shipping-guide" class="new-shop-link">{{$t('myfooter.msg2_2')}}</router-link></P>
      <P><router-link to="/return" class="new-shop-link">{{$t('myfooter.msg2_3')}}</router-link></P>
      <P><router-link to="/warranty" class="new-shop-link">{{$t('myfooter.msg2_4')}}</router-link></P>
    </li>
    <li>
      <P class="first-txt">{{$t('myfooter.txt3')}}</P>
      <P><router-link to="/network" class="new-shop-link">{{$t('myfooter.msg3_1')}}</router-link></P>
      <P><a href="https://bbs.blackview.hk/index.php" target="_blank" class="new-shop-link">{{$t('myfooter.msg3_2')}}</a></P>
      <P><router-link to="/faq" class="new-shop-link">{{$t('myfooter.msg3_3')}}</router-link></P>
      <P><router-link to="/contact-us" class="new-shop-link">{{$t('myfooter.msg3_4')}}</router-link></P>
      <P><router-link to="/feedback" class="new-shop-link">{{$t('myfooter.msg3_5')}}</router-link></P>
      <P><router-link to="/ce" class="new-shop-link">{{$t('myfooter.msg3_6')}}</router-link></P>
    </li>
    <li>
      <P class="first-txt">{{$t('myfooter.txt4')}}</P>
      <P><router-link to="/about-blackview" class="new-shop-link">{{$t('myfooter.msg4_1')}}</router-link></P>
      <P><router-link to="/news" class="new-shop-link">{{$t('myfooter.msg4_2')}}</router-link></P>
      <P><a href="https://bbs.blackview.hk/" class="new-shop-link" target="_blank">{{$t('myfooter.msg4_3')}}</a></P>
    </li>
    <li>
      <P class="first-txt">{{$t('myfooter.txt5')}}</P>
      <P><router-link to="/experience" class="new-shop-link">{{$t('myfooter.msg5_1')}}</router-link></P>
      <P><router-link to="/giveaway" class="new-shop-link">{{$t('myfooter.msg5_2')}}</router-link></P>
    </li>

  </ul>
</template>

<script>
    export default {
        name: "footerPC",
      data(){
          return {
            productsList:""
          }
      }
    }
</script>

<style lang="scss" scoped>
  .foot-list{
    width: 100%;
    box-sizing: border-box;
    padding-left: 50px;
    margin: 90px 0;
    display: flex;
    /*justify-content: flex-start;*/
    justify-content: center;
    opacity: .8;
  li{
    margin-right: 30px;
    margin-left: 30px;
  }
  p{
    font-size: 20px ;
    opacity: 0.8;
    line-height:2;
  }
  .sub-input{
    display: flex;
  }

  @media screen and (max-width:1200px) and (min-width:800px){

    li:nth-child(6){
      margin-left: 100px;
    .input{
      width:268px;
    }
  }
  }

  @media screen and (max-width:800px) and (min-width:374px){

    li:nth-child(6){
      margin-top: 10px;
    /*margin-left: 100px;*/
    .input{
      width:200px;
    }
  }
  }
  }


</style>
