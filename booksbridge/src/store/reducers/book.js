import * as actionTypes from '../actions/actionTypes';

const initialState = {
  books: [],
  count: 0,
  selectedBook: null,
  currentBook: null,
  searchedBooks: [],
  quote: null,
  likedBooks: [],
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
    case actionTypes.GET_CURRENT_BOOK:
      return { ...state, currentBook: action.book, selectedBook: action.book };
    case actionTypes.POST_BOOK_LIKE:
      return { ...state, currentBook: action.book };
    case actionTypes.DELETE_BOOK_LIKE:
      return { ...state, currentBook: action.book };
    case actionTypes.EMPTY_SEARCHED_BOOKS:
      return { ...state, searchedBooks: [] };
    case actionTypes.EMPTY_SELECTED_BOOK:
      return { ...state, selectedBook: null };
    case actionTypes.GET_LIKED_BOOKS:
      return { ...state, likedBooks: action.likedBooks };
    case actionTypes.RUN_OCR:
      return { ...state, quote: action.quote };
    case actionTypes.CLEAR_QUOTE:
      return { ...state, quote: null };
  }

  return state;
};

export default reducer;
