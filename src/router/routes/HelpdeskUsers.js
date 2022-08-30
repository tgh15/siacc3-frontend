import { lazy } from 'react';


const HelpdeskUsersRoutes = [
    {
        path: '/helpdesk-users',
        component: lazy(() => import('../../views/helpdesk-user/Dashboard')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/helpdesk/users',
        component: lazy(() => import('../../views/helpdesk-user/index')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/helpdesk/create-complaint',
        component: lazy(() => import('../../views/helpdesk-user/complaint/CreateComplaint')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/helpdesk/track-complaint',
        component: lazy(() => import('../../views/helpdesk-user/TrackComplaint')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
];

export default HelpdeskUsersRoutes;