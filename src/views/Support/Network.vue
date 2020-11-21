<template>
  <div class="big-box-bg">
    <div class="network-box">
      <p class="network-txt">{{$t('views.Support.Network.msg_1')}}</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="network-network" label-position="top">
        <el-form-item :label="$t('views.Support.Network.product')" prop="product" class="network-item">
          <el-select v-model="ruleForm.product" :placeholder="$t('views.Support.Network.placeholder1')" >
            <el-option v-for="(item,index) in phoneData" :label="item.cellPhone" :value="item.id" :key="index" class="item-ipt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('views.Support.Network.country')" prop="country" class="network-item">
          <el-select v-model="ruleForm.country" :placeholder="$t('views.Support.Network.placeholder2')">
            <el-option v-for="(item,index) in countryData" :label="item" :value="item" :key="index"  class="item-ipt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="network-item">
          <el-button class="reset" @click="resetForm('ruleForm')">{{$t('views.Support.Network.Reset')}}</el-button>
          <el-button class="submit"  type="danger" @click="submitForm('ruleForm')">{{$t('views.Support.Network.Submit')}}</el-button>
        </el-form-item>
      </el-form>
      <div class="query-box" :style="show">
        <div class="query-t-box">
          <h3 class="red-color">{{querySupport.cellPhone}}</h3>
          <ul>
            <li v-for="item in querySupport.frequencySupports"><strong>{{item.type}}:</strong><span class="li-content">{{item.bands}}</span></li>
          </ul>
        </div>
        <div class="support-box" :style="show">
          <p class="red-color">{{productName}} In {{ruleForm.country}} .</p>
          <p class="red-color">{{$t('views.Support.Network.msg_2')}}</p>
        </div>
        <div class="support-4g" :style="show4G">
          <p class="red-color">{{$t('views.Support.Network.msg_3')}}</p>
          <table>
            <thead>
            <th>{{$t('views.Support.Network.th_1')}}</th>
            <th>{{$t('views.Support.Network.th_2')}}</th>
            <th>{{$t('views.Support.Network.th_3')}}</th>
            <th>{{$t('views.Support.Network.th_4')}}</th>
            <th>{{$t('views.Support.Network.th_5')}}</th>
            </thead>
            <tbody>
            <tr v-for="item in tableData" class="red-color">
              <td v-for="z in item">{{z}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="unsupport-4g red-color"  :style="un4Gshow"><p>{{$t('views.Support.Network.msg_4')}}</p></div>
      </div>
    </div>
  </div>

</template>
<script>
  import {NetWork} from "@/api/support"
  import {supportCountry} from '@/utils/auth'
    export default {
        name: "Network",
      data(){
          return {
            phoneData:"",//关于手机
            countryData:"",//关于国家
            querySupport:"",//查询结果
            tableData:"",//表格数据
            show:"display:none",//支持的频段结果
            show4G:"display:none",//支持4G
            un4Gshow:"display:none",//不支持4G
            productName:"",
            ruleForm:{
              product:"",
              country:"",
            },
            rules:{
              product: [
                { required: true, message: this.$t('views.Support.Network.rules_p'), trigger: 'change' }
              ],
              country: [
                { required: true, message: this.$t('views.Support.Network.rules_c'), trigger: 'change' }
              ],
            }
          }
      },
      methods:{
        submitForm(formName) {
          var _this = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var arr = []

              this.phoneData.forEach(function (item,index) {
                      if(item.id == _this.ruleForm.product){
                        _this.productName = item.cellPhone
                        arr = _this.phoneData[index]
                      }
              })
              this.bandsRender(_this.ruleForm.country,_this.ruleForm.product)
              _this.querySupport = arr
              // this.show4G = "display:block"
              this.show = "display:block"

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
          this.show = "display:none"
          this.show4G = "display:none"
          this.show4G = "display:none"
        },
        bandsRender(country, productSelectId){
            var arr1 = []; // 匹配到某个国家的所有数据
            var arr2 = []; // 符合手机支持的数据
            var reg = new RegExp(country);
            var band4G = '';
            // console.log(productSelectId); // 产品排列的ID号

            // 获取手机支持的4g频段
          this.phoneData.forEach(function (item, index) {
              if(item.id == productSelectId) {
                band4G = item.band4G;
              }
            });

          // 全球频段处理后的数据
          var nAllFrequencyData = [];
          // 全球国家
          var country = [];
          var oAllFrequencyData =  supportCountry();
          oAllFrequencyData.forEach(function (value,index,array) {
            value = value.replace(/[\u4e00-\u9fa5]/g,"");
            var tempArray = value.split(",");
            tempArray[1] = tempArray[1].replace(/(^\s*) | (\s*$)/g, "");

            nAllFrequencyData[index] = tempArray;
          });

            nAllFrequencyData.forEach(function (value,index) {
              if(reg.test(value[1])) {
                arr1.push(value);
              }
            });
            if(band4G !== null && band4G !== ""&& band4G !== undefined) {
              arr1.forEach(function (value) {
                var countryBand = value[3].split(' '); // 某个国家下支持的band, array
                var phoneBand = band4G.split(',');

                countryBand.forEach(function (countryBandItem) {
                  phoneBand.forEach(function (phoneBandItem) {
                    if(countryBandItem === phoneBandItem) {
                      arr2.push(value);
                    }
                  })
                });


              });
            }
            if(arr2[0] !== undefined) {
              this.tableData = arr2
              this.show4G = "display:block"
                this.un4Gshow = "display:none"

            } else {
              this.show4G = "display:none"
              this.un4Gshow = "display:block"
            }
          // };
        },
        handleCountry(){//国家列表
          var arr  =  supportCountry();

          // 全球频段处理后的数据
          var nAllFrequencyData = [];
          // 全球国家
          var country = [];
          arr.forEach(function (value,index,array) {
            value = value.replace(/[\u4e00-\u9fa5]/g,"");
            var tempArray = value.split(",");
            tempArray[1] = tempArray[1].replace(/(^\s*) | (\s*$)/g, "");

            nAllFrequencyData[index] = tempArray;
          });
          nAllFrequencyData.forEach(function (value,index) {
            country[index] = value[1];
          });
          // 国家数据处理
          var countryFn = function (o) {
            // 按字母排列国家
            o.sort(function (a,b) {
              var nameA = a.toLowerCase();
              var nameB = b.toLowerCase();
              if(nameA < nameB) {
                return -1;
              }
              if(nameA > nameB) {
                return 1;
              }
              return 0;
            });

            // 去除重复国家
            var newArr = [];
            for(var i = 0; i < o.length - 1; i++) {
              if(newArr.indexOf(o[i]) === -1) {
                newArr.push(o[i]);
              }
            }
            country = newArr;

          }(country);

          this.countryData =country
        }
      },
      created() {
        NetWork().then(res=>{
          var netData  =  res.data
          netData.forEach(function (val,inx) {
            netData[inx].frequencySupports =JSON.parse(val.frequencySupports)
          })
          this.phoneData = netData;
          // console.log();
        }).catch(error=>{
          console.log(error);
        })
           // this.phoneData = supportsData();
           this.handleCountry()
      }
    }
</script>

<style scoped>
  .network-box{
    background: white;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
  }
  .network-txt{
    max-width: 800px;
    font-size: 16px;
    line-height: 1.8em;
    color: #666;
    /*margin-bottom: 20px;*/
    margin: 20px auto;
    padding: 5px;
    /*text-align: center;*/
  }
  .network-network{
    max-width: 800px;
    margin: 0 auto;
    padding: 5px;
  }
  .reset{
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
     }
  .reset:hover{
    color: #fff;
    background-color: #138496;
    border-color: #117a8b;
  }
  .submit{
    background: red;
    color: #fff;
  }
  .network-item{
    font-weight: bold;
  }
  .query-box{
    max-width: 800px;
    margin: 0 auto;
    padding: 5px;
  }
  .query-t-box{
    border: 1px solid #000;
    /*max-width:375px;*/
    padding: 20px;
  }
  .query-box li{
   /*list-style-type: circle;*/
    list-style: disc;
    font-size: 16px;
    line-height: 1.4em;
    /*background: #000;*/
  }
  .query-box .li-content{
    color: #f60;
    padding-left: 10px;
  }
  .red-color{
    color: red;
  }
  .query-box p{
    padding-left: 20px;
    font-size: 16px;
    line-height: 30px;
  }
  table{
    border-collapse:collapse;
    border:1px solid black;
  }
  .support-4g td,th{
    border: 1px solid #000;
    collapse: 0;
    padding: 5px 10px;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    .network-box{
      padding:20px 5px;
    }
    .network-item{
      width: 90%;
      margin: 10px auto;
    }
   .item-ipt{
     width: 100%;

   }
   /deep/ .el-select{
     width: 100%;
   }
   /deep/ .el-form-item__content{
     text-align: center;
   }
  }

</style>
