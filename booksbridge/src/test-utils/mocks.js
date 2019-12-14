import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { history, middlewares } from '../store/store';
import * as actionTypes from '../store/actions/actionTypes';

const getMockReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_SEARCHED_BOOKS:
        return {
          ...state,
          books: action.books,
          count: action.count,
          searchedBooks: state.searchedBooks.concat(action.books),
        };
      default:
        break;
    }
    return state;
  },
);

export const getMockStore = initialState => {
  const mockReducer = getMockReducer(initialState);
  const rootReducer = combineReducers({
    book: mockReducer,
    user: mockReducer,
    curation: mockReducer,
    article: mockReducer,
    library: mockReducer,
    router: connectRouter(history),
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return mockStore;
};
