<template>
    <div class="shop-method">
      <table class="table-content">
        <thead>
          <td></td>
          <td>{{$t('views.set.shop.msg1')}}</td>
          <td>{{$t('views.set.shop.msg2')}}</td>
        </thead>
        <tbody class="tbody-shop" >
        <tr v-if="standardSmall">
          <td><el-radio v-model="ShippingMethod" label="standard" class="radio-name">{{$t('views.set.shop.tit1')}}</el-radio></td>
          <td>{{$t('views.set.shop.msg3')}}</td>
          <td>{{$t('views.set.shop.msg4')}}</td>
        </tr>
        <tr v-if="dhl">
          <td><el-radio v-model="ShippingMethod" label="expedited">{{$t('views.set.shop.tit2')}}</el-radio></td>
          <td>{{$t('views.set.shop.msg5')}}</td>
          <td>US$ {{postPrice}}</td>
        </tr>
        </tbody>

      </table>

      <el-button type="info" class="btn-save" @click="btnSave">{{$t('views.set.shop.btn')}}</el-button>
    </div>
</template>

<script>
    export default {
        name: "ShopMethod",
      props:["postPrice",'shopmethodArr'],
      data(){
          return {
            ShippingMethod:"standard",
            dhl:false,
            standardSmall:false
          }
      },
      methods:{
        btnSave(){
          this.$emit('shopMethod',this.ShippingMethod)
        }
      },
      watch:{
         'shopmethodArr.id':function () {
           this.ShippingMethod = this.shopmethodArr.standardSmall?'standard':'expedited'
           this.dhl = this.shopmethodArr.dhl
           this.standardSmall = this.shopmethodArr.standardSmall
         }
      },
      created() {

        this.ShippingMethod = this.shopmethodArr.standardSmall?'standard':'expedited'
        this.dhl = this.shopmethodArr.dhl
        this.standardSmall = this.shopmethodArr.standardSmall
      }
    }
</script>

<style scoped>
  .radio-name{
    width: 100%;
  }
  .shop-method{
    width: 100%;
  }
  .table-content{

    /*width:892px;*/
    width: 90%;
    text-align: center;
    color: rgba(0,0,0,.6);
    text-align: left;
    margin: 0 auto;
    border-collapse: collapse;
    text-align: center;
    padding: 10px 0;
  }
.btn-save{
  margin-left: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
  transform: translateX(-50%);
  color: white;
  background: #133285;
  font-size: 16px;
}
  thead td{
    height: 30px;
    border-bottom: 1px solid rgba(0,0,0,.6);
  }
  td{
    height: 30px;
    text-align: left;
    padding: 10px 3px;

  }


  @media screen and (max-width:800px) and (min-width:200px){
    .radio-name{
      width: 30%;
      word-break:break-all;
      /*transform: scale(.6);*/

    }
    .shop-method{
      width: 98%;
      padding: 10px 3px;
    }
    .table-content{
      width: 100%;
      /*margin-left: 10px;*/
    }
    td{
      font-size: 12px;
      /*transform: scale(.6);*/
    }
    /deep/.el-radio__label{
      font-size: 12px;
    }
  }
</style>
