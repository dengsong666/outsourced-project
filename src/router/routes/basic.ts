import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/index.vue'
import User from '@/views/user/index.vue'
import AiTools from '@/views/ai-tools/index.vue'
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    redirect: '/user/userinfo',
    children: [
      {
        path: 'userinfo',
        name: 'userinfo',
        component: () => import('@/views/user/userinfo.vue')
      },
      {
        path: 'my-account',
        name: 'my-account',
        component: () => import('@/views/user/account.vue')
      },
      {
        path: 'download-center',
        name: 'download-center',
        component: () => import('@/views/user/download.vue')
      },
      {
        path: 'member-center',
        name: 'member-center',
        component: () => import('@/views/user/member.vue')
      }
    ]
  },
  {
    path: '/ai-tools',
    name: 'ai-tools',
    component: AiTools,
    redirect: '/ai-tools/video-translation',
    children: [
      {
        path: 'video-translation',
        name: 'video-translation',
        component: () => import('@/views/ai-tools/video-translation.vue')
      },
    ]
  },
]
