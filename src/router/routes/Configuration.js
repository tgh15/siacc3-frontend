import { lazy } from 'react';

const ConfigurationRoutes = [
  {
    path: '/configuration/user-management',
    component: lazy(() => import('../../views/configuration/user-management/tour'))
  },
  {
    path: '/configuration/user-activity',
    component: lazy(() => import('../../views/configuration/user-activity/tour'))
  },
  {
    path: '/configuration/privilage-role',
    component: lazy(() => import('../../views/configuration/privilage-role/tour'))
  },
  {
    path: '/configuration/category',
    component: lazy(() => import('../../views/configuration/category/tour'))
  },
  {
    path: '/configuration/organizational-structure',
    component: lazy(() => import('../../views/configuration/organizational-structure/tour'))
  },
  {
    path: '/configuration/unit-work',
    component: lazy(() => import('../../views/configuration/unit-work/tour'))
  },
  {
    path: '/configuration/position',
    component: lazy(() => import('../../views/configuration/position/tour')),
  },
  {
    path: '/configuration/work-unit-list',
    component: lazy(() => import('../../views/configuration/work-unit-list/tour')),
    exact: true,
  },
  {
    path: '/configuration/work-unit-list/:id',
    component: lazy(() => import('../../views/configuration/work-unit-list/Detail')),
    meta: {
      navLink: '/configuration/work-unit-list'
    }
  },
  {
    path: '/configuration/automation',
    component: lazy(() => import('../../views/configuration/automation/tour'))
  },
  {
    path: '/configuration/link-account',
    component: lazy(() => import('../../views/configuration/link-account/tour'))
  },
  {
    path: '/configuration/proteksi',
    component: lazy(() => import('../../views/configuration/proteksi/tour'))
  },
  {
    path: '/configuration/server-monitor',
    component: lazy(() => import('../../views/configuration/server-monitor/ServerMonitor'))
  },
  {
    path: '/configuration/setting-performance',
    component: lazy(() => import('../../views/configuration/setting-performance/tour'))
  },
  {
    path: '/configuration/restriction',
    component: lazy(() => import('../../views/configuration/restrict-ip/tour'))
  },
  {
    path: '/configuration/license',
    component: lazy(() => import('../../views/configuration/license/tour'))
  },
];

export default ConfigurationRoutes;