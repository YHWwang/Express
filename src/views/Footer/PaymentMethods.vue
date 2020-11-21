<template>
  <div class="big-box-bg">
    <div style="background: white;" class="common-box container">
      <div class="common-hd">
        <h2 class="title">{{$t('views.Footer.PaymentMethods.tit')}}</h2>
      </div>

      <div class="common-bd">
        <div class="common-lists">
          <div class="common-list">
            <h3>{{$t('views.Footer.PaymentMethods.msg_1')}}</h3>
            <p>
	    	{{$t('views.Footer.PaymentMethods.msg_2')}}
	    </p>
          </div>
          <div class="common-list">
            <h3>{{$t('views.Footer.PaymentMethods.msg_3')}}</h3>
            <p>
              {{$t('views.Footer.PaymentMethods.p1')}} <a href="https://blackview.hk" target="_blank">https://blackview.hk</a> {{$t('views.Footer.PaymentMethods.p1_2')}}
            </p>
            <p>
               {{$t('views.Footer.PaymentMethods.p2')}}
            </p>
            <p>
              {{$t('views.Footer.PaymentMethods.p3')}}
            </p>
            <p>
               {{$t('views.Footer.PaymentMethods.p4')}}
            </p>
            <p>
               {{$t('views.Footer.PaymentMethods.p5')}}
            </p>
            <p>
              {{$t('views.Footer.PaymentMethods.p6')}}
            </p>
            <p>
              {{$t('views.Footer.PaymentMethods.p7')}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "PaymentMethods"
    }
</script>
<style scoped>
  .common-box{
    padding: 20px;
  }
  h3{
    line-height: 40px;
  }

</style>


