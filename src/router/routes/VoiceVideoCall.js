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
];

export default VoiceVideoCallRoutes;