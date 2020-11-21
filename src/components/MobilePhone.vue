<template>
    <div class="mobile-box" >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :router="true"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <router-link to="/products/all" class="mobile-link">{{$t('mob_pho.title1')}}</router-link>
          </template>
          <el-menu-item-group v-for="(item,index) in products"  :key="index">
            <el-menu-item :index="'/products/'+item.id" :key="index">{{item.cateName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <router-link to="/shop/all" class="mobile-link">{{$t('mob_pho.title2')}}</router-link>
          </template>
          <el-menu-item-group v-for="(item,index) in shopCatalog" :key="index">
            <el-menu-item :index="'/shop/'+item.keyword" :key="index">{{item.keyword}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <router-link to="/solutions" class="mobile-link">{{$t('mob_pho.title3')}}</router-link>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/solutions/thermal-imaging">{{$t('mob_pho.msg1')}}</el-menu-item>
            <el-menu-item index="/solutions/Construction">{{$t('mob_pho.msg2')}}</el-menu-item>
            <el-menu-item index="/solutions/transportation">{{$t('mob_pho.msg3')}}</el-menu-item>
            <el-menu-item index="/solutions/manufacturing">{{$t('mob_pho.msg4')}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <router-link class="mobile-link" to="/support">{{$t('mob_pho.title4')}}</router-link>
        <br>
        <a class="mobile-link" href="http://bbs.blackview.hk/" target="_blank">{{$t('mob_pho.msg5')}}</a>
        <br>
        <router-link to="/find-a-store" class="mobile-link">{{$t('mob_pho.title5')}}</router-link>
        <br>
        <router-link to="/user/orders"  class="mobile-link header-icon fa fa-user-circle-o"  aria-hidden="true">&nbsp;&nbsp;{{$t('mob_pho.title6')}}</router-link>
      </el-menu>
    </div>
</template>

<script>
    export default {
        name: "MobilePhone",
      props:["products","shopCatalog"],
      data(){
          return {

          }
      },
      methods: {
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        }
      },
      created() {
      }

    }
</script>

<style scoped>
  .mobile-box{
    background: white;
  }
.mobile-link{
  display: inline-block;
  height: 50px;
  line-height: 50px;
  padding: 0px 5px;
}
</style>
