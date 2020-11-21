import request from '@/utils/request'

export function feedback(feedData) {
  return request({
    url: '/api/feedback',
    method: 'POST',
    data:{
      buyfrom: feedData.where,
      category:feedData.Category,
      content: feedData.detail,
      email: feedData.email,
      imei: feedData.IMEI,
      orderNumber:feedData.orderNumber,
      phoneLaguage:feedData.language,
      phoneModel:feedData.PhoneModel,
      sellerName:feedData.storeName,
      softVersion:feedData.Version,
      userCountry: feedData.Country
    }
  })
}
export function ContactUs(feedData) {
  return request({
    url: '/api/contactus/',
    method: 'POST',
    data:{
      category:feedData.category,
      content: feedData.content,
      email: feedData.email,
      subject:feedData.subject,
      contractName:feedData.contractName,
      orderId:feedData.orderId
    }
  })
}
export function StoreData(data) {
  return request({
    url: '/api/yxatlas/find',
    method: 'POST'
  })
}
export function CountryStore(country) {
  return request({
    url: '/api/yxatlas/find/' + country,
    method: 'POST'
  })
}
export function NetWork(data) {
  return request({
    url: '/api/get/network',
    method: 'GET'
  })
}
export function CeData() {
  return request({
    url: '/api/file/get',
    method: 'GET'
  })
}
export function GetTips() {
  return request({
    url: '/api/yxSystemGroupData?page=0&size=10&sort=id%2Cdesc&groupName=routine_home_roll_news&differ=pre',
    method: 'GET'
  })
}
