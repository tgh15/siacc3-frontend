import { lazy } from 'react'

const PublicReportRoutes = [
    {
      path: '/public-report',
      component: lazy(() => import('../../views/public-report'))
    },
];

export default PublicReportRoutes