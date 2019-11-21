import * as actionTypes from '../actions/actionTypes';

const initialState = {
  hasNext: [],
  selectedCuration: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.POST_CURATION:
    //   return {};

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
      return {};
    case actionTypes.POST_CURATION_LIKE:
      return {};
    case actionTypes.DELETE_CURATION_LIKE:
      return {};
    case actionTypes.GET_SEARCHED_CURATIONS:
      return {};
    case actionTypes.GET_CURATIONS_BY_USERID:
      return {};
  }
  return state;
};

export default reducer;
