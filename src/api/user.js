import request from '@/utils/request'

export function UserInfo() {
  return request({
    // url: '/user/info',
    url: '/api/user/info',
    method: 'Get',
  })
}
export function Logout() {
  return request({
    // url: '/user/logout',
    url: '/api/user/logout',
    method: 'DELETE',
  })
}
export function changePass(oldPassword,newPassword) {
  return request({
    // url: '/user/update/password',
    url: '/api/user/update/password',
    method: 'POST',
    data:{
      oldPassword,
      newPassword
    }
  })
}


export function UpdateInfo(user) {//更新用户信息
  return request({
    // url: '/user/update',
    url: '/api/user/update',
    method: 'POST',
    data:{
      username:user.username,
      nickname:user.nickname,
      realName:user.realName,
      email:user.email,
      phone:user.phone,
      uid:user.uid,
    }
  })
}
export function GetAdderss() {//查询用户地址
  return request({
    // url: '/user/address',
    url: '/api/user/address',
    method: 'GET',
  })
}
export function DelAddress(addressId) {//删除用户地址
  return request({
    // url: `/user/address/${addressId}`,
    url: `/api/user/address/${addressId}`,
    method: 'DELETE',
  })
}
export function Addaddress(userAddress,flag) {//增加用户地址 //flag true 未登录 false  登录
  var addressUrl  = flag? "api/user/address/notlogin":"api/user/address"
  return request({
    url:addressUrl,
    method: 'POST',
    data:{
      username:userAddress.email,//0605新加
      realName:userAddress.realName,
      phone:userAddress.phone,
      detail:userAddress.detail,
      city:userAddress.city,
      province:userAddress.province,
      country:userAddress.country,
      postCode:userAddress.postCode,
      uid:userAddress.uid,
      district:userAddress.district
    }
  })
}
export function ChangeAddress(userAddress) {//更换用户地址
  return request({
    // url: "/user/address",
    url: "/api/user/address",
    method: 'PUT',
    data:{
      username:userAddress.email,
      id:userAddress.id,
      realName:userAddress.realName,
      phone:userAddress.phone,
      detail:userAddress.detail,
      city:userAddress.city,
      province:userAddress.province,
      country:userAddress.country,
      postCode:userAddress.postCode,
      uid:userAddress.uid,
      district:userAddress.district
    }
  })
}
export function Country() {//获取国家
  return request({
    url: '/api/shipping/data/country',
    method: 'GET',
  })
}
export function Province(id) {//获取城市
  return request({
    url: `/api/shipping/data/country/${id}`,
    method: 'GET',
  })
}
export function GetOrder(id) {//获取订单
  return request({
    // url:'/user/order',
    url:'/api/user/order',
    method: 'GET',
  })
}
export function GetFreight(country,number) {//查询邮费
  return request({
    url:`/api/shipping/data/price/${country}/${number}`,
    method: 'GET',
  })
}
export function Orders(id) {//查询订单
  return request({
    url:`api/user/order/${id}`,
    method: 'GET',
  })
}
export function PayAgain(orderId,paymentMethod) {
  return request({
    url: `api/user/order/update/paymentMethod/${orderId}/${paymentMethod}`,
    method: 'GET',
  })
}
