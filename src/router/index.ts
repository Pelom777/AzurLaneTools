import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { pinia, useStore } from '@/store'

const store = useStore(pinia)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/catalogue',
        name: 'catalogue',
        meta: {
          keepAlive: true
        },
        component: () => import('@/views/catalogue/index.vue'),
      },
      {
        path: '/catalogue/:name',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
      },
      {
        path: '/rank',
        name: 'rank',
        component: () => import('@/views/rank/index.vue'),
      },
      {
        path: '/gallery',
        name: 'gallery',
        component: () => import('@/views/gallery/index.vue'),
      },
      {
        path: '/record',
        name: 'record',
        component: () => import('@/views/record/index.vue'),
      },
      {
        path: '/record/vote/:year/:region',
        name: 'vote',
        component: () => import('@/views/vote/index.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
      },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router