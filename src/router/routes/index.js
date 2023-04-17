import { lazy } from 'react';
import ChatRoutes from './Chat';
import ReportRoutes from './Report';
import ProfileRoutes from './Profile';
import AdvancedSearch from './AdvancedSearch';
import AnalysisRoutes from './Analysis';
import HelpdeskRoutes from './Helpdesk';
import PerformanceRoutes from './Performance';
import NotificationRoutes from './Notification';
import CrawlingdataRoutes from './Crawlingdata';
import PublicReportRoutes from './PublicReport';
import ConfigurationRoutes from './Configuration';
import HelpdeskUsersRoutes from './HelpdeskUsers';
import VoiceVideoCallRoutes from './VoiceVideoCall';

import { VideoShare } from "../../views/configuration/user-preferences/video-management/video-tutorial"

// ** Document title
const TemplateTitle = '%s'

// ** Default Route
const DefaultRoute = localStorage.getItem('role') === 'Helpdesk' ? '/helpdesk/home' : '/beranda';

// ** Merge Routes
const Routes = [
  ...CrawlingdataRoutes,
  ...AnalysisRoutes,
  ...ReportRoutes,
  ...PerformanceRoutes,
  ...PublicReportRoutes,
  ...ConfigurationRoutes,
  ...ProfileRoutes,
  ...NotificationRoutes,
  ...ChatRoutes,
  ...AdvancedSearch,
  ...HelpdeskRoutes,
  ...HelpdeskUsersRoutes,
  ...VoiceVideoCallRoutes,
  {
    path: '/beranda',
    exact: true,
    component: lazy(() => import('../../views/beranda/beranda')),
  },
  {
    path: '/beranda/detail/:id',
    component: lazy(() => import('../../views/beranda/beranda_detail'))
  },
  {
    path: '/popular-topic',
    component: lazy(() => import('../../views/popular-topics/popular_topic_api'))
  },
  {
    path: '/file-management',
    component: lazy(() => import('../../views/file-manager/TourFileManager'))
  },
  {
    path: '/berita-tersimpan',
    component: lazy(() => import('../../views/saved-feeds/seved_feeds_api'))
  },
  {
    path: '/dashboard',
    exact: true,
    component: lazy(() => import('../../views/dashboard/DashboardComponent')),
  },
  {
    path: '/dashboard/share/:id',
    exact: true,
    component: lazy(() => import('../../views/dashboard/DashboardDetail')),
  },
  {
    path: '/approval-news',
    component: lazy(() => import('../../views/approval-news/approval_news_api')),
  },
  {
    path: '/list-draft',
    component: lazy(() => import('../../views/list-draft/TourListDraft')),
  },
  {
    path: '/landing-page',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/landing-page')),
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/authentication/login/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/authentication/forgot-password/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/change-device',
    component: lazy(() => import('../../views/authentication/change-device')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/login-qrcode',
    component: lazy(() => import('../../views/authentication/login-qrcode')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/new-password',
    component: lazy(() => import('../../views/authentication/new-password')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/event',
    component: lazy(() => import('../../views/event/EventAPI')),
    meta: {
      menuHidden: true
    }
  },
  {
    path: '/gis',
    component: lazy(() => import('../../views/gis')),
  },
  {
    path: '/gis',
    component: lazy(() => import('../../views/gis')),
  },
  {
    path: "/video/:role/:video_id",
    component: VideoShare
  },

];

const HelpdeskRoute = [
  ...HelpdeskUsersRoutes,
  ...HelpdeskRoutes,
  {
    path: '/login',
    component: lazy(() => import('../../views/authentication/login/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  }
];

export { DefaultRoute, TemplateTitle, Routes, HelpdeskRoute }
