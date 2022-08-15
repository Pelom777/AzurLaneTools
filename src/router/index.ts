import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
        path: '/collection',
        name: 'collection',
        component: () => import('@/views/collection/index.vue'),
      },
      {
        path: '/collection/illustration',
        name: 'illustration',
        component: () => import('@/views/illustration/index.vue'),
      },
      {
        path: '/collection/music',
        name: 'music',
        component: () => import('@/views/music/index.vue'),
      },
      {
        path: '/calculator',
        name: 'calculator',
        meta: {
          keepAlive: true
        },
        component: () => import('@/views/calculator/index.vue'),
      },
      {
        path: '/rank',
        name: 'rank',
        component: () => import('@/views/rank/index.vue'),
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
})

export default router