import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AuthorizeRoute(props) {
  const isAuthorized = !!window.localStorage.getItem('token');
  return (
    isAuthorized ?
    <Route
      path={props.path}
      render={(routeProps) => {
        document.title = props.title || '视频面试';
        return <props.component {...routeProps} />
      }} 
    /> :
    <Redirect to="/login"></Redirect>
  )
}
