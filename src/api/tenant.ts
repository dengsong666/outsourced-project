import http from './Http'
import { BasicResponse } from './types'
import { Product, ProductModule, ProductRole, ProductUser, Tenant } from './types/tenant'

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
// 删除租户
export function delTenant(id: string) {
  return http('DELETE', {
    url: `/agent/aTenant/${id}`
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
// 租户获取产品列表
export function getTenantProductList(params: { tenant_id: string }) {
  return http<{ list: Product[] }>('GET', {
    url: '/agent/aTenantProduct',
    params
  })
}
// 租户开通产品
export function openTenantProductState(data: { tenant_id: string; product_id: number }) {
  return http('POST', {
    url: '/agent/aTenantProduct',
    data
  })
}
// 租户更新产品状态
export function updateTenantProductState(data: { tenant_id: string; product_id: number; product_state: number }) {
  return http('PUT', {
    url: '/agent/aTenantProduct',
    data
  })
}
// 获取租户产品的业务模块
export function getTenantProductModuleList(params: { tenant_id: string; product_id: number }) {
  return http<{ list: ProductModule[] }>('GET', {
    url: '/agent/aTenantModule',
    params
  })
}

// 给租户开通产品的业务模块
export function openTenantProductModuleState(data: { tenant_id: string; product_id: number; module_id: number }) {
  return http('POST', {
    url: '/agent/aTenantModule',
    data
  })
}
// 获取产品的用户列表
export function getProductUserList(params: { tenant_id: string }) {
  return http('GET', {
    url: '/agent/sysUser',
    params
  })
}
// 获取产品的角色列表
export function getProductRoleList(params: { tenant_id: string; product_id: number }) {
  return http<{ list: ProductRole[] }>('GET', {
    url: '/agent/sysRole',
    params
  })
}
// 添加产品用户
export function addProductUser(data: ProductUser) {
  return http('POST', {
    url: '/agent/sysUser',
    data
  })
}
// 删除产品用户
export function delProductUser(id: string, tenant_id: string) {
  return http('DELETE', {
    url: `/agent/sysUser/${id}/${tenant_id}`
  })
}
// 修改产品用户
export function updateProductUser(data: ProductUser) {
  return http('PUT', {
    url: `/agent/sysUser`,
    data
  })
}
