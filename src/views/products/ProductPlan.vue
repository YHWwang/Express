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
         {time: "Fine 2020", name: "BL6000 Pro 5G", config:[
            "Il primo 5G al mondo",
             "Telefono outdoor robusto",
             "IP68 e IP69K e MIL-STD-810G"
           ],
           img:"https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/5G-20200922115107394.jpg",
           href: "https://promo.blackview.hk/bl6000pro-5g/"
         },
         {
           time:"Metà ottobre",
           name:"BV5100",
           config:[
              'IP68 e IP69K e MIL-STD-810G',
              'Schermo intero da 5,7 "18: 9',
              'Processore octa-core',
              '4 GB + 128 GB',
              'Sony® IMX214 13M anteriore',
              'Sony® IMX134 16M triplo posteriore',
              '5580 mAh ， Ricarica wireless',
              'GPS e GLONASS e Beidou e Galileo',
              'Sblocco ad impronta digitale, NFC',
              'Bande globali ，Android10',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/5100-20200922115034232.jpg',
           href:'https://promo.blackview.hk/bv5100/'
         },
         {
           time:"Fine settembre",
           name:"BV5100 Pro",
           config:[
             'Scansione Honeywell® N6603',
              'Imager 2D con ottica standard ed estesa',
              'NFC，PTT',
              'IP68 e IP69K e MIL-STD-810G',
              '5580 mAh ， ricarica wireless',
              'GPS e GLONASS e Beidou e Galileo',
              'Bande globali ， Android10',
              'Schermo intero da 5,7 "18: 9',
              'Sblocco delle impronte digitali',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/5100pro-20200922115034232.jpg',
           href:''
         },
         {
           time:"Metà Settembre",
           name:"BV6300",
           config:[
             'Telefono robusto da 11,6 mm',
             'IP68 e IP69K e MIL-STD-810G',
             'Sony® IMX258 13MP Posteriore',
              'Fotocamera posteriore quadrupla',
              'Campo visivo di 120 °',
              'HDR e modalità Super Night',
              'Bellezza del viso',
              'Batteria grande da 4380 mAh',
              'MediaTek Helio A25，12nm',
              '3 GB + 32 GB ， Android 10',
              'Schermo intero da 5,7 "18: 9',
              'Bande globali e Dual 4G VoLTE',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/6300-20200922115034224.jpg',
           href:'https://promo.blackview.hk/bv6300/'
         },
         {
           time:"Inizio settembre",
           name:"BV9900E",
           config:[
             'IP68 e IP69K e MIL-STD-810G',
             'Funzioni disponibili a -30 ° C',
             'Vetro Corning® Gorilla® 5',
             'MediaTek Helio P90',
             'Fotocamera Sony® 48MP',
             'Riprese video 4K',
             'Batteria da 6 GB + 128 GB ， 4380 mAh',
             'Bande globali e Dual 4G VoLTE',
             'GPS e GLONASS e BeiDou e Galileo',
             'Schermo Waterdrop da 5,84 pollici FHD +',
             'NFC, Android 10'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/9900e-20200923093341659.jpg',
           href:'https://www.blackview.hk/shop/buy/bv9900e'
         },
         {
           time:"All'inizio di agosto",
           name:"BV4900",
           config:[
             'Rugged Phone "Space Capsule"',
             'IP68 e IP69K e MIL-STD-810G',
             'Fotocamera quadrupla Sony® da 8 MP',
              'Batteria da 5580 mAh',
              'NFC e 4G VoLTE',
              'GPS e Glonass e Beidou e Galileo',
              'MTK Helio A22',
              '3 GB + 32 GB ， Android 10',
              'Schermo intero da 5,7 "18: 9'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/4900-2020092211511573.jpg',
           href:'https://www.blackview.hk/shop/buy/bv4900'
         },
         {
           time:"Inizio di giugno",
           name:"BV6300 Pro",
           config:[
             'Telefono robusto da 11,6 mm',
             'IP68 e IP69K e MIL-STD-810G',
             'Fotocamera quadrupla Samsung® da 16 MP',
              'Campo visivo di 120 °',
              'HDR e modalità Super Night',
              'Schermo intero da 5,7 "18: 9',
              'Batteria grande da 4380 mAh',
              '6 GB + 128 GB ， Android 10',
              'Bande globali e Dual 4G VoLTE'
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/6300pro-20200923093131500.jpg',
           href:'https://www.blackview.hk/shop/buy/bv6300pro'
         },
         {
           time:"Fine maggio",
           name:"A80",
           config:[
             '8.8mm',
             'Schermo Waterdrop da 6,21 pollici',
             'Fotocamera Sony® IMX258 da 13 MP',
             'Fotocamera posteriore quadrupla',
             'Batteria grande da 4200 mAh',
             'Android 10 Go',
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/a80-20200923093131705.jpg',
           href:'https://www.blackview.hk/shop/buy/a80'
         },
         {time: " aprile", name: "BV6900", config:[
             'Schermo da 5,84 pollici FHD + waterdrop',
             "IP68 e IP69K e MIL-STD-810G",
             "Samsung® 16MP quad posteriore",
             "Samsung® 16MP anteriore",
             "MediaTek MT6757",
             "4 GB + 64 GB ， Bande globali",
             "Batteria grande da 5580 mAh",
             "Ricarica wireless da 10 W.",
             "Corning Gorilla Glass 5",
             "NFC e Google Pay"
           ],
           img:'https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/6900-20200923093131668.jpg',
           href: ""
         },
         {time: "Marzo 2020", name: "BV9900 Pro", config:[
           "Thermal di FLIR® Lepton®",
             "IP68 e IP69K e MIL-STD-810G",
             "MediaTek Helio P90",
             "Fotocamera Sony® 48MP",
             "Batteria da 8 GB + 128 GB ， 4380 mAh",
             "NFC, Face & Fingerprint Unlock",
             "Bande LTE globali",
             "Dual 4G VoLTE",
             "GPS e GLONASS e BeiDou e Galileo",
             'Schermo Waterdrop da 5,84 pollici FHD +',
             "Vetro Corning® Gorilla® 5"],
           img: require("../../assets/img/productPlan/bv9900pro.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9900pro"
         },
         {time: "Febbraio 2020", name: "BV9600E", config:[
             "IP68 e IP69K e MIL-STD-810G",
             "MTK Helio P70 ， Netcom completo",
             "Processore AI ， Fotocamera notturna",
             "Schermo intero AMOLED da 6,21 “19: 9",
             "Doppio Samsung 16MP + 8MP posteriore",
             "Batteria da 5580 mAh",
             "4 GB + 128 GB ， Android 9.0",
             "Sblocco viso e impronta digitale ， NFC"
           ], img:require("../../assets/img/productPlan/bv9600e.jpg") , href: "https://www.blackview.hk/shop/buy/bv9600e"},
         {time: "Dicembre 2019", name: "BV9900", config: [
           "IP68 e IP69K e MIL-STD-810G",
           "MediaTek Helio P90",
             "Sony® IMX582 48MP",
            "Fotocamera ultra grandangolare da 16 MP",
            "8 GB di RAM + 256 GB di ROM",
            "Batteria da 4380 mAh",
            "Ricarica senza fili",
            "NFC, bande LTE globali",
            "GPS e GLONASS e BeiDou e Galileo",
            'Schermo Waterdrop da 5,84 pollici FHD +',
            "Vetro Corning® Gorilla® 5"
           ],
           img: require("../../assets/img/productPlan/bv9900.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9900"
         },
         {time: "Novembre 2019", name: "A80 Pro", config:[
             "HD + 6,49 '' In-cell",
              "Schermo Waterdrop",
              "Fotocamera Sony IMX258 13MP",
              "Fotocamera posteriore quadrupla",
              "Processore MediaTek Helio P25",
              "4 GB di RAM + 64 GB di ROM",
              "Batteria grande da 4680 mAh",
              "Ricarica rapida 5V / 2A, tipo C.",
              "Sblocco viso e impronta digitale",
              "Bande LTE globali"
           ]
           , img: require("../../assets/img/productPlan/a80pro.jpg"), href: "https://www.blackview.hk/shop/buy/a80pro"
         },

         {time: "OOttobre 2019", name: "BV9800 Pro", config: [
             "Thermal di FLIR® Lepton®",
              "Tripla fotocamera Sony® da 48MP",
              "Modalità ripresa notturna",
              "IP68 e IP69K e MIL-STD-810G",
              "Vetro Corning® Gorilla® 5",
              "Batteria da 6580 mAh",
              "6 GB + 128 GB ， MTK P70",
              "Schermo FHD + Waterdrop da 6,3 ”",
              "GPS, GLONASS E BEIDOU",
              "NFC ， Android 9.0"
           ],
           img: require("../../assets/img/productPlan/bv9800pro.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9800pro"
         },
         {time: "Ottobre 2019", name: "BV9800", config: [
             "Tripla fotocamera Sony® da 48MP",
             "120 ° ultra grandangolare",
             "Modalità ripresa notturna",
             "IP68 e IP69K e MIL-STD-810G",
             "Batteria da 6580 mAh",
             "6 GB + 128 GB ， MTK P70",
             "Schermo FHD + Waterdrop da 6,3” ",
             "GPS, GLONASS E BEIDOU",
             "NFC ， Android 9.0"
           ], img: require("../../assets/img/productPlan/bv9800.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9800"
         },
         {time: "Metà agosto", name: "BV9100",
           config:[
                "La batteria più grande al mondo",
                "13000 mAh",
                "Ricarica super veloce da 30 W.",
                'Schermo FHD + Waterdrop da 6,3 "',
                "6.3” FHD+ Waterdrop Screen",
                "Frontale Samsung 16MP",
                "Doppio Sony IMX298 16MP posteriore",
                "4 GB + 64 GB ， MTK P35",
                "NFC ， Android 9.0"
           ],
           img: require("../../assets/img/productPlan/bv9100.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9100"
         },
         {time: "Inizio di agosto", name: "BV9500 Plus", config:[
              "IP68 e IP69K e MIL-STD-810G",
              "MTK P70 ， Netcom completo",
              "Batteria BAK da 10000 mAh",
              "Ricarica rapida 12V / 2A",
              "Ricarica wireless da 10 W.",
              'Schermo intero 18: 9 ， 5,7 "FHD +',
              "Samsung 3L8 13MP anteriore",
              "Doppio Sony IMX298 16MP posteriore",
              "4 GB + 64 GB ， Android 9.0"
           ],
           img: require("../../assets/img/productPlan/bv9500plus.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv9500plus"
         },
         {time: "Inizio di agosto", name: "BV5900", config: [
            "Il telefono robusto più potente del mondo",
            "IP68 e IP69K e MIL-STD-810G",
            "SoC Helio A22 (MT6761)",
            "CPU da 12 nm",
            'Schermo intero da 5,7 "Waterdrop',
            "Doppia fotocamera Sony 13MP AI",
            "3GB+32GB，NFC",
            "Android 9.0"
           ],
           img: require("../../assets/img/productPlan/bv5900.jpg"),
           href: "https://www.blackview.hk/shop/buy/bv5900"
         },
         {time: "Inizio di luglio", name: "BV9600", config:[
            "IP68 e IP69K e MIL-STD-810G",
            "MTK Helio P70 ， Netcom completo",
            "Processore AI ， Fotocamera notturna",
            'Schermo intero AMOLED da 6,21 "19: 9',
            "Doppio Samsung 16MP + 8MP posteriore",
            "Batteria da 5580 mAh",
            "4 GB + 64 GB ， Android 9.0",
            "Sblocco viso e impronta digitale ， NFC"
           ], img: require("../../assets/img/productPlan/bv9600.jpg"), href: ""},
         {time: "Inizio luglio", name: "BV6100", config:[
              "Il telefono robusto più grande del mondo",
              'Schermo FullView da 6,88 "19: 9',
              "IP68 e IP69K e MIL-STD-810G",
              "Batteria grande da 5580 mAh",
              "Fotocamera subacquea",
              "Vetro davanti e dietro",
              "GPS e Glonass e Beidou e Galileo",
              "NFC ， Android 9.0 Pie"
           ], img:require("../../assets/img/productPlan/bv6100.jpg"), href: "https://www.blackview.hk/shop/buy/bv9600"},
         {time: "Fine maggio", name: "A60 Pro(4G)", config:[
             "SoC Helio A22 (MT6761)",
             "CPU da 12 nm",
             'Schermo intero Waterdrop da 6.088 "',
             "Batteria agli ioni di litio da 4080 mAh",
             "Doppia fotocamera da 5MP + 8MP",
             "3 GB + 16 GB ， Android 9.0 Pie",
             "Sblocco viso e impronta digitale",
             "Due Nano Card, una TF Card",
             "Colore sfumato"
           ], img: require("../../assets/img/productPlan/a69pro.jpg"), href: "https://www.blackview.hk/shop/buy/a60pro"},
         {time: "Maggio 2019", name: "BV9700 Pro", config: [
             "IP68 e IP69K e MIL-STD-810G",
             "MTK Helio P70 ， Netcom completo",
             "Fotocamera per visione notturna",
             "Rilevamento della qualità dell'aria e della pressione dell'aria",
             "Rilevamento della frequenza cardiaca",
             "Schermo da 5,84 pollici FHD + 18: 9",
             "Fotocamera frontale Samsung da 16MP",
             "Doppio Samsung 16MP + 8MP posteriore",
             "6 GB + 128 GB ， Android 9.0 Pie",
             "4380 mAh ， Ricarica wireless",
             "Sblocco viso e impronta digitale ， NFC"
           ], img:require("../../assets/img/productPlan/bv9700pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv9700pro"},
         {time: "Fine Aprile", name: "BV5500 Pro(4G)", config:[
             'IP68 e IP69K e MIL-STD-810G',
             'Schermo intero da 5,5 "18: 9',
             'Doppio Sony da 8MP sul retro',
             'Batteria grande da 4400 mAh',
             '3GB+16GB，NFC',
             'Android 9.0'
           ], img: require("../../assets/img/productPlan/bv5500pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv5500pro"},
         {time: "Fine Marzo", name: "A60", config:[
             'Schermo intero Waterdrop da 6.088 "',
             'Batteria agli ioni di litio ATL da 4080 mAh',
             'Doppia fotocamera da 5MP + 13MP',
             'ROM da 16 GB',
             'Colore sfumato',
             'Android 8.1 Oreo (Go Edition)'
           ], img:require("../../assets/img/productPlan/a60.jpg"), href: ""},
         {time: "Febbraio 2019", name: "MAX 1", config:[
             'Telefono con proiettore laser',
             'Scansione punti laser MEMS',
             'Messa a fuoco completamente automatica',
             '5 ore di videoproiezione',
             '150 ore di riproduzione di musica',
             'Schermo AMOLED da 6 "18: 9',
             'Risoluzione 2160 * 1080',
             '6GB+64GB',
             'Android 8.1'
           ], img: require("../../assets/img/productPlan/max.jpg"), href: ""},
         {time: "Fine dicembre", name: "BV5500", config:[
             'IP68 e IP69K e MIL-STD-810G',
             'Schermo intero da 5,5 "18: 9',
             'Doppio Sony da 8MP sul retro',
             'Batteria BAK da 4400 mAh',
             'Android 8.1'
           ], img:require("../../assets/img/productPlan/bv5500.jpg"), href: "https://www.blackview.hk/shop/buy/bv5500"},
         {time: "Inizio nov", name: "BV9600 Pro", config:[
            'MediaTek Helio P60',
            'Processore AI ， Netcom completo',
            'IP68 e IP69K e MIL-STD-810G',
            'Schermo intero AMOLED 19: 9 da 6,21 pollici',
            'Doppio Samsung 16MP + 8MP posteriore',
            'Batteria BAK da 5580 mAh',
            '9V / 2A ， Ricarica wireless',
            '6 GB + 128 GB ， Android 8.1',
            'Sblocco viso e impronta digitale ， NFC'
           ], img: require("../../assets/img/productPlan/bv9600pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv9600pro"},
         {time: "Inizio Ottobre", name: "BV1000", config: [
             'Schermo da 2,4 "， IP68',
             'Batteria BAK 3000mAh',
             '30 ore di conversazione',
             '25 giorni di stand-by',
             'Dual sim dual standby',
             'Distanza PhoneTorch 50M',
             'Prezzi bassissimi'
           ], img: require("../../assets/img/productPlan/bv1000.jpg"), href: ""},
         {time: "Fine agosto", name: "BV6800 Pro", config:[
             'IP68 e IP69K e MIL-STD-810G',
             'Super batteria da 6580 mAh',
             'Ricarica wireless da 10 W.',
             'Display 18: 9 FHD + IPS da 5,7 "',
             'Doppio Sony IMX298 16MP posteriore',
             'Fotocamera frontale da 8 MP',
             '4 GB + 64 GB ， NFC',
             'Facile da portare ovunque',
             'Android 8.0'
           ], img: require("../../assets/img/productPlan/bv6800pro.jpg"), href: ""},
         {time: "Inizio di agosto", name: "BV9500 Pro", config: [
              'IP68 e IP69K e MIL-STD-810G',
              'Interfono LAN',
              '12V / 2A ， Ricarica wireless',
              'Batteria BAK da 10000 mAh',
              'MT6763T ， Netcom completo',
              'Schermo intero 18: 9 ， 5,7 "FHD +',
              'Samsung 3L8 13MP anteriore',
              'Doppio Sony IMX298 16MP posteriore',
              '6 GB + 128 GB ， Android 8.1'
                   ], img: require("../../assets/img/productPlan/bv9500pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv9500pro"},
         {time: "Metà luglio", name: "A30", config:[
              'Schermo da 5,5 "19: 9 FullView',
              'Doppia fotocamera da 5MP + 8MP',
              'Batteria da 2500 mAh',
              'Face ID',
              'Android 8.1 Oreo'
           ], img:require("../../assets/img/productPlan/a30.jpg"), href: ""},
         {time: "Inizio luglio", name: "BV9500", config:[
             'IP68 e IP69K e MIL-STD-810G',
             'Ricarica wireless da 10 W.',
             'Batteria BAK da 10000 mAh',
             'MT6763T ， Netcom completo',
             'Schermo intero 18: 9 ， 5,7 "FHD +',
             'Samsung 3L8 13MP anteriore',
             'Doppio Sony IMX298 16MP posteriore',
             '4GB+64GB，Android 8.1'
           ], img: require("../../assets/img/productPlan/bv9500.jpg"), href: ""},
         {time: "Fine giugno", name: "A20 Pro", config:[
             'Android 8.1 Oreo',
             'Schermo intero da 5,5 "18: 9',
             'Batteria BAK 3000mAh',
             'Doppia fotocamera da 5MP + 8MP',
             'MT6739 2 GB + 16 GB'
           ], img: require("../../assets/img/productPlan/a20pro.jpg"), href: ""},
         {time: "All'inizio di giugno", name: "BV5800", config:[
              'IP68 e MIL-STD-810G',
              'Batteria BAK da 5580 mAh ， 5 V / 2 A.',
              'MT6739 ， Doppia rete 4G',
              'Schermo intero 18: 9 ， 5,5 "HD +',
              'Doppio Sony IMX134 8MP + 13MP',
              '2GB+16GB，NFC',
              'Android 8.1'
           ], img: require("../../assets/img/productPlan/bv5800.jpg"), href: ""},
         {time: "Metà maggio", name: "BV5800 Pro", config:[
             'IP68 e MIL-STD-810G',
             '5V / 2A ， Ricarica wireless',
             'Batteria BAK da 5580 mAh',
             'MT6739 ， Doppia rete 4G',
             'Schermo intero 18: 9 ， 5,5 "HD +',
             'Doppio Sony IMX134 8MP + 13MP',
             '2GB+16GB，NFC',
             'Android 8.1'
           ], img: require("../../assets/img/productPlan/bv5800pro.jpg"), href: ""},
         {time: "Inizio aprile", name: "A20", config:[
             'Android GO',
             'Schermo intero da 5,5 "18: 9',
             'Batteria BAK 3000mAh',
             'Doppia fotocamera da 2MP + 5MP',
             'MT6580M 1 GB + 8 GB'
           ], img:require("../../assets/img/productPlan/a20.jpg"), href: ""},
         {time: "Fine Marzo", name: "P10000 Pro", config: [
             'Batteria BAK da 11000 mAh',
             '5V/5A Type-C',
             'Quattro Sony IMX298 13MP + 16MP',
             'Schermo FHD + 18: 9 integrato da 6 pollici',
             'Helio P23 2.0 GHZ',
             '4 GB + 64 GB ， Android 8.1',
             'Occhiali o pelle di vitello italiano'
           ], img: require("../../assets/img/productPlan/p10000pro.jpg"), href: ""},
         {time: "Novembre 2017", name: "BV9000 Pro", config:[
              'Schermo 18: 9 ， 5.7 "FHD ， IP68',
              'MT6757cd ， 2,6 GHZ',
              '6GB+128GB',
              'Fotocamera frontale da 8 MP',
              '13MP + 5MP Doppio posteriore',
              '4180mAh，12V/2A',
              'Android 7.1'
           ], img: require("../../assets/img/productPlan/bv9000pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv9000pro"},
         {time: "Fine ottobre", name: "A10", config:[
              'MT6580A, 2800 mAh',
              'Unibody HD da 5,0 "',
              'Fotocamera da 5MP + 8MP',
              '2GB+16GB',
              'Android 7.0'
           ], img: require("../../assets/img/productPlan/a10.jpg"), href: ""},
         {time: "Oct.2017", name: "S8", config:[
              'Schermo intero HD + 18: 9 da 5,7 "',
              '90% da schermo a corpo',
              'Quattro fotocamere, 13MP + 13MP',
              'MT6750T, 3180 mAh',
              '4GB+64GB',
              'Android 7.0'
           ], img:require("../../assets/img/productPlan/s8.jpg"), href: ""},
         {time: "Agosto 2017", name: "BV4000 Pro", config:[
              'MT6580A, IP68, 3680mAh',
              'Fotocamera da 2MP + 8MP',
              '4.7" HD 2GB+16GB',
              'Touch Screen: 5 punti',
              'Android 7.0'
           ], img: require("../../assets/img/productPlan/bv4000pro.jpg"), href: ""},
         {time: "Maggio 2017", name: "BV8000 Pro", config:[
            'MT6757 （P25） ， 2,6 GHZ',
            'Netcom completo ， 4180 mAh ， 9V2A',
            'Fotocamera da 8 MP + 16 MP, IP68',
            'FHD da 5,0 "6 GB + 64 GB',
            'Android 8.0'
           ], img: require("../../assets/img/productPlan/bv8000pro.jpg"), href: "https://www.blackview.hk/shop/buy/bv8000pro"},
         {time: "Fine aprile", name: "BV7000", config:[
             'MT6737T, IP68, 3500 mAh',
             'Fotocamera da 5MP + 8MP',
             'FHD da 5,0 "2 GB + 16 GB',
             'Android 7.0'
           ], img: require("../../assets/img/productPlan/bv7000.jpg"), href: ""},
         {time: "Feb.2017", name: "BV7000 Pro", config: [
             'MT6750T, 28nm, IP68',
             'Fotocamera da 8MP + 13MP',
             'FHD da 5,0 "4 GB + 64 GB',
             'Android 7.0'
           ], img: require("../../assets/img/productPlan/bv7000pro.jpg"), href: ""},
         {time: "25 luglio 2016", name: "BV6000s", config:[
             "MT6737T Quad-core 1.5 GHZ",
             "4,7 pollici HD 2 GB + 16 GB",
             "IP68",
             "Android 7.0"
           ], img: require("../../assets/img/productPlan/bv6000s.png"), href: ""},
         {time: "Maggio. 31st. 2016", name: "BV6000", config:[
             'MT6755 Octa-core 2.0 GHZ',
             '4,7 pollici HD 3 GB + 32 GB',
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
