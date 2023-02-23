import { BasicResponse } from './types/index.d'
import http from './Http'
import { Agent } from './types'

// 新建代理商
export function addAgent(data: Omit<Agent, keyof BasicResponse>) {
  return http('POST', {
    url: '/agent/aAgent',
    data
  })
}
// 获取代理商列表
export function getAgentList(params: Page) {
  return http<Agent[]>('GET', {
    url: '/agent/aAgent',
    params
  })
}
// 获取代理商
export function getAgent(params: { id: string }) {
  return http<Agent>('GET', {
    url: '/agent/aAgentInfo',
    params
  })
}
// 修改代理商
export function alterAgent(data: Omit<Agent, keyof BasicResponse>) {
  return http<Agent>('PUT', {
    url: '/agent/aAgent',
    data
  })
}
// 删除代理商
export function delAgent(id: string) {
  return http('DELETE', {
    url: `/agent/aAgent/${id}`
  })
}
