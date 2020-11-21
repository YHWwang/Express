<template>
    <div>
      <div v-html="tabData"></div>
    </div>
</template>

<script>
    export default {
        name: "TabItem",
      props:["shopData"],
      data(){
          return {
              tabData:""
          }
      },
      methods:{
        // escape2Html(str) {//对数据转译
        //   var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        //   var res =  str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        //   var reg = /<pre.+?>(.+)<\/pre>/g;
        //   var result = res.match(reg);
        //   if(result){
        //     return RegExp.$1;
        //   }else{
        //     return res
        //   }
        // },
        // replaceHtml(str,key){
        //   var reg = new RegExp( key , "g" )
        //
        //   return  str.replace( reg , '' );
        // },
        // DoTranslation(val){
        //   var str = this.escape2Html(val)//产品描述
        //   str =  this.replaceHtml(str,'<br>')
        //   str =  this.replaceHtml(str,'<pre>')
        //   str =  this.replaceHtml(str,'<code>')
        //   str =  this.replaceHtml(str,'</pre>')
        //   str =  this.replaceHtml(str,'</code>')
        //   return str
        // }
      },
      created() {

        // this.tabData = this.DoTranslation(this.shopData)
        this.tabData = this.shopData
        // console.log(this.shopData);
        // debugger
        // var url =this.shopData.hotImg
        //
        // console.log(url==undefined);
        // // console.log(url);
        // const s = document.createElement('script');
        // s.type = 'text/javascript';
        // s.src = url
        // s.async = 'true';
        // document.body.appendChild(s);
        // this.des = this.DoTranslation(this.description)
      },
      watch:{
          'shopData':function () {
            // this.tabData = this.DoTranslation(this.shopData)
            this.tabData = this.shopData
            // var url =this.shopData.hotImg
            // const s = document.createElement('script');
            // s.type = 'text/javascript';
            // s.src = url
            // s.async = 'true';
            // document.body.appendChild(s);
          },
        // 'description':function () {
        //   this.des = this.DoTranslation(this.description)
        // }
      }
    }
</script>

<style scoped>

</style>
