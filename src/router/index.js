import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import {
  Admin,
  Gallery,
  Projects,
  Sessions,
  Statistics,
} from '@/pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'gallery',
      path: '/',
      component: Gallery
    },
    {
      name: 'projects',
      path: '/projects',
      component: Projects
    },
    {
      name: 'sessions',
      path: '/sessions',
      component: Sessions
    },
    {
      name: 'statistics',
      path: '/statistics',
      component: Statistics
    },
    {
      name: 'admin',
      path: '/admin',
      component: Admin
    }
  ]
})

export default router
