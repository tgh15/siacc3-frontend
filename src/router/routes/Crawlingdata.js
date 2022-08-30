import { lazy } from 'react'

const CrawlingdataRoutes = [
    {
      path: '/crawling-data',
      exact: true,
      component: lazy(() => import('../../views/crawling-data/Tour'))
    },
    {
      path: '/crawling-data/:id',
      component: lazy(() => import('../../views/crawling-data/CrawlingDataDetail')),
      meta: {
        navLink: '/crawling-data'
      }
    },
]

export default CrawlingdataRoutes