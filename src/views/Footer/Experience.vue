<template>
  <div id="main">
    <div class="sect1">
      <div class="bg">
        <img style="width: 100%;height: auto;" class="img-responsive" src="../../assets/img/footer/sect1_1.jpg" alt="">
      </div>

      <div class="content">
        <p class="p1">{{$t('views.Footer.Experience.tit_1')}}</p>
        <p>{{$t('views.Footer.Experience.tit_2')}}</p>
        <p>{{$t('views.Footer.Experience.tit_3')}}</p>
      </div>

      <div class="logo">
        <img src="../../assets/img/footer/logowhite.png" alt="">
        <span>{{$t('views.Footer.Experience.tit_4')}}</span>
      </div>
    </div>
    <div class="big-box-bg">
      <div class="sect2" style="background: white;">
        <div class="wrap">
          <div class="title">
            <h2>
              {{$t('views.Footer.Experience.msg_1')}}
            </h2>
          </div>

        <div class="content">
          <p class="p1">
           {{$t('views.Footer.Experience.msg_2')}}
          </p>
          <ul class="ul1">
            <li>
             {{$t('views.Footer.Experience.msg_3')}}
            </li>
            <li>
            {{$t('views.Footer.Experience.msg_4')}}
            </li>
            <li>
             {{$t('views.Footer.Experience.msg_5')}}
            </li>
            <li>
              {{$t('views.Footer.Experience.msg_6')}}
            </li>
          </ul>

          <br>
          <p class="p1">
	  	{{$t('views.Footer.Experience.msg_7')}}
	  </p>
          <ul class="ul2">
            <li>
             	{{$t('views.Footer.Experience.msg_8')}}
            </li>
            <li>
           	 {{$t('views.Footer.Experience.msg_9')}}
            </li>
            <li>
             {{$t('views.Footer.Experience.msg_10')}}
            </li>
            <li>
             {{$t('views.Footer.Experience.msg_11')}}
            </li>
          </ul>

          <div class="info">
            <p>
            {{$t('views.Footer.Experience.msg_12')}}
              <a href="https://www.youtube.com/channel/UCLJKBdWYfy_286SjqPIHl-Q/videos" target="_blank">https://www.youtube.com/channel/UCLJKBdWYfy_286SjqPIHl-Q/videos</a>
            </p>
            <p>
           {{$t('views.Footer.Experience.msg_13')}}
              <a href="https://blackview.hk/" target="_blank">https://blackview.hk/</a>
            </p>

              <p class="p2">
                {{$t('views.Footer.Experience.msg_14')}} <a href="mailto: hujp@blackview.hk." target="_self">hujp@blackview.hk.</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Experience"
    }
</script>

<style scoped>
  #main .sect1 {
    position: relative;
    color: #fff;
  }
  #main .sect1 .bg {}
  #main .sect1 .bg img {}
  #main .sect1 .content {
    position: absolute;
    top: 50%;
    bottom: auto;
    left: 30%;
    right: 4%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    z-index: 1;
  }
  #main .sect1 .content p {
    font-size: 100px;
    line-height: 1.4em;
    font-weight: bold;
    text-align: center;
  }
  #main .sect1 .content p.p1 {
    color: #ff0;
  }
  #main .sect1 .logo {
    position: absolute;
    top: 30px;
    bottom: auto;
    left: 5%;
    right: auto;
    z-index: 2;
  }
  #main .sect1 .logo img {
    display: block;
    max-width: 250px;
    height: auto;
  }
  #main .sect1 .logo span {
    display: block;
    font-size: 36px;
    line-height: 1.1em;
    font-weight: normal;
    text-align: left;
  }

  #main .sect2 {
    padding: 100px 0;
    color: #222;
  }
  #main .sect2 .wrap {
    max-width: 960px;
    margin: 0 auto;
    padding: 15px;
  }
  #main .sect2 .title {}
  #main .sect2 .title h2 {
    font-weight: bold;
    margin-bottom: 1em;
    text-align: center;
    color: #000;
  }
  #main .sect2 .content {}
  #main .sect2 .content p {
    margin-bottom: .5em;
    font-size: 1.2em;
  }
  #main .sect2 .content .p1 {
    font-weight: bold;
  }
  #main .sect2 .content .p2 {
    font-weight: bold;
  }
  #main .sect2 .content .p2 a {
    color: deeppink;
  }
  #main .sect2 .content ul {
    padding: .5em 1em;
    margin-bottom: 1em;
  }
  #main .sect2 .content .ul1 li {
    list-style: disc;
    margin-bottom: .5em;
  }
  #main .sect2 .content .ul2 li {
    list-style: decimal;
    margin-bottom: .5em;
  }
  #main .sect2 .content .info {
    font-weight: bold;
  }
  #main .sect2 .content .name {
    text-align: right;
  }

  p a{
    color:#007bff;
  }
  @media screen and (max-width:800px) and (min-width:200px){

    #main .sect1 .content p{
      font-size: 20px;
    }
    #main .sect1 .logo img{
      width: 80px;
      height: auto;
    }

    #main .sect2{
      padding: 30px 0;
    }
    #main .sect1 .logo span{
      font-size: 20px;
    }
  }

</style>
