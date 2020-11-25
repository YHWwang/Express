// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Pagination,//
  Dialog,//
  Dropdown,//
  DropdownMenu,//
  DropdownItem,//
  Menu,//
  Submenu,//
  MenuItem,//
  MenuItemGroup,//
  Input,//
  Radio,//
  Checkbox,//
  Select,//
  Option,//
  MessageBox,
  Button,//
  Table,//
  TableColumn,//
  Form,//
  FormItem,//
  Tabs,//
  TabPane,//
  Alert,//
  Upload,//
  Rate,//
  Loading,//
} from 'element-ui';
Vue.use(Pagination);//
Vue.use(Dialog);//
Vue.use(Dropdown);//
Vue.use(DropdownMenu);//
Vue.use(DropdownItem);//
Vue.use(Menu);//
Vue.use(Submenu);//
Vue.use(MenuItem);//
Vue.use(MenuItemGroup);//
Vue.use(Input);//
Vue.use(Radio);//
Vue.use(Checkbox);//
Vue.use(Select);//
Vue.use(Option);//
Vue.use(Button);//
Vue.use(Table);//
Vue.use(TableColumn);//
Vue.use(Form);//
Vue.use(FormItem);//
Vue.use(Tabs);//
Vue.use(TabPane);//
Vue.use(Alert);//
Vue.use(Upload);//
Vue.use(Rate);//
Vue.use(Loading.directive);//
Vue.prototype.$loading = Loading.service;//
Vue.prototype.$alert = MessageBox.alert;//
import VueI18n from 'vue-i18n'
import Lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import it from './lang/it'
import en from './lang/en'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css' //新添加，避免后期打包样式不同，要放在import App from './App';之前
import './assets/css/common.css'
import 'font-awesome/css/font-awesome.min.css'
import { VueReCaptcha } from 'vue-recaptcha-v3' //谷歌机器人验证
Vue.use(VueReCaptcha, { siteKey: '6Ld-YrUZAAAAAAetx6uQ-2tYjxg5-369Sp1jBzWh' })
locale.use(Lang)
Vue.use(VueI18n)

Vue.prototype.$cookie = VueCookies
var lang ='' 
VueCookies.isKey('lang') ? lang = VueCookies.get('lang') : lang = 'IT' // 判断cookie中是否存在

const i18n = new VueI18n({ 
   locale: lang, // 定义默认语言
   messages: {   
      'IT': it,
      'EN': en
    }
  })
// ElementUI.Dialog.props.closeOnClickModal.default = true;
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

