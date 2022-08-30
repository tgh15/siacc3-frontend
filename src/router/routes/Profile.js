import { lazy } from 'react';


const ProfileRoutes = [
    {
      path: '/profile',
      component: lazy(() => import('../../views/profile/profile_api')),
      meta: {
        menuHidden: true
      }
    },
];

export default ProfileRoutes