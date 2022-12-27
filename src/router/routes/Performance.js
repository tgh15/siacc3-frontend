import { lazy } from 'react'

const PerformanceRoutes = [
    {
      path: '/performance',
      exact: true,
      component: lazy(() => import('../../views/maintenance'))
    },
    {
      path: '/hidden-performance',
      exact: true,
      component: lazy(() => import('../../views/performance'))
    },
]

export default PerformanceRoutes