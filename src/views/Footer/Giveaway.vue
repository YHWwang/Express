<template>
  <div class="big-box-bg">
    <div style="padding: 30px;background: white" >

      <h2>{{$t('views.Footer.Giveaway.tit')}}</h2>
      <a class="e-widget no-button generic-loader" :href="href" rel="nofollow">{{content}}</a>
    </div>
  </div>

</template>

<script>

  import {Giveaway} from "@/api/giveaway"
    export default {
        name: "Giveaway",

      data(){
        return {
          href:"",
          content:""
        }
      },
      mounted() {
        Giveaway().then(res=>{
          this.href = res.data.href
          this.content = res.data.content
          this.$nextTick(()=>{

            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://widget.gleamjs.io/e.js';
            s.async = 'true';
            document.body.appendChild(s);
          })
        }).catch(error=>{
          console.log(error);
        })
      },

    }
</script>

<style scoped>
  h2{
    text-align: center;
    margin: 20px;
  }
</style>
