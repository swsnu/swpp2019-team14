import * as actionTypes from '../actions/actionTypes';

const initialState = {
  books: [],
  count: 0,
  selectedBook: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCHED_BOOKS:
      return { ...state, books: action.books, page: action.count };
    case actionTypes.GET_SPECIFIC_BOOK:
      return { ...state, selectedBook: action.book };
  }

  return state;
};

export default reducer;