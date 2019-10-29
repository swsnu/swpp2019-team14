import * as actionTypes from '../actions/actionTypes';

const initialState = {
  phrases:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PHRASES_BY_BOOKID:
      return { ...state, phrases: action.reviews };
  }
  return state;
};

export default reducer;