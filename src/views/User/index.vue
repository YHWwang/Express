<template>
  <div class="big-box-bg">
    <div id="user">
      <div class="user-nav">
        <p class="title">{{$t('views.User.index.tit')}}</p>
        <ul class="user-nav-box">
          <li :class="{useractive:cur==0}" @click="cur=0">
            <router-link to="/user/orders" tag="li">{{$t('views.User.index.router1')}}</router-link>
          </li>
          <li :class="{useractive:cur==1}" @click="cur=1">
            <router-link to="/user/shippingaddress">{{$t('views.User.index.router2')}}</router-link>
          </li>
          <li :class="{useractive:cur==2}" @click="cur=2">
            <router-link to="/user/acountinfo">{{$t('views.User.index.router3')}}</router-link>
          </li>
          <li :class="{useractive:cur==3}" @click="cur=3">
            <router-link to="/user/passwordchange">{{$t('views.User.index.router4')}}</router-link>
          </li>
          <li :class="{useractive:cur==4}" @click="logout" >{{$t('views.User.index.logout')}}</li>
        </ul>
      </div>
      <div class="user-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import { UserInfo } from '@/api/user' //获取info 有没登录
  import { Logout } from '@/api/user' //退出登录
  import { setToken } from '@/utils/auth'//退出更新token
    export default {
        name: "index",
      data(){
          return {
            cur:""
          }
      },
      methods:{
        logout(){
         this.cur = 4;
          Logout().then(res=>{
            setToken("blackView",true);
            this.$router.push('/')
            this.$router.go(0)
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log('User signed out.');
            })
            auth2.disconnect();
          }).catch(error=>{
            console.log(error);
          })
        }
      },
      created() {
        UserInfo().then(res=>{

        }).catch(error=>{
         if(error.data.status == 401){
           this.$router.push("/")
         }
        })

        switch(this.$route.name){
          case "orders":this.cur = 0
            break;
          case "ShoppingAddress":this.cur = 1
            break;
          case "acountinfo":this.cur = 2
            break;
          case "PasswordChange":this.cur = 3
          default:
        }
      }
    }
</script>

<style scoped lang="scss">
  .useractive{
    background:gray;
  }
  #user{
    margin-left: 100px;
    margin-right: 100px;
    display: flex;
    justify-content: center;
  }
  .title{
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    background:#ccc;
  }
  .user-nav{
    width: 200px;
    /*height:500px;*/
    margin-right: 10px;
    background: white;

  }
  .user-nav li{
    width: 100%;
    min-width: 200px;
    position: relative;
    height:40px;
    line-height: 40px;
    text-align: center;
    a{
      font-size: 18px;
      position: absolute;
      display: inline-block;
      text-align: center;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

    }

  }
  .user-content{
    width: 700px;
    /*flex: 1;*/
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .title{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }
    .user-nav{
      width: 100%;
    }
    #user{
      display: block;
      margin: 0px;
    }
    .user-nav-box{
      display: flex;
      width: 100%;
      margin-bottom: 10px;
    }
.user-nav-box li{
  width: 20%;
  min-width: 50px;
  line-height: 20px;
}
    .user-nav-box li a{
      padding:0 10px;
      font-size: 12px;
    }
    .user-content{
      width: 100%;
    }

  }

</style>
