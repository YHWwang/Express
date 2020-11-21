<template>
  <div class="big-box-bg">
    <div class="active-big-box">
      <div class="active-box">
        <div class="active" v-if="show">
          <p class="green">{{$t('views.refister.active.p1')}} !</p>
          <p class="green">{{$t('views.refister.active.p2')}}</p>
          <el-button type="primary" class="btn"><router-link class="login" to="/login">{{$t('views.refister.active.btn1')}}</router-link></el-button>
        </div>
        <div class="active" v-else>
          <p class="red">{{$t('views.refister.active.err')}} !</p>
          <p class="red">{{message}}</p>
          <el-button type="primary" class="btn"><router-link class="login" to="/home"> {{$t('views.refister.active.btn2')}}</router-link></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {active} from '@/api/login'
    export default {
        name: "active",
      data(){
          return {
              show:false,
            message:""
          }
      },
      methods:{
        handleC(){
          this.$router.push(`/`)
        }
      },
      created() {
         var param=  this.$route.params.id
        active(param).then(res=>{
          var status = res.data.status

          if(status == 200){
            this.show = true
          }else{
            this.show = false
            this.message = res.data.message
            this.$nextTick(()=>{

            })
          }
          }).catch(error=>{
            this.show = false
          this.message = error
            console.log(error);
          })

      }

    }
</script>

<style scoped>

.active{
  background: white;
  width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 50px;

}
  .green{
    color: green;
    font-size: 20px;
  }
  .btn{
    margin-top: 30px;
  }
  .login {
    color: white;
    font-size: 20px;
  }
  .red{
    color: red;
  }
@media screen and (max-width:800px) and (min-width:200px){
  .active{
    width: 80%;
    padding: 10px;
  }
}
</style>
