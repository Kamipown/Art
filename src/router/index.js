import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import {
  Gallery
} from '@/pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'gallery',
      path: '/:date?',
      component: Gallery
    }
  ]
})

export default router
