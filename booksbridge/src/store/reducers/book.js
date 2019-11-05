import * as actionTypes from '../actions/actionTypes';

const initialState = {
  books: [],
  count: 0,
  selectedBook: null,
  searchedBooks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEARCHED_BOOKS:
      return {
        ...state,
        books: action.books,
        count: action.count,
        searchedBooks: state.searchedBooks.concat(action.books),
      };
    case actionTypes.GET_SPECIFIC_BOOK:
      return { ...state, selectedBook: action.book };
    case actionTypes.EMPTY_SEARCHED_BOOKS:
      return { ...state, searchedBooks: [] };
  }

  return state;
};

export default reducer;
