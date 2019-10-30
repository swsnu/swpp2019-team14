import * as actionTypes from '../actions/actionTypes';

const initialState = {
  longreviews:[],
  selectedReview: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LONG_REVIEWS_BY_BOOKID:
      return { ...state, longreviews: action.reviews };
  }
  return state;
};

export default reducer;