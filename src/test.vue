<template>
  <form id="submitForm" :action="requestUrl" method="post" style="display:none;">
    <input type="text" v-for="(value,key,index) in myForm" :name="key" :value="value">

<!--    <input type="submit" name="submit" v-model="Submit" id="submitBtn" v-trigger>-->


    <input style="display: none" type="button" value="按钮" @click="handleC">
  </form>
</template>
<script>
  import {test} from '@/api/test'
  export default {
    name: "test",
    data () {
      return {
           myForm:"",
        requestUrl:""
      };
    },
    methods:{
   axiosTest(){
  test().then(res=>{
        this.requestUrl = res.data.data.requestUrl
          var arr = res.data.data.params
          this.myForm =arr
          this.$nextTick(() => this.handleC() )
        }).catch(error=>{
          console.log(error);
        })
      },
      handleC(){
        document.getElementById('submitForm').submit();
      }
    },
    created() {
       this.axiosTest()
      // this.handleC()
    },
    directives:{
      trigger:{
        inserted(el,binging){

          // el.click()
          //$(el).trigger('click')
        }
      }
    }
  }
</script>
<style scoped>

</style>
