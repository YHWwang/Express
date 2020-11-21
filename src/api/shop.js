import request from '@/utils/request'
import de from "element-ui/src/locale/lang/de";

export function shopCatalog() {
  return request({
    url: '/api/goods/keyword',
    method: 'GET',
  })
}
export function shopList(word) {
  return request({
    url: `/api/goods/keyword/${word}`,
    method: 'GET',
  })
}
export function GetGoods(id) {
  return request({
    url: `/api/goods/goods/${id}`,
    method: 'GET',
  })
}
export function Getrecommond(id) {//推荐
  return request({
    url: `/api/goods/recommond/${id}`,
    method: 'GET',
  })
}
export function Getreplay(id,number) {//评论

  return request({
    url: `/api/product/replay/${id}`,
    method: 'GET',
    params:{
      size:10,
      page:number
    }
  })
}
export function addCarData(guantity,carlist) {//加入购物车
  return request({
    url: '/api/cart',
    method: 'POST',
    data:{
      productAttrUnique:carlist.onlyUnique,
      cartNum:guantity,
      id:carlist.id,
      image:carlist.image,
      price:carlist.price,
      productAttr:carlist.attrName,
      productId:'',
      productName:carlist.storeName,
      totolMoney:carlist.price,
      uid:'',
    }
  })
}
export function GetCardData() {//获取购物车商品
  return request({
    url:'/api/cart',
    // url:'/api/cart',
    method: 'GET',
  })
}
export function changeCardCount(item) {//更改购物车数据
  return request({
    url:'/api/cart',
    method: 'PUT',
    data:{
      cartNum:item.cartNum,
      id:item.id,
      image:item.image,
      price:item.price,
      productAttr:item.productAttr,
      productAttrUnique:item.productAttrUnique,
      productId:item.productId,
      productName:item.productName,
      suk:item.suk,
      totolMoney:item.totolMoney,
      uid:item.uid,
    }
  })
}
export function DelCard(id) {//删除
  return request({
    url:`/api/cart/${id}`,
    method: 'DELETE'
  })
}
export function GetDiscount(discountCode) {//折扣码
  return request({
    url:`/api/cart/settlement/${discountCode}`,
    method: 'GET'
  })
}
export function UnLoginGetDiscount(carts,disCountCode) {//未登录的折扣码

  return request({
    url:'/api/cart/notuser/settlement',
    method: 'POST',
    data:{
      carts,
      disCountCode
    }
  })
}
export function recommanded(ids) {//推荐
  return request({
    url:'/api/cart/recommanded',
    method: 'POST',
    data:
    ids
  })
}


export function checkProdust(disCountCode) {//折扣码
  // var checkUrl = `/user/order/check/${disCountCode}`
  var checkUrl = `/api/user/order/check/${disCountCode}`
  return request({
    url:checkUrl,
    method: 'GET'
  })
}

export function PlaceOrder(address,shippingMethod,paymentMethod,email,mark,disCountCode) {//登录状态提交订单
  return request({
    // url:'/user/order/submit',
    url:'/api/user/order/submit',
    method: 'POST',
    data:{
      address:{
        address:address.detail,
        city:address.city,
        country:address.country,
        email:email,
        firstName:address.realName,
        lastName:address.realName,
        phone:address.phone,
        state:address.province,
        zip:address.postCode//邮编
      },
      paymentMethod,
      shippingMethod,
      mark,
      disCountCode
    }
  })
}
export function PlaceOrderNotSignIn(a,b,c,d,e,f,disCountCode) {//未登录状态提交订单
  return request({
    // url:'/user/order/submit/not/login',
    url:'/api/user/order/submit/not/login',
    method: 'POST',
    data:{
      carts:a,
      address:{
        address:b.detail,
        city:b.city,
        country:b.country,
        email:b.email,
        firstName:b.realName,
        lastName:b.realName,
        phone:b.phone,
        state:b.province,
        zip:b.postCode//邮编
      },
      // address:b,
      shippingMethod:c,
      paymentMethod:d,
      mark:e,
      username:f,//email
      disCountId:36,//email
      disCountCode :disCountCode,//email
    }
  })
}


export function Pay(id,payType) {//登录支付
  return request({
    // url:`/user/order/pay/${id}/${payType}`,
    url:`/api/user/order/pay/${id}/${payType}`,
    method: 'GET'
  })
}
export function UnsignInPay(id,payType,username) {//未登录支付
  // debugger
  return request({
    // url:`/user/order/pay/${id}/${payType}/${username}`,
    url:`/api/user/order/pay/${id}/${payType}/${username}`,
    method: 'GET'
  })
}

export function AddComment(data) {//添加评论
  return request({
    url:'/api/product/replay',
    method: 'POST',
    data
  })
}
export function DelComment(filePath) {//删除图片
  return request({
    url:`/api/product/replay/delReplay`,
    method: 'POST',
    data: {
      filePath:filePath
    }
  })
}
