
import request from '@/utils/request'
export function ContactUs(params) {
  return request({
    url:'/api/contactus/business/contactus',
    method: 'POST',
    params
  })
}
