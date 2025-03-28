import { lazy } from 'react';

const Search = lazy(() => import('../pages/Search'));
const Featured = lazy(() => import('../pages/Featured'));
const Favourites = lazy(() => import('../pages/Favourites'));

const coreRoutes = [
    {
        path: '/search',
        title: 'Search',
        component: Search,
    },
    {
        path: '/featured_products',
        title: 'Featured',
        component: Featured,
    },
    {
        path: '/favourites',
        title: 'Favourites',
        component: Favourites,
    }
]

const allRoutes = [...coreRoutes];
export default allRoutes;