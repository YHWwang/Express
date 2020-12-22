<template>
  <div  v-html="bannerData" style="min-height:300px">
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
          var url = JSON.parse(res.data[0].value).url

            var jsArr = url.split(",")
            jsArr.forEach(jsItem => {
              const s = document.createElement('script');
              s.type = 'text/javascript';
              s.src = jsItem
              s.className = 'bv-yang'
              document.body.appendChild(s);
            })
        })
      },
      destroyed(){
        var target = document.getElementsByClassName('bv-yang')
        if(target != null){
          var len  = target.length
          for(var i = 0 ;i<len ; i++){
            document.body.removeChild(target[0])
          }
        }
      }
    }
</script>

<style scoped>
</style>
