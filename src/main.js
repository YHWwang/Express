// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui' //新添加

import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'
import it from './lang/it'
import en from './lang/en'
import 'element-ui/lib/theme-chalk/index.css' //新添加，避免后期打包样式不同，要放在import App from './App';之前
import './assets/css/common.css'
import 'font-awesome/css/font-awesome.min.css'
import { VueReCaptcha } from 'vue-recaptcha-v3' //谷歌机器人验证
import GSignInButton from 'vue-google-signin-button'
import FBSignInButton from 'vue-facebook-signin-button'

Vue.use(FBSignInButton)
Vue.use(GSignInButton)
Vue.use(VueReCaptcha, { siteKey: '6Ld-YrUZAAAAAAetx6uQ-2tYjxg5-369Sp1jBzWh' })
Vue.use(ElementUI,{locale})
Vue.use(VueI18n)

const i18n = new VueI18n({ 
   locale: 'IT', // 定义默认语言
   messages: {   
      'IT': it,
    }
  })
ElementUI.Dialog.props.closeOnClickModal.default = true;
import store from  "@/store/index"
import App from './App'
import router from './router/lazy1'
// import VueGtag from "vue-gtag"
// Vue.use(VueGtag, {
//   config: { id: "UA-120723805-2" },
//   includes:[
//     {
//       id:'  UA-138297813-1'
//     },
//     {
//       id:'AW-797702063'
//     }
//   ]

// }, router);
Vue.config.productionTip = false
// new Vue({
//   el:"#app",
//   router,
//   store,
//   render: h => h(App),
//   mounted () {
//     document.dispatchEvent(new Event('render-event'))
//   }
// })

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})

