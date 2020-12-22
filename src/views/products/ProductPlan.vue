<template>
  <div class="main_box main_newprod">
    <div class="clear" style="height:30px;"></div>
    <div class="main_newprod_2">{{ $t("views.products.ProductPlan.tit") }}</div>
    <div class="clear" style="height:70px;margin:20px auto;text-align:center;font-size:18px;">{{ $t("views.products.ProductPlan.msg") }}</div>
    <div class="main_newprod_1">
      <dl  v-for="(item,index) in productsList">
        <dd >
          <div class="main_newprod_1_d_1" v-bind:class="{main_newprod_1_d_11:index==0}">{{item.time}}</div>
          <div class="main_newprod_1_d_7" style="margin-bottom:30px"><span style="color:#033085;">{{item.name}}</span>
            <span  v-for="res in item.config"><br>{{res}}</span></div>
          <div class="main_newprod_1_d_4  main_newprod_1_d_6 clear" style="height:250px;"></div>
        </dd>
        <dt >
          <div class="main_newprod_1_d_2" @mouseenter="show=index"><a :href="item.href" target="_blank"><img :src="item.img" width="115" height="116" :alt="item.name"></a></div>
          <div class="main_newprod_1_d_3"></div>
          <transition name="slide-fade">
            <div class="main_newprod_1_d_5" v-if="show==index"><a :href="item.href" target="_blank"> <img :src="item.img" width="300" height="300" :alt="item.name"></a></div>
          </transition>
          <div class="clear" style="height:1px;"></div>
        </dt>
        <div class="clear"></div>

        <!--备份-->
<!--        <dd>-->
<!--          <div class="main_newprod_1_d_1">Mar.2020</div>-->
<!--          <div class="main_newprod_1_d_7" style="margin-bottom:30px"><span style="color:#033085;">BV9900 Pro</span><br>Thermal by FLIR® Lepton®<br>IP68&amp;IP69K&amp;MIL-STD-810G<br>MediaTek Helio P90<br>Sony® 48MP Camera<br>16MP AI Selfie Camera<br>8GB+128GB，4380mAh Battery<br>NFC, Face &amp; Fingerprint Unlock<br>Global LTE Bands<br>Dual 4G VoLTE<br>GPS&amp;GLONASS&amp;BeiDou&amp;Galileo<br>FHD+ 5.84’’ Waterdrop Screen    <br>Corning® Gorilla® Glass 5</div>-->
<!--          <div class="main_newprod_1_d_4  main_newprod_1_d_6 clear" style="height:250px;"></div>-->
<!--        </dd>-->
<!--        <dt>-->
<!--          <div class="main_newprod_1_d_2"><a href="https://promo.blackview.hk/bv9900pro/" target="_blank"><img src="https://store.blackview.hk/uploads/products/bv9900pro/thumbnail/1.jpg" width="115" height="116" alt="BV9900 Pro"></a></div>-->
<!--          <div class="main_newprod_1_d_3"></div>-->
<!--          <div class="main_newprod_1_d_5" style="display: none;"><a href="https://promo.blackview.hk/bv9900pro/" target="_blank"> <img src="https://store.blackview.hk/uploads/products/bv9900pro/thumbnail/1.jpg" width="115" height="116" alt="BV9900 Pro"></a></div>-->
<!--          <div class="clear" style="height:1px;"></div>-->
<!--        </dt>-->
<!--        <div class="clear"></div>-->

        <div class="clear"></div>
      </dl>
      <div class="clear" style="height:100px;"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProductPlan",
    data(){
     return {
       show:-1,
       // https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/5G-20200922115107394.jpg
       productsList:[
         {
           time:"Mid Dec 2020",
           name:"Tab 9",
           config:[
             'Rugged Tablet',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/Tab-10-20201116101109647.jpg',
           href:''
         },
         {
           time:"Early Dec 2020",
           name:"Airbuds1",
           config:[
             'True Wireless Earbuds',
             'Charging Case',
             'Long Battery Life'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/TWS-1-20201116101109643.jpg',
           href:''
         },
         {
           time:"Early Nov 2020",
           name:"R3 Pro",
           config:[
             'Smartwatch',
             '5ATM Waterproof',
             'Heart Rate',
             'Sleep Monitor',
             'Ultra-Long Battrey',
             'Men Women Sports',
             'For IOS Android Phone'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/R3-Pro-20201116101109647.jpg',
           href:'https://www.blackview.hk/shop/buy/r3pro'
         },
         {
           time:"Mid Nov 2020",
           name:"BL6000 Pro 5G",
           config:[
             'IP68&IP69K&MIL-STD-810G',
             '-30° Survival Mode',
              '5G/4G Global Bands',
              'HDR&Ultra Wide&Night Mode',
              '4K 30fps&HDR Video',
              '5280mAh Battery',
              'Liquid Cooling system',
              'Android 10&NFC',
              'Air Pressure Sensor',
              'GPS&GLONASS&Beidou&',
              'Galileo&QZSS'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/BL6000-Pro-20201116101109655.jpg',
           href:'https://promo.blackview.hk/bl6000pro-5g/'
         },
         {
           time:"Middle Oct 2020",
           name:"BV5100",
           config:[
              'IP68&IP69K&MIL-STD-810G',
              '5.7" 18:9 Full Screen',
              'Octa-core processor',
              '4GB+128GB',
              'Sony® IMX214 13M front',
              'Sony® IMX134 16M triple rear',
              '5580mAh，Wireless Charging',
              'GPS&GLONASS&Beidou&Galileo',
              'Fingerprint unlock, NFC',
              'Global bands，Android10',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/5100-20200922115034232.jpg',
           href:'https://promo.blackview.hk/bv5100/'
         },
         {
           time:"End Sep 2020",
           name:"BV5100 Pro",
           config:[
             'Honeywell® N6603 Scanning',
              '2D Imager with Standard and Extended Range Optic',
              'NFC，PTT',
              'IP68&IP69K&MIL-STD-810G',
              '5580mAh，wireless charging',
              'GPS&GLONASS&Beidou&Galileo',
              'Global bands，Android10',
              '5.7" 18:9 Full Screen',
              'Fingerprint unlock',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/5100pro-20200922115034232.jpg',
           href:''
         },
         {
           time:"Middle Sep 2020",
           name:"BV6300",
           config:[
             '11.6mm Thinnest RuggedPhone',
             'IP68&IP69K&MIL-STD-810G',
             'Sony® IMX258 13MP Rear',
              'Quad Rear Camera',
              '120° Field of View',
              'HDR & Super Night Mode',
              'Face Beauty',
              '4380mAh big battery',
              'MediaTek Helio A25，12nm',
              '3GB+32GB，Android 10',
              '5.7" 18:9 Full Screen',
              'Global Bands & Dual 4G VoLTE',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/6300-20200922115034224.jpg',
           href:'https://promo.blackview.hk/bv6300/'
         },
         {
           time:"Early Sep 2020",
           name:"BV9900E",
           config:[
             'IP68&IP69K&MIL-STD-810G',
             'Functions available at -30°C',
             'Corning® Gorilla® Glass 5',
             'MediaTek Helio P90',
             'Sony® 48MP Camera',
             '4K video shooting',
             '6GB+128GB，4380mAh Battery',
             'Global Bands & Dual 4G VoLTE',
             'GPS&GLONASS&BeiDou&Galileo',
             'FHD+ 5.84" Waterdrop Screen',
             'NFC,Android 10'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/9900e-20200923093341659.jpg',
           href:'https://www.blackview.hk/shop/buy/bv9900e'
         },
         {
           time:"Early Aug 2020",
           name:"BV4900",
           config:[
             '"Space Capsule" RuggedPhone',
             'IP68&IP69K&MIL-STD-810G',
             'Sony® 8MP Quad Camera',
              '5580mAh big battery',
              'NFC & 4G VoLTE',
              'GPS&Glonass&Beidou&Galileo',
              'MTK Helio A22',
              '3GB+32GB，Android 10',
              '5.7" 18:9 Full Screen'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/4900-2020092211511573.jpg',
           href:'https://www.blackview.hk/shop/buy/bv4900'
         },
         {
           time:"Early June 2020",
           name:"BV6300 Pro",
           config:[
             '11.6mm Thinnest RuggedPhone',
             'IP68&IP69K&MIL-STD-810G',
             'Samsung® 16MP Quad Camera',
              '120° Field of View',
              'HDR & Super Night Mode',
              '5.7” 18:9 Full Screen',
              '4380mAh big battery',
              '6GB+128GB，Android 10',
              'Global Bands & Dual 4G VoLTE'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/6300pro-20200923093131500.jpg',
           href:'https://www.blackview.hk/shop/buy/bv6300pro'
         },
         {
           time:"End May 2020",
           name:"A80",
           config:[
             '8.8mm',
             '6.21" Waterdrop Screen',
             'Sony® IMX258 13MP Camera',
             'Quad Rear Camera',
             '4200mAh Big Battery',
             'Android 10 Go',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/a80-20200923093131705.jpg',
           href:'https://www.blackview.hk/shop/buy/a80'
         },
         {time: "April 2020",
           name: "BV6900",
           config:[
             '5.84" FHD+ waterdrop screen',
             "IP68&IP69K&MIL-STD-810G",
             "Samsung® 16MP quad rear",
             "Samsung® 16MP front",
             "MediaTek MT6757",
             "4GB + 64GB，Global bands",
             "5580mAh big battery",
             "10W Wireless Charging",
             "Corning Gorilla Glass 5",
             "NFC & Google Pay"
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/6900-20200923093131668.jpg',
           href: ""
         },
         {time: "Mar 2020", name: "BV9900 Pro", config:[
           "Thermal by FLIR® Lepton®",
             "IP68&IP69K&MIL-STD-810G",
             "MediaTek Helio P90",
             "Sony® 48MP Camera",
             "8GB+128GB，4380mAh Battery",
             "NFC, Face & Fingerprint Unlock",
             "Global LTE Bands",
             "Dual 4G VoLTE",
             "GPS&GLONASS&BeiDou&Galileo",
             'FHD+ 5.84" Waterdrop Screen',
             "Corning® Gorilla® Glass 5"],
           img: require("../../assets/img/productPlan/bv9900pro.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9900pro"
         },
         {time: "Feb 2020", name: "BV9600E", config:[
             "IP68&IP69K&MIL-STD-810G",
             "MTK Helio P70，Full Netcom",
             "AI Processor，Night Camera",
             "6.21” AMOLED 19:9 Full Screen",
             "Dual Samsung 16MP+8MP rear",
             "5580mAh battery",
             "4GB+128GB，Android 9.0",
             "Face&Fingerprint Unlock，NFC"
           ], img:require("../../assets/img/productPlan/bv9600e.jpg") , href: "https://www.blackview.hk/shop/buy/bv9600e"},
         {time: "Dec 2019", name: "BV9900", config: [
           "IP68&IP69K&MIL-STD-810G",
           "MediaTek Helio P90",
             "Sony® IMX582 48MP",
            "16MP Ultra-Wide Angle Camera",
            "8GB RAM + 256GB ROM",
            "4380mAh Battery",
            "Wireless Charging",
            "NFC,Global LTE Bands",
            "GPS&GLONASS&BeiDou&Galileo",
            'FHD+ 5.84" Waterdrop Screen',
            "Corning® Gorilla® Glass 5"
           ],
           img: require("../../assets/img/productPlan/bv9900.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9900"
         },
         {time: "Nov 2019", name: "A80 Pro", config:[
             "HD+ 6.49'' In-cell",
              "Waterdrop Screen",
              "Sony IMX258 13MP Camera",
              "Quad Rear Camera",
              "MediaTek Helio P25 Processor",
              "4GB RAM + 64GB ROM",
              "4680mAh Big Battery",
              "5V/2A Fast Charging, Type-C",
              "Face & Fingerprint Unlock",
              "Global LTE Bands"
           ]
           , img: require("../../assets/img/productPlan/a80pro.jpg"), href: "https://www.blackview.hk/shop/buy/a80pro"
         },

         {time: "Oct 2019", name: "BV9800 Pro", config: [
             "Thermal by FLIR® Lepton®",
              "Sony® 48MP triple Camera",
              "Night shot mode",
              "IP68&IP69K&MIL-STD-810G",
              "Corning® Gorilla® Glass 5",
              "6580mAh Battery",
              "6GB+128GB，MTK P70",
              "6.3” FHD+ Waterdrop Screen",
              "GPS & GLONASS & BEIDOU",
              "NFC，Android 9.0"
           ],
           img: require("../../assets/img/productPlan/bv9800pro.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9800pro"
         },
         {time: "Oct 2019", name: "BV9800", config: [
             "Sony® 48MP triple Camera",
             "120° Ultra-Wide Angle",
             "Night shot mode",
             "IP68&IP69K&MIL-STD-810G",
             "6580mAh Battery",
             "6GB+128GB，MTK P70",
             "6.3” FHD+ Waterdrop Screen",
             "GPS & GLONASS & BEIDOU",
             "NFC，Android 9.0"
           ], img: require("../../assets/img/productPlan/bv9800.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9800"
         },
         {time: "Middle Aug", name: "BV9100",
           config:[
                "World's biggest battery",
                "13000 mAh",
                "30W Super-Fast Charging",
                "IP68&IP69K&MIL-STD-810G",
                "6.3” FHD+ Waterdrop Screen",
                "Samsung 16MP front",
                "Dual Sony IMX298 16MP rear",
                "4GB+64GB，MTK P35",
                "NFC，Android 9.0"
           ],
           img: require("../../assets/img/productPlan/bv9100.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9100"
         },
         {time: "Early Aug ", name: "BV9500 Plus", config:[
              "IP68&IP69K&MIL-STD-810G",
              "MTK P70，Full Netcom",
              "10000mAh BAK battery",
              "12V/2A Fast Charging",
              "10W Wireless Charging",
              "18:9 Full Screen，5.7” FHD+",
              "Samsung 3L8 13MP front",
              "Dual Sony IMX298 16MP rear",
              "4GB+64GB，Android 9.0"
           ],
           img: require("../../assets/img/productPlan/bv9500plus.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9500plus"
         },
         {time: "Early Aug", name: "BV5900", config: [
            "World's strongest rugged phone",
            "IP68&IP69K&MIL-STD-810G",
            "Helio A22 (MT6761) SoC",
            "12nm CPU",
            '5.7" Waterdrop Full Screen',
            "Sony 13MP AI Dual Cameras",
            "3GB+32GB，NFC",
            "Android 9.0"
           ],
           img: require("../../assets/img/productPlan/bv5900.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv5900"
         },
         {time: "Early July", name: "BV9600", config:[
            "IP68&IP69K&MIL-STD-810G",
            "MTK Helio P70，Full Netcom",
            "AI Processor，Night Camera",
            "6.21” AMOLED 19:9 Full Screen",
            "Dual Samsung 16MP+8MP rear",
            "5580mAh battery",
            "4GB+64GB，Android 9.0",
            "Face&Fingerprint Unlock，NFC"
           ], img: require("../../assets/img/productPlan/bv9600.jpg"), href: ""},
         {time: "Early July", name: "BV6100", config:[
              "World's largest rugged phone",
              "6.88” 19:9 FullView Screen",
              "IP68&IP69K&MIL-STD-810G",
              "5580mAh large battery",
              "Underwater camera",
              "Glass on the front&back",
              "GPS&Glonass&Beidou&Galileo",
              "NFC，Android 9.0 Pie"
           ], img:require("../../assets/img/productPlan/bv6100.jpg"), href: "https://www.blackview.hk/shop/buy/bv9600"},
         {time: "End May", name: "A60 Pro(4G)", config:[
             "Helio A22 (MT6761) SoC",
             "12nm CPU",
             '6.088" Waterdrop Full Screen',
             "4080mAh Li-ion battery",
             "5MP+8MP Dual camera",
             "3GB+16GB，Android 9.0 Pie",
             "Face&Fingerprint Unlock",
             "Two Nano Cards, One TF Card",
             "Gradient color"
           ], img: require("../../assets/img/productPlan/a69pro.jpg"), href: "https://www.blackview.hk/shop/buy/a60pro"},
         {time: "May.2019", name: "BV9700 Pro", config: [
             "IP68&IP69K&MIL-STD-810G",
             "MTK Helio P70，Full Netcom",
             "Night Vision Camera",
             "Air quality&Air pressure detect",
             "Heart rate detect",
             "5.84” FHD+ 18:9 Screen",
             "Samsung 16MP front camera",
             "Dual Samsung 16MP+8MP rear",
             "6GB+128GB，Android 9.0 Pie",
             "4380mAh，Wireless charging",
             "Face&Fingerprint Unlock，NFC"
           ], img:require("../../assets/img/productPlan/bv9700pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv9700pro"},
         {time: "End Apr", name: "BV5500 Pro(4G)", config:[
             'IP68&IP69K&MIL-STD-810G',
             '5.5" 18:9 Full Screen',
             'Dual Sony 8MP rear',
             '4400mAh big battery',
             '3GB+16GB，NFC',
             'Android 9.0'
           ], img: require("../../assets/img/productPlan/bv5500pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv5500pro"},
         {time: "End Mar", name: "A60", config:[
             '6.088" Waterdrop Full Screen',
             '4080mAh ATL Li-ion battery',
             '5MP+13MP Dual camera',
             '16GB ROM',
             'Gradient color',
             'Android 8.1 Oreo (Go Edition)'
           ], img:require("../../assets/img/productPlan/a60.jpg"), href: ""},
         {time: "Feb.2019", name: "MAX 1", config:[
             'Laser projector phone',
             'MEMS laser point scanning',
             'Full-automatic focusing',
             '5 hours video projection',
             '150 hours play music',
             '6" 18:9 AMOLED Screen',
             '2160*1080 resolution',
             '6GB+64GB',
             'Android 8.1'
           ], img: require("../../assets/img/productPlan/max.jpg"), href: ""},
         {time: "End Dec", name: "BV5500", config:[
             'IP68&IP69K&MIL-STD-810G',
             '5.5" 18:9 Full Screen',
             'Dual Sony 8MP rear',
             '4400mAh BAK battery',
             'Android 8.1'
           ], img:require("../../assets/img/productPlan/bv5500.jpg"), href: "https://www.blackview.hk/shop/buy/bv5500"},
         {time: "Early Nov", name: "BV9600 Pro", config:[
            'MediaTek Helio P60',
            'AI Processor，Full Netcom',
            'IP68&IP69K&MIL-STD-810G',
            '6.21" AMOLED 19:9 Full Screen',
            'Dual Samsung 16MP+8MP rear',
            '5580mAh BAK battery',
            '9V/2A， Wireless Charging',
            '6GB+128GB，Android 8.1',
            'Face&Fingerprint Unlock，NFC'
           ], img: require("../../assets/img/productPlan/bv9600pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv9600pro"},
         {time: "Early Oct", name: "BV1000", config: [
             '2.4" Screen，IP68',
             '3000mAh BAK battery',
             '30 hours talk-time',
             '25 days stand-by-time',
             'Dual sim dual standby',
             '50M PhoneTorch distance',
             'Ultra-low prices'
           ], img: require("../../assets/img/productPlan/bv1000.jpg"), href: ""},
         {time: "End Aug", name: "BV6800 Pro", config:[
             'IP68&IP69K&MIL-STD-810G',
             '6580mAh super battery',
             '10W Wireless Charging',
             '18:9 5.7" FHD+ IPS Display',
             'Dual Sony IMX298 16MP rear',
             '8MP front camera',
             '4GB+64GB，NFC',
             'Easy to take it everywhere',
             'Android 8.0'
           ], img: require("../../assets/img/productPlan/bv6800pro.jpg"), href: ""},
         {time: "Early Aug", name: "BV9500 Pro", config: [
              'IP68&IP69K&MIL-STD-810G',
              'LAN Intercom',
              '12V/2A， Wireless Charging',
              '10000mAh BAK battery',
              'MT6763T，Full Netcom',
              '18:9 Full Screen，5.7" FHD+',
              'Samsung 3L8 13MP front',
              'Dual Sony IMX298 16MP rear',
              '6GB+128GB，Android 8.1'
                   ], img: require("../../assets/img/productPlan/bv9500pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv9500pro"},
         {time: "Middle July", name: "A30", config:[
              '5.5" 19:9 FullView Screen',
              '5MP+8MP Dual cameras',
              '2500mAh battery',
              'Face ID',
              'Android 8.1 Oreo'
           ], img:require("../../assets/img/productPlan/a30.jpg"), href: ""},
         {time: "Early July", name: "BV9500", config:[
             'IP68&IP69K&MIL-STD-810G',
             '10W Wireless Charging',
             '10000mAh BAK battery',
             'MT6763T，Full Netcom',
             '18:9 Full Screen，5.7" FHD+',
             'Samsung 3L8 13MP front',
             'Dual Sony IMX298 16MP rear',
             '4GB+64GB，Android 8.1'
           ], img: require("../../assets/img/productPlan/bv9500.jpg"), href: ""},
         {time: "End June", name: "A20 Pro", config:[
             'Android 8.1 Oreo',
             '5.5" 18:9 Full Screen',
             '3000mAh BAK battery',
             '5MP+8MP Dual cameras',
             'MT6739 2GB+16GB'
           ], img: require("../../assets/img/productPlan/a20pro.jpg"), href: ""},
         {time: "Early June", name: "BV5800", config:[
              'IP68&MIL-STD-810G',
              '5580mAh BAK battery，5V/2A',
              'MT6739，Dual 4G Network',
              '18:9 Full Screen，5.5" HD+',
              'Dual Sony IMX134 8MP+13MP',
              '2GB+16GB，NFC',
              'Android 8.1'
           ], img: require("../../assets/img/productPlan/bv5800.jpg"), href: ""},
         {time: "Middle May", name: "BV5800 Pro", config:[
             'IP68&MIL-STD-810G',
             '5V/2A，Wireless Charging',
             '5580mAh BAK battery',
             'MT6739，Dual 4G Network',
             '18:9 Full Screen，5.5" HD+',
             'Dual Sony IMX134 8MP+13MP',
             '2GB+16GB，NFC',
             'Android 8.1'
           ], img: require("../../assets/img/productPlan/bv5800pro.jpg"), href: ""},
         {time: "Early April", name: "A20", config:[
             'Android GO',
             '5.5" 18:9 Full Screen',
             '3000mAh BAK battery',
             '2MP+5MP Dual cameras',
             'MT6580M 1GB+8GB'
           ], img:require("../../assets/img/productPlan/a20.jpg"), href: ""},
         {time: "End Mar", name: "P10000 Pro", config: [
             '11000mAh BAK battery',
             '5V/5A Type-C',
             'Four Sony IMX298 13MP+16MP',
             '6.0" In-cell 18:9 FHD+ Screen',
             'Helio P23 2.0GHZ',
             '4GB+64GB，Android 8.1',
             'Glasses or Italian calf leather'
           ], img: require("../../assets/img/productPlan/p10000pro.jpg"), href: ""},
         {time: "Nov.2017", name: "BV9000 Pro", config:[
              '18:9 screen，5.7" FHD，IP68',
              'MT6757cd，2.6GHZ',
              '6GB+128GB',
              '8MP front camera',
              '13MP+5MP Dual rear',
              '4180mAh，12V/2A',
              'Android 7.1'
           ], img: require("../../assets/img/productPlan/bv9000pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv9000pro"},
         {time: "End Oct", name: "A10", config:[
              'MT6580A, 2800mAh',
              '5.0" HD Unibody',
              '5MP + 8MP camera',
              '2GB+16GB',
              'Android 7.0'
           ], img: require("../../assets/img/productPlan/a10.jpg"), href: ""},
         {time: "Oct.2017", name: "S8", config:[
              '5.7" HD+ 18:9 Full Screen',
              '90% Screen-to-body',
              'Four cameras, 13MP+13MP',
              'MT6750T, 3180 mAh',
              '4GB+64GB',
              'Android 7.0'
           ], img:require("../../assets/img/productPlan/s8.jpg"), href: ""},
         {time: "Aug.2017", name: "BV4000 Pro", config:[
              'MT6580A, IP68, 3680mAh',
              '2MP + 8MP camera',
              '4.7" HD 2GB+16GB',
              'Touch Screen: 5 Points',
              'Android 7.0'
           ], img: require("../../assets/img/productPlan/bv4000pro.jpg"), href: ""},
         {time: "May.2017", name: "BV8000 Pro", config:[
            'MT6757（P25），2.6GHZ',
            'Full Netcom，4180mAh，9V2A',
            '8MP +16MP camera, IP68',
            '5.0" FHD 6GB+64GB',
            'Android 8.0'
           ], img: require("../../assets/img/productPlan/bv8000pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv8000pro"},
         {time: "End April", name: "BV7000", config:[
             'MT6737T, IP68, 3500mAh',
             '5MP + 8MP camera',
             '5.0" FHD 2GB+16GB',
             'Android 7.0'
           ], img: require("../../assets/img/productPlan/bv7000.jpg"), href: ""},
         {time: "Feb.2017", name: "BV7000 Pro", config: [
             'MT6750T, 28nm, IP68',
             '8MP +13MP camera',
             '5.0" FHD 4GB+64GB',
             'Android 7.0'
           ], img: require("../../assets/img/productPlan/bv7000pro.jpg"), href: ""},
         {time: "July.25th.2016", name: "BV6000s", config:[
             "MT6737T Quad-core 1.5GHZ",
             "4.7 Inch HD 2GB+16GB",
             "IP68",
             "Android 7.0"
           ], img: require("../../assets/img/productPlan/bv6000s.png"), href: ""},
         {time: "May. 31st. 2016", name: "BV6000", config:[
             'MT6755 Octa-core 2.0GHZ',
             '4.7 Inch HD 3GB+32GB',
             'IP68',
             'Android 7.0'
           ], img:require("../../assets/img/productPlan/bv6000.jpg"), href: ""}
       ]
     }
    }
  }
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    display: none;
    /*transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translate(10px,10px);
    opacity:0;
  }



  /*new products*/
  .main_newprod{
    background: white;
    width: 1200px;
    margin: 0 auto;
  }
  .main_newprod_1_d_2:hover + .main_newprod_1_d_5{
    display: none;
  }
  .main_newprod_1,.main_newprod_1 *{margin:0;padding:0;}
  .main_newprod_1{width:700px;margin:0 auto;text-align:center;}
  .main_newprod_1 dd,.main_newprod_1 dt{float:left;position:relative;left:0px;top:0px;}
  .main_newprod_1 dd{text-align:right;width:350px;}
  .main_newprod_1 dd .main_newprod_1_d_1{background:url(../../assets/img/productPlan/new_prod_time_2.jpg) no-repeat 316px 3px;height:30px;line-height:30px;padding-right:46px;color:#042f8b;font-size:26px;}
  .main_newprod_1 dd .main_newprod_1_d_11{color:#042f8b;font-size:30px;background:url(../../assets/img/productPlan/new_prod_time_1.jpg) no-repeat center right;padding-right:60px;height:60px;line-height:60px;}
  .main_newprod_1 dt{margin-left:30px;text-align:left;display:inline;width:320px;}
  .main_newprod_1_d_2{background:url(../../assets/img/productPlan/new_prod_bj.jpg) no-repeat center;width:122px;height:128px;padding-left:20px;padding-top:12px;}
  .main_newprod_1_d_3{color:#222;font-size:22px;line-height:46px;text-align:center;width:130px;margin-left:10px;height:46px;}
  .main_newprod_1_d_4{width:2px;background:#0672ea;position:absolute;left:327px;top:50px;}
  .main_newprod_1_d_6{top:30px;}
  .main_newprod_1_d_5{position:absolute;left:150px;top:0px;z-index:5;border:1px solid #ccc;padding:20px;background:#fff;}
  .main_newprod_1_d_51{top:15px;}
  .main_newprod_2{font-size:50px;height:80px;text-align:center;line-height:80px;color:#033085;font-family:"微软雅黑";}
  .main_newprod_1_d_7{margin-top:20px;line-height:36px;font-size:20px;text-align:right;padding-right:60px;}


</style>
