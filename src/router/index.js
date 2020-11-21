import Vue from 'vue'
import Router from 'vue-router'
var mobile =_isMobile()//判断是pc端还是移动端
function _isMobile(){
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );

  return flag;
}

// mobile
import Home from '@/views/home/Home'//
import Index from '@/views/home'//
import Login from '@/views/login'//登录页Index
import GoodsDetail from '@/views/shop/GoodsDetail'//pc具体到商品详情
import GoodsDetailH5 from '@/views/shopH5/GoodsDetailH5'//pc具体到商品详情

//产品列表
import Products from '@/views/products/products'
import ProductsItem from '@/views/products/ProductsItem'
import ProductPlan from '@/views/products/ProductPlan'
//商品列表
import Shop from '@/views/shop/index'
// import shoppingCart from '@/components/shoppingCart'//购物车
import shoppingCart from '@/views/shop/shoppingCart'//购物车
import shoppingCartH5 from '@/views/shopH5/shoppingCartH5'//购物车
/*有关注册*/
import Register from '@/views/register/register'//注册页
import ActivateEmail from '@/views/register/activateEmail'//激活页面
import ForgotPassword from '@/views/register/forgotpassword'//忘记密码页面
import SendLink from '@/views/register/sendLink'//发送邮件 点击链接 重置密码
import ResetPass from '@/views/register/resetPass'//重置密码页面
import Active from '@/views/register/active'//激活页面发get请求/4月2新增
/*有关个人中心的*/
import User from '@/views/User/index'//个人中心
import Orders from '@/views/User/orders'//orders
import ShoppingAddress from '@/views/User/ShoppingAddress'//ShoppingAddress
import AcountInfo from '@/views/User/AcountInfo'//AcountInfo
import PasswordChange from '@/views/User/PasswordChange'//PasswordChange
/*有关新闻*/
import NewsList from '@/views/news/newList'//新闻列表
import NewsDetail from '@/views/news/newsDetail'//新闻详情
/*有关视频*/
import VideoList from '@/views/Video/Video'//视频列表


/*有关结算中心*/
import Settlement from '@/views/Settlement/index'//結算
import PayError from '@/views/Settlement/Error'//支付失败
import PaySuccess  from '@/views/Settlement/Success'//支付成功

/*关于footer其他页面*/
import PaymentMethods from '@/views/Footer/PaymentMethods'
import ShippingGuide from '@/views/Footer/ShippingGuide'//向导
import Return from '@/views/Footer/Return'//退换货
import Warranty from '@/views/Footer/Warranty'//退换货
import About from '@/views/Footer/about'//about
import Experience from '@/views/Footer/Experience'//Experience体验
import Giveaway from '@/views/Footer/Giveaway'//Giveaway
import Privacy from '@/views/Footer/Privacy'//隐私
import TermsOfUse from '@/views/Footer/TermsOfUse'//使用条款
import Rights from '@/views/Footer/Rights'//使用条款
import LegalStatement from '@/views/Footer/LegalStatement'//法律声明
import Support from '@/views/Support/Support'//Support
import Network from '@/views/Support/Network'//Network
import Ce from '@/views/Support/Ce'//ce
import FeedBack from '@/views/Support/FeedBack'//feedback
import Faq from '@/views/Support/faq'//faq
import ContactUs from '@/views/Support/ContactUs'//ContactUs
import error404 from "../views/error404";

//Find a Store FindAstore
import FindAstore from '@/views/FindAstore/index'//FindAstore
import Search from '@/views/shop/Search'//Search
//行业应用
import Solutions from "@/views/IndustrialSolutions/Solutions"
import ThermalImaging from "@/views/IndustrialSolutions/ThermalImaging"
import Construction from "@/views/IndustrialSolutions/construction"
import Transportation from "@/views/IndustrialSolutions/transportation"
import Manufacturing from "@/views/IndustrialSolutions/manufacturing"

import { UserInfo} from "@/api/user"//判断有没登录

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
export default new Router({
  mode: 'history',
 // base:'mynote',//上线新加的
  scrollBehavior(to,from,savedPosition){
    return {
      x:0,
      y:0
    }
  },
  routes: [
    // {
    //   path: '*',
    //   component: (resolve) => require(['@/views/error404.vue'], resolve)
    // },
    {
      path: "*",
      redirect: "/"
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect:'home',
      children:[
        {
          path: '/',
          name: 'home',
          component: Home,
          meta:{
            title:'home',
          },
          beforeEnter:(to,from,next)=>{
            next()
            if(from.path == "/login"){
              // from
              window.location.reload()
            }
          },
        },
        {
          path: '/register',
          name: 'register',
          component: Register//注册
        },
        {
          path: '/activateemail/:email',
          name: 'activateEmail',
          component: ActivateEmail//激活邮箱
        },
        {
          path: '/active/:id',
          name: 'Active',
          component: Active//激活
        },
        {
          path: '/forgotpassword',
          name: 'forgotPassword',
          component: ForgotPassword//忘记密码
        },
        {
          path: '/sendlink/:email',
          name: 'sendLink',
          component: SendLink//发邮件重置密码
        },
        {
          path: '/resetpass/:id',
          name: 'resetPass',
          component: ResetPass//重置密码
        },
        {
          path: '/about-blackview',
          name: 'about',
          component: About//about
        },
        {
          path: '/user',
          name: 'user',
          component: User,//个人中心
          beforeEnter:(to,from,next)=>{
            UserInfo().then(res=>{
              next()
            }).catch(error=>{
              alert("please login!")
              next("/login")
            })

          },
          children:[
            {
              path: '/user/orders',
              name: 'orders',
              component: Orders//orders
            },
            {
              path: '/user/acountinfo',
              name: 'acountinfo',
              component: AcountInfo//AcountInfo
            },
            {
              path: '/user/passwordchange',
              name: 'PasswordChange',
              component: PasswordChange//PasswordChange
            },
            {
              path: '/user/shippingaddress',
              name: 'ShoppingAddress',
              component: ShoppingAddress//ShoppingAddress
            },
          ]
        },
        {
          path: '/find-a-store',
          name: 'findastore',
          component: FindAstore
        },
        {
          path: '/search/:id',
          name: 'search',
          component: Search
        },
        {
          path: '/news',
          name: 'news',
          component: NewsList
        },
        {
          path: '/newsdetail/:id',
          name: 'newsDetail',
          component: NewsDetail
        },
        {
          path: '/video',
          name: 'video',
          component: VideoList//视频
        },
        //产品
        {
          path: '/products/:id',
          name: 'products',
          component: Products
        },
        {
          path: '/products/item/:id',
          name: 'ProductsItem',
          component: ProductsItem
        },
        {
          path: '/new-products',
          name: 'ProductPlan',
          component: ProductPlan
        },
        /*商品*/
        {
          path: '/shop/:word',
          name: 'shop',
          component: Shop
        },
        {
          path: '/shopping-cart',
          name: 'shoppingcart',
          component: mobile ? shoppingCartH5 : shoppingCart//购物车
        },
        {
          path: '/shop/buy/:id',
          component: mobile ? GoodsDetailH5:GoodsDetail//h5商品详情
        },

        /*关于footer 其他页面跳转*/
        {
          path: '/paymentmethods',
          name: 'PaymentMethods',
          component: PaymentMethods//支付方式
        },
        {
          path: '/shipping-guide',
          name: 'ShippingGuide',
          component: ShippingGuide//向导
        },
        {
          path: '/return',
          name: 'Return',
          component: Return//退换货
        },
        {
          path: '/warranty',
          name: 'Warranty',
          component: Warranty//授权
        },
        {
          path: '/experience',
          name: 'Experience',
          component: Experience//体验
        },
        {
          path: '/giveaway',
          name: 'Giveaway',
          component: Giveaway//giveaway
        },
        {
          path: '/privacy',
          name: 'Privacy',
          component: Privacy//Privacy
        },
        {
          path: '/terms-of-use',
          name: 'terms-of-use',
          component: TermsOfUse//TermsOfUse
        },
        {
          path: '/intellectual-property-rights',
          name: 'intellectual-property-rights',
          component: Rights//intellectual-property-rights
        },
        {
          path: '/legal-statement',
          name: 'legal-statement',
          component: LegalStatement//legal-statement
        },
        {
          path: '/support',
          name: 'support',
          component: Support//Support
        },
        {
          path: '/network',
          name: 'network',
          component: Network//network
        },
        {
          path: '/ce',
          name: 'ce',
          component: Ce//network
        },

        {
          path: '/feedback',
          name: 'feedback',
          component: FeedBack//FeedBack
        },
        {
          path: '/faq',
          name: 'faq',
          component: Faq//Faq
        },
        {
          path: '/contact-us',
          name: 'contact-us',
          component: ContactUs//ContactUs
        },
        {
          path: '/settlement/pay/error',
          name:"error",
          component: PayError//支付失败
        },
        /*行业应用*/
        {
          path: '/solutions',
          name:"Solutions",
          component:Solutions //Solutions
        },
        {
          path: '/solutions/thermal-imaging',
          name:"ThermalImaging",
          component:ThermalImaging //ThermalImaging
        },
        {
          path: '/solutions/Construction',
          name:"construction",
          component:Construction //Construction
        },
        {
          path: '/solutions/transportation',
          name:"transportation",
          component:Transportation //transportation
        },
        {
          path: '/solutions/manufacturing',
          name:"manufacturing",
          component:Manufacturing //manufacturing
        },
        {
          path: '/login',
          name: 'login',
          component: Login//登录
        },
      ]
    },

    /*结算页面*/
    {
      path: '/settlement/buy/:code',
      name: 'Settlement',
      component: Settlement,//结算
    },
    {
      path: '/settlement/pay/success/:code',
      name:"success",
      component: PaySuccess//支付成功
    }
  ]

})
