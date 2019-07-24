import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/layout'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: () => import('@/layout/login')},
    {
      path: '/home',
      name: 'layout',
      component: layout,
      children: [
        {
          path: 'method1',
          name: 'method1',
          component: () => import('@/pages/method1')
        },

        {
          path: 'method2',
          name: 'method2',
          component: () => import('@/pages/method2')
        },
        {
          path: 'method3',
          name: 'method3',
          component: () => import('@/pages/method3')
        },
        {
          path: 'method4',
          name: 'method4',
          component: () => import('@/pages/method4')
        }
      ]
    }
  ]
})
