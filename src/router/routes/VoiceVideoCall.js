import { lazy } from 'react';


const VoiceVideoCallRoutes = [
    {
        path: '/voice-video-call',
        component: lazy(() => import('../../views/voice-video-call/index')),
        appLayout: true,
        className: 'chat-application',
        meta: {
            menuHidden: true
        }
    },
    {
        path: '/video-streaming',
        exact: true,
        component: lazy(() => import('../../views/video-streaming/index')),
    },
    {
        path: '/video-streaming/detail',
        exact: true,
        component: lazy(() => import('../../views/video-streaming/detail')),
    },
];

export default VoiceVideoCallRoutes;