import request from '@/utils/request'

export function login(jsonForm) {
  return request({
    url: '/api/apiLogin',
    method: 'post',
    data: jsonForm
  })
}
export function test() {
  return request({
    url: '/func/ventas/getCommodityListByInputStringMobile',
    method: 'post',
    data: {}
  })
}


