import axios from 'axios'
import { getToken } from '@/utils/auth'
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
  baseURL: 'http://192.168.11.27:8082',//本地环境
  // baseURL: 'http://18.158.111.234:8083',//德国线上测试
  // baseURL: 'https://www.blackview.hk',//正式测试线上
  timeout: 1200000 // 请求超时时间
})

// request拦截器
// var initToken = "BLACK-VIEW"
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken()// 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request errorR
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(function (response) {
  const {data, status} = response;
  // 对响应数据做点什么
  return response;
}, function (error) {

  if(error.response.status == 401){
    // alert("你还没有登录")
    // window.location.href=window.location.origin+"/home"
  }
  // 对响应错误做点什么
  return Promise.reject(error.response);
});

export default service



/*








* */
