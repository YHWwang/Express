<template>
  <div id="Settle">
    <GenerateOrder></GenerateOrder>
    <Myfooter></Myfooter>
  </div>
</template>
<script>
import GenerateOrder from './GenerateOrder'
import Myfooter from "../../components/Myfooter";

  export default {
    name: "index",
    components:{
      GenerateOrder,
      Myfooter
    },
    data(){
      return {
      }
    },
    methods:{
    }

  }
</script>

<style scoped>

</style>
