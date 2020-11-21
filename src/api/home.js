import request from '@/utils/request'
import qs from 'qs'

export function subscribe(email) {
  return request({
    url: '/api/subscribe/email',
    method: 'post',
    data: {
      email,
    }
  })
}
export function proSubscribe(email,name) {//产品订阅
  return request({
    url: `/api/save/subscribe/${email}/${name}`,
    method: 'GET',

  })
}
export function banner(email) {
  return request({
    // url: '/banner',
    url: '/api/banner',
    method: 'GET',
    data: {
      email,
    }
  })
}
/*获取产品列表*/
export function GetPcategories() {
  return request({
    url: '/api/product/categories',
    method: 'GET',
  })
}

/*获取视频*/
export function GetVideo() {
  return request({
    // url: '/videos/latest',
    url: '/api/videos/latest',
    method: 'GET',
  })
}
/*获取新闻*/
export function GetNews() {
  return request({
    // url: '/news',
    url: '/api/news',
    method: 'GET',
    // method: 'POST',
  })
}
export function GetNewsList(page) {//新闻列表
  var params = {
    sort:'addTime,desc',
    page:page,
    size:10
  }
  return request({
    url: '/api/news?'+qs.stringify(params, { indices: false }),
    // method: 'GET',
    method: 'POST',
    // data:{
    //   sort:'addTime,desc',
    //   page:1,
    //   size:2
    // }
  })
}
export function GetNewsDetail(id) {//新闻详情
  return request({
    url: `/api/news/${id}`,
    method: 'GET',
  })
}
/*获取明星产品*/
export function GetProductHot() {
  return request({
    // url: '/product/hot',
    url: '/api/product/hot',
    method: 'GET',
  })
}
/*获取商品列表*/
export function shopCatalog() {
  return request({
    url: '/api/goods/keyword',
    method: 'GET',
  })
}

export function footerRecommend() {
  return request({
    url: '/api/get/productlist',
    method: 'GET',
  })
}
export function VideoList(page) {
  var params = {
    page:page,
    size:10,
    differ:'pre'
  }
  return request({
    url: '/api/get/yxSystemGroupData?'+qs.stringify(params, { indices: false }),
    method: 'GET',
  })
}
export function HomeSearch(content) {
  return request({
    url: `/api/get/product/${content}`,
    method: 'GET',
  })
}
export function TopBanner() {
  return request({
    url: '/api/get/topbanner?groupName=routine_home_top_banner&differ=pre',
    method: 'GET',
  })
}
export function GetReCAPTCHA(token){
  return request({
    url: `/api/recaptcha?token=${token}`,
    method: 'POST',
  })
}
