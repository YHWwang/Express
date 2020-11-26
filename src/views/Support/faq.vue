<template>
  <div id="FAQ">
    <div class="faq-content">
      <h2>{{$t('views.Support.faq.faq')}}</h2>
      <div class="faq-item">
        <h4>{{$t('views.Support.faq.h1')}}</h4>
        <a href="#">{{$t('views.Support.faq.a_word')}}</a>
      </div>
      <div class="faq-item" v-for="(item,index) in FaqData" :key="index">
        <h4>{{item.title}}</h4>
        <p v-for="(key,index) in item.content" :key="index">{{key}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "faq",
    data(){
      return {
        FaqData:[
          {
           title: this.$t('views.Support.faq.tit_1'),
             content:[
                this.$t('views.Support.faq.msg_1_1'),
                this.$t('views.Support.faq.msg_1_2'),
                this.$t('views.Support.faq.msg_1_3'),        
                this.$t('views.Support.faq.msg_1_4'),
                this.$t('views.Support.faq.msg_1_5'),
                this.$t('views.Support.faq.msg_1_6'),             
                ]
          },
          {
           title: this.$t('views.Support.faq.tit_2'),
             content:[
                this.$t('views.Support.faq.msg_2_1'),
                this.$t('views.Support.faq.msg_2_2'),
                this.$t('views.Support.faq.msg_2_3'),        
                this.$t('views.Support.faq.msg_2_4'),
                this.$t('views.Support.faq.msg_2_5'),             
                ]
          },
          {
            title: this.$t('views.Support.faq.tit_3'),
            content:[
                this.$t('views.Support.faq.msg_3_1'),
                this.$t('views.Support.faq.msg_3_2'),
                this.$t('views.Support.faq.msg_3_3'),        
                this.$t('views.Support.faq.msg_3_4'),
             ]
          },
          {
            title: this.$t('views.Support.faq.tit_4'),
             content:[
                this.$t('views.Support.faq.msg_4_1'),
                this.$t('views.Support.faq.msg_4_2'),
                this.$t('views.Support.faq.msg_4_3'),        
             ]
          },
          {
            title:this.$t('views.Support.faq.tit_5'),
            content:[
                this.$t('views.Support.faq.msg_5_1'),
                this.$t('views.Support.faq.msg_5_2'),
                ]
          },
          {
            title: this.$t('views.Support.faq.tit_6'),
            content:[
                this.$t('views.Support.faq.msg_6_1'),
              ]
          },
          {
            title: this.$t('views.Support.faq.tit_7'),
            content:[
                this.$t('views.Support.faq.msg_7_1'),
                this.$t('views.Support.faq.msg_7_2'),
                this.$t('views.Support.faq.msg_7_3'),        
                this.$t('views.Support.faq.msg_7_4'),
                this.$t('views.Support.faq.msg_7_5'),  
            ]
          },
          {
            title: this.$t('views.Support.faq.tit_8'),
            content:[
                this.$t('views.Support.faq.msg_8_1'),
                this.$t('views.Support.faq.msg_8_2'),
                this.$t('views.Support.faq.msg_8_3'),        
                this.$t('views.Support.faq.msg_8_4'),
                this.$t('views.Support.faq.msg_8_5'), 
                this.$t('views.Support.faq.msg_8_6'),   
               ]
          },
          {
            title: this.$t('views.Support.faq.tit_9'),
            content:[
                this.$t('views.Support.faq.msg_9_1'),
                this.$t('views.Support.faq.msg_9_2'),
                this.$t('views.Support.faq.msg_9_3'),        
                this.$t('views.Support.faq.msg_9_4'),
            ]
          },
          {
            title: this.$t('views.Support.faq.tit_10'),
            content:[
                this.$t('views.Support.faq.msg_10_1'),
                this.$t('views.Support.faq.msg_10_2'),
            ]
          },
          {
            title: this.$t('views.Support.faq.tit_11'),
            content:[
                this.$t('views.Support.faq.msg_11_1'),
                this.$t('views.Support.faq.msg_11_2'),
                this.$t('views.Support.faq.msg_11_3'),      
            ]
          },
          {
            title:this.$t('views.Support.faq.tit_12'),
            content:[
                this.$t('views.Support.faq.msg_12_1'),
                this.$t('views.Support.faq.msg_12_2'),
                this.$t('views.Support.faq.msg_12_3'),        
                this.$t('views.Support.faq.msg_12_4'),
            ]
          },
          {
            title:this.$t('views.Support.faq.tit_13'),
            content:[
                this.$t('views.Support.faq.msg_13_1'),
                this.$t('views.Support.faq.msg_13_2'),
                this.$t('views.Support.faq.msg_13_3'),        
                this.$t('views.Support.faq.msg_13_4'),
                this.$t('views.Support.faq.msg_13_5'),
                this.$t('views.Support.faq.msg_13_6'),
                this.$t('views.Support.faq.msg_13_7'),   
            ]
          },
          {
            title: this.$t('views.Support.faq.tit_14'),
            content:[
                this.$t('views.Support.faq.msg_14_1'),
                this.$t('views.Support.faq.msg_14_2'),
                this.$t('views.Support.faq.msg_14_3'),        
                this.$t('views.Support.faq.msg_14_4'),
                this.$t('views.Support.faq.msg_14_5'),
                this.$t('views.Support.faq.msg_14_6'),
                this.$t('views.Support.faq.msg_14_7'),   
                this.$t('views.Support.faq.msg_14_8'),
                this.$t('views.Support.faq.msg_14_9'),   
            ]
          },
          {
              title: this.$t('views.Support.faq.tit_15'),           
              content:[
                this.$t('views.Support.faq.msg_15_1'),
                this.$t('views.Support.faq.msg_15_2'),
                this.$t('views.Support.faq.msg_15_3'),        
                this.$t('views.Support.faq.msg_15_4'),
                this.$t('views.Support.faq.msg_15_5'),
            ]
          },
          {
            title: this.$t('views.Support.faq.tit_16'),
            content:[
                this.$t('views.Support.faq.msg_16_1'),
                this.$t('views.Support.faq.msg_16_2'),
                this.$t('views.Support.faq.msg_16_3'),
                this.$t('views.Support.faq.msg_16_4'),
                this.$t('views.Support.faq.msg_16_5'),
            ]
          },
          {
            title:this.$t('views.Support.faq.tit_17'),
            content:[
                this.$t('views.Support.faq.msg_17_1'),
                this.$t('views.Support.faq.msg_17_2'),
                this.$t('views.Support.faq.msg_17_3'),
                this.$t('views.Support.faq.msg_17_4'),
                this.$t('views.Support.faq.msg_17_5'),
                this.$t('views.Support.faq.msg_17_6'),
                this.$t('views.Support.faq.msg_17_7'),
                this.$t('views.Support.faq.msg_17_8'),
            ]
          },
          {
            title: this.$t('views.Support.faq.tit_18'),
            content:[
                this.$t('views.Support.faq.msg_18_1'),
                this.$t('views.Support.faq.msg_18_2'),
                ]
          },
          {
           title: this.$t('views.Support.faq.tit_19'),
            content:[
                this.$t('views.Support.faq.msg_19_1'),
                this.$t('views.Support.faq.msg_19_2'),
                this.$t('views.Support.faq.msg_19_3'),
                this.$t('views.Support.faq.msg_19_4'),
                this.$t('views.Support.faq.msg_19_5'),
                this.$t('views.Support.faq.msg_19_6'),
                this.$t('views.Support.faq.msg_19_7'),
            ]
          },
          {
            title: this.$t('views.Support.faq.tit_20'),
             content:[
                this.$t('views.Support.faq.msg_20_1'),
                this.$t('views.Support.faq.msg_20_2'),
                this.$t('views.Support.faq.msg_20_3'),
             ]
          },
          {
            title: this.$t('views.Support.faq.tit_21'),
             content:[
                this.$t('views.Support.faq.msg_21_1'),
                this.$t('views.Support.faq.msg_21_2'),
                this.$t('views.Support.faq.msg_21_3'),
                this.$t('views.Support.faq.msg_21_3'),
             ]
          },
        ]
      }
    }
  }
</script>

<style scoped>
  #FAQ{
    background: #f1f1f1;
    padding: 60px 0px;

  }
  .faq-content{
    max-width: 1140px;
    margin: 0 auto;
    background: white;
    padding: 25px;
  }
  h2{
    background-color: #f5f5f5;
    text-indent: 40px;
    font-size: 24px;
    line-height: 60px;
    text-align: left;
    margin:0 -15px 15px -15px;
  }
  .faq-item{
    margin-bottom: 30px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0 10px 15px;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }



  .faq-item:hover{
    box-shadow: 8px 8px 10px rgba(0,0,0,.1);
  }
  .faq-item:hover p{
    color: #008cd6;
  }
  .faq-item:hover h4{
    color: #008cd6;
  }
  .faq-item:hover a{
    color: #008cd6;
  }
  .faq-item h4 {
    position: relative;
    font-size: 18px;
    line-height: 1.2em;
    margin-bottom: 14px;
    color: #000;
    text-align: left;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .faq-item h4:before {
    display: block;
    content: "";
    position: absolute;
    top: 6px;
    bottom: auto;
    left: -15px;
    right: auto;
    z-index: 1;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #000;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .faq-item p,.faq-item a{
    font-size: 14px;
    line-height: 1.5em;
    margin-bottom: 10px;
    color: #666;
    text-align: left;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }

</style>
