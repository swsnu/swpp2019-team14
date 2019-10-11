import * as actionTypes from '../actions/actionTypes';

const initialState = {
  articles: [
  ],
  selectedArticle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ARTICLE:
      const newArticle = {
        id: action.id,
        author_id: action.author_id,
        title: action.title,
        content: action.content,
      };
      return { ...state, articles: state.articles.concat(newArticle) };
    case actionTypes.DELETE_ARTICLE:
      const deletedArticles = state.articles.filter((article) => {
        return article.id !== action.targetID;
      });
      return { ...state, articles: deletedArticles };
    case actionTypes.EDIT_ARTICLE:
      const modified = state.articles.map((article) => {
        if (article.id === action.id) {
          return { ...article, title: action.title, content: action.content };
        } else {
          return { ...article };
        }
      });
      return { ...state, articles: modified };
    case actionTypes.GET_ARTICLE:
      return { ...state, selectedArticle: action.target };
    case actionTypes.GET_ARTICLES:
      return { ...state, articles: action.articles };
    default:
      break;
  }
  return state;
};

export default reducer;