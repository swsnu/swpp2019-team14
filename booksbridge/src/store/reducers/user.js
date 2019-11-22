import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [],
  logged_in_user: null,
  profile_user: null,
  follower_list: [],
  followee_list: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return { ...state, logged_in_user: action.user };
    case actionTypes.SET_LOGGED_IN_USER:
      return { ...state, logged_in_user: action.user };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        logged_in_user: {
          id: '',
          username: '',
          nickname: '',
          profile_photo: '',
          profile_text: '',
        },
      };
    case actionTypes.GET_SPECIFIC_USER:
      return { ...state, profile_user: action.user };
    case actionTypes.EDIT_USER_PROFILE:
      return {
        ...state,
        logged_in_user: action.user,
        profile_user: action.user,
      };
    case actionTypes.GET_FOLLOWS:
      return {
        ...state,
        follower_list: action.followers_followees_pair.follower_list,
        followee_list: action.followers_followees_pair.followee_list,
      };
    case actionTypes.FOLLOW_USER:
      return {
        ...state,
        follower_list: state.follower_list.concat(action.follow.follower_dict),
      };
    case actionTypes.UNFOLLOW_USER:
      return {
        ...state,
        follower_list: state.follower_list.filter(follower => {
          if (follower)
            return !(follower.username == action.follow.follower_dict.username);
        }),
      };
    case actionTypes.GET_SEARCHED_USERS:
      return {
        ...state,
        users: action.users,
      };
  }
  return state;
};

export default reducer;
