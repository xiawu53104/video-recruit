import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AuthorizeRoute({path, component}) {
  const isAuthorized = !!window.sessionStorage.getItem('token');
  return (
    isAuthorized ?
    <Route path={path} component={component}></Route> :
    <Redirect to="/login"></Redirect>
  )
}
