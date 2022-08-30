import { lazy } from 'react';

const ReportRoutes = [
    {
      path: '/report',
      component: lazy(() => import('../../views/report/tour'))
    },
];

export default ReportRoutes;