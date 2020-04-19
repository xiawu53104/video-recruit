import React from 'react';

const Login = React.lazy(() => import('../pages/login/index'));
const Home = React.lazy(() => import('../pages/home/index'));

const routes = [
  {
    path: '/login',
    component: Login,
    authorize: false
  },
  {
    path: '/home',
    component: Home,
    authorize: true
  },
]

export default routes;
