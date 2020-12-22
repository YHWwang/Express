import request from '@/utils/request'
import de from "element-ui/src/locale/lang/de";

export function login(username, password) {
  return request({
    // url: '/user/login',
    url: '/api/user/login',
    method: 'post',
    data: {
      username,
      password,
      // code,
      // uuid
    }
  })
}
export function google_login(id_token) {
  return request({
    url: 'https://activity.blackview.hk/googleVerify?idtoken='+id_token,
    method: 'post',
  })
}
export function register(username, password) {//注册
  return request({
    // url: '/user/register',
    url: '/api/user/register',
    method: 'post',
    data: {
      username,
      password,
      // code,
      // uuid
    }
  })
}
export function active(url) {//校验
  return request({
    // url:`/user/checkCode/${url}`,
    url:`/api/user/checkCode/${url}`,
    method: 'get',
  })
}
export function resetEmail(username) {//重置密码发邮件申请
  return request({
    // url:'/user/password/reset/sendemal',
    url:'/api/user/password/reset/sendemal',
    method: 'POST',
    data:{
      username,
      password:"haha"
    }
  })
}

export function resetPass(username,password,key) {//重置密码,确认密码
  return request({
    // url:'/user/password/reset/confirm',
    url:'/api/user/password/reset/confirm',
    method: 'POST',
    data:{
      username,
      password,
      key
    }
  })
}

export function logout() {
  return request({
    // url: 'auth/logout',
    url: '/api/auth/logout',
    method: 'delete'
  })
}
export function SendEmail(username) {
  return request({
    // url: '/user/activation',
    url: '/api/user/activation',
    method: 'POST',
    data:{
      username
    }
  })
}
