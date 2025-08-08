import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'ChartMultiLine',
      component: () => import('../views/ChartMultiLine/index.vue')
    },
    { 
      path: '/charttablelink',
      name: 'charttablelink',
      component: () => import('../views/ChartTableLink/index.vue')
    },
    {
      path: '/chartlazyload',
      name: 'ChartLazyLoad',
      component: () => import('../views/ChartLazyLoad/index.vue')
    },
    {
      path: '/chartbigdata',
      name: 'ChartBigData',
      component: () => import('../views/ChartBigData/index.vue')
    },
]});

export default router;