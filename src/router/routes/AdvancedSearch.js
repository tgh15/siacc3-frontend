import { lazy } from 'react'

const AdvancedSearchRoute = [
    {
      path: '/advanced-search',
      component: lazy(() => import('../../views/advanced-search/index')),
      exact: true,
    },
];

export default AdvancedSearchRoute