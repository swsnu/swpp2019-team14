import React from 'react';
import './App.css';

import Signin from './containers/Signin';
import Signup from './containers/Signup';
import CreateReview from './containers/CreateReview';
import Main from './containers/Main';
import BookDetail from './containers/BookDetail';
import SearchResultBook from './containers/SearchResultBook/SearchResultBook'
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import ReviewDetailPage from './containers/ReviewDetailPage/ReviewDetailPage';


function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/sign-in' exact render={() => <Signin />} />
          <Route path='/sign-up' exact component={Signup} />
          <Route path='/main' exact component={Main} />
          <Route path='/result/search=:keyword/book/:page' exact component={SearchResultBook} />
          <Route path='/page/:user_id' exact component={Main} />
          <Route path='/page/:user_id/library' exact component={Main} />
          <Route path='/page/:user_id/curation-list' exact component={Main} />
          <Route path='/review' exact component={Main} />
          <Route path='/review/create' exact component={CreateReview} />
          <Route path='/review/:review_id' exact component={ReviewDetailPage} />
          <Route path='/review/:review_id/edit' exact component={ReviewDetailPage} />
          <Route path='/book/:book_id' exact component={BookDetail} />
          <Route path='/curation' exact component={Main} />
          <Route path='/curation/create' exact component={Main} />
          <Route path='/curation/:user_id/:curation_id' exact component={Main} />
          <Route path='/curation/:user_id/:curation_id/edit' exact component={Main} />
          <Redirect from='/' to='/sign-in' />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}
export default App;
