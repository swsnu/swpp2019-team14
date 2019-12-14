import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import curationReducer from './reducers/curation';
import articleReducer from './reducers/article';
import userReducer from './reducers/user';
import bookReducer from './reducers/book';
import libraryReducer from './reducers/library';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  book: bookReducer,
  user: userReducer,
  curation: curationReducer,
  article: articleReducer,
  library: libraryReducer,
  router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
