<template>
  <div>
    <h3>
       {{$t('views.User.shopping.tit')}}
    </h3>
    <el-table
      :data="address"
      style="width: 100%">
      <el-table-column
        prop="realName"
        :label="$t('views.User.shopping.Name')"
>
      </el-table-column>
      <el-table-column
        prop="phone"
        :label="$t('views.User.shopping.PhoneNumber')"
>
      </el-table-column>
      <el-table-column
        prop="address"
        :label="$t('views.User.shopping.Address')">
      </el-table-column>
      <el-table-column
        prop="city"
        :label="$t('views.User.shopping.city')">
      </el-table-column>
      <el-table-column
        prop="postCode"
        :label="$t('views.User.shopping.postCode')">
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$t('views.User.shopping.operition')">
        <template slot-scope="scope">
          <el-button @click="Del(scope.row)" type="text" size="small" class="btn-del">{{$t('views.User.shopping.Del')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { GetAdderss,DelAddress } from "@/api/user"
  import {Message} from "element-ui";
  export default {
    name:"ShoppingAddress",
    data() {
      return {
        address:[]
      }
    },
    methods:{
      Del(row){
        DelAddress(row.id).then(res=>{
          if(res.data.status == 200){
            Message({ message:this.$t('views.User.shopping.success'), type:'success'})
            this.address = this.address.filter(function (item) {
              return row.id !=item.id
            })
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    },
    created() {
      GetAdderss().then(res=>{
        for(var key in  res.data.data.content){
         this.address.push(res.data.data.content[key])
          res.data.data.content[key].address =  res.data.data.content[key].detail +res.data.data.content[key].city +res.data.data.content[key].province +  res.data.data.content[key].country
        }
      }).catch(error=>{
        console.log(error);
      })
    }

  }
</script>
<style scoped >
  h3{
    margin-bottom: 20px;
    color: rgb(128,128,128);
    background: white;
    padding: 20px;
  }
  .btn-del{
    border: 1px solid #ccc;
    padding:10px 20px;
    border-radius: 10px;
  }
  @media screen and (max-width:800px) and (min-width:200px){
    h3{
      font-size: 14px;
      padding: 10px;
      margin-bottom: 10px;
    }
  }

</style>
