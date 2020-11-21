<template>
    <div class="info">
   <h3>
    {{$t('views.User.AcountInfo.tit')}}
   </h3>
      <el-form ref="form" :model="form" label-width="100px" class="form-info" :label-position="labelPosition">
        <el-form-item :label="$t('views.User.AcountInfo.username')" class="info-item">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('views.User.AcountInfo.email')"  class="info-item">
          <el-input v-model="form.email" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('views.User.AcountInfo.realName')" class="info-item">
          <el-input v-model="form.realName" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('views.User.AcountInfo.nickname')"  class="info-item">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item :label="$t('views.User.AcountInfo.phone')"  class="info-item">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item  class="info-item">
          <el-button type="primary" @click="onSubmit" class="sub-btn" :loading="loading">{{$t('views.User.AcountInfo.Upload')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import { UserInfo } from '@/api/user' //获取info
  import { UpdateInfo } from '@/api/user'
  import {Message} from "element-ui"; //更新info

    export default {
        name: "AcountInfo",
      data(){
          return {
            loading: false,
            labelPosition:"left",
            form:{
              username:"",
              nickname:"",
              realName:"",
              email:"",
              phone:"",
              uid:""
            },
          }
      },
      methods:{
        onSubmit(){
          this.loading = true
          UpdateInfo(this.form).then(res=>{
            this.loading = false
            Message({ message: this.$t('views.User.AcountInfo.success'), type: 'success' ,offset:200})
            this.GetInfo()
          }).catch(error=>{
            console.log(error);
          })
        },
        GetInfo(){
          UserInfo().then(res=>{
            this.form.uid = res.data.data.uid
            localStorage.setItem("uid",res.data.data.uid)
            this.form.email = res.data.data.email
            this.form.username = res.data.data.username
            this.form.nickname = res.data.data.nickName
            this.form.realName = res.data.data.realName
            this.form.phone = res.data.data.phone
          }).catch(error=>{

          })
        }

      },

      created() {
        if(document.body.clientWidth>=800){
          this.labelPosition = 'left'
        }else{
          this.labelPosition = 'top'
        }
       this.GetInfo()
      }
    }
</script>

<style scoped>
.form-info{
  background: white;
  padding: 20px;
}
.sub-btn{
  margin-left: 50%;
  transform: translateX(-50%);
}
h3{
  color: rgb(128,128,128);
  background: white;
  padding: 20px;
  margin-bottom: 20px;
}
  .info-item{
    max-width:500px;
  }
@media screen and (max-width:800px) and (min-width:200px){
  h3{
    font-size: 14px;
    padding: 10px;
    margin-bottom: 10px;
  }
  /deep/ .el-form-item__label{
    line-height: 20px;
  }
  /deep/ .el-form-item{
    margin-bottom: 10px;
  }
}
</style>
