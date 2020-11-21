import Vue from 'vue'
import Router from 'vue-router'
var mobile =_isMobile()//判断是pc端还是移动端
function _isMobile(){
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );

  return flag;
}

import GoodsDetail from '@/views/shop/GoodsDetail'//pc具体到商品详情
import GoodsDetailH5 from '@/views/shopH5/GoodsDetailH5'//pc具体到商品详情

import shoppingCart from '@/views/shop/shoppingCart'//购物车
import shoppingCartH5 from '@/views/shopH5/shoppingCartH5'//购物车


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
      component:  resolve=>(require(["@/views/home"],resolve)),
      redirect:'home',
      children:[
        {
          path: '/',
          name: 'home',
          component:  resolve=>(require(["@/views/home/Home"],resolve)),
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
          component:   resolve=>(require(["@/views/register/register"],resolve))//注册
        },
        {
          path: '/activateemail/:email',
          name: 'activateEmail',
          // component: ActivateEmail//激活邮箱
          component:  resolve=>(require(["@/views/register/activateEmail"],resolve))//激活邮箱
        },
        {
          path: '/active/:id',
          name: 'Active',
          // component: Active//激活
          component:  resolve=>(require(["@/views/register/forgotpassword"],resolve))//激活
        },
        {
          path: '/forgotpassword',
          name: 'forgotPassword',
          // component: ForgotPassword//忘记密码
          component:  resolve=>(require(["@/views/register/register"],resolve))//忘记密码
        },
        {
          path: '/sendlink/:email',
          name: 'sendLink',
          // component: SendLink//发邮件重置密码
          component:  resolve=>(require(["@/views/register/sendLink"],resolve))//发邮件重置密码
        },
        {
          path: '/resetpass/:id',
          name: 'resetPass',
          // component: ResetPass//重置密码
          component:  resolve=>(require(["@/views/register/resetPass"],resolve))//重置密码
        },
        {
          path: '/about-blackview',
          name: 'about',
          // component: About//about
          component:  resolve=>(require(["@/views/Footer/about"],resolve))//about
        },
        {
          path: '/user',
          name: 'user',
          // component: User,//个人中心
          component: resolve=>(require(["@/views/User/index"],resolve)),//个人中心
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
              // component: Orders//orders
              component:  resolve=>(require(["@/views/User/orders"],resolve))//orders
            },
            {
              path: '/user/acountinfo',
              name: 'acountinfo',
              // component: AcountInfo//AcountInfo
              component:  resolve=>(require(["@/views/User/AcountInfo"],resolve))//AcountInfo
            },
            {
              path: '/user/passwordchange',
              name: 'PasswordChange',
              // component: PasswordChange//PasswordChange
              component:  resolve=>(require(["@/views/User/PasswordChange"],resolve))//PasswordChange
            },
            {
              path: '/user/shippingaddress',
              name: 'ShoppingAddress',
              // component: ShoppingAddress//ShoppingAddress
              component:  resolve=>(require(["@/views/User/ShoppingAddress"],resolve))//ShoppingAddress
            },
          ]
        },
        {
          path: '/find-a-store',
          name: 'findastore',
          // component: FindAstore
          component:  resolve=>(require(["@/views/FindAstore/index"],resolve))
        },
        {
          path: '/search/:id',
          name: 'search',
          component:  resolve=>(require(["@/views/shop/Search"],resolve))
          // component: Search
        },
        {
          path: '/news',
          name: 'news',
          // component: NewsList
          component:  resolve=>(require(["@/views/news/newList"],resolve))
        },
        {
          path: '/newsdetail/:id',
          name: 'newsDetail',
          // component: NewsDetail
          component:  resolve=>(require(["@/views/news/newsDetail"],resolve))
        },
        {
          path: '/video',
          name: 'video',
          // component: VideoList//视频
          component:  resolve=>(require(["@/views/Video/Video"],resolve))//视频
        },
        //产品
        {
          path: '/products/:id',
          name: 'products',
          // component: Products
          component:  resolve=>(require(["@/views/products/products"],resolve))
        },
        {
          path: '/products/item/:id',
          name: 'ProductsItem',
          // component: ProductsItem
          component:  resolve=>(require(["@/views/products/ProductsItem"],resolve))
        },
        {
          path: '/new-products',
          name: 'ProductPlan',
          // component: ProductPlan
          component:  resolve=>(require(["@/views/products/ProductPlan"],resolve))
        },
        /*商品*/
        {
          path: '/shop/:word',
          name: 'shop',
          // component: Shop
          component:  resolve=>(require(["@/views/shop/index"],resolve))
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
          // component: PaymentMethods//支付方式
          component:  resolve=>(require(["@/views/Footer/PaymentMethods"],resolve))//支付方式
        },
        {
          path: '/shipping-guide',
          name: 'ShippingGuide',
          // component: ShippingGuide//向导
          component:  resolve=>(require(["@/views/Footer/ShippingGuide"],resolve))//向导
        },
        {
          path: '/return',
          name: 'Return',
          // component: Return//退换货
          component:  resolve=>(require(["@/views/Footer/Return"],resolve))//退换货
        },
        {
          path: '/warranty',
          name: 'Warranty',
          // component: Warranty//授权
          component:  resolve=>(require(["@/views/Footer/Warranty"],resolve))//授权
        },
        {
          path: '/experience',
          name: 'Experience',
          // component: Experience//体验
          component:  resolve=>(require(["@/views/Footer/Experience"],resolve))//体验
        },
        {
          path: '/giveaway',
          name: 'Giveaway',
          // component: Giveaway//giveaway
          component:  resolve=>(require(["@/views/Footer/Giveaway"],resolve))//giveaway
        },
        {
          path: '/privacy',
          name: 'Privacy',
          // component: Privacy//Privacy
          component:  resolve=>(require(["@/views/Footer/Privacy"],resolve))//Privacy
        },
        {
          path: '/terms-of-use',
          name: 'terms-of-use',
          // component: TermsOfUse//TermsOfUse
          component:  resolve=>(require(["@/views/Footer/TermsOfUse"],resolve))//TermsOfUse
        },
        {
          path: '/intellectual-property-rights',
          name: 'intellectual-property-rights',
          // component: Rights//intellectual-property-rights
          component:  resolve=>(require(["@/views/Footer/Rights"],resolve))//intellectual-property-rights
        },
        {
          path: '/legal-statement',
          name: 'legal-statement',
          // component: LegalStatement//legal-statement
          component:  resolve=>(require(["@/views/Footer/LegalStatement"],resolve))//legal-statement
        },
        {
          path: '/support',
          name: 'support',
          // component: Support//Support
          component:  resolve=>(require(["@/views/Support/Support"],resolve))//Support
        },
        {
          path: '/network',
          name: 'network',
          // component: Network//network
          component:  resolve=>(require(["@/views/Support/Network"],resolve))//network
        },
        {
          path: '/ce',
          name: 'ce',
          // component: Ce//network
          component:  resolve=>(require(["@/views/Support/Ce"],resolve))//network
        },

        {
          path: '/feedback',
          name: 'feedback',
          // component: FeedBack//FeedBack
          component:  resolve=>(require(["@/views/Support/FeedBack"],resolve))//FeedBack
        },
        {
          path: '/faq',
          name: 'faq',
          // component: Faq//Faq
          component:  resolve=>(require(["@/views/Support/faq"],resolve))//Faq
        },
        {
          path: '/contact-us',
          name: 'contact-us',
          // component: ContactUs//ContactUs
          component:  resolve=>(require(["@/views/Support/ContactUs"],resolve))//ContactUs
        },
        {
          path: '/settlement/pay/error',
          name:"error",
          // component: PayError//支付失败
          component:  resolve=>(require(["@/views/Settlement/Error"],resolve))//支付失败
        },
        /*行业应用*/
        {
          path: '/solutions',
          name:"Solutions",
          // component:Solutions //Solutions
          component: resolve=>(require(["@/views/IndustrialSolutions/Solutions"],resolve)) //Solutions
        },
        {
          path: '/solutions/thermal-imaging',
          name:"ThermalImaging",
          // component:ThermalImaging //ThermalImaging
          component: resolve=>(require(["@/views/IndustrialSolutions/ThermalImaging"],resolve)) //ThermalImaging
        },
        {
          path: '/solutions/Construction',
          name:"construction",
          // component:Construction //Construction
          component: resolve=>(require(["@/views/IndustrialSolutions/construction"],resolve)) //Construction
        },
        {
          path: '/solutions/transportation',
          name:"transportation",
          // component:Transportation //transportation
          component: resolve=>(require(["@/views/IndustrialSolutions/transportation"],resolve)) //transportation
        },
        {
          path: '/solutions/manufacturing',
          name:"manufacturing",
          // component:Manufacturing //manufacturing
          component: resolve=>(require(["@/views/IndustrialSolutions/manufacturing"],resolve)) //manufacturing
        },
        {
          path: '/login',
          name: 'login',
          // component: Login//登录
          component:  resolve=>(require(["@/views/login"],resolve))//登录
        },
      ]
    },

    /*结算页面*/
    {
      path: '/settlement/buy/:code',
      name: 'Settlement',
      // component: Settlement,//结算
      component:  resolve=>(require(["@/views/Settlement/index"],resolve)),//结算
    },
    {
      path: '/settlement/pay/success/:code',
      name:"success",
      // component: PaySuccess//支付成功
      component:  resolve=>(require(["@/views/Settlement/Success"],resolve))//支付成功
    }
  ]

})
