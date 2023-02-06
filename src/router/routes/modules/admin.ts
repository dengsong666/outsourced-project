import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/dashboard-admin',
    name: 'DashboardAdmin',
    component: () => import('@/views/admin/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      icon: 'dashboard-outlined'
    }
  },
  {
    path: '/menu-manage',
    name: 'MenuManage',
    component: '',
    meta: {
      title: '菜单管理',
      icon: 'menu-outlined'
    }
  },
  {
    path: '/role-manage',
    name: 'RoleManage',
    component: '',
    meta: {
      title: '角色管理',
      icon: 'apartment-outlined'
    }
  },
  {
    path: '/third-party-token',
    name: 'ThirdPartyToken',
    component: '',
    meta: {
      title: '第三方令牌',
      icon: 'key-outlined'
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
