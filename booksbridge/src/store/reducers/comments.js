import * as actionTypes from '../actions/actionTypes';

const initialState = {
  comments: [
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COMMENT:
      const newComment = {
        id: action.id,
        article_id: action.article_id,
        author_id: action.author_id,
        content: action.content,
      };
      return { ...state, comments: state.comments.concat(newComment) };

    case actionTypes.DELETE_COMMENT:
      const deletedComments = state.comments.filter((comment) => {
        return comment.id !== action.targetID;
      });
      return { ...state, comments: deletedComments };

    case actionTypes.EDIT_COMMENT:
      const modified = state.comments.map((comment) => {
        if (comment.id === action.id) {
          return { ...comment, content: action.content };
        } else {
          return { ...comment };
        }
      });
      return { ...state, comments: modified };

    case actionTypes.GET_COMMENTS:
      const filtered = action.comments.filter((comment) => {
        return comment.article_id == action.targetID;
      })
      return { ...state, comments: filtered };
    default:
      break;
  }
  return state;
};


export default reducer;