import * as actionTypes from '../actions/actionTypes';

const initialState = {
  hasNext: null,
  curations: [],
  selectedCuration: null,
  likes: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.POST_CURATION:
    //   return {};
    case actionTypes.GET_CURATIONS:
      return {
        ...state,
        curations: action.curations,
        hasNext: action.hasNext,
      };

    case actionTypes.GET_SPECIFIC_CURATION:
      return {
        ...state,
        selectedCuration: action.curation,
      };

    case actionTypes.POST_CURATION_COMMENT:
      return {
        ...state,
        selectedCuration: action.curation,
      };

    case actionTypes.EDIT_SPECIFIC_CURATION:
      return {};
    case actionTypes.DELETE_SPECIFIC_CURATION:
      return {};
    case actionTypes.GET_CURATION_LIKE:
      return {
        ...state,
        likes: action.likes.count,
      };
    case actionTypes.POST_CURATION_LIKE:
      return {
        ...state,
        selectedCuration: action.curation,
      };
    case actionTypes.DELETE_CURATION_LIKE:
      return {
        ...state,
        selectedCuration: action.curation,
      };
    case actionTypes.GET_SEARCHED_CURATIONS:
      return {};
    case actionTypes.GET_CURATIONS_BY_USERID:
      return {};
  }
  return state;
};

export default reducer;
