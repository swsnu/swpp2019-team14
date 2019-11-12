import * as actionTypes from '../actions/actionTypes';

const initialState = {
  books: [],
  count: 0,
  selectedBook: null,
  searchedBooks: [],
  quote: 'empty',
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
    case actionTypes.RUN_OCR:
      console.log(action.quote);
      return { ...state, quote: action.quote };
  }

  return state;
};

export default reducer;
