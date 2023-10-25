import http from '@/utils/request'

// 获取收录词集
export function getSelectSetList(data: { musicTypeId: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/getList/BySelect',
    data,
  })
}
// 获取扩容产品包
export function getVolPackageList(data: Page = { pageNum: 1, pageSize: 100 }) {
  return http<Pages<FishTankPackage>>({
    method: 'POST',
    url: '/v1/fishTank/package/getList',
    data,
  })
}
// 扩容产品包
export function setVolPackage(data: { fishTankPackageId: number }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/package/buy',
    data,
  })
}
// 获取所有的词
export function getYugangAll(data: { musicTypeId: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/getList/myAll',
    data,
  })
}
// 获取鱼缸集合列表
export function getYugangSetList(data: { musicTypeId: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/getList',
    data,
  })
}
// 获取集合作品列表
export function getSetWorksList(data: { gatherId: number, isEvidence?: Is, isRecommend?: Is, isTimeLimit?: Is } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/gather/getList',
    data,
  })
}
// 新增集合
export function addSet(data: { musicTypeId: 1 | 2 | 3 }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/gather/add',
    data,
  })
}
// 删除集合
export function delSet(data: { gatherId: number }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/gather/delete',
    data,
  })
}
// 开启鱼塘
export function enableYutang(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/gather/works/open/fishpond',
    data,
  })
}
// 关闭鱼塘
export function disableYutang(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/gather/works/close/fishpond',
    data,
  })
}
// 收录作品
export function collectWorks(data: { collectionIdList: number[], worksIdList: number[] }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/gather/works/collect',
    data,
  })
}
// 删除作品
export function deleteWorks(data: { worksIdList: number[], gatherId: number }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/gather/works/delete',
    data,
  })
}
// 修改作品名字
export function alterWorksName(data: { gatherId: number, gatherName: string }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/gather/update',
    data,
  })
}
// 获取鱼总数
export function getFishTotal(data: { type: 1 | 2 | 3 }) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/my/getTotal',
    data,
  })
}
// 获取我钓到的鱼
export function getMyHookList(data: { musicTypeId: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/my/hook/getList',
    data,
  })
}
// 获取被钓走的鱼
export function getByHookList(data: { musicTypeId: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/my/hookedAway/getList',
    data,
  })
}
// 获取我放养的鱼
export function getMyStockingList(data: { musicTypeId: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/my/stocking/getList',
    data,
  })
}
// 获取我放养的鱼
export function getMyBiGaoList(data: { type: 1 | 2 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishTank/my/compareDraft/getList',
    data,
  })
}