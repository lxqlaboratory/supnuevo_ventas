import request from '@/utils/request'

export function login(jsonForm) {
  return request({
    url: '/auth/webLogin',
    method: 'post',
    data: jsonForm
  })
}

export function allRentPlanListOfVentas() {
  return request({
    url: '/ventas/getSupnuevoVentasRentPlanListOfVentas',
    method: 'post',
    data: {
    }
  })
}

export function getSupnuevoVentasPlanFeeInfoWeb() {
  return request({
    url: '/ventas/getSupnuevoVentasPlanFeeInfoWeb',
    method: 'post',
    data: {
    }
  })
}
export function getSupnuevoVentasInfoFormByVentasIdWeb() {
  return request({
    url: '/ventas/getSupnuevoVentasInfoFormByVentasIdWeb',
    method: 'post',
    data: {
    }
  })
}
