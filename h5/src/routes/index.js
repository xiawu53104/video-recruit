import React from 'react';

const Login = React.lazy(() => import('../pages/login/index'));
const Home = React.lazy(() => import('../pages/home/index'));
const QuestionDetail = React.lazy(() => import('../pages/home/questionBank/questionDetail'));
const AddQuestion = React.lazy(() => import('../pages/home/questionBank/addQuestion'));
const AiInvite = React.lazy(() => import('../pages/home/recruitManage/aiInvite'));

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
    path: '/questionBank/questionDetail/:id',
    component: QuestionDetail,
    authorize: true,
    title: '编辑试卷',
  },
  {
    path: '/questionBank/addQuestion/:mode/:id',
    component: AddQuestion,
    authorize: true,
    title: '添加题目',
  },
  {
    path: '/recruitManage/aiInvite',
    component: AiInvite,
    authorize: true,
    title: 'ai面试邀请',
  },
]

export default routes;
