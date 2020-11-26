<template>
  <div class="big-box-bg">
    <div class="news-list">
      <div>
        <router-link to="/"><span>{{$t('views.news.tit')}}</span></router-link> <span> >  </span> <span>{{$t('views.news.msg')}}</span>
      </div>
      <h2>{{$t('views.news.msg2')}}</h2>
      <div class="news-content">
        <ul>
          <li v-for="(item,index) in newsList" @click="handleC(item.id)" :key="index">
            <div class="left">
              <img :src="item.imageInput" alt="">
            </div>
            <div class="right">
              <h3>{{item.title}}</h3>
              <p>{{item.synopsis}}</p>
            </div>
          </li>
        </ul>
        <el-pagination
          class="news-page"
          :total="total"
          :page-size="size"
          :current-page="page + 1"
          style="margin-top: 8px;"
          layout="prev, pager, next"
          @current-change="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import  {GetNewsList} from '@/api/home'
  export default {
    name: "newList",
    data(){
      return {
        newsList:"",
        total:0,
        page:0,
        size:10
      }
    },
    methods:{
      handleC(id){
        this.$router.push(`/newsdetail/${id}`)
      },
      pageChange(val){

        this.getList(val-1)
      },
      getList(page){
        GetNewsList(page).then(res=>{
          this.newsList = res.data.data.content
          this.total = res.data.data.totalElements

        }).catch(error=>{
          console.log(error);
        })
      }
    },

    created() {
       this.getList(this.page)

    }
  }
</script>

<style scoped>
  .news-list{
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    padding: 10px;
  }

  .news-content ul li{
    width: 100%;
    /*height: 150px;*/
    display: flex;
    justify-content: left;
    margin: 20px 0px;
    cursor: pointer;
  }
  .news-content .left{
    width: 300px;
  }
  .news-content .left img{
    width: 100%;
    height: 100%;
  }
  .news-content .right{
    width: 800px;
    margin-left: 30px;
  }
  .news-page{
    text-align: center;
  }
  .news-content ul li:hover{
    color: #1d7cc5;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .news-content .left{
      width:250px;
    }
    .news-content .left img{
      width: 100%;
      height: auto;
    }
    .right h3{
      font-size: 14px;
    }
    .right p{
      font-size: 12px;
    }
    .news-content .right{
      margin-left: 10px;
    }
  }

</style>
