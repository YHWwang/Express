import Vue from 'vue'
import Vuex from 'vuex'
import de from "element-ui/src/locale/lang/de";
Vue.use(Vuex)
//
// var key,myCarCount,myTotalPrice = ""
var key  = "goodscarList1";
var myCarCount = "count1"//购物车商品总数量
var myTotalPrice = "totalPrice1"//购物车商品总价


const store = new Vuex.Store({
  state:{
    user:{},//存用户名
    token:"BLACK-VIEW",//初始化token
    carList:localStorage.getItem(key)||"[]",
    // carList:"[]",
    count:localStorage.getItem(myCarCount) || 0,//购物车数量 未登录的
    // count: 0,//购物车数量 未登录的
    totalPrice:localStorage.getItem(myTotalPrice) || 0,//购物车总价 未登录的
    // totalPrice: 0,//购物车总价 未登录的
    loginCartCount:0,//登录时购物车数量
    color:true,
    activateEmail:"",//激活邮箱的路径，代码复用
    activeUrl:"",
    GetTime:localStorage.getItem('time')||"0"
  },
  getters:{
    carList:state=>JSON.parse(state.carList),//获取购物车商品，
    count:state=>state.count,
    loginCartCount:state=>state.loginCartCount,
  },
  mutations:{
    addGoods(state,addList){

      localStorage.setItem(key,JSON.stringify(addList))//更新购物车
     state.carList = localStorage.getItem(key)
      var res = addList
      var len = res.length
      var sum = 0;
      var totalPrice = 0
      for(var i = 0 ; i<len;i++ ){
        sum += res[i].cartNum
        totalPrice+=res[i].cartNum *res[i].price
      }
      state.count = sum//购物车总数量
      state.totalPrice = totalPrice.toFixed(2)//购物车总价格
      localStorage.setItem(myCarCount,sum)
      localStorage.setItem(myTotalPrice,totalPrice.toFixed(2))
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    chengActive(state,router){//判断哪个路由来的
      state.activateEmail = router
    },
    saveActiveUrl(state,url){
      state.activeUrl = url
    },
    //登录时购物车数据变化
    saveloginCardCount(state,count){//登录时购物车数量变化
      state.loginCartCount += count
    },
    loginCartCount1(state,count){

      state.loginCartCount = count
    }
  },
  actions:{
    addGoods(context,addList){//未登录时
      context.commit("addGoods",addList)
    },
    saveUser(context,user){//保存用户信息
      context.commit("SET_USER",user)
    },
    saveToken(context,Token){
      context.commit("SET_TOKEN",Token)
    },
    chengActive(context,router){
      context.commit("chengActive",router)
    },
    saveActiveUrl(context,url){
      context.commit("saveActiveUrl",url)
    },
    //登录时购物车数量变化
    saveloginCardCount(context,count){
      context.commit("saveloginCardCount",count)
    },
    LoginCartCount1(context,count){
      context.commit("loginCartCount1",count)
    }
  }
})

export default store
