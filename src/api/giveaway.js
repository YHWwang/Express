import request from '@/utils/request'

export function Giveaway() {
  return request({
    url: '/api/giveaway',
    method: 'GET',
  })
}
