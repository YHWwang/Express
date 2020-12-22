<template>
  <div class="big-box-bg">
    <div style="background: white" class="common-box container">
      <div class="common-hd">
        <h2 class="title">{{$t('views.Footer.ShippingGuide.title')}}</h2>
      </div>

      <div class="common-bd">
        <div class="common-lists">
          <div class="common-list">
            <h3>{{$t('views.Footer.ShippingGuide.tit_1')}}</h3>
            <p>
              {{$t('views.Footer.ShippingGuide.msg_1')}}
            </p>
          </div>
          <div class="common-list">
            <h3>{{$t('views.Footer.ShippingGuide.tit_2')}}</h3>
            <p>
               {{$t('views.Footer.ShippingGuide.msg_2')}}
            </p>
          </div>
          <div class="common-list">
            <h3>{{$t('views.Footer.ShippingGuide.tit_3')}}</h3>
            <p>
               {{$t('views.Footer.ShippingGuide.msg_3')}}
            </p>
            <p>
	          	{{$t('views.Footer.ShippingGuide.msg_3_2')}}<br>  
			{{$t('views.Footer.ShippingGuide.msg_3_3')}} <br>
			{{$t('views.Footer.ShippingGuide.msg_3_4')}}
            </p>
            <p class="note">
               {{$t('views.Footer.ShippingGuide.note')}}
            </p>
          </div>
          <div class="common-list">
            <h3>{{$t('views.Footer.ShippingGuide.tit_4')}}</h3>
            <p>
              {{$t('views.Footer.ShippingGuide.msg_4')}}
            </p>
          </div>
          <div class="common-list">
            <h3>{{$t('views.Footer.ShippingGuide.tit_5')}}</h3>
            <p>
              {{$t('views.Footer.ShippingGuide.msg_5')}}
            </p>
            <table   style="border-collapse:collapse" class="guide-table">
              <tbody>
              <tr>
                <td>{{$t('views.Footer.ShippingGuide.td_1')}}</td>
                <td>{{$t('views.Footer.ShippingGuide.td_2')}}</td>
                <td>{{$t('views.Footer.ShippingGuide.td_3')}}</td>
              </tr>
              <tr>
                <td>{{$t('views.Footer.ShippingGuide.td_4')}}</td>
                <td>{{$t('views.Footer.ShippingGuide.td_5')}}</td>
                <td>{{$t('views.Footer.ShippingGuide.td_6')}}</td>
              </tr>
              <tr>
                <td>{{$t('views.Footer.ShippingGuide.td_7')}}</td>
                <td>{{$t('views.Footer.ShippingGuide.td_8')}}</td>
                <td>{{$t('views.Footer.ShippingGuide.td_9')}}</td>
              </tr>
              </tbody>
            </table>
            <p>
              {{$t('views.Footer.ShippingGuide.td_p')}}
            </p>
          </div>
          <div class="common-list">
            <h3>{{$t('views.Footer.ShippingGuide.tit_6')}}</h3>
            <p>
               {{$t('views.Footer.ShippingGuide.msg_6')}}
            </p>
          </div>
          <div class="common-list">
            <h3>{{$t('views.Footer.ShippingGuide.tit_7')}}</h3>
            <p>
               {{$t('views.Footer.ShippingGuide.msg_7')}}
            </p>
            <p>
               {{$t('views.Footer.ShippingGuide.msg_7_2')}}<a href="mailto:support02@blackview.hk" target="_self">support02@blackview.hk</a>.
            </p>
          </div>
          <div class="common-list">
            <h3>{{$t('views.Footer.ShippingGuide.tit_8')}}</h3>
            <p>
               {{$t('views.Footer.ShippingGuide.msg_8')}}
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
      // 3
        name: "ShippingGuide"
    }
</script>

<style scoped>
.guide-table td{
  border: 1px solid #d3d3d3;
  padding: 5px 20px;
  border-collapse:collapse;
  border-spacing: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.8em;
  color: #666;
  margin-bottom: 10px;
}
  .common-box{
    padding: 20px;
  }
  h3{
    /*height: 40px;*/
    line-height:40px;
  }

</style>
