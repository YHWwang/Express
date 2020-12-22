<template>
  <div class="big-box-bg">
    <div class="map-main">
      <h2>{{$t('views.FindAstore.h2')}}</h2>
      <div class="select-box">
        {{$t('views.FindAstore.tit')}}
        <el-select v-model="value" @change="MapChange()" :placeholder="$t('views.FindAstore.placeholder')" filterable class="bv-select" >
          <el-option
            v-for="(item,index) in countryData"
            :key="index"
            :label="item"
            :value="item" >
          </el-option>
        </el-select>
        <span @click="Global" class="global">{{$t('views.FindAstore.global')}}</span>
      </div>
      <div id="allmap" ref="allmap"></div>
    </div>
  </div>
</template>
<script>
  // import  mapData from '@/assets/map.json'
  import { StoreData,CountryStore}  from '@/api/support'

  // import google from 'google'
  export default {
    name: 'index',
    data () {
      return {
        mapData:"",
        options: [],
        value: '',
        countryData:[]
      }
    },
    methods:{
      MapChange(){

        CountryStore(this.value).then((res=>{
          this.mapData = res.data
          this.$nextTick(()=>{

          })

          this.allStore()
        }))


        // this.MapInit(this.value)
      },
      Global(){
        StoreData().then(res=>{

          this.mapData = res.data
          this.$nextTick()

          this.allStore()

      })

      // MapInit(item){
      //   item.la.split(",")
      //   var center = {
      //     lat:Number(item.la.split(",")[0]),
      //     lng:Number(item.la.split(",")[1])
      //   }
      //
      //   this.map = new google.maps.Map(document.getElementById('allmap'), {
      //     center: center,
      //     zoom:9
      //   })
      //   var markerStart = new google.maps.Marker({
      //     position:center
      //   })
      //   markerStart.setMap(this.map)
      //   var infowindow = new google.maps.InfoWindow({
      //     content: ` <div>
      //                   <h3><strong>${item.country}</strong></h3>
      //                   <h3>${item.name}</h3>
      //               </div>`
      //   })
      //   markerStart.addListener('click', function () {
      //     infowindow.open(this.map, markerStart)
      //   })
      },
      allStore(){
        var centerData = this.mapData[0]
        this.map = new google.maps.Map(document.getElementById('allmap'), {
          center:{
            lat:Number(centerData.la.split(",")[0]),
            lng:Number(centerData.la.split(",")[1])
            // lat:49.173287029273105,
            // lng:16.670281290953426
          } ,
          zoom:5
        })
        this.mapData.map(item=>{
            item.la.split(",")
            var obj = {
              lat:Number(item.la.split(",")[0]),
              lng:Number(item.la.split(",")[1])
            }
            let marker =  new google.maps.Marker({
              position: obj,
            });
            marker.setMap(this.map)

          var infowindow = new google.maps.InfoWindow({
            content: ` <div>
                        <h3><strong>${item.country}</strong></h3>
                        <h3><strong>${item.name}</strong></h3>
                    </div>`
          })
            marker.addListener('click', function () {
              infowindow.open(this.map, marker)
            })

          });
        },
    },
    mounted(){
      StoreData().then(res=>{
        this.mapData = res.data
        var countryData = []
        res.data.forEach((val)=>{
        if(countryData.indexOf(val.country) == -1){
            countryData.push(val.country);
          }
        })
      this.countryData = countryData
        this.$nextTick(()=>{
          this.options =  this.mapData
          var _this = this
      setTimeout(function () {
        _this.allStore()
      },3000)
        })
        // console.log(res);
      }).catch(error=>{
        console.log(error);
      })


    },

    created() {
      //
      // const s = document.createElement('script');
      // s.type = 'text/javascript';
      // s.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
      // const s1 = document.createElement('script');
      // s1.type = 'text/javascript';
      // s1.src = 'https://maps.googleapis.com/maps/api/js?&key=AIzaSyCW1JVQytedhRmr9dVk0Alc4ek0a8zcsWk&language=en-US';
      // document.body.appendChild(s);
      // document.body.appendChild(s1);
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map-main{
    background: white;
    width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  #allmap{
    width: 1200px;
    height: 500px;
    margin-top: 30px;

  }
  .map-main div{
    margin: 0 auto;
    text-align: center;
  }
  .map-main h2{
    text-align: center;
    margin: 30px;
  }
  .global{
    padding-left: 5px;
    cursor: pointer;
  }
  .global:hover{
    text-decoration: underline;
  }

</style>
