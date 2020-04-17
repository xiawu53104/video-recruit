import React from 'react';

const Login = React.lazy(() => import('../pages/login/index'));
const Test = React.lazy(() => import('../pages/test/index'));

const routes = [
  {
    path: '/login',
    component: Login,
    authorize: false
  },
  {
    path: '/test',
    component: Test,
    authorize: true
  },
]

export default routes;
