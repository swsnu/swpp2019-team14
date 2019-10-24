import React from 'react';
import './App.css';

import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Create from './containers/Create';
import CreateReview from './containers/CreateReview';
import Main from './containers/Main';
import BookDetail from './containers/BookDetail';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/sign-in' exact render={() => <Signin />} />
          <Route path='/sign-up' exact component={Signup} />
          <Route path='/main' exact component={Main} />
          <Route path='/result/search=:keyword' exact component={Create} />
          <Route path='/page/:user_id' exact component={Create} />
          <Route path='/page/:user_id/library' exact component={Create} />
          <Route path='/page/:user_id/curation-list' exact component={Create} />
          <Route path='/review' exact component={Create} />
          <Route path='/review/create' exact component={CreateReview} />
          <Route path='/book/:book_id' exact component={BookDetail} />
          <Route path='/book/:book_id/:review_id/' exact component={Create} />
          <Route path='/book/:book_id/:review_id/edit' exact component={Create} />
          <Route path='/curation/' exact component={Create} />
          <Route path='/curation/create' exact component={Create} />
          <Route path='/curation/:user_id/:curation_id' exact component={Create} />
          <Route path='/curation/:user_id/:curation_id/edit' exact component={Create} />
          <Redirect from='/' to='/sign-in' />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}
export default App;
