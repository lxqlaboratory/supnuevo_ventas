import request from '@/utils/request'

export function login(jsonForm) {
  return request({
    url: '/func/auth/webLogin',
    method: 'post',
    data: jsonForm
  })
}
export function test() {
  return request({
    url: '/func/ventas/getQueryDataListByInputStringMobile',
    method: 'post',
    data: {}
  })
}


