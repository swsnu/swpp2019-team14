import * as actionTypes from '../actions/actionTypes';

const initialState = {
  libraries: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIBRARIES_BY_USERID:
      return {
        ...state,
        libraries: action.libraries,
      };
  }

  return state;
};

export default reducer;
