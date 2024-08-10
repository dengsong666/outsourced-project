import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
  }
]
