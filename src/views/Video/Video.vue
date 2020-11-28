<template>
  <div class="big-box-bg">
     <div class="video-box">
<!--       <p>Video</p>-->
      <ul class="">
        <li v-for="item in vList">
          <iframe :height="iframeHeight" :width="iframeWidth" :src="item.ipStatus?item.map.url:item.map.youKu" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <h3 :style="nameWidth">&nbsp;{{item.map.name}}</h3>
<!--          <div style="padding-left: 10px;margin-top: 10px">-->
<!--            <span>Blackview</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="video-date">{{DateTime(item.addTime)}}</span>-->
<!--          </div>-->

        </li>
      </ul>
      <el-pagination class="video-page"
                     :total="total"
                     :page-size="size"
                     :current-page="page + 1"
                     style="margin-top: 8px;"
                     layout="prev, pager, next"
                     @current-change="pageChange"
      />
    </div>
  </div>
</template>
<script>
  import { DateTime  } from '@/utils/auth'
  import { VideoList } from "@/api/home"
    export default {
        name: "Video",
      data(){
          return {
            vList:"",
            total:0,
            page:0,
            size:10,
            iframeHeight:"",
            nameWidth:"",
            iframeWidth:"",
          }
      },
      beforeMount:function(){
        this.imgHeight = document.body.clientWidth*946/1920;
        if(document.body.clientWidth>800){
          this.iframeWidth= 550
          this.iframeHeight = 550 * 0.5625
          this.nameWidth="width:550px"
        }else{
          this.iframeWidth = document.body.clientWidth -20
          this.iframeHeight= this.iframeWidth * 0.5625
          this.nameWidth="width:90%"
        }
      },
      methods:{
        DateTime,
        pageChange(val){
          this.getList(val-1)
        },
        getList(page){
          VideoList(page).then(res=>{
            this.vList = res.data.content
            this.total = res.data.totalElements
          }).catch(error=>{
            console.log(error);
          })
        }
      },
      created() {
        this.getList(0)
      }
    }
</script>

<style scoped>
  .video-box{
    background: white;
    max-width: 1200px;
    margin: 0 auto;


  }
  .video-date{
    color: rgba(128,128,128,.8);
  }
  h3{
    padding-left:10px;
    box-sizing: border-box;
  }
  @media screen and (max-width:800px) and (min-width:350px){
    .video-box{
      width: 100%;
    }
  }
  .video-box ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .video-box li{

    margin: 10px;
  }
  .video-page{
    /*margin: 0 auto;*/
    text-align: center;
  }
</style>
