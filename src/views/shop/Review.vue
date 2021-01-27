<template>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('views.shop.review.serviceScore')" prop="serviceScore">
        <el-rate v-model="ruleForm.serviceScore"></el-rate>
      </el-form-item>
        <el-form-item :label="$t('views.shop.review.textarea')" prop="textarea">
          <el-input
            type="comment"
            :rows="2"
            placeholder="enter text..."
            v-model="ruleForm.comment">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('views.shop.review.pics')" prop="pics">
          <el-upload
            action="https://www.blackview.hk/api/product/replay/upload"
            accept="image/png,image/jpg,image/jpeg"
            list-type="picture-card"
            :limit="3"
            :multiple="true"
            :on-success="imgSuccess"
            :show-file-list="true"
            :on-preview="handlePreview"
            :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="show" class="">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">{{$t('views.shop.review.Cancel')}}</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('views.shop.review.Submit')}}</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>
<script>
  import {AddComment,DelComment} from "@/api/shop"
  import {Message} from "element-ui";
    export default {
        name: "Review",
      props:['CloseDialog',"productId"],
      data(){
          return {
            dialogImageUrl:'',
            show:false,
            ruleForm:{
              comment:"",//文本域
              serviceScore:0,//星星
              pics:[],
            },
            imgList:'',
            rules:{
              serviceScore:[
                { required: true, message: this.$t('views.shop.review.rules.serviceScore'), trigger: 'blur' }
              ],
              comment:[
                { required: true, message: this.$t('views.shop.review.rules.comment'), trigger: 'blur' }
              ]
            },
          }
      },
      methods:{
        imgSuccess(file){
          this.ruleForm.pics.push(file)
        },
        /*提交评论*/
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.pics = JSON.stringify(this.ruleForm.pics)
              this.ruleForm.productId =this.productId
              this.$nextTick(()=>{
                AddComment(this.ruleForm).then(res=>{
                  if (this.$refs[formName]!==undefined) {
                    this.$refs[formName].resetFields();
                  }
                  Message({ message: this.$t('views.shop.review.message'), type: 'success' })
                  // alert('Thank you for your review. It has been submitted to the webmaster for approval.')
                  this.$emit('CloseDialog')
                }).catch(error=>{
                  this.$emit('CloseDialog')
                })
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {

          if (this.$refs[formName]!==undefined) {
            this.$refs[formName].resetFields();
          }
          this.$emit('CloseDialog')
        },
        handleRemove(file, fileList) {
          var inx = this.ruleForm.pics.indexOf(file.response)
          this.ruleForm.pics.splice(inx, 1)
          var arr = file.response.split('/').slice(-2)
          var url =arr[0]+ '/' +arr[1]

          DelComment(url).then(res=>{
            // console.log(res);
          }).catch(error=>{
            console.log(error);
          })
        },
        handlePreview(file) {
          this.dialogImageUrl = file.url
          this.show = true;
        }
      }
    }
</script>

<style scoped>

</style>
