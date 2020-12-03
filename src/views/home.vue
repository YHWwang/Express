<template>
<!--  <el-container class="home"  id="mainView">-->
  <div id="mainView">
<!--    <div class="header-top"></div>-->
    <div  class="header">
      <div  class="banner-top">
        <div class="banner-wrap">
          <a class="head-pc" :href="tBanner.url" target="_blank">
            <img  ref="header" class="head-5g-img" :src="tBanner.pic" alt="">
          </a>
          <a class="head-phone" :href="tBanner.url" target="_blank">
            <img class="head-5g-img" :src="tBanner.wxapp_url" alt="">
          </a>
        </div>
      </div>
      <div :class="'home-header '+topClass">
        <!--移动端nav部分-->
        <div class="phone-nav">
          <mobile-phone :products="products" :shopCatalog="shopCatalog" :style="mobileDisplay"></mobile-phone>
        </div>
        <!--移动端nav-->
        <span class="phone phone-bar" @click="mobileShow"><i class="fa fa-bars fa-3x" aria-hidden="true" ></i></span><!--移动端-->
        <router-link class="home-logo" to="/"><img class="logo" src="@/assets/img/logo.png" alt=""></router-link>
        <router-link class="phone phone-cart" to="/shopping-cart">
          <span ref="shopCart" class="header-icon fa fa-shopping-cart" aria-hidden="true"><i class="phone-count" >{{count == 0?'':count}}</i></span><!--移动端-->
        </router-link>
        <ul class="nav">
          <li class="nav-list">
            <div class="header-nav">
              <router-link to="/products/all" ><span class="nav-text">{{$t('views.home_vue.router1')}}</span></router-link>
              <div class="nav-drop-down">
                <ul class="drop-list nav-product" >
                  <!-- <li>
                   <router-link to="/new-products">
                     <svg t="1597981013853" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2549" width="64" height="64"><path d="M786.9 286.7h-77.4v-16.1c0-32.6-26.5-59.1-59.1-59.1s-59.1 26.5-59.1 59.1v16.1H416.4v-16.1c0-32.6-26.5-59.1-59.1-59.1s-59.1 26.5-59.1 59.1v16.1h-77.4c-6.6 0-13 2.6-17.7 7.3-4.7 4.7-7.3 11.1-7.3 17.7v475.6c0 13.9 11.2 25 25 25h567.4c13.9 0 25-11.2 25-25V311.8c0-6.8-2.9-13.4-7.8-18.2-4.9-4.8-11.7-7.3-18.5-6.9z m-162.3-16c0-9.2 4.9-17.7 12.9-22.2 8-4.6 17.8-4.6 25.7 0 8 4.6 12.9 13 12.9 22.2v79.1c0 14.2-11.5 25.7-25.7 25.7s-25.7-11.5-25.7-25.7l-0.1-79.1z m-293 0c0-14.2 11.5-25.7 25.7-25.7s25.7 11.5 25.7 25.7v79.1c0 14.2-11.5 25.7-25.7 25.7s-25.7-11.5-25.7-25.7v-79.1z m430.3 491.6h-516V336.8h52.4v13.4c0 32.6 26.5 59.1 59.1 59.1s59.1-26.5 59.1-59.1v-13.4h174.9v13.4c0 32.6 26.5 59.1 59.1 59.1s59.1-26.5 59.1-59.1v-13.4H762l-0.1 425.5z" p-id="2550"></path><path d="M602 464.9L473.8 598.4 407.1 529c-5.5-8-15.2-12.1-24.9-10.4-9.6 1.6-17.4 8.7-20 18.1-2.5 9.4 0.6 19.5 8.1 25.7l86.1 87.8c4.7 4.7 11.1 7.3 17.7 7.3 6.8 0 13.3-2.8 18-7.7l145.2-150.2c7.4-10 6.3-24-2.6-32.7-8.8-8.7-22.8-9.5-32.7-2z" p-id="2551"></path></svg>
                   <p>{{$t('views.home_vue.msg_1')}}</p>
                   </router-link>
                  </li> -->
                  <li v-for="(item,index) in products"  :key="index">
                    <router-link :to="{path:'/products/'+item.id}">
                      <div  v-html="item.pic"></div>
                      <p>{{item.cateName}}</p>
                    </router-link>

                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-list">
            <div class="header-nav">
              <router-link to="/shop/all"><span class="nav-text">{{$t('views.home_vue.router2')}}</span></router-link>
              <div class="nav-drop-down">
                <ul class="drop-list nav-shop">
                  <li v-for="(item,index) in shopCatalog" @click="GoodList(item.keyword)"  :key="index">
                       <div v-html="item.pic"></div>
                        <p>{{item.keyword}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-list">
            <div class="header-nav">
              <router-link to="/solutions">  <span class="nav-text">{{$t('views.home_vue.router3')}}</span></router-link>

              <div class="nav-drop-down">
                <ul class="drop-list nav-industrial">
                  <li>
                    <router-link to="/solutions/thermal-imaging">
                      <svg t="1597983214106" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3444" width="64" height="64"><path d="M265.8 200c-43.5 0-78.8 35.3-78.8 78.8v473c0 43.6 35.3 78.8 78.8 78.8h473c43.6 0 78.8-35.3 78.8-78.8v-473c0-43.5-35.3-78.8-78.8-78.8h-473z m78.8 78.8c43.6 0 78.8 35.3 78.8 78.8 0 43.6-35.3 78.8-78.8 78.8s-78.8-35.3-78.8-78.8 35.2-78.8 78.8-78.8z m0 118.2c21.8 0 39.4-17.6 39.4-39.4 0-21.8-17.6-39.4-39.4-39.4-21.8 0-39.4 17.6-39.4 39.4 0 21.8 17.6 39.4 39.4 39.4zM226.3 751.8v-18.5l127.1-113.9c16.2-14.5 41.9-14 57.4 1.6L581 791.2H265.8c-21.8 0-39.5-17.7-39.5-39.4z m512.4 39.4H636.9L491.7 644.1l140.4-140.4c15.3-15.3 40.4-15.1 55.8 0.2l90.2 90.2v157.7c0 21.7-17.7 39.4-39.4 39.4zM226.3 685.4V278.9c0-21.9 17.7-39.6 39.7-39.6h472.4c21.9 0 39.7 17.9 39.7 39.3v261.5l-91.3-83.4c-16.1-14.7-41.6-14.2-57.3 1.2L466.7 619.4l-54-46.5c-16.4-14.2-43.1-13.9-59.2 0.4L226.3 685.4z" p-id="3445"></path></svg>
                      <p>{{$t('views.home_vue.msg_2')}}</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/solutions/construction">
                      <svg t="1597983238279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3657" width="64" height="64"><path d="M546.1 701.3c-49.7-37.8-98.1-74.7-147.6-112.4-4.3 12.6-11.6 11.6-21 7.3-30.8-14.2-61.8-27.9-93.1-41.2-12.5-5.3-19.5-12.2-15-26.9 3.1-10-1.5-17.9-9.8-24.2-18.4-14-36.6-28.3-54.7-42.5-14.2-11.1-17.5-22.3-9.5-38.7 10.9-22.6 22.3-44.9 34.8-66.7 3.1-5.4 10.9-10.6 17.1-11.5 36.5-5.3 73.1-9.8 109.8-13.3 8.7-0.8 18.6 1.9 26.6 5.7 21.8 10.3 42.4 22.9 64.3 33.1 16.9 7.9 28.2 20.3 33.5 37.1 14.9 47.3 29.6 94.7 42.6 142.6 7.7 28.4 10.6 58.1 18.8 86.3 3.3 11.5 15 20.6 24.6 33.1 19.1-27.2 35.6-51.9 53.4-75.8 7.8-10.4 17.2-20.4 27.7-28 20.9-15 37.5-10.8 50 11.9 18 32.8 35.1 66 52.5 99 19.3 36.6 38.6 73 57.8 109.6 13.5 25.9 5.3 40-23.5 40-92.5 0.1-185 0.1-277.4 0-24.5 0-29.7-8.8-17.4-29.7 18.1-31 36.2-61.9 55.5-94.8z m-58-95c0.6-0.7 1.2-1.4 1.7-2.1-11.3-35.5-22.3-71-34.2-106.2-1.5-4.4-8.3-9.5-12.8-9.7-4.4-0.1-11 4.7-13.1 9-6.1 12.3-10.8 25.3-15.3 38.2-1.1 3-0.3 8.5 1.8 10.3 23.8 20.4 47.9 40.3 71.9 60.5zM288.9 387c-21.2-0.1-42.6 21.8-42.7 44.1 0 2.5 1.4 5.8 3.2 7.6 7.3 7.2 14.6 14.7 22.9 20.7 8.3 6.1 16.8 5.8 21.9-4.7 7.2-15 14.3-30 20.5-45.5 5.3-13.1 0.2-20.7-13.9-22.2-4-0.3-7.9 0-11.9 0z" p-id="3658"></path><path d="M389.5 826c-27.7-2.6-31.6-8.9-20.9-33.3 5.5-12.5 9.4-25.7 14.8-38.3 7.5-17.9 2-33.6-7.6-48.6-14.3-22.4-34-37.6-59.6-45.5-8.7-2.6-14-1.2-17.4 7.5-9.5 24.7-19.4 49.3-28.9 74.1-8.6 22.5-16.5 45.2-25.1 67.8-5.2 13.4-39 21.1-47.7 9.9-3.9-5-4.4-15-2.5-21.6 17.3-61.5 35.5-122.7 53.4-184 2.7-9.4 5.1-19.1 8.4-28.3 3.7-10.4 10.9-14.8 22-10.2 36.3 15.2 74 27.4 108.1 46.5 18.1 10 32.4 30 43.9 48.3 28.4 45.6 21.9 106.6-14.5 146.2-5.7 6-17.5 6.5-26.4 9.5zM536.2 274.4c0 38.7-30.6 69.6-68.9 69.4-37.5-0.2-67.9-30.9-68-68.9-0.1-38.7 31-70 68.9-69.3 38.1 0.7 67.9 30.9 68 68.8z" p-id="3659"></path><path d="M488.1 606.3c-24-20-48.1-40-71.9-60.4-2.1-1.8-2.9-7.3-1.8-10.3 4.5-12.9 9.1-26 15.3-38.2 2.1-4.4 8.8-9.2 13.1-9 4.5 0.2 11.3 5.3 12.8 9.7 12 35.2 22.9 70.8 34.2 106.2-0.5 0.5-1.1 1.3-1.7 2zM288.9 387c3.9 0 7.9-0.3 11.8 0.1 14.1 1.5 19.3 9 13.9 22.2-6.2 15.5-13.3 30.5-20.5 45.5-5.1 10.5-13.6 10.9-21.9 4.7-8.3-6.1-15.5-13.5-22.9-20.7-1.8-1.8-3.2-5.1-3.2-7.6 0.2-22.3 21.6-44.3 42.8-44.2z" fill="#FFFFFF" p-id="3660"></path></svg>
                        <p>{{$t('views.home_vue.msg_3')}}</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/solutions/transportation">
                      <svg t="1597983302286" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4080" width="64" height="64"><path d="M437.6 662.3c-11.5 26.2-25 47.7-54.6 54.5-23.3 5.4-44.7 3-64.1-10.6-7.2-5-12.9-12.5-18.3-19.7-4-5.3-6-12-9.2-17.9-2.1-3.9-4.2-6.8-10-6.6-17.1 0.7-34.3 0.3-52.1 0.3v-95.4c11.3 0 22.8-0.3 34.3 0.3 1.4 0.1 3.6 4.7 3.7 7.3 0.3 13.8 0.2 27.6 0.2 41.3v9.1h20.3c16.9-44.9 52.6-60.7 83.7-56.9 14.3 1.7 29.1 10.4 40.7 19.5 11.4 8.9 20.7 21.5 24.1 37.5h95.3V377.9H267.2c0 10.2-0.2 20.2 0.1 30.2 0.2 5.8-2.1 8-8 7.9-9.9-0.3-20-0.1-30.8-0.1 0.3-20.5-3.5-40.5 6.2-58.8 5.4-10 15.7-13.5 26-16.3 1.7-0.5 3.7-0.3 5.5-0.3 89.6 0 179.1-0.1 268.8 0.1 13.5 0 25.6 5.6 31.1 17.8 4.3 9.6 4.4 21.2 6.3 31.9 0.3 2.1 0.3 4.2 0.6 7.4h8.7c32.9 0.1 65.7 0 98.6 0.3 9.4 0.1 18.3 3.4 23.7 11.1 5.2 7.3 8.7 15.6 12.9 23.5 4.5 8.7 10.2 17 13.1 26.2 3.7 11.9 10.6 14 22.3 15.2 18.5 1.8 33.6 11.8 43.2 29.1 5.5 9.9 7.4 19.9 8.7 30.9 1.8 17.4 6.1 34.4 8.4 51.7 2.1 15.1 4.2 30.4 4 45.5-0.2 16.3-14.4 30.7-32 31.1-6.7 0.2-13.3-0.4-19.8 0.4-2.9 0.3-7.7 3.3-7.9 5.4-1.1 13.1-11 20.3-18.3 29.2-17.5 21.5-41.9 25.2-66.9 21.4-26-4-45.2-18.6-54.8-44.4-4.4-11.9-4.8-11.9-18.7-11.9H444.7c-2-0.1-4.9-0.1-7.1-0.1z m173.7-37.5c2.8-5.4 4.7-9.9 7.4-14.2 6.8-10.9 12.2-23 24.7-29.2 14.8-7.4 29.3-15.6 46.5-14.4 4.9 0.3 9.8 2.4 14.4 4.2 8.4 3.1 17.3 5.5 24.7 10.3 6.2 4 10.5 10.9 15.7 16.3 6.6 6.8 11.7 14.6 14.4 23.9 0.4 1.5 2.6 3.3 4.2 3.4 5.7 0.4 11.4 0.2 17.8 0.2-1.5-11.6-0.8-22.8-4.7-32-4.3-10.5-4.4-21.1-6.7-31.6-2.1-9.4-2.6-19.2-4-28.8-0.5-3.6-1.2-7.3-2.6-10.6-2.7-6.2-6.7-10.4-14.4-10.5-35.9-0.6-71.9-1.3-107.8-2.4-14.1-0.4-29.9-17-30.4-31-0.3-7.6-0.1-15.2-0.1-23.4h-36.8v169.8h37.7z m112.5 20.6c2.2-17.4-17.4-38.8-35.7-38.7-25.9 0.2-38.4 17.9-39.4 34.7-1.6 23.8 16.2 38.7 35.6 41.4 17.4 2.5 41.3-20.5 39.5-37.4z m-361.3-38.1c-23.4-1.7-35.8 16.3-36.2 36.7-0.4 22.2 18 38.9 37.5 38.8 19.8-0.2 37.7-20.1 36.6-39.4-1.2-17.6-12.9-38.1-37.9-36.1z m286.7-172.8v37.6h46c-1.6-1.9-2.9-2.8-3.5-4-4.4-9.3-8.5-18.7-13.1-27.8-1.2-2.4-4-5.4-6.3-5.6-7.6-0.6-15.2-0.2-23.1-0.2z" p-id="4081"></path><path d="M266.7 510c22.5 0 45 0.2 67.5-0.1 6.9-0.1 9.5 2.2 9 9.2-0.5 7.4-0.5 14.9 0 22.2 0.4 6.7-2 8.8-8.6 8.7-21.7-0.3-43.4-0.1-65.1-0.1-23.5 0-47.1-0.2-70.7 0.1-6.6 0.1-9.1-2-8.7-8.7 0.5-7.6 0.4-15.4 0-23-0.3-6.2 2-8.4 8.2-8.4 22.9 0.2 45.7 0.1 68.4 0.1zM263.5 472.9c-22.5 0-45.1-0.2-67.6 0.1-6.4 0.1-9.3-1.7-8.9-8.5 0.4-7.7 0.2-15.4 0.1-23-0.1-4.9 1.6-7.2 6.9-7.1 46.4 0.2 92.7 0.1 139.1 0 6 0 8.8 2 8.5 8.4-0.3 7.1-0.4 14.4 0 21.5 0.4 6.7-2.6 8.8-8.9 8.8-23.1-0.2-46.2-0.2-69.2-0.2z" p-id="4082"></path></svg>
                        <p>{{$t('views.home_vue.msg_4')}}</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/solutions/manufacturing">
                      <svg t="1597983334963" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4294" width="64" height="64"><path d="M663.1 362.3c-0.8 13.2-0.9 26.5-3 39.6-1.2 7.5-5.8 14.5-8.6 21.9-2 5.1-2.7 10.9-5.3 15.5-5 8.5-10.7 16.6-16.5 24.5-5.1 6.8-10.1 13.8-16.2 19.5-7.1 6.7-15.2 12.3-23.2 17.8-8.3 5.6-16.8 11.1-25.7 15.7-5.5 2.8-12.1 3.7-18.1 5.8-14 4.9-28.7 5.2-43.1 7.5-13.3 2.2-26.4 1.1-39.5 2.8-8.2 1-16 3.7-24.1 5.4-4.8 1-9.7 1.7-14.3 3-10.2 2.8-20.5 5.4-30.5 9.2-9.8 3.8-19.8 8.1-28.7 13.7-13.5 8.5-26.5 18-39.3 27.7-9.3 7-18.4 14.5-26.4 22.9-6.4 6.6-11.3 14.7-16.7 22.2-4.6 6.3-9.7 12.4-13.6 19.1-5.8 9.9-11.1 20.2-15.9 30.6-3.5 7.4-6.2 15.3-8.9 23.1-4.1 11.8-8.3 23.7-11.7 35.8-2.6 9.1 1.1 13.3 11.1 13.3h228.9c5.4 0 10.8-0.6 15.8 3.8 6.3 5.4 10.4 15.7 5.1 24.9-5.4 9.4-13.4 10.8-21.7 10.9-79.2 0.4-158.4 0.5-237.7-0.1-12.7-0.1-24.5-4-33.2-16.2-6.7-9.4-9.8-18.3-8.3-29 0.9-6.9 3.1-13.7 4.9-20.5 2.3-9.4 4.9-18.7 7.2-28 2.5-10.5 6.6-20.3 11.8-29.7 4.5-8.2 7.2-17.3 11.7-25.2 4.6-8.1 10.5-15.5 15.8-23.1 3.7-5.3 7.2-10.7 11.2-15.8 5-6.5 10.1-12.8 15.6-18.9 6-6.7 12.1-13.1 18.7-19.2 6.6-6 13.6-11.6 20.8-16.9 9.6-7 19.5-13.7 29.4-20.3 4.6-3 9.4-5.8 14.3-8.2 10.5-5.1 21.1-9.9 31.9-14.5 5.6-2.3 11.7-3.8 18.9-6-0.8-1.7-1-4.2-2.3-4.9-8.2-3.9-14.8-9.8-21.5-15.8-10.1-9.3-18.2-20-25.9-31-7.3-10.6-12.1-22.4-17-34.3-3.4-8.3-3.9-17-6.8-24.9-4.5-12.4-2.3-24.8-3.2-37.1-0.1-0.8 0.4-1.5 1-3.9 10.6 10.8 23.4 8.2 35.7 8.2l-0.2-0.2c0.1 1.5 0 2.9 0.2 4.4 1.4 9.4 1.8 19.1 4.6 28.1 3.4 10.8 8.7 21 13.3 31.5 1.2 2.8 2 6 3.8 8.3 4.8 5.7 11.2 10.4 15.1 16.6 7.2 11.5 19 17 29.6 23.8 7 4.6 15.3 7.4 23.1 10.7 2.1 0.8 5.1-0.1 6.7 1.1 7.1 5.2 15.8 4.5 23.5 5.2 15 1.1 29.9 0.4 44.7-4.9 8.3-2.9 16.6-5.8 24.8-9.3 2.4-1 5.4-1.5 7.2-3.2 8.2-7.5 18.8-11.7 25.7-20.7 4.7-6.2 11-11.3 15.2-17.8 4.8-7.3 8.3-15.5 11.9-23.5 3.5-8 7.2-15.9 9.2-24.3 2.1-8.3 2.2-17.3 3.1-25.9l-0.2 0.2h36.5l-0.7-1z" p-id="4295"></path><path d="M703 721.1c-7.3-1-14.8-1.7-22-3.1-6.2-1.2-11.2 1.1-15.1 4.9-10.8 10.2-21 21-31.4 31.6-9.8 10-19.2 20.4-29.5 30.1-4 3.8-10 5.5-14.8 8.6-7.1 4.6-14.8 4.5-22.7 3.4-10.6-1.6-19.6-6.5-27-14.3-6.2-6.6-12.8-12.7-18.6-19.6-3.2-3.8-5.8-8.6-6.9-13.4-1.8-7.2-3.8-14.8-0.5-22.2 2.7-6.1 4.3-13.1 8.4-18.2 7-8.7 15.7-16.2 23.5-24.3 8.3-8.4 16.3-17.2 24.8-25.4 6.3-6.2 13.4-11.6 19.2-18.3 2.2-2.5 2.1-7.4 2.2-11.3 0.3-14.3-0.7-28.9 0.5-43.1 0.7-8.2 3.8-16.4 7.2-24 3-6.8 7.4-12.9 11.8-18.9 5.2-6.9 10.6-13.8 16.7-19.9 4.2-4.1 9.7-6.9 14.8-9.9 7.1-4.1 14.3-8.1 21.8-11.6 2.9-1.4 6.3-2.2 9.5-2.5 12.9-1.1 26-2.8 38.9-2.7 8.1 0.1 16.5 2 24 4.9 11.3 4.3 22.5 9 32.1 16.7 4 3.3 3 10.4-1.4 14.4-6.8 6.3-13.1 13.1-19.7 19.6-5.8 5.6-11.7 11.2-17.5 16.8-6.3 6.1-12.4 12.4-18.6 18.6-1.5 1.5-3.5 2.9-3.9 4.7-0.6 2.4-0.8 7 0.4 7.5 3 1.3 6.9 1.8 10.1 1 2.8-0.7 5.5-3.1 7.8-5.3 6.8-6.8 13.5-13.7 20.2-20.6 4.8-5 9.4-10 14.3-14.8 6.7-6.5 12.9-13.4 20.4-18.8 6.3-4.4 11.4-2.3 14.8 4.7 4.3 8.7 7.9 17.8 12.2 26.5 8.3 16.9 6.3 34.9 5.3 52.5-0.5 7.8-4.8 15.2-6.8 23-2.5 10-7.6 19-14.2 26.5-7.8 8.9-14.9 18.5-25.8 24.9-7.4 4.3-14.7 8.7-22.6 11.9-13.5 5.4-27.1 10.2-41.9 9.4z m9.1-185.1c-2.3-0.5-4-1.3-5.7-1.1-8.2 0.7-33.5 5.5-37.6 7.7-9.4 4.8-16.8 11.5-23.9 19.6-12.9 14.7-18.2 31.3-17.5 50.3 0.3 7.6 1.5 15.2 2.3 22.8 1.4 13.1-5.2 23.8-12.8 32.9-9.7 11.4-21.8 20.8-32.4 31.4-10.8 10.8-21.2 21.9-31.7 32.9-3.2 3.4-3.3 6.1 0.5 9.5 3.8 3.5 7.1 7.6 10.4 11.5 3.6 4.2 10.1 6.1 14.9 3.1 4.3-2.7 8.3-6.2 12-9.8 8.2-8.1 15.9-16.5 23.9-24.7 9.3-9.6 18.7-19 28.1-28.5 2.6-2.6 5.3-5.8 8.7-7 9-3.3 17.7-8.3 28-6.5 6.2 1.1 12.4 3.4 18.5 3.2 9.4-0.3 18.9-1.5 27.9-3.8 15.1-3.8 26.4-14.1 36.2-25.4 5.8-6.8 10.5-15.4 13.2-24 2.8-9.2 2.6-19.3 3.8-29.1-0.8-0.4-1.7-0.8-2.4-1.2-2.7 2.5-5.4 5-8 7.5-6 5.9-11.5 12.3-17.9 17.8-5.9 5.1-12 10.6-19 13.3-7 2.7-15.3 2.9-23 2.6-8.8-0.3-17.3-4.6-23-10.5-6.8-7-14.3-15.1-14.7-25.8-0.4-8.7-0.8-18.5 2.5-26 3.8-8.5 11.8-15.4 18.5-22.5 5.9-6.8 12.7-12.9 20.2-20.2zM365.6 362.5c1.3-9.5 2.5-18.9 3.8-28.3 0.2-1.6 0-3.2 0-5.5-13.5 1.2-27.9-4.5-39.1 10.4-0.3-3.3-1.1-5.4-0.6-7.3 3.9-12.6 7-25.6 12.7-37.3 6.5-13.2 13.8-26.7 23.6-37.5 10.5-11.5 20.6-24.3 35.5-31.4 8.6-4.1 16.5-9.7 25-14.2 14-7.4 28.8-12.1 44.7-13 12.4-0.7 24.8-2.3 37-1.8 11.8 0.5 24.1 1.6 35.2 5.3 14.2 4.8 27.7 11.9 40.9 19.2 11.6 6.5 21.3 15.7 30.9 25 9.8 9.5 17.2 20.3 24.5 31.3 4.2 6.4 7.7 13.3 10.7 20.4 2.8 6.6 4.5 13.6 6.8 20.4 1.1 3.6 2.3 7 3.4 10.6l0.2-0.2-40.1 0.3c-0.2-1.9 0.2-3.9-0.6-5.5-4.2-8.7-8.2-17.7-13.1-25.9-4.5-7.3-10.1-13.9-15.6-20.5-3.6-4.4-7.1-9.2-11.7-12.3-9.4-6.3-17.7-14.4-29-17.9-11.6-3.7-22.9-9.9-34.7-11.1-16.1-1.6-32.5-3.5-48.9 2.4-8.7 3.1-18.4 3.8-26.5 9.1-9.2 6-19.1 10.9-28.1 17.1-5 3.5-8.8 8.6-12.8 13.3-4.3 4.8-8.9 9.5-12.3 14.9-4 6.6-6.8 13.9-10 20.9-2.2 4.7-4 9.5-6.5 15.3h250.4c1.1 2.9 2.8 5.7 3.2 8.8 1.2 8.3 1.9 16.8 2.8 25.1l0.2-0.2c-2.7 0.1-5.4 0.4-8.1 0.4h-246c-2.5 0-5-0.2-7.5-0.3h-0.3z" p-id="4296"></path><path d="M660.5 328.7c22.9 0 45.8-0.1 68.7 0 9.9 0.1 19.9 10.1 18.9 19.2-0.3 2.3-2.1 4.5-3.6 6.4-4.9 6-11.1 8.6-19 8.4-20.8-0.5-41.5-0.4-62.4-0.5l0.2 0.2c-0.8-11.3-1.7-22.6-2.5-34l-0.3 0.3z" p-id="4297"></path></svg>
                           <p>{{$t('views.home_vue.msg_5')}}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="nav-list">
            <div class="header-nav">
              <router-link to="/support"> <span class="nav-text">{{$t('views.home_vue.router4')}}</span></router-link>
            </div>
          </li>
          <li class="nav-list"><div class="header-nav"><a href="http://bbs.blackview.hk/" target="_blank"><span class="nav-text">{{$t('views.home_vue.router5')}}</span></a></div></li>
          <li class="nav-list"><div class="header-nav"><router-link to="/find-a-store"><span class="nav-text" data-path="find-a-store">{{$t('views.home_vue.router6')}}</span></router-link></div></li>
        </ul>
        <!--头部右侧小图标-->
        <div class="header-right">
          <input type="text" class="search" v-model.trim="searchContent" @keyup.enter="search">
          <i class="fa fa-search header-icon" aria-hidden="true" @click="search" ></i>
          <!--购物车部分-->
          <el-dropdown>
            <div  class="a-car" @click="goToCart()">
              <span class="span-car">{{count}}</span>
              <i class="header-icon fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <div>
                <my-card :IsLogin="IsLogin"></my-card>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown >
            <i class="header-icon fa fa-user-circle-o"  aria-hidden="true"></i>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/user/orders" v-if="IsLogin"><el-dropdown-item class="pro-item">{{$t('views.home_vue.router7')}}</el-dropdown-item></router-link>
              <router-link to="/login" v-if="!IsLogin"><el-dropdown-item class="pro-item">{{$t('views.home_vue.router8')}}</el-dropdown-item></router-link>
              <router-link to="/register"  v-if="!IsLogin"><el-dropdown-item class="pro-item">{{$t('views.home_vue.router9')}}</el-dropdown-item></router-link>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
          <span class="el-dropdown-link sel_lang">
           <span> {{lang}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="lang-item" @click.native="language('EN')">EN</el-dropdown-item>
            <el-dropdown-item class="lang-item" @click.native="language('IT')">IT</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view class="view" :carCount="carCount"></router-view>
    </div>
<!--    <div class="scroll-arow" :style="arrowDisplay"><a href="#mainView"><img src="@/assets/img/arrow.jpg" alt=""></a></div>-->
    <div class="scroll-arrow" :style="arrowDisplay"><a href="#mainView"><svg t="1599016005432" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="782" width="32" height="32"><path d="M66.56 105.805a38.927 38.927 0 0 1 38.922-38.928h813.036c21.504 0 38.927 17.429 38.927 38.928a38.927 38.927 0 0 1-38.927 38.932H105.482a38.927 38.927 0 0 1-38.922-38.932z m445.527 109.767a38.938 38.938 0 0 1 38.933 38.933v663.69a38.932 38.932 0 0 1-77.86 0V254.5a38.932 38.932 0 0 1 38.927-38.928z" p-id="783"></path><path d="M484.572 227.22a38.932 38.932 0 0 1 55.04 0L831.74 519.357a38.922 38.922 0 0 1 0 55.046 38.912 38.912 0 0 1-55.04 0L484.572 282.27a38.912 38.912 0 0 1 0-55.05z" p-id="784"></path><path d="M539.612 227.22a38.932 38.932 0 0 1 0 55.056L247.475 574.403a38.902 38.902 0 0 1-55.045 0 38.912 38.912 0 0 1 0-55.046L484.572 227.22a38.932 38.932 0 0 1 55.04 0z" p-id="785"></path></svg></a></div>


  <!--客服-->
    <div id="skype" v-if="skyShow">
      <table>
        <tbody><tr>
<!--          <td align="center" height="65"><img :src="skyUrl" width="50"></td></tr>-->
          <td align="center" height="65">
            <a data-v-ba54a298="" href="skype:live:.cid.2b4611d3ae4a8339?chat" title="Donna" target="_blank" class="sale"><img src="../assets/img/footer/skype.png" width="50"></a></td></tr>
<!--        <tr><td align="center"><a data-v-ba54a298="" href="skype:live:.cid.2b4611d3ae4a8339?chat" title="Donna" target="_blank" class="sale">EN</a></td></tr>-->
        </tbody></table>
    </div>


    <!--    <el-footer>-->
      <my-footer></my-footer>
<!--    </el-footer>-->
  </div>
<!--  </el-container>-->
</template>
<script>
  import  MyFooter from "@/components/Myfooter"
  import  footerH5 from "@/components/footerH5"
  import  MobilePhone from "@/components/MobilePhone"
  import { GetPcategories,shopCatalog,TopBanner} from "@/api/home"
  import { UserInfo} from "@/api/user"
  import { GetCardData } from '@/api/shop'//获取购物车数据
  import MyCard from '@/views/home/Card'
  export default {
    name: "home",
    components:{
      MyFooter,
      MyCard,
  MobilePhone
    },
    data(){
      return {
        skyShow:false,
        count:"",
        arrowDisplay:{display:"none"},
        products:[],//产品
        shopCatalog:"",//商品目录
        IsLogin:false,
        searchContent:"",//搜索的内容,
        mobileDisplay:"display:none",
        show1:false,//控制移动端的nav显示与否
        tBanner:[],
        topClass:"",//顶部class
        lang:this.$i18n.locale,
        fullscreenLoading: false
      }
    },
    mounted: function () {
      window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件

    },
    methods:{
      language(lang){
        var that =this
        const loading = that.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        that.lang = lang
        // console.log(this.$cookie.get('lang'))
        that.$cookie.set("lang",that.lang,'7d');  // 存入cookie
        that.$i18n.locale = that.lang
        location.reload();
        // console.log(that.$cookie.get('test'))
      },
      goToCart(){
        this.$router.push("/shopping-cart")
      },
      mobileShow(){
        this.show1 = !this.show1
        this.$nextTick(()=>{

        })
      },
      search(){
        if(this.searchContent!=""){
       this.$router.push(`/search/${this.searchContent}`)
          this.searchContent = ""
        }else{
          alert("error")
        }
      },
      handleScroll: function () {
       var scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if(scroll>300){
          this.arrowDisplay = {display:"block"}
        }else{
          this.arrowDisplay = {display:"none"}
        }
      },
        /*获取产品下拉列表*/
      GetProdutsList(){
        var _this = this
        this.GetTopBanner()
        GetPcategories().then(res=>{//产品目录
          var list  =  res.data.data.content
          this.products =list
          this.$nextTick()
        }).catch(error=>{
          console.log(error);
        })
        shopCatalog().then(res=>{//商品目录
          var sliderList =  res.data.data.content
          this.shopCatalog =  sliderList
        }).catch(error=>{
          console.log(error);
        })

      },
      /*获取topbanner数据*/
      GetTopBanner(){
        TopBanner().then(res=>{

       if(res.data.content.length == 1){
         this.tBanner = res.data.content[0].map
       }else{

         if(this.$route.path == '/'){
           this.tBanner = res.data.content[0].map
         }else{
           this.tBanner = res.data.content[1].map
         }
       }
        })
      },
      //产品跳转
      jump(item){
        this.$router.push(`/products/${item.id}`)
      },
      //商品跳转
      GoodList(keyword){
        this.$router.push(`/shop/${keyword}`)
      },
      info(){
        UserInfo().then(result=>{
          this.IsLogin = true;
          this.count = this.$store.state.loginCartCount
          GetCardData().then(res=>{
            var sum = 0
        res.data.data.items.forEach(function (val) {
          sum += val.cartNum
        })
            this.count = sum
            this.$store.dispatch('LoginCartCount1',sum)
          }).catch(error=>{
            console.log(error);
          })

        }).catch(error=>{
          console.log(error);
          this.IsLogin = false;
          this.count = this.$store.getters.count
        })
      }

    },
    watch:{
      carCount(val){
        this.count = val
      },
      'show1':function () {
        this.mobileDisplay =  this.show1?"display:block":"display:none"
      },
      '$route.path':function () {
        if(this.$route.path == '/'){
          this.skyShow = false
        }else{
          this.skyShow = true
        }
        this.GetTopBanner()
        this.show1 = false
        this.mobileDisplay = "display:none"
      }
    },
    computed:{
      carCount(){
        if(this.IsLogin){
          return  this.$store.state.loginCartCount
        }else{
          return  this.$store.state.count
        }

      }
    },
    created(){

      if(this.$route.path == '/'){
        this.skyShow = false
      }else{
        this.skyShow = true
      }
      this.GetProdutsList()
      this.info()//判断有没有登录
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
    }
  }
</script>

<style scoped lang="scss">

  @import '../assets/css/common.css';

.head-5g-img{
    width: 100%;
  }
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    right: 0;
    height: 60px;
    z-index: 101;
    text-align: center;
    .header-top{
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #3ac0bc;
      color:#ffffff;
      font-size: 18px;
    }
    .header-top img{
      width: 100%;

    }

  }
.home-logo{
    position: absolute;
    display: inline-block;
    width: 130px;
    height: 60px;
    text-align: left;
    top: 0;
    left: 50px;
    z-index: 98;
  }
.home-header{

  width: 100%;
  height: 60px;
  position: relative;
  background:#ffffff;
}
.home-header-fix{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 105;
}


  @media screen and (min-width:1200px) {
    .home-header{
      min-width: 1200px;
    }


    .head-phone{
      display: none;
    }
  }
  @media screen and (max-width:1200px) and (min-width:800px){
    .home-header{
      min-width: 1200px;
    }

    .head-phone{
      display: none;
    }
  }

  .phone{
    display: none;
  }
  .phone-nav{
    display: none;
  }
  .main{
    /*padding-top: 110px;*/
    padding-top: 160px;
    position: relative;
    padding-bottom: 20px;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .main{
      padding-top: 105px;
    }
    .head-pc{
      display: none;
    }

   .home-header .nav{
           display: none;
         }
    .header-right{
      display: none;
    }
    .home-logo{
      left: 50%;
      transform: translateX(-50%);
    }

    .phone{
      height: 100%;
      display: inline-block;
      position: absolute;
    }
    .phone-bar{
      top: 0;
      left:10px;
      display: flex;
      justify-content:center;
      align-items: center;
      cursor: pointer;
      color: #133285;

    }
    .phone-cart{
      top: 0;
      right:10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .phone-count {
      font-style: normal;
      position: absolute;
      color: red;
    }

    /*移动端nav部分*/
    .phone-nav{
      display: block;
      position: absolute;
      top:59px;
      left: 0;
      width: 100%;
      z-index: 99;
    }
  }

  .search{
    margin-right: 10px;
    padding-left: 20px;
  }
  .header-icon{
    margin-left: 10px;
    margin-right: 10px;
    font-size: 22px;
    color: #8b8b8b;
    cursor: pointer;
  }
.a-car{
  position:relative;
}
.span-car{
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 10px;
  color: red;
  position: absolute;
  top: 20px;
  left:28px;
  font-weight: bold;
}
  .nav{
    width:100%;
    position: absolute;
   left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;


    .nav-list{
      .nav-text{
        display: inline-block;
        padding-left: 18px;
        padding-right: 18px;
        height: 58px;
        line-height: 58px;
        text-align: center;
      }
    }
  }
  .nav-drop-down{
    position: absolute;
    display: none;
    width: 100%;
    height: 180px;
    background: #ffffff;
    top: 60px;
    left: 0;
    right: 0;
    border: 1px solid #eaeaea;
    transition: all 2s linear;

  }
  .header-nav:hover .nav-text{
    border-bottom: 3px solid #133285;
    cursor: pointer;
  }
 .header-nav:hover  .nav-drop-down{
      display: block;
  }

.drop-list{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*opacity: .9;*/
  li{
    padding: 25px;
    cursor: pointer;
  }
  li:hover p{
    /*border: 1px solid #000;*/
    color: #133285;
  }
  .s-icon{
    display: inline-block;
    width:63px;
    height: 63px;
    /*width: auto;*/

  }
  .s-icon:hover{
    cursor: pointer;
  }


  p{
    padding-top: 5px;
    padding-bottom: 5px;
  }

}

  /*Industrial Solutions 图标*/
  .nav-industrial li:nth-child(1) .s-icon{
    width: 81px;

  }

  .logo{
  height: 20px;
  width: auto;
  position: absolute;
  top: 18px;
}
  .header-right{
    height: 60px;
    line-height: 60px;
    position: absolute;
    right:30px;
    top: 0;
    .search{
      width: 120px;
      height: 25px;
      background:none;
      outline:none;
      border:1px solid #ccc;
      border-radius: 10px 10px;
    }
  }

  .car-box{
    position: absolute;
    right: 0;
    top: 55px;
    width: 500px;
    background: white;
    z-index: 100;
    border: 1px solid #000;
    border-radius: 5px 5px;
  }
  .store,.product{
    text-decoration: none ;
  }

  .view{
    position: relative;
  }
  .scroll-arrow{
   position: fixed;
    bottom:100px;
    right:20px;
    z-index: 1000;
  }
  .scroll-arrow svg:hover{
    fill: #133285;
  }
  .sel_lang span{
    font-size: 24px;
  }
  .lang-item{
    width: 50px;
    text-align: center;
  }
  .pro-item{
    width: 250px;
    border: 1px solid #000;
  }
  .scroll-arow img{
    width: 50px;
    height:auto;
  }



  /*sky*/

  #skype {
    position: fixed;
    right:0;bottom:150px;
    width: 55px;
    height: 70px;
    z-index: 999;
    /*background-color:#22a0db;*/
    color:white;
  }
  #skype a{
    color: #fff;
  }
  #skype:hover {
    color: #fff;
  }
</style>
