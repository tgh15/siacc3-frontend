import { lazy } from 'react';


const HelpdeskRoutes = [
  {
    path: '/helpdesk/home',
    component: lazy(() => import('../../views/helpdesk/home'))
  },
  {
    path: '/helpdesk/inbox',
    component: lazy(() => import('../../views/helpdesk/inbox'))
  },
  {
    path: '/helpdesk/chatbot-configuration',
    component: lazy(() => import('../../views/helpdesk/chatbot-configuration'))
  },
  {
    path: '/helpdesk/saved-messages',
    component: lazy(() => import('../../views/helpdesk/saved-messages'))
  },
  {
    path: '/helpdesk/monitoring-bot-message',
    component: lazy(() => import('../../views/helpdesk/monitoring-bot-message'))
  },
  
  // Report
  {
    path: '/helpdesk/report',
    exact: true,
    component: lazy(() => import('../../views/helpdesk/report/index'))
  },
  {
    path: '/helpdesk/report/create',
    component: lazy(() => import('../../views/helpdesk/report/create'))
  },
  {
    path: '/helpdesk/report/detail/:id',
    exact: true,
    component: lazy(() => import('../../views/helpdesk/report/detail'))
  },

  // Settings
  {
    path: '/helpdesk/setting',
    component: lazy(() => import('../../views/helpdesk/settings/index'))
  },

  // Configuration Instructions
  {
    path: '/helpdesk/instruction',
    component: lazy(() => import('../../views/helpdesk/configuration-instructions/index'))
  },
  {
    path: '/helpdesk/create-instruction',
    component: lazy(() => import('../../views/helpdesk/configuration-instructions/modalForm'))
  },
  {
    path: '/helpdesk/update-instruction/:id',
    component: lazy(() => import('../../views/helpdesk/configuration-instructions/modalForm'))
  },
  {
    path: '/helpdesk/help-page',
    component: lazy(() => import('../../views/helpdesk/configuration-instructions/user-manual-page/help_page')),
    exact: true,
  },
  {
    path: '/helpdesk/help-page/:id',
    component: lazy(() => import('../../views/helpdesk/configuration-instructions/user-manual-page/detail_help_page')),
    meta: {
      navLink: '/helpdesk/help-page'
    }
  },

  // Report Kind
  {
    path: '/helpdesk/report-kind',
    component: lazy(() => import('../../views/helpdesk/report-kind/index'))
  },
];

export default HelpdeskRoutes;