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
    url: '/api/func/ventas/getQueryDataListByInputStringMobile',
    method: 'post'
  })
}


