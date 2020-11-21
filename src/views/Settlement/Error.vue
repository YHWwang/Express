<template>
  <div class="big-box-bg">
    <div class="error">
      <p>{{$t('views.set.err.tit')}}</p>
      <router-link to="/user/orders" class="shopping-now" >{{$t('views.set.err.msg')}}</router-link>
    </div>
  </div>

</template>
<script>
    export default {
        name: "Error",
      data(){
          return{

          }
      },
      methods:{

      },
      watch:{
      },
      created() {
      }
    }
</script>

<style scoped>
  .error{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  .shopping-now{

    padding: 10px 20px;
    border: 1px solid rgba(128,128,128,1);
    border-radius: 10px;
    margin: 30px;
  }

</style>
