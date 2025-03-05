import { lazy } from 'react';

const Games = lazy(() => import('../pages/Games'));

const coreRoutes = [
    {
        path: '/games/',
        title: 'Games',
        component: Games,
    }
]

const allRoutes = [...coreRoutes];
export default allRoutes;