import type { RouteRecordRaw } from 'vue-router'

import Login from '@/views/login/index.vue'
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
