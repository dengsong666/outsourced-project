import http from '@/utils/request'

// 发行作品
export function publishWorks(data: Works) {
  return http({
    method: 'POST',
    url: '/v1/works/add',
    data,
  })
}
// 打开存证
export function openCunZheng() {
  return http({
    method: 'GET',
    url: '/v1/works/open/evidence',
  })
}
// 打开鱼塘
export function openYuTang() {
  return http({
    method: 'GET',
    url: '/v1/works/open/fishpond',
  })
}
// 打开鱼塘
export function closeBiGao(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/works/close/compareDraft',
    data
  })
}
// 词曲demo编辑
export function getEditDetails(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/details/edit/gteInfo',
    data
  })
}
// 词曲demo编辑
export function editDetails(data: Works) {
  return http({
    method: 'POST',
    url: '/v1/details/edit',
    data
  })
}
