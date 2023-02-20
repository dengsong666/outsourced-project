import { RouteRecordRaw } from 'vue-router'

export default [
  
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
  },
  {
        path: '/dashboard-admin',
        name: 'DashboardAdmin',
        component: () => import('@/views/admin/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard-outlined',
          hidden: true
        }
      },
      {
        path: '/menu-manage',
        name: 'MenuManage',
        component: '',
        meta: {
          title: '菜单管理',
          icon: 'menu-outlined',
          hidden: true
        }
      },
      {
        path: '/role-manage',
        name: 'RoleManage',
        component: '',
        meta: {
          title: '角色管理',
          icon: 'apartment-outlined',
          hidden: true
        }
      },
      {
        path: '/third-party-token',
        name: 'ThirdPartyToken',
        component: '',
        meta: {
          title: '第三方令牌',
          icon: 'key-outlined',
          hidden: true
        }
      },
] as RouteRecordRaw[]
