import { createRouter, createWebHashHistory } from 'vue-router'
import marketLayout from  '@/modules/market/router'

const routes = [
  {
    path: '',
    ...marketLayout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
