import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import curationReducer from './store/reducers/curation'
import longReviewReducer from './store/reducers/longReview'
import phraseReducer from './store/reducers/phrase'
import shortReviewReducer from './store/reducers/shortReview'
import userReducer from './store/reducers/user'
import bookReducer from './store/reducers/book'

const history = createBrowserHistory();
const rootReducer = combineReducers({
  book: bookReducer,
  user: userReducer,
  curation: curationReducer,
  longReview: longReviewReducer,
  phrase: phraseReducer,
  shortReview: shortReviewReducer,
  router: connectRouter(history),
});

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(logger, thunk, routerMiddleware(history))));

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
