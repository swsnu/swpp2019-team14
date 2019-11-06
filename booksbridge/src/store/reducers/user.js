import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [],
  logged_in_user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return { ...state, logged_in_user: action.user };
    // const modified = state.users.map((user) => {
    //   if (user.id === action.targetID) {
    //     state.logged_in_user = state.logged_in_user ? null : user;
    //     return { ...user, logged_in: !user.logged_in };
    //   } else {
    //     return { ...user }
    //   }
    // });
    // return { ...state, users: modified };
    case actionTypes.LOGOUT_USER:
    //     action.users.map((user) => {
    //       if (user.logged_in)
    //         state.logged_in_user = user;
    //       return 0;
    //     })
    //     return { ...state, users: action.users };
    //   default:
    //     break;
  }
  return state;
};

export default reducer;
