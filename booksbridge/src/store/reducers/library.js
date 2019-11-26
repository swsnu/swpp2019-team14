import * as actionTypes from '../actions/actionTypes';

const initialState = {
  libraries: [],
  selectedLibrary: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIBRARIES:
      return {
        ...state,
        libraries: action.libraries,
      };
    case actionTypes.POST_LIBRARY:
      return {
        ...state,
        libraries: state.libraries.concat(action.library),
      };
    case actionTypes.DELETE_SPECIFIC_LIBRARY:
      return {
        ...state,
        libraries: state.libraries.filter(library => {
          if (library) return !(library.id === action.library.id);
        }),
      };
    case actionTypes.GET_SPECIFIC_LIBRARY:
      return {
        ...state,
        selectedLibrary: action.library,
      };
    case actionTypes.EDIT_SPECIFIC_LIBRARY:
      return {
        ...state,
        selectedLibrary: action.library,
        libraries: state.libraries.map(library => {
          if (library) {
            if (library.id === action.library.id) return action.library;
            else return library;
          }
        }),
      };
  }
  return state;
};

export default reducer;
