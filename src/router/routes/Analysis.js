import { lazy } from 'react'

const AnalysisRoutes = [
    {
      path: '/analysis',
      component: lazy(() => import('../../views/analysis/Analysis'))
    },
];

export default AnalysisRoutes