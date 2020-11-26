<template>
  <div class="big-box-bg">
    <div class="ce-box">
      <h3>{{$t('views.Support.Ce.tit')}}</h3>
      <ul>
        <li v-for="(item,index) in CeList" :key="index">
          <a  :href="baseApi + '/file/' + item.type + '/' + item.realName" target="_blank">{{item.name}}</a>
        </li>
      </ul>
      <!--      <a href="https://www.blackview.hk/uploads/2020/06/A80.zip" target="_blank">item</a>-->
    </div>
  </div>
</template>

<script>
  import { CeData } from "@/api/support"
    export default {
        name: "Ce",
      data(){
          return {
            // baseApi:"http://192.168.0.196:8082",//本地
            baseApi:"http://18.159.77.152:8082",//正式环境
            CeList:""
          }
      },
      created() {
        CeData().then(res=>{
          this.CeList = res.data.content
          this.$nextTick(()=>{

          })
          // console.log();
        }).catch(error=>{
          console.log(error);
        })
      }
    }
</script>

<style scoped>
  .ce-box {
    padding: 50px 0;
    max-width: 800px;
    margin: 50px auto;
    background: white;
  }
  .ce-box ul{
    margin: 50px auto;
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
  }
  .ce-box li{
    width: 300px;
    text-align: center;
  }
  .ce-box h3{
    text-align: center;
  }
  .ce-box a{
    color: #ff6600;
    display: block;
    text-align: center;
    line-height: 2em;
  }
  .ce-box a:hover{
    color: #1d7cc5;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .ce-box{
      margin-top: 10px;
      padding: 20px 0;
    }
  }


</style>
