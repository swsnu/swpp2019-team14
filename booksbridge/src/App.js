import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import CreateReview from './containers/CreateReview';
import Main from './containers/Main';
import BookDetail from './containers/BookDetail';
import EditReview from './containers/EditReview';
import SearchResultBook from './containers/SearchResultBook/SearchResultBook';
import ReviewDetailPage from './containers/ReviewDetailPage/ReviewDetailPage';
import UserPage from './containers/UserPage';
import CurationDetailPage from './containers/CurationDetailPage/CurationDetailPage';
import storage from './lib/storage';
import * as actionTypes from './store/actions/actionTypes';
import CreateCuration from './containers/CreateCuration';
import Library from './containers/Library/Library';
import CurationMain from './containers/CurationMain/CurationMain';

import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  componentDidMount() {
    this.initializeUserInfo();
  }

  initializeUserInfo = () => {
    const logged_in_user = storage.get('logged_in_user');
    if (!logged_in_user) {
      this.props.history.push('/sign-in');
    }
    this.props.onSetLogin(logged_in_user);
  };

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App">
          <Switch>
            <Route path="/sign-in" exact render={() => <Signin />} />
            <Route path="/sign-up" exact component={Signup} />
            <Route path="/main" exact component={Main} />
            <Route
              path="/result/search=:keyword/:page"
              exact
              component={SearchResultBook}
            />
            <Route path="/page/:username" exact component={UserPage} />
            <Route path="/page/:username/library" exact component={Main} />
            <Route
              path="/page/:username/curation-list"
              exact
              component={Main}
            />
            <Route path="/review" exact component={Main} />
            <Route path="/review/create" exact component={CreateReview} />
            <Route
              path="/review/:review_id"
              exact
              component={ReviewDetailPage}
            />
            <Route
              path="/review/edit/:review_id"
              exact
              component={EditReview}
            />
            <Route path="/book/:book_id" exact component={BookDetail} />
            <Route path="/curation" exact component={CurationMain} />
            <Route path="/curation/create" exact component={CreateCuration} />
            <Route
              // path="/curation/:username/:curation_id"
              path="/curation/:curation_id"
              exact
              component={CurationDetailPage}
            />
            <Route
              path="/curation/:username/:curation_id/edit"
              exact
              component={CreateCuration}
            />
            <Route path="/library" exact component={Library} />
            <Redirect from="/" to="/sign-in" />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetLogin: user =>
      dispatch({ type: actionTypes.SET_LOGGED_IN_USER, user }),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
