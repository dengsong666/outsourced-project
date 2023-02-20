import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/personal-center',
    name: 'PersonalCenter',
    component: () => import('@/views/agent/personalCenter/index.vue'),
    meta: {
      title: '个人中心',
      icon: 'setting-outlined',
      hidden: true
    }
  },
  {
    path: '/setting-center',
    name: 'SettingCenter',
    component: () => import('@/views/agent/settingCenter/index.vue'),
    meta: {
      title: '设置中心',
      icon: 'setting-outlined',
      hidden: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/agent/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      icon: 'dashboard-outlined',
    }
  },
  {
    path: '/tenement',
    name: 'Tenement',
    component: () => import('@/views/agent/tenement/index.vue'),
    meta: {
      title: '租户',
      icon: 'usergroup-add-outlined'
    },
    children: [
      {
        path: ':id',
        name: 'TenementDetails',
        component: () => import('@/views/agent/tenement/details.vue')
      }
    ]
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('@/views/agent/notification/index.vue'),
    meta: {
      title: '通知',
      icon: 'notification-outlined'
    }
  }
] as RouteRecordRaw[]
