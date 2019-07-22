import request from '@/utils/request'

export function login(jsonForm) {
  return request({
    url: '/api/apiLogin',
    method: 'post',
    data: jsonForm
  })
}


