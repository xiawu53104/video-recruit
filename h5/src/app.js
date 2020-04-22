import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import routes from './routes/index';
import AuthorizeRoute from './routes/authorizeRoute';

function App(props) {
  return (
    <React.Suspense fallback={null}>
      <Router>
        <Switch>
          {routes.map(item => {
            return item.authorize ?
              <AuthorizeRoute
                key={item.path}
                {...item}
              /> :
              <Route
                key={item.path}
                path={item.path}
                render={(routeProps) => {
                  document.title = item.title || `视频面试`;
                  return <item.component {...routeProps} />
                }} 
              />
          })}
          <Route path="*" render={() => <Redirect to="/home"></Redirect>}></Route>
        </Switch>
      </Router>
    </React.Suspense>
  )
}

export default App;
