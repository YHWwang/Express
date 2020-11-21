import request from '@/utils/request'

export function products(id) {
  return request({
    url: `/api/product/category/${id}`,
    method: 'GET',
  })
}
export function productsItem(id) {
  return request({
    url: `/api/product/product/${id}`,
    method: 'GET',
  })
}
