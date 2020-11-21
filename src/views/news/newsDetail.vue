<template>
  <div class="big-box-bg">
    <div class="news-detail">
      <router-link to="/news/" class="back-link"> <el-button type="primary" class="btn">{{$t('views.news.tit2')}}</el-button></router-link>
      <h3>{{title}}</h3>
      <div class="news-content" v-html="newsContent">
      </div>
    </div>
  </div>

</template>

<script>
  import {GetNewsDetail } from '@/api/home'
  export default {
    name: "newsDetail",
    data(){
      return {
       newsContent:'',
        title:''
      }
    },
    methods:{
    },
    created() {
      const id = this.$route.params.id
      GetNewsDetail(id).then(res=>{
        this.title = res.data.data.title
        this.newsContent =  res.data.data.content
      }).catch(error=>{
        console.log(error);
      })
    }
  }
</script>

<style scoped>
  .news-detail{
    background: white;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    font-size: 20px;
  }
  p{
    font-size: 20px!important;
  }
  .news-content{
     width:930px;
    margin: 0 auto;
  }
  .back-link{
    font-size: 20px;
  }
  /*.back-link:hover{*/
  /*  color: #1d7cc5;*/
  /*}*/
  .btn{
    background: #133285;
  }
  @media screen and (max-width:800px) and (min-width:350px){
    .news-content{
      width: 100%;
    }
    .news-detail{
      padding: 20px;
    }
  }
  .news-detail h3{
    font-size:30px;
    text-align: center;
    margin-bottom: 30px;
  }

</style>
