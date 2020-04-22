import React from 'react';

const Login = React.lazy(() => import('../pages/login/index'));
const Home = React.lazy(() => import('../pages/home/index'));
const AddExam = React.lazy(() => import('../pages/home/addExam'));

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
  {
    path: '/questionBank/addExam',
    component: AddExam,
    authorize: true,
    title: '新增试卷',
  },
]

export default routes;
