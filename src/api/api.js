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
    url: '/ventas/getCommodityPriceFormByPriceId1',
    method: 'post',
    data: {
      priceId
    }
  })
}
export function getSupnuevoVentasRentPlanListOfVentas(ventasId) {
  return request({
    url: '/ventas/getSupnuevoVentasRentPlanListOfVentas',
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
export function getCommodityCatalogListOptionInfoList(parentId) { //获取商品类 parentId为null
  return request({
    url: '/ventas/getCommodityCatalogListOptionInfoList',
    method: 'post',
    data: {
      parentId
    }
  })
}
export function getCommodityCatalogListOptionInfoList1(parentId) { //获取商品品牌 型号 含量 参数为string类型
  return request({
    url: '/ventas/getCommodityCatalogListOptionInfoList1',
    method: 'post',
    data: {
      parentId
    }
  })
}
export function insertSupnuevoVentasCommodityPrice(parentId,) { //插入 还没用呢
  return request({
    url: '/ventas/insertSupnuevoVentasCommodityPrice',
    method: 'post',
    data: {
      parentId
    }
  })
}
export function getQueryDataListByInputStringMobile(codigo) { //条形码查询
  return request({
    url: '/ventas/getQueryDataListByInputStringMobile',
    method: 'post',
    data: {
      codigo
    }
  })
}
  export function getDescripcionListByDescripcionPrefix(descripcion) { //名称查询
    return request({
      url: '/ventas/getDescripcionListByDescripcionPrefix',
      method: 'post',
      data: {
        descripcion
      }
    })
  }
    export function getCommodityBySearchEngineOld(descripcion) { //引擎查询
      return request({
        url: '/ventas/getCommodityBySearchEngineOld',
        method: 'post',
        data: {
          descripcion
        }
      })
    }

export function changeTableStation(newIndex,oldIndex) { //引擎查询
  return request({
    url: '/ventas/changeTableStation',
    method: 'post',
    data: {
      newIndex,
      oldIndex
    }
  })
}

export function getCommodityCatalogListOptionInfoListWeb(parentId) { //
  return request({
    url: '/sale/getCommodityCatalogListOptionInfoListWeb',
    method: 'post',
    data: {
      parentId
    }
  })
}

export function addNewCommodityCatalogWeb(parentId,catalogName) { // 编辑-新增
  return request({
    url: '/sale/addNewCommodityCatalogWeb',
    method: 'post',
    data: {
      parentId,
      catalogName
    }
  })
}
export function modifyCommodityCatalogWeb(catalogId,catalogName) { //编辑-修改
  return request({
    url: '/sale/modifyCommodityCatalogWeb',
    method: 'post',
    data: {
      catalogId,
      catalogName
    }
  })
}
export function deleteCommodityCatalogWeb(catalogId,isCommodity) { //编辑-删除
  return request({
    url: '/sale/deleteCommodityCatalogWeb',
    method: 'post',
    data: {
      catalogId,
      isCommodity
    }
  })
}
