<template>
  <div v-html="bannerData" style="min-height:300px">
  </div>
</template>

<script>
  import {banner} from "@/api/home"
    export default {
        name: "BanerData",
      data(){
          return {
                bannerData:""
          }
      },
      created() {
        banner().then(res=>{
        this.bannerData = JSON.parse(res.data[0].value).name
          const s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = JSON.parse(res.data[0].value).url+'?v='+ Math.random();
          s.async = 'true';
          document.body.appendChild(s);
        })
      }
    }
</script>

<style scoped>
</style>
