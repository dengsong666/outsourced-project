import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/dashboard-admin',
    name: 'DashboardAdmin',
    component: () => import('@/views/admin/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      icon: 'usergroup-add-outlined'
    }
  },
  {
    path: '/agent',
    name: 'Agent',
    component: () => import('@/views/admin/agent/index.vue'),
    meta: {
      title: '代理商',
      icon: 'usergroup-add-outlined'
    },
    children: [
      {
        path: ':id',
        name: 'AgentDetails',
        component: () => import('@/views/admin/agent/details.vue')
      }
    ]
  }
] as RouteRecordRaw[]
