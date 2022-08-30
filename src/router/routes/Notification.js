import { lazy } from 'react'

const NotificationRoutes = [
    {
      path: '/notification',
      component: lazy(() => import('../../views/notification')),
      meta: {
        menuHidden: true
      }
    },
];

export default NotificationRoutes