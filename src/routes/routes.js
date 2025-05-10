import { lazy } from 'react';

const Featured = lazy(() => import('../pages/Featured'));
const Favourites = lazy(() => import('../pages/Favourites'));
const SignIn = lazy(() => import('../pages/SignIn'));
const Product = lazy(() => import('../pages/Product'));

const coreRoutes = [
    {
        path: '/signing',
        title: 'SignIn',
        component: SignIn,
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
    },
    {
        path: '/product/:product_id',
        title: 'Product',
        component: Product,
    },

]

const allRoutes = [...coreRoutes];
export default allRoutes;