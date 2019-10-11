import React from 'react';
import './App.css';

import Login from './containers/Login';
import Create from './containers/Create'
import Main from './containers/Main'
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/login' exact render={() => <Login />} />
          <Route path='/sign-up' exact component={Create} />
          <Route path='/main' exact component={Main} />
          <Route path='/result/' exact component={Create} />
          <Route path='/page/:user_id' exact component={Create} />
          <Route path='/page/:user_id/library' exact component={Create} />
          <Route path='/page/:user_id/curation-list' exact component={Create} />
          <Route path='/review' exact component={Create} />
          <Route path='/review/create' exact component={Create} />
          <Route path='/book/:book_id/:review_id/' exact component={Create} />
          <Route path='/book/:book_id/:review_id/edit' exact component={Create} />
          <Route path='/curation/' exact component={Create} />
          <Route path='/curation/create' exact component={Create} />
          <Route path='/curation/:user_id/:curation_id' exact component={Create} />
          <Route path='/curation/:user_id/:curation_id/edit' exact component={Create} />
          <Redirect from='/' to='/login' />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}
export default App;
