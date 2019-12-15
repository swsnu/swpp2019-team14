import * as actionTypes from '../actions/actionTypes';

const initialState = {
  hasNext: null,
  curations: [],
  selectedCuration: null,
  comments: [],
  likes: null,
  curationsByUserID: [],
  length: 0,
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
        selectedCuration: action.data.curation,
        comments: action.data.comments,
      };

    case actionTypes.POST_CURATION_COMMENT:
      return {
        ...state,
        comments: action.comments,
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
    case actionTypes.EDIT_SPECIFIC_CURATION_COMMENT:
      return {
        ...state,
        comments: action.comments,
      };
    case actionTypes.DELETE_SPECIFIC_CURATION_COMMENT:
      return {
        ...state,
        comments: action.comments,
      };
    case actionTypes.GET_SEARCHED_CURATIONS:
      return { ...state, curations: action.curations };
    case actionTypes.GET_CURATIONS_BY_USERID:
      return {
        ...state,
        curationsByUserID: action.curations.curations,
        length: action.curations.length,
      };
  }
  return state;
};

export default reducer;
