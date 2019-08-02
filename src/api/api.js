import request from '@/utils/request'

export function login(jsonForm) {
  return request({
    url: '/auth/webLogin',
    method: 'post',
    data: jsonForm
  })
}

export function allRentPlanListOfVentas() {//获取计划列表
  return request({
    url: '/ventas/getSupnuevoVentasRentPlanListOfVentas',
    method: 'post',
    data: {
    }
  })
}

export function getSupnuevoVentasPlanFeeInfoWeb() {//商品计划购买
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
export function getCityInfoListOfProvinceWeb(provinceId) { //city
  return request({
    url: '/ventas/getCityInfoListOfProvinceWeb',
    method: 'post',
    data: {
      provinceId
    }
  })
}
export function addOneMergeRentPlanToVentas() { //
  return request({
    url: '/ventas/addOneMergeRentPlanToVentas',
    method: 'post',
    data: {
    }
  })
}
export function getSupnuevoVentasLogMapByPlanIdWeb(planId) { //购买计划获得日志信息
  return request({
    url: '/ventas/getSupnuevoVentasLogMapByPlanIdWeb',
    method: 'post',
    data: {
      planId
    }
  })
}
export function addSupnuevoVentasRentPlanToVentasWeb(planId) { //购买计划
  return request({
    url: '/ventas/addSupnuevoVentasRentPlanToVentasWeb',
    method: 'post',
    data: {
      planId
    }
  })
}
export function editDeliverGoodWeb(deliverId, provinceId, cityId, minAmount, deliverFee) {//编辑送货
  return request({
    url: '/ventas/updateSupnuevoVentasDeliverGoodWeb',
    method: 'POST',
    data: {
      deliverId,
      provinceId,
      cityId,
      minAmount,
      deliverFee
    }
  })
}
export function createDeliverGoodWeb(deliverId, provinceId, cityId, minAmount, deliverFee) {//添加送货
  return request({
    url: '/ventas/createSupnuevoVentasDeliverGoodWeb',
    method: 'POST',
    data: {
      deliverId,
      provinceId,
      cityId,
      minAmount,
      deliverFee
    }
  })
}
export function deleteDeliverGoodWeb(deliverId) {//删除送货
  return request({
    url: '/ventas/deleteSupnuevoVentasDeliverGoodWeb',
    method: 'POST',
    data: {
      deliverId
    }
  })
}
export function uploadSupnuevoVentasPhotoImageWeb() {//上传照片
  return request({
    url: '/ventas/uploadSupnuevoVentasPhotoImageWeb',
    method: 'POST',
    data: {
    }
  })
}
export function updateSupnuevoVentasInfoAndRubroList(ventasId,rubroIdList,nombre,email,pagina,cityId,direccion,telefono,principalContactos,observaciones,nota) {//保存供应商信息
  return request({
    url: '/ventas/updateSupnuevoVentasInfoAndRubroList',
    method: 'POST',
    data: {
      ventasId,
      rubroIdList,
      nombre,
      email,
      pagina,
      cityId,
      direccion,
      telefono,
      principalContactos,
      observaciones,
      nota
    }
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
    url: '/ventas/changeTableStationWeb',
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

export function getCommodityPriceFormByOrderNumWeb(orderNum) {  // 干什么用的
  return request({
    url: '/sale/getCommodityPriceFormByOrderNumWeb',
    method: 'post',
    data: {
      orderNum
    }
  })
}

export function saveOrUpdateSupnuevoVentasCommodityWeb(priceId,commodityId,tamanoId,codigo,descripcion) {  //右边的  传什么值  跟saveOrUpdateSupnuevoVentasCommodityPriceWeb区别
  return request({
    url: '/sale/saveOrUpdateSupnuevoVentasCommodityWeb',
    method: 'post',
    data: {
      priceId,
      commodityId,
      tamanoId,
      codigo,
      descripcion
    }
  })
}
export function saveOrUpdateSupnuevoVentasCommodityPriceWeb(priceId,commodityId,codigoEntreno,codigo,price) {  //左边的
  return request({
    url: '/sale/saveOrUpdateSupnuevoVentasCommodityPriceWeb',
    method: 'post',
    data: {
      priceId,
      commodityId,
      codigoEntreno,
      codigo,
      price
    }
  })
}

export function clearSupnuevoVentasCommodityPriceWeb(priceId) {
  return request({
    url: '/sale/clearSupnuevoVentasCommodityPriceWeb',
    method: 'post',
    data: {
      priceId
    }
  })
}

export function insertSupnuevoVentasCommodityPriceWeb(priceId) {
  return request({
    url: '/sale/insertSupnuevoVentasCommodityPriceWeb',
    method: 'post',
    data: {
      priceId
    }
  })
}

export function deleteSupnuevoVentasCommodityPriceWeb(priceId) {
  return request({
    url: '/sale/deleteSupnuevoVentasCommodityPriceWeb',
    method: 'post',
    data: {
      priceId
    }
  })
}
