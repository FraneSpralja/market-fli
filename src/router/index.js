import { createRouter, createWebHashHistory } from 'vue-router'
import marketLayout from  '@/modules/market/router'
import userLayout from '@/modules/user/router'

const routes = [
  {
    path: '',
    ...marketLayout
  },
  {
    path: '/user',
    ...userLayout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
