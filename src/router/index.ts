import { createRouter, createWebHashHistory, RouteParams } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';

export enum RouteNames {
  DASHBOARD = 'dashboard',
  ACTUALITY = 'actuality',
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: RouteNames.DASHBOARD,
      path: '/',
      component: Dashboard,
    },
    {
      name: RouteNames.ACTUALITY,
      path: '/actuality',
      component: () => import('@/views/Actuality.vue'),
    },
  ],
});

export function routerPush(name: RouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    });
  } else {
    return router.push({
      name,
    });
  }
}

export default router;
