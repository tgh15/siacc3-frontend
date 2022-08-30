import { lazy } from 'react'

const ChatRoutes = [
    {
      path: '/chats',
      component: lazy(() => import('../../views/chat/index')),
      appLayout: true,
      className: 'chat-application',
      meta: {
        menuHidden: true
      }
    },

];

export default ChatRoutes