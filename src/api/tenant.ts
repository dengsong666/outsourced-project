import http from './Http'
import { BasicResponse } from './types'
import { Tenant } from './types/tenant'

// 获取租户列表
export function getTenantList(params: Page) {
  return http('GET', {
    url: '/agent/aTenant',
    params
  })
}
// 新建租户
export function addTenant(data: Omit<Tenant, keyof BasicResponse>) {
  return http('POST', {
    url: '/agent/aTenant',
    data
  })
}
// 删除代理商
export function delTenant(id: string) {
  return http('DELETE', {
    url: `/agent/aAgent/${id}`
  })
}
// 修改租户
export function alterTenant(data: Omit<Tenant, keyof BasicResponse>) {
  return http<Tenant>('PUT', {
    url: '/agent/aTenant',
    data
  })
}
// 获取租户
export function getTenant(params: { id: string }) {
  return http<Tenant>('GET', {
    url: '/agent/aTenantInfo',
    params
  })
}
