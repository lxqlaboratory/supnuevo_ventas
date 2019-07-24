import request from '@/utils/request'

export function login(jsonForm) {
  return request({
    url: '/auth/webLogin',
    method: 'post',
    data: jsonForm
  })
}
export function getCommodityPriceFormByPriceId(priceId) {
  return request({
    url: '/func/ventas/getCommodityPriceFormByPriceId',
    method: 'post',
    data: {
      priceId
    }
  })
}
export function getSupnuevoVentasRentPlanListOfVentas(ventasId) {
  return request({
    url: '/func/ventas/getSupnuevoVentasRentPlanListOfVentas',
    method: 'post',
    data: {
      ventasId
    }
  })
}
export function getVentasCommodityPriceOptionList() {
  return request({
    url: '/ventas/getVentasCommodityPriceOptionList',
    method: 'post',
    data: {
    }
  })
}



