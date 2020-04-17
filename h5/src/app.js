import React from 'react';
import {
  BrowserRouter as Router,
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
              <AuthorizeRoute key={item.path} {...item}></AuthorizeRoute> 
              : <Route key={item.path} {...item}></Route>
          })}
          <Route path="*" render={() => <Redirect to="/login"></Redirect>}></Route>
        </Switch>
      </Router>
    </React.Suspense>
  )
}

export default App;
