import { lazy } from 'react'

const SearchRoutes = [
    {
      path: '/search',
      component: lazy(() => import('../../views/search/Search'))
    },
];

export default SearchRoutes