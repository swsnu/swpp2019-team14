import * as actionTypes from '../actions/actionTypes';

const initialState = {
  shortreviews:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SHORT_REVIEWS_BY_BOOKID:
      return { ...state, shortreviews: action.reviews };
  }
  return state;
};

export default reducer;