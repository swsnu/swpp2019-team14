import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  hasNext: null,
  selectedPost: null,
  postsByUserID: [],
  length: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      console.log('reducer:', action.posts);
      return {
        ...state,
        posts: action.posts,
      };
    case actionTypes.POST_POST:
      return {
        ...state,
        selectedPost: action.post,
      };
    case actionTypes.GET_SPECIFIC_POST:
      return {
        ...state,
        selectedPost: action.post,
      };
    case actionTypes.EDIT_SPECIFIC_POST:
      return {
        ...state,
        selectedPost: action.post,
      };
    case actionTypes.GET_POSTS_BY_USERID:
      return {
        ...state,
        postsByUserID: action.posts.articles,
        length: action.posts.length,
      };
    case actionTypes.POST_POST_COMMENT:
      const newPosts = state.posts.map(post => {
        if (post.id === action.post.id) {
          return {
            ...post,
            comments: action.post.comments,
          };
        } else {
          return { ...post };
        }
      });
      return {
        ...state,
        selectedPost: action.post,
        posts: newPosts,
      };

    case actionTypes.POST_POST_LIKE:
      return {
        ...state,
        selectedPost: action.post,
      };

    case actionTypes.DELETE_POST_LIKE:
      return {
        ...state,
        selectedPost: action.post,
      };

    case actionTypes.DELETE_SPECIFIC_POST:
      //in post detail page
      let deleted;
      deleted = state.posts.filter(post => {
        return post.id !== action.targetID;
      });
      return { ...state, Posts: deleted };

      //in User Page (여기까지 안 옴)
      deleted = state.postsByUserID.filter(post => {
        return post.id !== action.targetID;
      });
      return { ...state, postsByUserID: deleted, length: state.length - 1 };
  }
  return state;
};

export default reducer;
